-- ============================================
-- 恋フェス マッチングアプリ Phase 1 スキーマ
-- Supabase SQL Editorで実行してください
-- ============================================

-- 拡張（UUID生成用）
create extension if not exists "uuid-ossp";

-- ============================================
-- users テーブル（プロフィール）
-- auth.users と 1:1 で紐づく
-- ============================================
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  name text not null,
  gender text check (gender in ('male', 'female')) not null,
  birthdate date not null,
  age integer not null,
  prefecture text not null,
  bio text default '',
  photo_url text,
  hope_type text check (hope_type in ('hispec', 'value', 'comfort', 'active', 'family', 'growth')) not null,
  is_active boolean default true,
  is_admin boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- events テーブル（恋フェスイベント）
-- ============================================
create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  event_date date not null,
  qr_token text unique not null,
  created_at timestamptz default now()
);

-- ============================================
-- event_attendees テーブル（参加者記録）
-- ============================================
create table if not exists public.event_attendees (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  event_id uuid not null references public.events(id) on delete cascade,
  checked_in_at timestamptz default now(),
  unique(user_id, event_id)
);

-- ============================================
-- favorites テーブル（★お気に入り）
-- ============================================
create table if not exists public.favorites (
  id uuid primary key default uuid_generate_v4(),
  from_user_id uuid not null references public.users(id) on delete cascade,
  to_user_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(from_user_id, to_user_id),
  check (from_user_id <> to_user_id)
);

-- ============================================
-- インデックス
-- ============================================
create index if not exists idx_users_gender on public.users(gender);
create index if not exists idx_events_qr_token on public.events(qr_token);
create index if not exists idx_event_attendees_event on public.event_attendees(event_id);
create index if not exists idx_event_attendees_user on public.event_attendees(user_id);
create index if not exists idx_favorites_from on public.favorites(from_user_id);
create index if not exists idx_favorites_to on public.favorites(to_user_id);

-- ============================================
-- RLS (Row Level Security)
-- ============================================
alter table public.users enable row level security;
alter table public.events enable row level security;
alter table public.event_attendees enable row level security;
alter table public.favorites enable row level security;

-- users ポリシー
drop policy if exists "認証済ユーザは全員のプロフィールを閲覧可" on public.users;
create policy "認証済ユーザは全員のプロフィールを閲覧可"
  on public.users for select
  to authenticated
  using (is_active = true);

drop policy if exists "本人のみ自プロフィールをINSERT" on public.users;
create policy "本人のみ自プロフィールをINSERT"
  on public.users for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "本人のみ自プロフィールを更新可" on public.users;
create policy "本人のみ自プロフィールを更新可"
  on public.users for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- events ポリシー
drop policy if exists "認証済ユーザはイベント閲覧可" on public.events;
create policy "認証済ユーザはイベント閲覧可"
  on public.events for select
  to authenticated
  using (true);

drop policy if exists "管理者のみイベント作成可" on public.events;
create policy "管理者のみイベント作成可"
  on public.events for insert
  to authenticated
  with check (
    exists (select 1 from public.users where id = auth.uid() and is_admin = true)
  );

-- event_attendees ポリシー
drop policy if exists "認証済ユーザは参加記録閲覧可" on public.event_attendees;
create policy "認証済ユーザは参加記録閲覧可"
  on public.event_attendees for select
  to authenticated
  using (true);

drop policy if exists "本人のみチェックイン可" on public.event_attendees;
create policy "本人のみチェックイン可"
  on public.event_attendees for insert
  to authenticated
  with check (auth.uid() = user_id);

-- favorites ポリシー
drop policy if exists "自分が関わるお気に入りのみ閲覧可" on public.favorites;
create policy "自分が関わるお気に入りのみ閲覧可"
  on public.favorites for select
  to authenticated
  using (auth.uid() = from_user_id or auth.uid() = to_user_id);

drop policy if exists "本人のみ★付け可" on public.favorites;
create policy "本人のみ★付け可"
  on public.favorites for insert
  to authenticated
  with check (auth.uid() = from_user_id);

drop policy if exists "本人のみ★解除可" on public.favorites;
create policy "本人のみ★解除可"
  on public.favorites for delete
  to authenticated
  using (auth.uid() = from_user_id);

-- ============================================
-- Storage: プロフィール写真用バケット
-- 別途 Supabase Dashboard の Storage で作成:
--   1. Bucket名: "avatars"
--   2. Public: true
--   3. 以下のポリシーをStorage > Policies で設定
-- ============================================
-- Storage policies（Supabase Dashboardで手動設定）:
--
-- SELECT: すべての認証済ユーザが閲覧可
--   (auth.role() = 'authenticated')
--
-- INSERT: 認証済ユーザが自分のフォルダ配下のみアップロード可
--   ((bucket_id = 'avatars') AND (auth.uid()::text = (storage.foldername(name))[1]))
--
-- UPDATE / DELETE: 同上

-- ============================================
-- 便利関数：相互お気に入り判定
-- ============================================
create or replace function public.is_mutual_favorite(user_a uuid, user_b uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.favorites
    where from_user_id = user_a and to_user_id = user_b
  ) and exists (
    select 1 from public.favorites
    where from_user_id = user_b and to_user_id = user_a
  );
$$;
