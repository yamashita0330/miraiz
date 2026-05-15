'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, X as XIcon, Users, MessageSquare, TrendingUp, AlertTriangle, Sparkles, Search, Download } from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DEMO_SWIPE_USER_STATS,
  DEMO_DAILY_SWIPE_ACTIVITY,
  PLAN_LABEL,
  type SwipeUserStats,
} from '@/lib/demo';
import { exportRowsAsCsv, todayStamp } from '@/lib/csv';

type FlagFilter = 'all' | 'profile_concern' | 'low_engagement' | 'highly_popular';
type SortKey = 'swipes' | 'likes_received' | 'popularity' | 'match_rate' | 'last_active';

export default function SwipesPage() {
  const [flagFilter, setFlagFilter] = useState<FlagFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('swipes');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const list = DEMO_SWIPE_USER_STATS.filter((u) => {
      if (flagFilter !== 'all' && u.flag !== flagFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return u.user_name.toLowerCase().includes(q) || u.user_id.toLowerCase().includes(q);
      }
      return true;
    });
    return list.sort((a, b) => {
      switch (sortKey) {
        case 'swipes': return b.swipes_total - a.swipes_total;
        case 'likes_received': return b.likes_received - a.likes_received;
        case 'popularity': return b.popularity_pct - a.popularity_pct;
        case 'match_rate': return b.match_rate_pct - a.match_rate_pct;
        case 'last_active': return new Date(b.last_active_at).getTime() - new Date(a.last_active_at).getTime();
      }
    });
  }, [flagFilter, sortKey, search]);

  const today = DEMO_DAILY_SWIPE_ACTIVITY[DEMO_DAILY_SWIPE_ACTIVITY.length - 1];
  const yesterday = DEMO_DAILY_SWIPE_ACTIVITY[DEMO_DAILY_SWIPE_ACTIVITY.length - 2];
  const daySwipeMax = Math.max(...DEMO_DAILY_SWIPE_ACTIVITY.map((d) => d.total_swipes));

  const counts = {
    profile_concern: DEMO_SWIPE_USER_STATS.filter((u) => u.flag === 'profile_concern').length,
    low_engagement: DEMO_SWIPE_USER_STATS.filter((u) => u.flag === 'low_engagement').length,
    highly_popular: DEMO_SWIPE_USER_STATS.filter((u) => u.flag === 'highly_popular').length,
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <div className="flex items-baseline justify-between">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight">スワイプ・マッチ分析</h1>
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => {
                exportRowsAsCsv(
                  `swipes_${todayStamp()}.csv`,
                  filtered.map((u) => ({
                    user_id: u.user_id,
                    user_name: u.user_name,
                    gender: u.gender === 'male' ? '男性' : '女性',
                    age: u.age,
                    plan: PLAN_LABEL[u.plan],
                    swipes_total: u.swipes_total,
                    likes_given: u.likes_given,
                    likes_received: u.likes_received,
                    matches_count: u.matches_count,
                    like_rate_pct: u.like_rate_pct,
                    popularity_pct: u.popularity_pct,
                    match_rate_pct: u.match_rate_pct,
                    last_active_at: u.last_active_at,
                  })),
                  [
                    { key: 'user_id', label: 'ID' },
                    { key: 'user_name', label: '氏名' },
                    { key: 'gender', label: '性別' },
                    { key: 'age', label: '年齢' },
                    { key: 'plan', label: 'プラン' },
                    { key: 'swipes_total', label: '総スワイプ' },
                    { key: 'likes_given', label: 'Like送信' },
                    { key: 'likes_received', label: 'Like受信' },
                    { key: 'matches_count', label: 'マッチ' },
                    { key: 'like_rate_pct', label: 'Like率(%)' },
                    { key: 'popularity_pct', label: '人気度(%)' },
                    { key: 'match_rate_pct', label: 'マッチ率(%)' },
                    { key: 'last_active_at', label: '最終活動' },
                  ]
                );
              }}
            >
              <Download className="h-3 w-3" aria-hidden />CSV出力
            </Button>
          </div>
          <p className="mb-8 text-xs text-muted-foreground">アプリ内スワイプ・Like・マッチ・メッセージの行動分析</p>

          {/* 今日のアクティビティ */}
          <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5">
            <DailyKpi
              label="アクティブ"
              value={`${today.active_users}名`}
              delta={Math.round(((today.active_users - yesterday.active_users) / yesterday.active_users) * 100)}
              icon={<Users className="h-3.5 w-3.5" />}
            />
            <DailyKpi
              label="スワイプ"
              value={today.total_swipes.toLocaleString()}
              delta={Math.round(((today.total_swipes - yesterday.total_swipes) / yesterday.total_swipes) * 100)}
            />
            <DailyKpi
              label="Like"
              value={today.total_likes.toLocaleString()}
              delta={Math.round(((today.total_likes - yesterday.total_likes) / yesterday.total_likes) * 100)}
              icon={<Heart className="h-3.5 w-3.5 text-rose" />}
            />
            <DailyKpi
              label="マッチ"
              value={`${today.matches_formed}件`}
              delta={Math.round(((today.matches_formed - yesterday.matches_formed) / yesterday.matches_formed) * 100)}
              highlight
            />
            <DailyKpi
              label="メッセージ"
              value={`${today.messages_sent}件`}
              delta={Math.round(((today.messages_sent - yesterday.messages_sent) / yesterday.messages_sent) * 100)}
              icon={<MessageSquare className="h-3.5 w-3.5" />}
            />
          </section>

          {/* 日次トレンドチャート */}
          <section className="mb-8 rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">7日間のアクティビティ</h2>
            <div className="flex items-end gap-2 h-40">
              {DEMO_DAILY_SWIPE_ACTIVITY.map((d) => {
                const swipePct = (d.total_swipes / daySwipeMax) * 100;
                const isToday = d === today;
                return (
                  <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
                    <span className="font-mont text-[9px] text-muted-foreground">{d.matches_formed}</span>
                    <div className="relative w-full flex-1 flex items-end">
                      <div className={cn('w-full rounded-t-md transition-all', isToday ? 'bg-rose' : 'bg-foreground/20')} style={{ height: `${swipePct}%` }} />
                    </div>
                    <span className="text-[9px] text-muted-foreground">{d.date.slice(5)}</span>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground text-right">バー高さ: スワイプ数 / バー上数値: マッチ成立数</p>
          </section>

          {/* 警告サマリー */}
          {(counts.profile_concern > 0 || counts.low_engagement > 0) && (
            <section className="mb-6 rounded-2xl border-2 border-warn bg-warn-50 p-5">
              <div className="flex items-baseline gap-2 mb-2">
                <AlertTriangle className="h-3.5 w-3.5 text-warn" strokeWidth={1.8} aria-hidden />
                <p className="text-xs font-semibold text-warn">プロフィール改善・離脱リスク</p>
              </div>
              <ul className="space-y-1 text-[11px]">
                {counts.profile_concern > 0 && (
                  <li>{counts.profile_concern}名：スワイプ多いがLike受信が極端に少ない（プロフィール写真・自己紹介の見直し提案候補）</li>
                )}
                {counts.low_engagement > 0 && (
                  <li>{counts.low_engagement}名：アプリ起動が30日以上前（離脱予兆・電話フォロー候補）</li>
                )}
              </ul>
            </section>
          )}

          {/* フラグフィルタ */}
          <div className="mb-4 flex flex-wrap gap-2">
            <Chip label="全会員" active={flagFilter === 'all'} onClick={() => setFlagFilter('all')} />
            <Chip label={`要改善 ${counts.profile_concern}`} active={flagFilter === 'profile_concern'} onClick={() => setFlagFilter('profile_concern')} warn />
            <Chip label={`離脱予兆 ${counts.low_engagement}`} active={flagFilter === 'low_engagement'} onClick={() => setFlagFilter('low_engagement')} warn />
            <Chip label={`人気 ${counts.highly_popular}`} active={flagFilter === 'highly_popular'} onClick={() => setFlagFilter('highly_popular')} />
          </div>

          {/* ソート */}
          <div className="mb-4 flex flex-wrap items-baseline gap-2 text-[10px]">
            <span className="text-muted-foreground">並び替え：</span>
            {([
              ['swipes', 'スワイプ数'],
              ['likes_received', 'Like受信'],
              ['popularity', '人気度'],
              ['match_rate', 'マッチ率'],
              ['last_active', '最終活動'],
            ] as [SortKey, string][]).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setSortKey(k)}
                className={cn(
                  'rounded-full border px-2.5 py-1',
                  sortKey === k ? 'border-foreground bg-foreground text-background' : 'border-border bg-background hover:bg-muted'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 検索 */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="名前・IDで検索"
              className="w-full rounded-2xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* ユーザー一覧 */}
          <ul className="flex flex-col gap-3">
            {filtered.length === 0 && (
              <li className="rounded-2xl border border-border bg-card px-5 py-8 text-center text-xs text-muted-foreground">
                該当するユーザーはいません
              </li>
            )}
            {filtered.map((u) => <UserCard key={u.user_id} u={u} />)}
          </ul>
        </div>
      </main>
    </>
  );
}

function UserCard({ u }: { u: SwipeUserStats }) {
  const isConcern = u.flag === 'profile_concern';
  const isLowEng = u.flag === 'low_engagement';
  const isPopular = u.flag === 'highly_popular';

  return (
    <li className={cn(
      'rounded-2xl border p-5',
      isConcern ? 'border-warn bg-warn-50/50' :
      isLowEng ? 'border-warn/40 bg-warn-50/30' :
      isPopular ? 'border-rose/40 bg-rose-50/30' :
      'border-border bg-card'
    )}>
      <div className="mb-3 flex flex-wrap items-baseline gap-3">
        <span className="font-mont text-[10px] text-muted-foreground">{u.user_id}</span>
        <span className="text-base font-semibold">{u.user_name}</span>
        <span className="text-[10px] text-muted-foreground">{u.gender === 'male' ? '男性' : '女性'}・{u.age}歳</span>
        <Badge variant={u.plan === 'matsu' ? 'rose' : 'soft'} className="text-[10px]">{PLAN_LABEL[u.plan]}</Badge>
        {isConcern && (
          <Badge variant="outline" className="text-[10px] text-warn border-warn gap-1">
            <AlertTriangle className="h-2.5 w-2.5" aria-hidden />要改善
          </Badge>
        )}
        {isLowEng && (
          <Badge variant="outline" className="text-[10px] text-warn border-warn">離脱予兆</Badge>
        )}
        {isPopular && (
          <Badge variant="rose" className="text-[10px] gap-1">
            <Sparkles className="h-2.5 w-2.5" aria-hidden />人気
          </Badge>
        )}
        <span className="ml-auto font-mont text-[10px] text-muted-foreground">最終活動 {formatRelative(u.last_active_at)}</span>
      </div>

      <div className="mb-3 grid grid-cols-3 gap-2 md:grid-cols-6">
        <Mini label="総スワイプ" value={u.swipes_total.toLocaleString()} />
        <Mini label="Like送信" value={`${u.likes_given}`} sub={`${u.like_rate_pct}%`} />
        <Mini label="Like受信" value={`${u.likes_received}`} highlight={isPopular} concern={isConcern} />
        <Mini label="マッチ" value={`${u.matches_count}件`} highlight />
        <Mini label="人気度" value={`${u.popularity_pct}%`} highlight={u.popularity_pct >= 50} concern={u.popularity_pct < 10} />
        <Mini label="マッチ率" value={`${u.match_rate_pct}%`} concern={u.match_rate_pct < 10} />
      </div>

      {/* 行動バランスバー */}
      <div className="mb-3">
        <p className="mb-1 text-[10px] text-muted-foreground">行動バランス</p>
        <div className="flex h-2 rounded-full overflow-hidden bg-muted">
          <div className="bg-rose transition-all" style={{ width: `${(u.likes_given / u.swipes_total) * 100}%` }} />
          <div className="bg-foreground/20 transition-all" style={{ width: `${(u.passes_given / u.swipes_total) * 100}%` }} />
        </div>
        <div className="mt-1 flex justify-between text-[9px] text-muted-foreground">
          <span className="inline-flex items-baseline gap-1">
            <Heart className="h-2 w-2" aria-hidden />Like {u.likes_given}
          </span>
          <span className="inline-flex items-baseline gap-1">
            <XIcon className="h-2 w-2" aria-hidden />Pass {u.passes_given}
          </span>
        </div>
      </div>

      {(isConcern || isLowEng) && (
        <div className="flex flex-wrap gap-2">
          {isConcern && (
            <Button size="sm" className="gap-1">
              <Sparkles className="h-3 w-3" aria-hidden />プロフィール改善提案
            </Button>
          )}
          {isLowEng && (
            <Button size="sm" variant="outline" className="gap-1">
              <TrendingUp className="h-3 w-3" aria-hidden />リアクティベーション
            </Button>
          )}
          <Link href={`/staff/members/APP-2026-002`} className="ml-auto self-center text-[10px] text-rose hover:underline">
            会員詳細 →
          </Link>
        </div>
      )}
    </li>
  );
}

function DailyKpi({ label, value, delta, icon, highlight }: { label: string; value: string; delta?: number; icon?: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={cn('rounded-2xl border p-3', highlight ? 'border-rose bg-rose-50' : 'border-border bg-card')}>
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] text-muted-foreground">{label}</p>
        {icon}
      </div>
      <p className={cn('mt-1 font-mont text-lg font-medium', highlight && 'text-rose')}>{value}</p>
      {delta !== undefined && (
        <p className={cn('mt-0.5 text-[9px]', delta >= 0 ? 'text-success' : 'text-warn')}>
          {delta >= 0 ? '+' : ''}{delta}% 前日比
        </p>
      )}
    </div>
  );
}

function Mini({ label, value, sub, highlight, concern }: { label: string; value: string; sub?: string; highlight?: boolean; concern?: boolean }) {
  return (
    <div className={cn(
      'rounded-lg px-3 py-2',
      concern ? 'bg-warn-50 border border-warn/40' :
      highlight ? 'bg-rose-50/50' :
      'bg-muted/30'
    )}>
      <p className="text-[9px] text-muted-foreground">{label}</p>
      <p className={cn('font-mont mt-0.5 text-sm font-medium',
        concern && 'text-warn',
        highlight && !concern && 'text-rose'
      )}>{value}</p>
      {sub && <p className="text-[9px] text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

function Chip({ label, active, onClick, warn }: { label: string; active: boolean; onClick: () => void; warn?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors',
        active
          ? warn ? 'border-warn bg-warn text-background' : 'border-foreground bg-foreground text-background'
          : 'border-border bg-background hover:bg-muted'
      )}
    >
      {label}
    </button>
  );
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
