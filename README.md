# 恋フェス マッチングアプリ（Phase 1 MVP）

株式会社FUSHIME / 恋フェスジャパンのイベント連動型マッチングアプリ。
2026年6月の「恋フェスVol.5」に向けた最小機能MVP。

## 機能スコープ（Phase 1）

- 会員登録・ログイン（Supabase Auth、20歳以上同意）
- プロフィール入力（写真1枚・希望タイプ6択）
- 同イベント参加者の異性一覧閲覧
- ★お気に入り（相互で「気になる！」表示）
- イベントQRコード発行・読み取り（自動チェックイン）
- PWA化（ホーム画面追加）

## 技術スタック

- Next.js 14 (App Router) + TypeScript
- Supabase（Auth / Database / Storage）
- Tailwind CSS
- next-pwa
- qrcode.react

## セットアップ手順

### 1. 依存関係インストール

```bash
cd koifes-app
npm install
```

### 2. Supabaseプロジェクト準備

1. [Supabase](https://supabase.com) で新規プロジェクト作成（無料プラン）
2. SQL Editor で `database.sql` を全文貼り付けて実行
3. Storage で新規バケット `avatars` を作成（Public ON）
4. Storage > Policies で以下を設定：
   - **SELECT policy**: `bucket_id = 'avatars'` / `to: authenticated, anon`
   - **INSERT policy**: `(bucket_id = 'avatars') AND (auth.uid()::text = (storage.foldername(name))[1])` / `to: authenticated`
5. Authentication > Providers > Email を有効化。**「Confirm email」はOFF推奨**（MVP簡略化）

### 3. 環境変数設定

`.env.local.example` を `.env.local` にコピーし、Supabase から値を取得して埋める：

```bash
cp .env.local.example .env.local
```

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase > Settings > API > Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 同 > anon/public key
- `SUPABASE_SERVICE_ROLE_KEY`: 同 > service_role key（秘密！）
- `NEXT_PUBLIC_APP_URL`: 開発中は `http://localhost:3000`、本番は Vercel URL

### 4. ローカル起動

```bash
npm run dev
```

→ [http://localhost:3000](http://localhost:3000)

### 5. 管理者ユーザー設定

1. 普通に `/register` から登録
2. Supabase > Table Editor > users テーブルで該当行の `is_admin` を `true` に更新
3. `/admin` からイベントQRコードを発行可能に

### 6. PWAアイコン（本番前に差し替え）

`public/icon-192.png` と `public/icon-512.png` を実アイコンに置き換えてください。
現状はダミーです。[realfavicongenerator.net](https://realfavicongenerator.net/) などで生成推奨。

## Vercelデプロイ手順

1. GitHub に push
2. [Vercel](https://vercel.com) で Import Project → 該当リポジトリ選択
3. Environment Variables に `.env.local` の内容を登録
4. Deploy
5. `NEXT_PUBLIC_APP_URL` を Vercel URL に更新して再デプロイ

## 主要URL

| URL | 説明 |
|-----|------|
| `/` | LP |
| `/register` | 会員登録 |
| `/login` | ログイン |
| `/home` | 会員一覧 |
| `/profile/[id]` | プロフィール詳細 |
| `/mypage` | マイページ |
| `/mypage/edit` | プロフィール編集 |
| `/favorites` | お気に入り一覧 |
| `/event/[token]` | イベントQR着地 |
| `/admin` | 管理者ダッシュボード |
| `/admin/events` | 管理者イベントQR発行 |

## Vol.5 運用フロー

1. 山下さんが `/admin/events` で「恋フェスVol.5」を作成 → QRコード印刷
2. 会場入口にQR掲示
3. 参加者がスマホで読み取り → 自動チェックイン
4. 未登録者は登録画面へ、登録済はホーム画面へ
5. 同イベント参加者のみカード一覧で閲覧可能
6. 気になる人に★タップ → 両想いで通知

## Phase 2予定

- Stripe月額課金（1,980円）
- チャット機能
- 恋の通知表（レーダーチャート）
- プッシュ通知
