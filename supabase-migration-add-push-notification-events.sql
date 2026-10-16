create table if not exists public.push_notification_events (
  candidature_id uuid primary key references public.candidatures(id) on delete cascade,
  sent_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.push_notification_events enable row level security;

alter table public.push_notification_events
  add column if not exists contact_message_id uuid
  references public.contact_messages(id) on delete cascade;

create unique index if not exists push_notification_events_contact_message_id_key
  on public.push_notification_events(contact_message_id)
  where contact_message_id is not null;

drop policy if exists "Allow public select access" on public.push_subscriptions;
