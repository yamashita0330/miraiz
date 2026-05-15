'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Users, MessageSquare, Heart, FileText } from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DEMO_EVENT_ANALYTICS, type EventAnalytics } from '@/lib/demo';

export default function EventAnalyticsPage() {
  const events = DEMO_EVENT_ANALYTICS;
  const completed = events.filter((e) => e.status === 'completed');
  const upcoming = events.filter((e) => e.status === 'upcoming');

  const lifetime = {
    total_attended: completed.reduce((s, e) => s + e.attended, 0),
    total_matches: completed.reduce((s, e) => s + e.matches_formed, 0),
    total_dates: completed.reduce((s, e) => s + e.date_confirmed, 0),
    total_revenue: completed.reduce((s, e) => s + e.ticket_revenue + e.tsuchihyo_revenue, 0),
    avg_mid_rate: Math.round(completed.reduce((s, e) => s + e.mid_eval_completion_rate, 0) / completed.length),
    avg_fill: Math.round(completed.reduce((s, e) => s + e.fill_rate, 0) / completed.length),
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">イベント分析</h1>
          <p className="mb-8 text-xs text-muted-foreground">参加率・MID評価完了率・マッチ成立・通知表購入の横断ビュー</p>

          <section className="mb-8 rounded-2xl border-2 border-foreground bg-foreground p-6 text-background">
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-70">Lifetime（過去開催 累計）</p>
            <div className="mt-3 grid grid-cols-3 gap-4">
              <Stat label="参加者" value={`${lifetime.total_attended}名`} />
              <Stat label="マッチ成立" value={`${lifetime.total_matches}件`} />
              <Stat label="デート確定" value={`${lifetime.total_dates}件`} />
              <Stat label="平均充足率" value={`${lifetime.avg_fill}%`} />
              <Stat label="平均MID完了率" value={`${lifetime.avg_mid_rate}%`} />
              <Stat label="累計売上" value={`¥${(lifetime.total_revenue / 10000).toFixed(0)}万`} />
            </div>
          </section>

          {upcoming.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">Upcoming</h2>
              <ul className="flex flex-col gap-3">
                {upcoming.map((e) => <UpcomingCard key={e.event_token} ev={e} />)}
              </ul>
            </section>
          )}

          <section>
            <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">Completed</h2>
            <ul className="flex flex-col gap-4">
              {completed.map((e) => <CompletedCard key={e.event_token} ev={e} />)}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] opacity-70">{label}</p>
      <p className="font-mont mt-0.5 text-2xl font-medium">{value}</p>
    </div>
  );
}

function UpcomingCard({ ev }: { ev: EventAnalytics }) {
  return (
    <li className="rounded-2xl border-2 border-rose bg-rose-50 p-5">
      <div className="mb-3 flex flex-wrap items-baseline gap-3">
        <Calendar className="h-3.5 w-3.5 text-rose" strokeWidth={1.6} aria-hidden />
        <span className="text-base font-semibold">{ev.event_name}</span>
        <Badge variant="rose" className="text-[10px]">予約受付中</Badge>
        <span className="ml-auto font-mont text-[11px] text-muted-foreground">{formatDate(ev.event_date)}</span>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-3">
        <Metric label="チケット販売" value={`${ev.tickets_sold} / ${ev.capacity}`} />
        <Metric label="充足率" value={`${ev.fill_rate}%`} highlight={ev.fill_rate >= 80} />
        <Metric label="チケット売上" value={`¥${(ev.ticket_revenue / 10000).toFixed(0)}万`} />
      </div>
      <FillBar pct={ev.fill_rate} />
    </li>
  );
}

function CompletedCard({ ev }: { ev: EventAnalytics }) {
  const matchRate = ev.attended > 0 ? Math.round((ev.matches_formed / ev.attended) * 100) : 0;
  const dateConvRate = ev.matches_formed > 0 ? Math.round((ev.date_confirmed / ev.matches_formed) * 100) : 0;
  const tsuchihyoConvRate = ev.tsuchihyo_distributed > 0 ? Math.round((ev.tsuchihyo_purchased / ev.tsuchihyo_distributed) * 100) : 0;

  return (
    <li className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 flex flex-wrap items-baseline gap-3">
        <Calendar className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.6} aria-hidden />
        <span className="text-base font-semibold">{ev.event_name}</span>
        <Badge variant="outline" className="text-[10px] text-success border-success">完了</Badge>
        <span className="ml-auto font-mont text-[11px] text-muted-foreground">{formatDate(ev.event_date)}</span>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Metric icon={<Users className="h-3 w-3" aria-hidden />} label="参加" value={`${ev.attended}/${ev.tickets_sold}`} sub={`no-show ${ev.no_show}名`} />
        <Metric icon={<MessageSquare className="h-3 w-3" aria-hidden />} label="MID評価提出" value={`${ev.mid_eval_completed}件`} sub={`完了率 ${ev.mid_eval_completion_rate}%`} />
        <Metric icon={<Heart className="h-3 w-3" aria-hidden />} label="マッチ成立" value={`${ev.matches_formed}件`} sub={`参加者比 ${matchRate}%`} highlight />
        <Metric icon={<FileText className="h-3 w-3" aria-hidden />} label="通知表購入" value={`${ev.tsuchihyo_purchased}件`} sub={`変換 ${tsuchihyoConvRate}%`} />
      </div>

      <div className="mb-3 grid grid-cols-3 gap-2 rounded-lg bg-muted/30 px-3 py-2 text-[10px]">
        <div>
          <p className="text-muted-foreground">デート提案</p>
          <p className="font-mont mt-0.5 text-sm">{ev.date_proposals}件</p>
        </div>
        <div>
          <p className="text-muted-foreground">デート確定</p>
          <p className="font-mont mt-0.5 text-sm text-success">{ev.date_confirmed}件 <span className="text-[9px] text-muted-foreground">({dateConvRate}%)</span></p>
        </div>
        <div>
          <p className="text-muted-foreground">総会話数</p>
          <p className="font-mont mt-0.5 text-sm">{ev.total_conversations}回</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[10px]">
        <div>
          <p className="text-muted-foreground">チケット</p>
          <p className="font-mont mt-0.5 text-sm">¥{(ev.ticket_revenue / 10000).toFixed(0)}万</p>
        </div>
        <div>
          <p className="text-muted-foreground">通知表</p>
          <p className="font-mont mt-0.5 text-sm">¥{(ev.tsuchihyo_revenue / 1000).toFixed(0)}k</p>
        </div>
        <div>
          <p className="text-muted-foreground">合計売上</p>
          <p className="font-mont mt-0.5 text-sm font-semibold">¥{((ev.ticket_revenue + ev.tsuchihyo_revenue) / 10000).toFixed(0)}万</p>
        </div>
      </div>
    </li>
  );
}

function Metric({ icon, label, value, sub, highlight }: { icon?: React.ReactNode; label: string; value: string; sub?: string; highlight?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline gap-1.5 text-[10px] text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <p className={cn('font-mont mt-0.5 text-base font-medium', highlight && 'text-rose')}>{value}</p>
      {sub && <p className="text-[9px] text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

function FillBar({ pct }: { pct: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div className="h-full rounded-full bg-rose transition-all" style={{ width: `${Math.min(100, pct)}%` }} />
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`;
}
