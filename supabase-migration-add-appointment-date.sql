ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS appointment_date date;
