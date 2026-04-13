-- Run in Supabase SQL Editor

create table if not exists public.invites (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role text null check (role in ('viewer', 'editor', 'admin')),
  token_hash text not null unique,
  expires_at timestamptz not null,
  consumed_at timestamptz null,
  consumed_by_email text null,
  created_by uuid null references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists invites_email_idx on public.invites (email);
create index if not exists invites_expires_idx on public.invites (expires_at);

alter table public.invites enable row level security;

drop policy if exists "No direct invite access" on public.invites;
create policy "No direct invite access"
on public.invites
for all
to authenticated
using (false)
with check (false);
