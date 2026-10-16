-- Create candidatures table for job applications
create table if not exists public.candidatures (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  profile text,
  cv_url text,
  cv_file_name text,
  created_at timestamptz default timezone('utc'::text, now())
);

alter table public.candidatures enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'candidatures'
      and policyname = 'Allow public insert access'
  ) then
    create policy "Allow public insert access" on public.candidatures
      for insert with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'candidatures'
      and policyname = 'Allow public select access'
  ) then
    create policy "Allow public select access" on public.candidatures
      for select using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'candidatures'
      and policyname = 'Allow public update access'
  ) then
    create policy "Allow public update access" on public.candidatures
      for update using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'candidatures'
      and policyname = 'Allow public delete access'
  ) then
    create policy "Allow public delete access" on public.candidatures
      for delete using (true);
  end if;
end;
$$;

-- Create storage bucket for CV files
insert into storage.buckets (id, name, public)
values ('cvs', 'cvs', false)
on conflict (id) do nothing;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Allow public upload to cvs'
  ) then
    create policy "Allow public upload to cvs" on storage.objects
      for insert with check (bucket_id = 'cvs');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Allow public read from cvs'
  ) then
    create policy "Allow public read from cvs" on storage.objects
      for select using (bucket_id = 'cvs');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Allow public delete from cvs'
  ) then
    create policy "Allow public delete from cvs" on storage.objects
      for delete using (bucket_id = 'cvs');
  end if;
end;
$$;
