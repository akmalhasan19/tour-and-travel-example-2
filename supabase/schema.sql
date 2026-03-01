-- NusaTrip MVP Supabase Schema
-- Note: This schema is prepared for future integration.
-- App code in current MVP still uses mock/localStorage, not Supabase client.

create extension if not exists "pgcrypto";

create table if not exists public.tours (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  location text not null,
  category text not null check (category in ('Open Trip', 'Private Trip')),
  duration_days int not null check (duration_days > 0),
  price_from bigint not null check (price_from >= 0),
  rating numeric(2,1) not null default 0 check (rating >= 0 and rating <= 5),
  tags text[] not null default '{}',
  badge text,
  highlights text[] not null default '{}',
  images text[] not null default '{}',
  includes text[] not null default '{}',
  excludes text[] not null default '{}',
  departure_schedule text[] not null default '{}',
  meeting_point text not null,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tour_itineraries (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid not null references public.tours(id) on delete cascade,
  day int not null check (day > 0),
  title text not null,
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid references public.tours(id) on delete set null,
  tour_slug text not null,
  tour_title text not null,
  name text not null,
  email text not null,
  phone text not null,
  date date not null,
  participants int not null check (participants > 0),
  note text not null default '',
  status text not null default 'New' check (status in ('New', 'Contacted', 'Done')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_tours_created_at on public.tours (created_at desc);
create index if not exists idx_tours_is_published on public.tours (is_published);
create index if not exists idx_tour_itineraries_tour_id on public.tour_itineraries (tour_id);
create index if not exists idx_bookings_status on public.bookings (status);
create index if not exists idx_bookings_created_at on public.bookings (created_at desc);
create index if not exists idx_contact_messages_created_at on public.contact_messages (created_at desc);

-- Optional trigger to keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_tours_updated_at on public.tours;
create trigger trg_tours_updated_at
before update on public.tours
for each row execute function public.set_updated_at();

drop trigger if exists trg_tour_itineraries_updated_at on public.tour_itineraries;
create trigger trg_tour_itineraries_updated_at
before update on public.tour_itineraries
for each row execute function public.set_updated_at();

drop trigger if exists trg_bookings_updated_at on public.bookings;
create trigger trg_bookings_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();

-- RLS notes (not enabled in MVP phase):
-- 1) public read for published tours only.
-- 2) admin/service role write access for tours, itineraries, bookings.
-- 3) contact_messages insert can be public with rate limiting.
