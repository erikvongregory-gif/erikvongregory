-- Run in Supabase SQL Editor

create table if not exists public.billing_subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan text null check (plan in ('start', 'growth', 'pro')),
  monthly_tokens integer not null default 0 check (monthly_tokens >= 0),
  used_tokens integer not null default 0 check (used_tokens >= 0),
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  subscription_status text not null default 'none',
  current_period_end timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists billing_subscriptions_customer_idx
  on public.billing_subscriptions (stripe_customer_id);

create index if not exists billing_subscriptions_subscription_idx
  on public.billing_subscriptions (stripe_subscription_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_billing_updated_at on public.billing_subscriptions;
create trigger set_billing_updated_at
before update on public.billing_subscriptions
for each row execute function public.set_updated_at();

alter table public.billing_subscriptions enable row level security;

drop policy if exists "Users can read own billing row" on public.billing_subscriptions;
create policy "Users can read own billing row"
on public.billing_subscriptions
for select
to authenticated
using (auth.uid() = user_id);

