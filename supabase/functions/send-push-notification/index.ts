import { createClient } from 'npm:@supabase/supabase-js@2';
import webpush from 'npm:web-push@3.6.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const jsonResponse = (body: Record<string, unknown>, status = 200) => new Response(
  JSON.stringify(body),
  { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
);

const toBase64Url = (value: string) => value.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const { candidatureId, messageId } = await request.json();
    const hasCandidatureId = typeof candidatureId === 'string';
    const hasMessageId = typeof messageId === 'string';
    const id = hasCandidatureId ? candidatureId : messageId;
    if (hasCandidatureId === hasMessageId || typeof id !== 'string'
      || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
      return jsonResponse({ error: 'Provide exactly one valid candidatureId or messageId' }, 400);
    }
    const eventType = hasCandidatureId ? 'candidature' : 'message';
    const eventTable = hasCandidatureId ? 'candidatures' : 'contact_messages';
    const eventIdColumn = hasCandidatureId ? 'candidature_id' : 'contact_message_id';

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY');
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY');
    const vapidSubject = Deno.env.get('VAPID_SUBJECT');
    if (!supabaseUrl || !serviceRoleKey || !vapidPublicKey || !vapidPrivateKey || !vapidSubject) {
      console.error('Push notification function is missing required server configuration.');
      return jsonResponse({ error: 'Push notification service is not configured' }, 500);
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: event, error: eventError } = await supabase
      .from(eventTable)
      .select('id,created_at')
      .eq('id', id)
      .maybeSingle();
    if (eventError) throw eventError;
    if (!event) return jsonResponse({ error: `${eventType} not found` }, 404);
    if (Date.now() - new Date(event.created_at).getTime() > 15 * 60 * 1000) {
      return jsonResponse({ error: `${eventType} is too old for a push notification` }, 410);
    }

    const { data: subscriptions, error: subscriptionsError } = await supabase
      .from('push_subscriptions')
      .select('id,endpoint,p256dh,auth');
    if (subscriptionsError) throw subscriptionsError;
    if (!subscriptions.length) {
      return jsonResponse({ sent: 0, failed: 0, subscriptions: 0 });
    }

    const { error: claimError } = await supabase
      .from('push_notification_events')
      .insert({ [eventIdColumn]: id });
    if (claimError?.code === '23505') return jsonResponse({ sent: 0, failed: 0, duplicate: true });
    if (claimError) throw claimError;

    webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
    const payload = JSON.stringify({
      title: eventType === 'candidature' ? 'Nouvelle candidature' : 'Nouveau message',
      body: eventType === 'candidature'
        ? 'Une nouvelle candidature a ete recue.'
        : 'Un nouveau message a ete recu.',
      data: { url: `/admin?tab=${eventType === 'candidature' ? 'candidatures' : 'messages'}` },
    });

    const deliveries = await Promise.all(subscriptions.map(async (subscription) => {
      try {
        await webpush.sendNotification({
          endpoint: subscription.endpoint,
          keys: {
            p256dh: toBase64Url(subscription.p256dh),
            auth: toBase64Url(subscription.auth),
          },
        }, payload);
        return true;
      } catch (error) {
        const statusCode = typeof error === 'object' && error !== null && 'statusCode' in error
          ? error.statusCode
          : null;
        if (statusCode === 404 || statusCode === 410) {
          const { error: deleteError } = await supabase
            .from('push_subscriptions')
            .delete()
            .eq('id', subscription.id);
          if (deleteError) console.error('Unable to remove expired push subscription:', deleteError);
        } else {
          console.error('Push delivery failed:', error);
        }
        return false;
      }
    }));

    const sent = deliveries.filter(Boolean).length;
    return jsonResponse({ sent, failed: deliveries.length - sent, subscriptions: deliveries.length });
  } catch (error) {
    console.error('Push notification request failed:', error);
    return jsonResponse({ error: 'Unable to send push notification' }, 500);
  }
});
