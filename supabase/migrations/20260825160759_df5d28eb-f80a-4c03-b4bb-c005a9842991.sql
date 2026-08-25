CREATE TABLE public.mission_briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  mission_types text[] NOT NULL DEFAULT '{}',
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  source text DEFAULT 'website'
);

GRANT INSERT, SELECT ON public.mission_briefs TO anon;
GRANT ALL ON public.mission_briefs TO service_role;

ALTER TABLE public.mission_briefs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a mission brief"
ON public.mission_briefs
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Service role can read mission briefs"
ON public.mission_briefs
FOR SELECT
TO service_role
USING (true);