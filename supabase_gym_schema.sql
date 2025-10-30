-- GYM schema: members, plans, subscriptions, checkins (minimal MVP)

create table if not exists public.members (
	id uuid primary key default gen_random_uuid(),
	full_name text not null,
	phone text not null,
	email text,
	gender text check (gender in ('male','female','other')),
	dob date,
	medical_notes text,
	avatar text,
	status text not null default 'active',
	created_at timestamptz not null default now()
);

create unique index if not exists members_phone_key on public.members (phone);
create index if not exists members_status_idx on public.members (status);

create table if not exists public.plans (
	id uuid primary key default gen_random_uuid(),
	name text not null,
	duration_days int not null check (duration_days > 0),
	price numeric(12,2) not null check (price >= 0),
	access_rules jsonb default '{}'::jsonb,
	freeze_allowed boolean not null default true,
	created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
	id uuid primary key default gen_random_uuid(),
	member_id uuid not null references public.members(id) on delete cascade,
	plan_id uuid not null references public.plans(id) on delete restrict,
	start_date date not null,
	end_date date not null,
	status text not null default 'active',
	auto_renew boolean not null default false,
	created_at timestamptz not null default now()
);

create index if not exists subscriptions_member_idx on public.subscriptions (member_id);
create index if not exists subscriptions_status_idx on public.subscriptions (status);

create table if not exists public.checkins (
	id uuid primary key default gen_random_uuid(),
	member_id uuid not null references public.members(id) on delete cascade,
	at timestamptz not null default now(),
	method text not null default 'qr'
);

create index if not exists checkins_member_at_idx on public.checkins (member_id, at desc);

-- Basic RLS (adjust as needed)
alter table public.members enable row level security;
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.checkins enable row level security;

-- Allow anon read, service role full access (example policies)
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'members' and policyname = 'members_read'
  ) then
    create policy members_read on public.members for select using (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'plans' and policyname = 'plans_read'
  ) then
    create policy plans_read on public.plans for select using (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'subscriptions' and policyname = 'subscriptions_read'
  ) then
    create policy subscriptions_read on public.subscriptions for select using (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'checkins' and policyname = 'checkins_read'
  ) then
    create policy checkins_read on public.checkins for select using (true);
  end if;
end $$;


