import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  FileBarChart2,
  Gem,
  Sparkles,
  ShieldCheck,
  Pencil,
  User as UserIcon,
  BookOpen,
  Ban,
  Brain,
  Store,
  HeartHandshake,
  Scale,
  IdCard,
  Ticket,
  Check,
  Camera,
  Gift,
  Bell,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HOPE_TYPE_LABEL } from '@/lib/constants';
import type { UserProfile } from '@/lib/types';
import { DEMO_MODE, DEMO_ME, DEMO_USER_STATE } from '@/lib/demo';
import { SponsorSlot } from '@/components/SponsorSlot';

export const dynamic = 'force-dynamic';

export default async function MyPage() {
  let profile: UserProfile;

  if (DEMO_MODE) {
    profile = DEMO_ME;
  } else {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');
    const { data: row } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .maybeSingle<UserProfile>();
    if (!row) redirect('/register');
    profile = row;
  }

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <section className="flex items-start gap-6">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted">
              {profile.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.photo_url} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <UserIcon className="h-8 w-8" strokeWidth={1.4} aria-hidden />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2 pt-1">
              <div className="flex items-baseline gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">{profile.name}</h1>
                <span className="font-mont text-base text-muted-foreground">{profile.age}</span>
              </div>
              <p className="text-sm text-muted-foreground">{profile.prefecture}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="soft">{HOPE_TYPE_LABEL[profile.hope_type]}</Badge>
                {DEMO_USER_STATE.verified && (
                  <Badge variant="outline" className="gap-1">
                    <ShieldCheck className="h-3 w-3" aria-hidden /> 確認済
                  </Badge>
                )}
              </div>
            </div>
          </section>

          {profile.bio && (
            <p className="mt-6 whitespace-pre-wrap border-t border-border pt-6 text-sm leading-relaxed text-foreground">
              {profile.bio}
            </p>
          )}

          {/* ============= プロフィール編集 ============= */}
          <Link href="/mypage/edit" className="mt-6 block">
            <Button fullWidth variant="outline" size="lg" className="justify-center gap-2">
              <Pencil className="h-4 w-4" aria-hidden />
              プロフィールを編集
            </Button>
          </Link>

          {/* ============= ステータス行（会員タイプ・気になる+） ============= */}
          <section className="mt-6 grid grid-cols-2 gap-2 rounded-2xl border border-border bg-card p-4">
            <StatusCell
              label="会員タイプ"
              value={DEMO_USER_STATE.premium ? 'プレミアム' : '無料会員'}
              actionLabel="変更"
              href="/premium"
              Icon={IdCard}
            />
            <StatusCell
              label="気になる+"
              value={'0'}
              actionLabel="確認"
              href="/home"
              Icon={Sparkles}
            />
          </section>

          {/* ============= 私の通知表（大きく目立つ・点滅ボタン） ============= */}
          <div className="relative mt-6">
            <span
              className="absolute -inset-0.5 animate-pulse rounded-2xl bg-rose/55 blur-md"
              aria-hidden
            />
            <Link
              href="/tsuchihyo"
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border-2 border-foreground bg-foreground p-5 text-background transition-opacity hover:opacity-95"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background/15">
                <FileBarChart2 className="h-6 w-6" strokeWidth={1.8} aria-hidden />
              </span>
              <div className="flex-1">
                <p className="text-base font-bold leading-snug">私の通知表を見る</p>
                <p className="mt-0.5 text-[11px] opacity-80">
                  イベントでのあなたの印象・順位・改善ポイント
                </p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>

          {/* ============= クイックアクセス ============= */}
          <section className="mt-3">
            <div className="grid grid-cols-2 gap-2">
              <QuickIcon href="/events" Icon={Ticket} label="参加チケット" />
              <QuickIcon href="/advisor" Icon={HeartHandshake} label="アドバイザーに相談" />
            </div>
          </section>

          {/* ============= 認証カード横スクロール（年齢確認は本人確認に統合） ============= */}
          <section className="mt-8 -mx-6">
            <div className="flex gap-3 overflow-x-auto px-6 pb-2">
              <VerificationCard
                progress={profileCompletionPct(profile)}
                label="プロフィールを入力"
                done={false}
              />
              <VerificationCard
                Icon={IdCard}
                label="本人確認・年齢確認"
                done={DEMO_USER_STATE.verifications.identity?.status === 'verified'}
              />
              <VerificationCard
                Icon={ShieldCheck}
                label="独身証明"
                done={DEMO_USER_STATE.verifications.single?.status === 'verified'}
              />
            </div>
          </section>

          {/* ============= プレミアムバナー + 比較表 ============= */}
          {!DEMO_USER_STATE.premium && (
            <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
              <Link
                href="/premium"
                className="block relative bg-gradient-to-r from-foreground to-foreground/85 p-6 text-background"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] tracking-[0.2em] opacity-70">
                    プレミアムプラン
                  </span>
                  <p className="text-xl font-semibold leading-tight">
                    93%のユーザーが、<br />実際に出会えています。
                  </p>
                  <p className="mt-1 text-[11px] opacity-80">
                    351人のリアル婚活データから、あなたに最適なマッチを。
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-rose px-3 py-1 text-[10px] font-medium text-rose-foreground">
                  <Sparkles className="h-2.5 w-2.5" aria-hidden />
                  プレミアムのご案内
                </span>
              </Link>

              <div className="px-5 py-5">
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-medium pb-3 border-b border-border">
                  <span className="text-left text-muted-foreground">使える機能</span>
                  <span className="text-muted-foreground">無料</span>
                  <span className="text-rose">プレミアム</span>
                </div>
                <ComparisonRow label="メッセージ" free="3往復まで" premium="無制限" />
                <ComparisonRow label="1日のスワイプ" free="3人" premium="無制限" />
                <ComparisonRow label="既読チェック" free="—" premium />
                <ComparisonRow label="優先表示" free="—" premium />
                <ComparisonRow label="通知表 読み放題" free="—" premium last />
                <Link
                  href="/premium"
                  className="mt-4 flex items-center justify-center gap-1 text-sm font-semibold text-foreground"
                >
                  詳しくみる
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </section>
          )}

          {!DEMO_USER_STATE.premium && (
            <Link
              href="/premium"
              className="group mt-3 block rounded-2xl border border-border bg-card p-6 transition-all hover:border-foreground/30"
            >
              <div className="flex items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] tracking-[0.2em] text-muted-foreground">
                    プレミアム
                  </span>
                  <p className="text-base font-semibold">プレミアム会員になる</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    月額¥2,390で通知表読み放題・優先予約・メッセージ送信権
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden />
              </div>
            </Link>
          )}

          <section className="mt-12">
            <h2 className="mb-4 text-xs tracking-[0.15em] text-muted-foreground">
              サービス
            </h2>
            <div className="grid grid-cols-3 gap-2">
              <GridMenuItem href="/diagnostic" Icon={Brain} label="恋愛タイプ診断" sub="12問・5分" />
              <GridMenuItem href="/tsuchihyo" Icon={FileBarChart2} label="恋の通知表" sub="印象データ" />
              <GridMenuItem href="/photo-booking" Icon={Camera} label="プロ撮影予約" sub="¥6,000〜" />
              <GridMenuItem href="/referral" Icon={Gift} label="友達紹介" sub="美容券¥5,000〜" />
              <GridMenuItem href="/partners" Icon={Store} label="加盟店PG" sub="会員特典" />
              <GridMenuItem href="/premium" Icon={Gem} label="プレミアム" sub={DEMO_USER_STATE.premium ? '加入中' : '未加入'} highlight />
              <GridMenuItem href="/packages" Icon={HeartHandshake} label="個別コーチング" sub="2〜4ヶ月" />
              <GridMenuItem href="/magazine" Icon={BookOpen} label="マガジン" sub="徳島の婚活" />
              <GridMenuItem href="/news" Icon={Bell} label="お知らせ" sub="運営から" />
            </div>
          </section>

          <section className="mt-10">
            <h2 className="mb-4 text-xs tracking-[0.15em] text-muted-foreground">
              コミュニティ
            </h2>
            <div className="grid grid-cols-3 gap-2">
              <GridMenuItem href="/graduates" Icon={Sparkles} label="卒業生" sub="成婚報告" />
              <GridMenuItem href="/verify" Icon={ShieldCheck} label="本人確認" sub={DEMO_USER_STATE.verified ? '確認済' : '未確認'} />
            </div>
          </section>

          <section className="mt-10">
            <h2 className="mb-4 text-xs tracking-[0.15em] text-muted-foreground">
              安全・サポート
            </h2>
            <div className="grid grid-cols-3 gap-2">
              <GridMenuItem href="/safety/blocked" Icon={Ban} label="ブロック一覧" sub="管理" />
              <GridMenuItem href="/legal" Icon={Scale} label="法的情報" sub="届出・規約" />
            </div>
          </section>

          <SponsorSlot placement="mypage" max={2} className="mt-10" />

        </div>
      </main>
      <BottomNav />
    </>
  );
}

// 3列グリッド版（メニューを横に並べる用）
function GridMenuItem({
  href,
  Icon,
  label,
  sub,
  highlight = false,
}: {
  href: string;
  Icon: LucideIcon;
  label: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex aspect-square flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 text-center transition-all ${
        highlight
          ? 'border-rose bg-rose-50 hover:bg-rose-50/80'
          : 'border-border bg-card hover:border-foreground/30 hover:bg-muted/50'
      }`}
    >
      <Icon
        className={`h-5 w-5 ${highlight ? 'text-rose' : 'text-foreground'}`}
        strokeWidth={1.6}
        aria-hidden
      />
      <p className={`mt-1 text-[11px] font-semibold leading-tight ${highlight ? 'text-rose' : ''}`}>
        {label}
      </p>
      {sub && <p className="text-[9px] leading-tight text-muted-foreground">{sub}</p>}
    </Link>
  );
}

// ステータスセル（会員タイプ・ポイント・気になる+）
function StatusCell({
  label,
  value,
  actionLabel,
  href,
  Icon,
}: {
  label: string;
  value: string;
  actionLabel: string;
  href: string;
  Icon: LucideIcon;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <span className="text-[10px] text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1">
        <Icon className="h-3.5 w-3.5 text-foreground" strokeWidth={1.8} aria-hidden />
        <span className="text-xs font-semibold">{value}</span>
      </div>
      <Link
        href={href}
        className="rounded-full bg-muted px-3 py-0.5 text-[10px] text-rose hover:bg-muted/80"
      >
        {actionLabel}
      </Link>
    </div>
  );
}

// 8アイコングリッドの1セル
function QuickIcon({
  href,
  Icon,
  label,
}: {
  href: string;
  Icon: LucideIcon;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1.5 text-center transition-opacity hover:opacity-70"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center">
        <Icon className="h-7 w-7 text-foreground" strokeWidth={1.6} aria-hidden />
      </span>
      <span className="text-[10px] font-semibold leading-tight whitespace-nowrap">
        {label}
      </span>
    </Link>
  );
}

// 認証カード（横スクロール用・1セル幅）
function VerificationCard({
  Icon,
  label,
  progress,
  done,
}: {
  Icon?: LucideIcon;
  label: string;
  progress?: number;
  done: boolean;
}) {
  return (
    <div className="flex w-36 shrink-0 flex-col items-center gap-3 rounded-2xl border border-border bg-card px-4 py-4 text-center">
      {progress !== undefined ? (
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-base font-semibold text-rose">
            {progress}<span className="text-xs">%</span>
          </span>
          <div className="h-1 w-20 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-rose" style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : Icon && (
        <span
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
            done ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground'
          }`}
        >
          {done ? (
            <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
          ) : (
            <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden />
          )}
        </span>
      )}
      <p className="text-[11px] leading-tight font-medium">{label}</p>
    </div>
  );
}

// 比較表の1行
function ComparisonRow({
  label,
  free,
  premium = true,
  last = false,
}: {
  label: string;
  free: string;
  premium?: boolean | string;
  last?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-3 items-center gap-2 py-3 text-xs ${
        !last ? 'border-b border-border' : ''
      }`}
    >
      <span className="font-medium">{label}</span>
      <span className="text-center text-muted-foreground">{free}</span>
      <span className="text-center font-semibold text-rose">
        {typeof premium === 'string' ? premium : premium === true ? '◯' : '—'}
      </span>
    </div>
  );
}

// プロフィール完成率（簡易計算）
function profileCompletionPct(profile: UserProfile): number {
  const fields = [
    profile.bio,
    profile.occupation,
    profile.education,
    profile.income,
    profile.height,
    profile.smoking,
    profile.drinking,
    profile.hobbies?.length,
    profile.marriage_intent,
    profile.want_children,
    profile.mbti,
    profile.weekend_style,
    profile.body_type,
    profile.first_date_locations?.length,
    profile.spend_categories?.length,
    Object.keys(profile.hobby_details ?? {}).length,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

