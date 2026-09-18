CREATE TABLE IF NOT EXISTS public.site_settings (
  id text PRIMARY KEY DEFAULT 'main',
  email text,
  phone text,
  whatsapp text,
  address text,
  updated_at timestamptz DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'site_settings'
      AND policyname = 'Allow public read access'
  ) THEN
    CREATE POLICY "Allow public read access" ON public.site_settings
      FOR SELECT USING (true);
  END IF;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'site_settings'
      AND policyname = 'Allow public write access'
  ) THEN
    CREATE POLICY "Allow public write access" ON public.site_settings
      FOR INSERT WITH CHECK (true);
  END IF;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'site_settings'
      AND policyname = 'Allow public update access'
  ) THEN
    CREATE POLICY "Allow public update access" ON public.site_settings
      FOR UPDATE USING (true);
  END IF;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'site_settings'
      AND policyname = 'Allow public delete access'
  ) THEN
    CREATE POLICY "Allow public delete access" ON public.site_settings
      FOR DELETE USING (true);
  END IF;
END;
$$;

INSERT INTO public.site_settings (id, email, phone, whatsapp, address)
VALUES (
  'main',
  'contact@enesense.com',
  '+22872483165',
  '+22879340002',
  'Colombs, France'
)
ON CONFLICT (id) DO NOTHING;
