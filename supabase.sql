create table if not exists posts (
  id bigint generated always as identity primary key,
  title text,
  image_url text not null,
  category text not null,
  notes text,
  caption text,
  status text not null default 'pending',
  scheduled_at timestamptz not null,
  published_at timestamptz,
  facebook_post_id text,
  created_at timestamptz not null default now()
);

create index if not exists idx_posts_status_scheduled_at
on posts(status, scheduled_at);
