-- Brauerei-Marketing-Barometer 2026
-- Run via Supabase migration / SQL Editor if needed

create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  survey_id text not null default 'brauerei-marketing-barometer-2026',
  answers jsonb not null,
  email text null,
  company text null,
  wants_results boolean not null default false,
  wants_personal_analysis text null
    check (
      wants_personal_analysis is null
      or wants_personal_analysis = any (array['ja'::text, 'spaeter'::text, 'nein'::text])
    ),
  created_at timestamptz not null default now()
);

create index if not exists survey_responses_survey_id_idx
  on public.survey_responses (survey_id);

create index if not exists survey_responses_created_at_idx
  on public.survey_responses (created_at desc);

alter table public.survey_responses enable row level security;

-- Inserts only via service role (API). No public policies.
;