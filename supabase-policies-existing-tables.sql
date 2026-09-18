-- Policies for existing contact_messages table
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'contact_messages'
      AND policyname = 'Allow public read access'
  ) THEN
    CREATE POLICY "Allow public read access" ON public.contact_messages
      FOR SELECT USING (true);
  END IF;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'contact_messages'
      AND policyname = 'Allow public insert access'
  ) THEN
    CREATE POLICY "Allow public insert access" ON public.contact_messages
      FOR INSERT WITH CHECK (true);
  END IF;
END;
$$;

-- Policies for existing site_events table (kept for fallback, but not used in admin)
ALTER TABLE public.site_events ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'site_events'
      AND policyname = 'Allow public read access'
  ) THEN
    CREATE POLICY "Allow public read access" ON public.site_events
      FOR SELECT USING (true);
  END IF;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'site_events'
      AND policyname = 'Allow public insert access'
  ) THEN
    CREATE POLICY "Allow public insert access" ON public.site_events
      FOR INSERT WITH CHECK (true);
  END IF;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'site_events'
      AND policyname = 'Allow public update access'
  ) THEN
    CREATE POLICY "Allow public update access" ON public.site_events
      FOR UPDATE USING (true);
  END IF;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'site_events'
      AND policyname = 'Allow public delete access'
  ) THEN
    CREATE POLICY "Allow public delete access" ON public.site_events
      FOR DELETE USING (true);
  END IF;
END;
$$;

-- Policies for existing event_registrations table
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'event_registrations'
      AND policyname = 'Allow public read access'
  ) THEN
    CREATE POLICY "Allow public read access" ON public.event_registrations
      FOR SELECT USING (true);
  END IF;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'event_registrations'
      AND policyname = 'Allow public insert access'
  ) THEN
    CREATE POLICY "Allow public insert access" ON public.event_registrations
      FOR INSERT WITH CHECK (true);
  END IF;
END;
$$;
