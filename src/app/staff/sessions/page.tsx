'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Smartphone, Monitor, MapPin, Clock, MousePointer, MessageSquare, AlertTriangle, Search, Download, Flame, Snowflake } from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DEMO_USER_SESSIONS,
  DEMO_USER_ENGAGEMENT,
  DEVICE_TYPE_LABEL,
  PLAN_LABEL,
  type UserSession,
  type UserEngagement,
  type DeviceType,
} from '@/lib/demo';
import { exportRowsAsCsv, todayStamp } from '@/lib/csv';

type Tab = 'live' | 'history' | 'engagement';

export default function SessionsPage() {
  const [tab, setTab] = useState<Tab>('live');
  const [search, setSearch] = useState('');

  const liveSessions = useMemo(() => DEMO_USER_SESSIONS.filter((s) => s.active_now), []);
  const historySessions = useMemo(() => DEMO_USER_SESSIONS.filter((s) => !s.active_now), []);
  const engagement = DEMO_USER_ENGAGEMENT;

  const filteredHistory = historySessions.filter((s) =>
    !search || s.user_name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredEngagement = engagement.filter((e) =>
    !search || e.user_name.toLowerCase().includes(search.toLowerCase())
  );

  // 集計
  const liveTotal = liveSessions.length;
  const liveMales = liveSessions.filter((s) => DEMO_USER_ENGAGEMENT.find((e) => e.user_id === s.user_id)?.gender === 'male').length;
  const liveFemales = liveTotal - liveMales;
  const avgDwellNow = liveTotal > 0 ? Math.round(liveSessions.reduce((s, x) => s + x.duration_minutes, 0) / liveTotal) : 0;
  const totalSwipesNow = liveSessions.reduce((s, x) => s + x.swipes_in_session, 0);

  const lowRetention = engagement.filter((e) => e.retention_label === '休眠候補' || e.retention_label === '休眠');
  const highRetention = engagement.filter((e) => e.retention_label === '高頻度');

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <div className="flex items-baseline justify-between">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight">セッション・滞在時間</h1>
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => {
                if (tab === 'engagement') {
                  exportRowsAsCsv(
                    `engagement_${todayStamp()}.csv`,
                    filteredEngagement.map((e) => ({
                      user_id: e.user_id,
                      user_name: e.user_name,
                      gender: e.gender === 'male' ? '男性' : '女性',
                      plan: PLAN_LABEL[e.plan],
                      sessions_this_month: e.sessions_this_month,
                      total_minutes_this_month: e.total_minutes_this_month,
                      avg_minutes_per_session: e.avg_minutes_per_session,
                      days_active_this_month: e.days_active_this_month,
                      login_streak_days: e.login_streak_days,
                      last_login_at: e.last_login_at,
                      retention_label: e.retention_label,
                    })),
                    [
                      { key: 'user_id', label: 'ID' },
                      { key: 'user_name', label: '氏名' },
                      { key: 'gender', label: '性別' },
                      { key: 'plan', label: 'プラン' },
                      { key: 'sessions_this_month', label: '今月セッション数' },
                      { key: 'total_minutes_this_month', label: '合計滞在分' },
                      { key: 'avg_minutes_per_session', label: '平均滞在分' },
                      { key: 'days_active_this_month', label: 'アクティブ日数' },
                      { key: 'login_streak_days', label: '連続ログイン日数' },
                      { key: 'last_login_at', label: '最終ログイン' },
                      { key: 'retention_label', label: 'リテンション' },
                    ]
                  );
                } else {
                  const list = tab === 'live' ? liveSessions : filteredHistory;
                  exportRowsAsCsv(
                    `sessions_${tab}_${todayStamp()}.csv`,
                    list.map((s) => ({
                      id: s.id,
                      user_id: s.user_id,
                      user_name: s.user_name,
                      plan: PLAN_LABEL[s.plan],
                      started_at: s.started_at,
                      ended_at: s.ended_at ?? '',
                      duration_minutes: s.duration_minutes,
                      device: DEVICE_TYPE_LABEL[s.device],
                      ip_address: s.ip_address,
                      location: s.location_estimate,
                      pages_viewed: s.pages_viewed,
                      swipes: s.swipes_in_session,
                      messages: s.messages_sent_in_session,
                    })),
                    [
                      { key: 'id', label: 'セッションID' },
                      { key: 'user_id', label: 'ユーザーID' },
                      { key: 'user_name', label: '氏名' },
                      { key: 'plan', label: 'プラン' },
                      { key: 'started_at', label: '開始' },
                      { key: 'ended_at', label: '終了' },
                      { key: 'duration_minutes', label: '滞在分' },
                      { key: 'device', label: 'デバイス' },
                      { key: 'ip_address', label: 'IP' },
                      { key: 'location', label: '推定地域' },
                      { key: 'pages_viewed', label: '閲覧ページ数' },
                      { key: 'swipes', label: 'スワイプ数' },
                      { key: 'messages', label: 'メッセージ数' },
                    ]
                  );
                }
              }}
            >
              <Download className="h-3 w-3" aria-hidden />CSV出力
            </Button>
          </div>
          <p className="mb-8 text-xs text-muted-foreground">誰がいつログインしたか・何分滞在したか・現在アクティブなユーザー</p>

          {/* リアルタイムKPI */}
          <section className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-5">
            <LiveKpi label="現在オンライン" value={`${liveTotal}名`} icon={<Activity className="h-3.5 w-3.5 text-success animate-pulse" />} highlight />
            <LiveKpi label="男女比" value={`男${liveMales}・女${liveFemales}`} />
            <LiveKpi label="平均滞在" value={`${avgDwellNow}分`} icon={<Clock className="h-3.5 w-3.5" />} />
            <LiveKpi label="セッション内スワイプ" value={`${totalSwipesNow}`} />
            <LiveKpi label="高頻度ユーザー" value={`${highRetention.length}名`} icon={<Flame className="h-3.5 w-3.5 text-rose" />} />
          </section>

          {/* 休眠警告 */}
          {lowRetention.length > 0 && (
            <section className="mb-6 rounded-2xl border-2 border-warn bg-warn-50 p-5">
              <div className="flex items-baseline gap-2 mb-2">
                <AlertTriangle className="h-3.5 w-3.5 text-warn" strokeWidth={1.8} aria-hidden />
                <p className="text-xs font-semibold text-warn">離脱予兆・休眠ユーザー：{lowRetention.length}名</p>
              </div>
              <p className="text-[11px] leading-relaxed">
                30日以内のログインが極端に少ない有料会員。リアクティベーションメール・電話フォロー候補。
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {lowRetention.map((e) => (
                  <li key={e.user_id} className="rounded-lg border border-warn/40 bg-background px-3 py-1.5 text-[11px]">
                    <span className="font-medium">{e.user_name}</span>
                    <span className="text-muted-foreground ml-2">({PLAN_LABEL[e.plan]})</span>
                    <span className="text-muted-foreground ml-2">最終 {formatRelative(e.last_login_at)}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* タブ */}
          <div className="mb-4 flex gap-2">
            <Tab label={`現在アクティブ ${liveTotal}`} active={tab === 'live'} onClick={() => setTab('live')} highlight />
            <Tab label={`セッション履歴 ${historySessions.length}`} active={tab === 'history'} onClick={() => setTab('history')} />
            <Tab label={`月次エンゲージメント ${engagement.length}`} active={tab === 'engagement'} onClick={() => setTab('engagement')} />
          </div>

          {tab !== 'live' && (
            <div className="mb-6 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="名前で検索"
                className="w-full rounded-2xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          )}

          {tab === 'live' && (
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {liveSessions.map((s) => <SessionCard key={s.id} sess={s} live />)}
              {liveSessions.length === 0 && (
                <li className="col-span-full rounded-2xl border border-border bg-card px-5 py-8 text-center text-xs text-muted-foreground">
                  現在オンラインのユーザーはいません
                </li>
              )}
            </ul>
          )}

          {tab === 'history' && (
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {filteredHistory.map((s) => <SessionCard key={s.id} sess={s} />)}
            </ul>
          )}

          {tab === 'engagement' && (
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {filteredEngagement.map((e) => <EngagementCard key={e.user_id} eng={e} />)}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}

function SessionCard({ sess, live }: { sess: UserSession; live?: boolean }) {
  return (
    <li className={cn(
      'rounded-2xl border p-4',
      live ? 'border-success/40 bg-success/5' : 'border-border bg-card'
    )}>
      <div className="mb-2 flex flex-wrap items-baseline gap-2">
        {live && <span className="inline-block h-1.5 w-1.5 rounded-full bg-success animate-pulse" aria-hidden />}
        <span className="text-sm font-semibold">{sess.user_name}</span>
        <Badge variant={sess.plan === 'matsu' ? 'rose' : 'soft'} className="text-[10px]">{PLAN_LABEL[sess.plan]}</Badge>
        <span className="ml-auto font-mont text-[10px] text-muted-foreground">{formatTime(sess.started_at)}〜</span>
      </div>

      <div className="mb-2 flex items-baseline gap-1.5 text-[11px] text-muted-foreground">
        <DeviceIcon device={sess.device} />
        <span>{DEVICE_TYPE_LABEL[sess.device]}</span>
        <span>・</span>
        <MapPin className="h-2.5 w-2.5" aria-hidden />
        <span>{sess.location_estimate}</span>
      </div>

      <div className="mb-2 grid grid-cols-2 gap-2">
        <Mini label="滞在" value={`${sess.duration_minutes}分`} highlight={live} />
        <Mini label="ページ" value={`${sess.pages_viewed}`} />
        <Mini label="スワイプ" value={`${sess.swipes_in_session}`} icon={<MousePointer className="h-2.5 w-2.5" />} />
        <Mini label="メッセージ" value={`${sess.messages_sent_in_session}`} icon={<MessageSquare className="h-2.5 w-2.5" />} />
      </div>

      <p className="text-[9px] text-muted-foreground font-mont">
        {sess.user_id} ・ IP: {sess.ip_address}
      </p>
    </li>
  );
}

function EngagementCard({ eng }: { eng: UserEngagement }) {
  const isLow = eng.retention_label === '休眠' || eng.retention_label === '休眠候補';
  const isHigh = eng.retention_label === '高頻度';

  return (
    <li className={cn(
      'rounded-2xl border p-4',
      isLow ? 'border-warn bg-warn-50' :
      isHigh ? 'border-rose/40 bg-rose-50/30' :
      'border-border bg-card'
    )}>
      <div className="mb-3 flex flex-wrap items-baseline gap-2">
        <span className="text-sm font-semibold">{eng.user_name}</span>
        <span className="text-[10px] text-muted-foreground">{eng.gender === 'male' ? '男性' : '女性'}</span>
        <Badge variant={eng.plan === 'matsu' ? 'rose' : 'soft'} className="text-[10px]">{PLAN_LABEL[eng.plan]}</Badge>
        <span className={cn(
          'ml-auto inline-flex items-baseline gap-1 rounded-full px-2 py-0.5 text-[10px]',
          isLow ? 'bg-warn text-background' :
          isHigh ? 'bg-rose text-background' :
          'bg-muted'
        )}>
          {isHigh && <Flame className="h-2.5 w-2.5" aria-hidden />}
          {isLow && <Snowflake className="h-2.5 w-2.5" aria-hidden />}
          {eng.retention_label}
        </span>
      </div>

      <div className="mb-2 grid grid-cols-2 gap-2 md:grid-cols-4">
        <Mini label="今月セッション" value={`${eng.sessions_this_month}回`} />
        <Mini label="合計滞在" value={`${formatMinutes(eng.total_minutes_this_month)}`} highlight={isHigh} concern={isLow} />
        <Mini label="平均滞在/回" value={`${eng.avg_minutes_per_session}分`} />
        <Mini label="アクティブ日数" value={`${eng.days_active_this_month}日`} />
      </div>

      <div className="flex items-baseline justify-between text-[10px]">
        <p className="text-muted-foreground">
          連続ログイン {eng.login_streak_days}日
        </p>
        <p className="font-mont text-muted-foreground">
          最終 {formatRelative(eng.last_login_at)}
        </p>
      </div>
    </li>
  );
}

function DeviceIcon({ device }: { device: DeviceType }) {
  if (device === 'ios' || device === 'android') {
    return <Smartphone className="h-2.5 w-2.5" aria-hidden />;
  }
  return <Monitor className="h-2.5 w-2.5" aria-hidden />;
}

function LiveKpi({ label, value, icon, highlight }: { label: string; value: string; icon?: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={cn('rounded-2xl border p-4', highlight ? 'border-success/40 bg-success/5' : 'border-border bg-card')}>
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] text-muted-foreground">{label}</p>
        {icon}
      </div>
      <p className={cn('mt-1 font-mont text-xl font-medium', highlight && 'text-success')}>{value}</p>
    </div>
  );
}

function Mini({ label, value, icon, highlight, concern }: { label: string; value: string; icon?: React.ReactNode; highlight?: boolean; concern?: boolean }) {
  return (
    <div className={cn(
      'rounded-lg px-2.5 py-1.5',
      concern ? 'bg-warn-50 border border-warn/40' :
      highlight ? 'bg-rose-50/50' :
      'bg-muted/30'
    )}>
      <div className="flex items-baseline gap-1 text-[9px] text-muted-foreground">
        {icon}<span>{label}</span>
      </div>
      <p className={cn('font-mont mt-0.5 text-xs font-medium', concern && 'text-warn', highlight && !concern && 'text-rose')}>{value}</p>
    </div>
  );
}

function Tab({ label, active, onClick, highlight }: { label: string; active: boolean; onClick: () => void; highlight?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-1.5 text-[11px] font-medium transition-colors',
        active
          ? highlight ? 'border-success bg-success text-background' : 'border-foreground bg-foreground text-background'
          : 'border-border bg-background hover:bg-muted'
      )}
    >
      {label}
    </button>
  );
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
}

function formatMinutes(min: number): string {
  if (min < 60) return `${min}分`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}時間` : `${h}時間${m}分`;
}

function formatRelative(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  if (diffMin < 60) return `${diffMin}分前`;
  if (diffHr < 24) return `${diffHr}時間前`;
  if (diffDay < 7) return `${diffDay}日前`;
  return `${Math.floor(diffDay / 7)}週前`;
}
