ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS appointment_date timestamptz;

DO $$
DECLARE
  appointment_date_type text;
BEGIN
  SELECT data_type
    INTO appointment_date_type
    FROM information_schema.columns
   WHERE table_schema = 'public'
     AND table_name = 'contact_messages'
     AND column_name = 'appointment_date';

  IF appointment_date_type = 'date' THEN
    ALTER TABLE public.contact_messages
      ALTER COLUMN appointment_date TYPE timestamptz
      USING appointment_date::timestamp AT TIME ZONE 'UTC';
  END IF;
END;
$$;
