-- Table des abonnements aux notifications push
create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz default timezone('utc'::text, now()),
  updated_at timestamptz default timezone('utc'::text, now())
);

alter table public.push_subscriptions enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'push_subscriptions'
      and policyname = 'Allow public insert access'
  ) then
    create policy "Allow public insert access" on public.push_subscriptions
      for insert with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'push_subscriptions'
      and policyname = 'Allow public select access'
  ) then
    create policy "Allow public select access" on public.push_subscriptions
      for select using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'push_subscriptions'
      and policyname = 'Allow public delete access'
  ) then
    create policy "Allow public delete access" on public.push_subscriptions
      for delete using (true);
  end if;
end;
$$;

-- Fonction pour envoyer une notification push à tous les abonnés
-- À appeler depuis une fonction serveur (Edge Function) avec la clé privée VAPID
-- Exemple d'appel via supabase-rpc ou edge function
