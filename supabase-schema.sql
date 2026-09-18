create table if not exists public.site_settings (
  id text primary key default 'main',
  email text,
  phone text,
  whatsapp text,
  address text,
  updated_at timestamptz default timezone('utc'::text, now())
);

alter table public.site_settings enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'site_settings'
      and policyname = 'Allow public read access'
  ) then
    create policy "Allow public read access" on public.site_settings
      for select using (true);
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'site_settings'
      and policyname = 'Allow public write access'
  ) then
    create policy "Allow public write access" on public.site_settings
      for insert with check (true);
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'site_settings'
      and policyname = 'Allow public update access'
  ) then
    create policy "Allow public update access" on public.site_settings
      for update using (true);
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'site_settings'
      and policyname = 'Allow public delete access'
  ) then
    create policy "Allow public delete access" on public.site_settings
      for delete using (true);
  end if;
end;
$$;

insert into public.site_settings (id, email, phone, whatsapp, address)
values (
  'main',
  'contact@enesense.com',
  '+22872483165',
  '+22879340002',
  'Colombs, France'
)
on conflict (id) do nothing;
