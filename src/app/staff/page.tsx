import Link from 'next/link';
import {
  ChevronRight,
  ShieldAlert,
  Users,
  Calendar,
  TrendingUp,
  CreditCard,
  CalendarClock,
  Store,
  XCircle,
  AlertTriangle,
  ArrowUpRight,
  Mail,
  BarChart3,
  Heart,
  History,
  FileText,
  UserCog,
  CreditCard as CreditCardIcon,
  Megaphone,
  UserPlus,
  Flame,
  Activity,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import {
  DEMO_APPLICATIONS,
  DEMO_BOOKINGS,
  DEMO_CANCELLATIONS,
  DEMO_REPORTS,
  DEMO_MONTHLY_REVENUE,
  DEMO_EMAIL_LOGS,
  DEMO_CONCERNING_USERS,
  DEMO_PAYMENT_FAILURES,
  DEMO_COMPLIANCE_DOCS,
  DEMO_STAFF_USERS,
  DEMO_LEADS,
  DEMO_ACQUISITION_MONTHLY,
  DEMO_DAILY_SWIPE_ACTIVITY,
  DEMO_SWIPE_USER_STATS,
  DEMO_USER_SESSIONS,
  DEMO_USER_ENGAGEMENT,
  PLAN_LABEL,
  APPLICATION_STATUS_LABEL,
  BOOKING_TYPE_LABEL,
} from '@/lib/demo';

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const awaitingApplications = DEMO_APPLICATIONS.filter(
    (a) => a.status === 'awaiting_transfer' || a.status === 'awaiting_review'
  );
  const upcomingBookings = DEMO_BOOKINGS.filter((b) => b.status === 'upcoming')
    .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime())
    .slice(0, 5);
  const pendingCancellations = DEMO_CANCELLATIONS.filter((c) => c.status === 'pending');
  const pendingReports = DEMO_REPORTS.filter(
    (r) => r.status === 'pending' || r.status === 'reviewing'
  );
  const failedEmails = DEMO_EMAIL_LOGS.filter((m) => m.status === 'failed' || m.status === 'bounced');
  const concerningUsers = DEMO_CONCERNING_USERS;
  const pendingPaymentFailures = DEMO_PAYMENT_FAILURES.filter((p) => p.status === 'pending_action');
  const complianceWarnings = DEMO_COMPLIANCE_DOCS.filter((d) => d.status === 'expiring_soon' || d.status === 'expired');
  const staff2faMissing = DEMO_STAFF_USERS.filter((s) => s.active && !s.two_factor_enabled);
  const newLeads = DEMO_LEADS.filter((l) => l.status === 'new');
  const currentAcquisition = DEMO_ACQUISITION_MONTHLY[DEMO_ACQUISITION_MONTHLY.length - 1];
  const todaySwipe = DEMO_DAILY_SWIPE_ACTIVITY[DEMO_DAILY_SWIPE_ACTIVITY.length - 1];
  const swipeProfileConcerns = DEMO_SWIPE_USER_STATS.filter((u) => u.flag === 'profile_concern');
  const liveSessions = DEMO_USER_SESSIONS.filter((s) => s.active_now);
  const dormantUsers = DEMO_USER_ENGAGEMENT.filter((e) => e.retention_label === '休眠' || e.retention_label === '休眠候補');
  const currentMonth = DEMO_MONTHLY_REVENUE[DEMO_MONTHLY_REVENUE.length - 1];
  const prevMonth = DEMO_MONTHLY_REVENUE[DEMO_MONTHLY_REVENUE.length - 2];
  const revenueGrowth = currentMonth && prevMonth
    ? Math.round(((currentMonth.total - prevMonth.total) / prevMonth.total) * 100)
    : 0;
  const activeMembers = currentMonth.ume_count + currentMonth.take_count + currentMonth.matsu_count;

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          {/* ヘッダー */}
          <header className="flex flex-col gap-2 mb-10">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              MIRAIZ Admin
            </span>
            <h1 className="text-3xl font-semibold tracking-tight">バックオフィス</h1>
          </header>

          {/* アラート（未対応のもの） */}
          {(awaitingApplications.length > 0 ||
            pendingCancellations.length > 0 ||
            pendingReports.length > 0 ||
            failedEmails.length > 0 ||
            concerningUsers.length > 0 ||
            pendingPaymentFailures.length > 0 ||
            complianceWarnings.length > 0 ||
            staff2faMissing.length > 0 ||
            newLeads.length > 0 ||
            swipeProfileConcerns.length > 0) && (
            <section className="mb-8 rounded-2xl border-2 border-warn bg-warn-50 p-5">
              <div className="flex items-baseline gap-2 text-warn mb-3">
                <AlertTriangle className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                <p className="text-xs font-semibold">未対応タスク</p>
              </div>
              <ul className="flex flex-col gap-1.5 text-xs">
                {awaitingApplications.length > 0 && (
                  <li>
                    <Link href="/staff/applications" className="flex items-center gap-2 hover:underline">
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-warn px-1.5 font-mont text-[10px] text-warn-foreground">
                        {awaitingApplications.length}
                      </span>
                      件の申込が振込・確認待ち
                    </Link>
                  </li>
                )}
                {pendingCancellations.length > 0 && (
                  <li>
                    <Link href="/staff/cancellations" className="flex items-center gap-2 hover:underline">
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-warn px-1.5 font-mont text-[10px] text-warn-foreground">
                        {pendingCancellations.length}
                      </span>
                      件の解約・クーリングオフ申請
                    </Link>
                  </li>
                )}
                {pendingReports.length > 0 && (
                  <li>
                    <Link href="/staff/reports" className="flex items-center gap-2 hover:underline">
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-warn px-1.5 font-mont text-[10px] text-warn-foreground">
                        {pendingReports.length}
                      </span>
                      件の通報が未対応
                    </Link>
                  </li>
                )}
                {failedEmails.length > 0 && (
                  <li>
                    <Link href="/staff/emails" className="flex items-center gap-2 hover:underline">
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-warn px-1.5 font-mont text-[10px] text-warn-foreground">
                        {failedEmails.length}
                      </span>
                      件のメール配信失敗・バウンス
                    </Link>
                  </li>
                )}
                {concerningUsers.length > 0 && (
                  <li>
                    <Link href="/staff/evaluations" className="flex items-center gap-2 hover:underline">
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-warn px-1.5 font-mont text-[10px] text-warn-foreground">
                        {concerningUsers.length}
                      </span>
                      名の要注意ユーザー（複数の低評価）
                    </Link>
                  </li>
                )}
                {pendingPaymentFailures.length > 0 && (
                  <li>
                    <Link href="/staff/payment-failures" className="flex items-center gap-2 hover:underline">
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-warn px-1.5 font-mont text-[10px] text-warn-foreground">
                        {pendingPaymentFailures.length}
                      </span>
                      件のサブスク決済失敗（手動対応必要）
                    </Link>
                  </li>
                )}
                {complianceWarnings.length > 0 && (
                  <li>
                    <Link href="/staff/compliance" className="flex items-center gap-2 hover:underline">
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-warn px-1.5 font-mont text-[10px] text-warn-foreground">
                        {complianceWarnings.length}
                      </span>
                      件の法令書類が更新間近・期限切れ
                    </Link>
                  </li>
                )}
                {staff2faMissing.length > 0 && (
                  <li>
                    <Link href="/staff/permissions" className="flex items-center gap-2 hover:underline">
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-warn px-1.5 font-mont text-[10px] text-warn-foreground">
                        {staff2faMissing.length}
                      </span>
                      名のスタッフが2FA未設定
                    </Link>
                  </li>
                )}
                {newLeads.length > 0 && (
                  <li>
                    <Link href="/staff/leads" className="flex items-center gap-2 hover:underline">
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-warn px-1.5 font-mont text-[10px] text-warn-foreground">
                        {newLeads.length}
                      </span>
                      件の新規リードが未フォロー
                    </Link>
                  </li>
                )}
                {swipeProfileConcerns.length > 0 && (
                  <li>
                    <Link href="/staff/swipes" className="flex items-center gap-2 hover:underline">
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-warn px-1.5 font-mont text-[10px] text-warn-foreground">
                        {swipeProfileConcerns.length}
                      </span>
                      名のプロフィール改善候補（Like受信が極端に少ない）
                    </Link>
                  </li>
                )}
                {dormantUsers.length > 0 && (
                  <li>
                    <Link href="/staff/sessions" className="flex items-center gap-2 hover:underline">
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-warn px-1.5 font-mont text-[10px] text-warn-foreground">
                        {dormantUsers.length}
                      </span>
                      名の休眠・離脱予兆ユーザー
                    </Link>
                  </li>
                )}
              </ul>
            </section>
          )}

          {/* リアルタイム・現在オンライン */}
          {liveSessions.length > 0 && (
            <section className="mb-6 rounded-2xl border-2 border-success/40 bg-success/5 p-5">
              <div className="mb-3 flex items-baseline gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse" aria-hidden />
                <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-success">Live Now</h2>
                <Link href="/staff/sessions" className="ml-auto text-[10px] text-rose hover:underline">
                  詳細 →
                </Link>
              </div>
              <p className="mb-3 text-sm">
                <span className="font-mont text-2xl font-medium text-success">{liveSessions.length}</span>
                <span className="ml-1.5 text-muted-foreground">名がアプリを使用中</span>
                <span className="ml-3 text-[11px] text-muted-foreground">
                  平均滞在 {Math.round(liveSessions.reduce((s, x) => s + x.duration_minutes, 0) / liveSessions.length)}分・
                  スワイプ {liveSessions.reduce((s, x) => s + x.swipes_in_session, 0)}回
                </span>
              </p>
              <ul className="flex flex-wrap gap-2">
                {liveSessions.map((s) => (
                  <li key={s.id} className="rounded-full border border-success/30 bg-background px-3 py-1 text-[10px]">
                    <span className="font-medium">{s.user_name}</span>
                    <span className="text-muted-foreground ml-1.5">{PLAN_LABEL[s.plan]}</span>
                    <span className="text-muted-foreground ml-1.5">{s.duration_minutes}分</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* KPI */}
          <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <KpiCard
              label="今月売上"
              value={`¥${(currentMonth.total / 10000).toFixed(0)}万`}
              sub={revenueGrowth > 0 ? `+${revenueGrowth}% 前月比` : `${revenueGrowth}% 前月比`}
              positive={revenueGrowth >= 0}
              Icon={TrendingUp}
            />
            <KpiCard
              label="アクティブ会員"
              value={`${activeMembers}名`}
              sub={`梅${currentMonth.ume_count}・竹${currentMonth.take_count}・松${currentMonth.matsu_count}`}
              Icon={Users}
            />
            <KpiCard
              label="今月の松契約"
              value={`${currentMonth.matsu_count}名`}
              sub={`¥${(currentMonth.matsu_revenue / 10000).toFixed(0)}万`}
              Icon={CreditCard}
              highlight
            />
            <KpiCard
              label="今後の予約"
              value={`${upcomingBookings.length}件`}
              sub="Zoom・対面"
              Icon={CalendarClock}
            />
          </section>

          {/* 集客＆スワイプKPI */}
          <section className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            <KpiCard
              label="今月のリード"
              value={`${currentAcquisition.leads_total}件`}
              sub={`CV ${currentAcquisition.conversion_rate_pct}% / CAC ¥${currentAcquisition.cac.toLocaleString()}`}
              Icon={UserPlus}
            />
            <KpiCard
              label="新規リード未対応"
              value={`${newLeads.length}件`}
              sub="フォロー必要"
              Icon={Megaphone}
            />
            <KpiCard
              label="今日のスワイプ"
              value={todaySwipe.total_swipes.toLocaleString()}
              sub={`Like ${todaySwipe.total_likes} / マッチ ${todaySwipe.matches_formed}`}
              Icon={Flame}
            />
            <KpiCard
              label="今日のアクティブ"
              value={`${todaySwipe.active_users}名`}
              sub={`メッセージ ${todaySwipe.messages_sent}件`}
              Icon={Heart}
            />
          </section>

          {/* メイン管理メニュー */}
          <section className="mb-10">
            <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              Management
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <ManagementCard
                href="/staff/applications"
                title="申込管理"
                desc="松振込確認・サブスク状態・アクティベート"
                Icon={CreditCard}
                badge={awaitingApplications.length}
              />
              <ManagementCard
                href="/staff/members"
                title="会員管理"
                desc="プラン別会員・契約状況・行動履歴"
                Icon={Users}
              />
              <ManagementCard
                href="/staff/bookings"
                title="予約管理"
                desc="仲人Zoom・対面セッション・相談会"
                Icon={CalendarClock}
                badge={upcomingBookings.length}
              />
              <ManagementCard
                href="/staff/partner-usages"
                title="加盟店利用"
                desc="月1半額/無料の利用記録・支払い管理"
                Icon={Store}
              />
              <ManagementCard
                href="/staff/cancellations"
                title="解約・クーリングオフ"
                desc="解約申請・返金処理・残月分計算"
                Icon={XCircle}
                badge={pendingCancellations.length}
              />
              <ManagementCard
                href="/staff/reports"
                title="通報管理"
                desc="ユーザー通報・違反対応・退会処理"
                Icon={ShieldAlert}
                badge={pendingReports.length}
              />
              <ManagementCard
                href="/staff/billing"
                title="売上・収益"
                desc="月次収益・加盟店手数料・送客レポート"
                Icon={TrendingUp}
              />
              <ManagementCard
                href="/staff/events"
                title="イベント管理"
                desc="新規作成・QR発行・参加者管理"
                Icon={Calendar}
              />
              <ManagementCard
                href="/staff/event-analytics"
                title="イベント分析"
                desc="参加率・MID完了率・マッチ成立・通知表購入"
                Icon={BarChart3}
              />
              <ManagementCard
                href="/staff/evaluations"
                title="相互評価"
                desc="MID評価フィード・要注意ユーザー検出"
                Icon={Heart}
                badge={concerningUsers.length}
              />
              <ManagementCard
                href="/staff/emails"
                title="メール配信"
                desc="自動メール送信ログ・開封率・バウンス追跡"
                Icon={Mail}
                badge={failedEmails.length}
              />
              <ManagementCard
                href="/staff/payment-failures"
                title="決済失敗・督促"
                desc="Stripeサブスク失敗・カード更新督促・失客防止"
                Icon={CreditCardIcon}
                badge={pendingPaymentFailures.length}
              />
              <ManagementCard
                href="/staff/audit-log"
                title="操作ログ（監査）"
                desc="スタッフ操作記録・7年保管・税務調査対応"
                Icon={History}
              />
              <ManagementCard
                href="/staff/compliance"
                title="法令証跡ホルダー"
                desc="届出書・契約書面・本人確認・監査アーカイブ"
                Icon={FileText}
                badge={complianceWarnings.length}
              />
              <ManagementCard
                href="/staff/permissions"
                title="スタッフ・権限"
                desc="ロール管理・2FA・最終ログイン・招待"
                Icon={UserCog}
                badge={staff2faMissing.length}
              />
              <ManagementCard
                href="/staff/acquisition"
                title="集客分析"
                desc="月次推移・流入経路ファネル・イベント転換率・CAC"
                Icon={Megaphone}
              />
              <ManagementCard
                href="/staff/leads"
                title="リード管理"
                desc="簡易登録（イベント申込・LP）→本会員昇格"
                Icon={UserPlus}
                badge={newLeads.length}
              />
              <ManagementCard
                href="/staff/swipes"
                title="スワイプ・マッチ分析"
                desc="アプリ内行動・Like受信・人気度・離脱予兆"
                Icon={Flame}
                badge={swipeProfileConcerns.length}
              />
              <ManagementCard
                href="/staff/sessions"
                title="セッション・滞在時間"
                desc="現在オンライン・滞在分・ログイン履歴・休眠判定"
                Icon={Activity}
                badge={dormantUsers.length}
              />
            </div>
          </section>

          {/* 直近の予約（5件） */}
          <section className="mb-10">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                Upcoming Bookings
              </h2>
              <Link
                href="/staff/bookings"
                className="text-[11px] text-rose hover:underline"
              >
                すべて見る →
              </Link>
            </div>
            <ul className="overflow-hidden rounded-2xl border border-border bg-card">
              {upcomingBookings.map((b, i) => (
                <li
                  key={b.id}
                  className={`flex items-baseline gap-4 px-5 py-4 ${
                    i === upcomingBookings.length - 1 ? '' : 'border-b border-border'
                  }`}
                >
                  <span className="font-mont text-[10px] text-muted-foreground w-20 shrink-0">
                    {formatBookingDate(b.scheduled_at)}
                  </span>
                  <span className="text-sm font-medium flex-1 truncate">{b.user_name}</span>
                  <Badge variant="outline" className="text-[10px]">
                    {PLAN_LABEL[b.plan]}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground hidden md:inline">
                    {BOOKING_TYPE_LABEL[b.type]}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* 最新申込（5件） */}
          <section>
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                Recent Applications
              </h2>
              <Link
                href="/staff/applications"
                className="text-[11px] text-rose hover:underline"
              >
                すべて見る →
              </Link>
            </div>
            <ul className="overflow-hidden rounded-2xl border border-border bg-card">
              {DEMO_APPLICATIONS.slice(0, 5).map((a, i) => (
                <li
                  key={a.id}
                  className={`flex items-baseline gap-4 px-5 py-4 ${
                    i === 4 ? '' : 'border-b border-border'
                  }`}
                >
                  <span className="font-mont text-[10px] text-muted-foreground w-24 shrink-0">
                    {a.id}
                  </span>
                  <span className="text-sm font-medium flex-1 truncate">{a.user_name}</span>
                  <Badge
                    variant={a.plan === 'matsu' ? 'rose' : 'outline'}
                    className="text-[10px]"
                  >
                    {PLAN_LABEL[a.plan]}
                  </Badge>
                  <span className={`text-[10px] ${getStatusColor(a.status)}`}>
                    {APPLICATION_STATUS_LABEL[a.status]}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}

function KpiCard({
  label,
  value,
  sub,
  Icon,
  highlight,
  positive,
}: {
  label: string;
  value: string;
  sub: string;
  Icon: LucideIcon;
  highlight?: boolean;
  positive?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight ? 'border-rose bg-rose-50' : 'border-border bg-card'
      }`}
    >
      <div className="flex items-baseline justify-between mb-2">
        <Icon
          className={`h-3.5 w-3.5 ${highlight ? 'text-rose' : 'text-muted-foreground'}`}
          strokeWidth={1.8}
          aria-hidden
        />
        {positive !== undefined && (
          <ArrowUpRight
            className={`h-3 w-3 ${positive ? 'text-success' : 'text-warn'}`}
            aria-hidden
          />
        )}
      </div>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className={`mt-1 font-mont text-xl font-medium tracking-tight ${highlight ? 'text-rose' : ''}`}>
        {value}
      </p>
      <p className="mt-1 text-[10px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function ManagementCard({
  href,
  title,
  desc,
  Icon,
  badge,
}: {
  href: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/30 hover:bg-muted/30"
    >
      <Icon
        className="h-5 w-5 shrink-0 text-muted-foreground"
        strokeWidth={1.6}
        aria-hidden
      />
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-medium">{title}</p>
          {badge !== undefined && badge > 0 && (
            <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-warn px-1 font-mont text-[9px] text-warn-foreground">
              {badge}
            </span>
          )}
        </div>
        <p className="truncate text-[10px] text-muted-foreground">{desc}</p>
      </div>
      <ChevronRight
        className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'awaiting_transfer':
    case 'awaiting_review':
      return 'text-warn';
    case 'active':
      return 'text-success';
    case 'cooling_off':
      return 'text-rose';
    case 'cancelled':
    case 'rejected':
      return 'text-muted-foreground';
    default:
      return '';
  }
}

function formatBookingDate(iso: string): string {
  const d = new Date(iso);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hh = d.getHours().toString().padStart(2, '0');
  const mm = d.getMinutes().toString().padStart(2, '0');
  return `${month}/${day} ${hh}:${mm}`;
}
