create table auctions (
  id uuid primary key default uuid_generate_v4(),
  creator_id uuid not null references auth.users(id),
  title text not null,
  description text,
  starting_price numeric not null,
  duration_days int not null,
  image_urls text[] default '{}',
  status text default 'active',
  created_at timestamp with time zone default now()
);
