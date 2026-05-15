'use client';

import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Download } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DEMO_MONTHLY_REVENUE } from '@/lib/demo';
import { exportRowsAsCsv, todayStamp } from '@/lib/csv';

export default function BillingPage() {
  const months = DEMO_MONTHLY_REVENUE;
  const current = months[months.length - 1];
  const prev = months[months.length - 2];
  const ytdTotal = months.reduce((s, m) => s + m.total, 0);
  const ytdMatsu = months.reduce((s, m) => s + m.matsu_revenue, 0);
  const ytdSubscription = months.reduce((s, m) => s + m.ume_revenue + m.take_revenue, 0);
  const maxRevenue = Math.max(...months.map((m) => m.total));

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <div className="flex items-baseline justify-between">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight">売上・収益レポート</h1>
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => {
                exportRowsAsCsv(
                  `monthly_revenue_${todayStamp()}.csv`,
                  months.map((m) => ({
                    month: m.month,
                    ume_count: m.ume_count,
                    take_count: m.take_count,
                    matsu_count: m.matsu_count,
                    ume_revenue: m.ume_revenue,
                    take_revenue: m.take_revenue,
                    matsu_revenue: m.matsu_revenue,
                    event_revenue: m.event_revenue,
                    tsuchihyo_revenue: m.tsuchihyo_revenue,
                    other_revenue: m.other_revenue,
                    total: m.total,
                  })),
                  [
                    { key: 'month', label: '月' },
                    { key: 'ume_count', label: '梅会員数' },
                    { key: 'take_count', label: '竹会員数' },
                    { key: 'matsu_count', label: '松会員数' },
                    { key: 'ume_revenue', label: '梅売上' },
                    { key: 'take_revenue', label: '竹売上' },
                    { key: 'matsu_revenue', label: '松売上' },
                    { key: 'event_revenue', label: 'イベント売上' },
                    { key: 'tsuchihyo_revenue', label: '通知表売上' },
                    { key: 'other_revenue', label: 'その他' },
                    { key: 'total', label: '合計' },
                  ]
                );
              }}
            >
              <Download className="h-3 w-3" aria-hidden />CSV出力
            </Button>
          </div>
          <p className="mb-8 text-xs text-muted-foreground">月次売上・プラン別構成・1億円達成までの距離</p>

          <section className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Kpi label="今月売上" value={`¥${(current.total / 10000).toFixed(0)}万`} delta={prev ? ((current.total - prev.total) / prev.total) * 100 : 0} />
            <Kpi label="松契約" value={`${current.matsu_count}名`} sub={`¥${(current.matsu_revenue / 10000).toFixed(0)}万`} />
            <Kpi label="サブスク" value={`${current.ume_count + current.take_count}名`} sub={`梅${current.ume_count}・竹${current.take_count}`} />
            <Kpi label="イベント" value={`¥${(current.event_revenue / 10000).toFixed(0)}万`} sub="チケット売上" />
          </section>

          <section className="mb-8 rounded-2xl border-2 border-foreground bg-foreground p-6 text-background">
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-70">YTD（過去6ヶ月累計）</p>
            <p className="mt-2 font-mont text-4xl font-medium">¥{(ytdTotal / 10000).toFixed(0)}万</p>
            <div className="mt-3 grid grid-cols-3 gap-3 text-[11px] opacity-80">
              <div><p>松契約</p><p className="font-mont mt-0.5 text-base">¥{(ytdMatsu / 10000).toFixed(0)}万</p></div>
              <div><p>サブスク</p><p className="font-mont mt-0.5 text-base">¥{(ytdSubscription / 10000).toFixed(0)}万</p></div>
              <div><p>1億まで</p><p className="font-mont mt-0.5 text-base">あと¥{((100000000 - ytdTotal * 2) / 10000).toFixed(0)}万</p></div>
            </div>
          </section>

          <section className="mb-8 rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">Monthly Revenue</h2>
            <div className="flex items-end gap-2 h-48">
              {months.map((m) => {
                const heightPct = (m.total / maxRevenue) * 100;
                return (
                  <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                    <span className="font-mont text-[9px] text-muted-foreground">¥{(m.total / 10000).toFixed(0)}万</span>
                    <div className="relative w-full flex-1 flex items-end">
                      <div className={cn('w-full rounded-t-md transition-all', m === current ? 'bg-rose' : 'bg-foreground/20')} style={{ height: `${heightPct}%` }} />
                    </div>
                    <span className="text-[9px] text-muted-foreground">{m.month.slice(-2)}月</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mb-8 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid grid-cols-7 gap-2 border-b border-border bg-muted/30 px-5 py-2.5 text-[10px] font-mont uppercase tracking-wider text-muted-foreground">
              <div>月</div>
              <div className="text-right">梅</div>
              <div className="text-right">竹</div>
              <div className="text-right">松</div>
              <div className="text-right">イベ</div>
              <div className="text-right">通知</div>
              <div className="text-right font-bold">合計</div>
            </div>
            {months.slice().reverse().map((m, i) => (
              <div key={m.month} className={cn('grid grid-cols-7 gap-2 px-5 py-3 text-[11px]', i !== months.length - 1 && 'border-b border-border')}>
                <div className="font-mont text-muted-foreground">{m.month.slice(-2)}月</div>
                <div className="text-right font-mont">¥{(m.ume_revenue / 1000).toFixed(0)}k</div>
                <div className="text-right font-mont">¥{(m.take_revenue / 1000).toFixed(0)}k</div>
                <div className="text-right font-mont text-rose">¥{(m.matsu_revenue / 1000).toFixed(0)}k</div>
                <div className="text-right font-mont">¥{(m.event_revenue / 1000).toFixed(0)}k</div>
                <div className="text-right font-mont">¥{(m.tsuchihyo_revenue / 1000).toFixed(0)}k</div>
                <div className="text-right font-mont font-semibold">¥{(m.total / 1000).toFixed(0)}k</div>
              </div>
            ))}
          </section>

          <section className="rounded-2xl border-2 border-rose bg-rose-50 p-6">
            <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] text-rose">1億円達成ペース</h2>
            <p className="text-sm leading-relaxed">
              年間ペース：<strong className="font-mont text-base">¥{(ytdTotal * 2 / 10000).toFixed(0)}万</strong>（1億円の<strong>{Math.round((ytdTotal * 2 / 100000000) * 100)}%</strong>）
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              月¥833万を超えれば年1億達成ペース。あと{Math.max(0, Math.round((833 - current.total / 10000)))}万/月の伸びで到達。
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

function Kpi({ label, value, sub, delta }: { label: string; value: string; sub?: string; delta?: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] text-muted-foreground">{label}</p>
        {delta !== undefined && (
          <span className={cn('inline-flex items-center gap-0.5 text-[9px]', delta >= 0 ? 'text-success' : 'text-warn')}>
            {delta >= 0 ? <TrendingUp className="h-2.5 w-2.5" aria-hidden /> : <TrendingDown className="h-2.5 w-2.5" aria-hidden />}
            {delta >= 0 ? '+' : ''}{Math.round(delta)}%
          </span>
        )}
      </div>
      <p className="mt-1 font-mont text-xl font-medium tracking-tight">{value}</p>
      {sub && <p className="mt-1 text-[10px] text-muted-foreground">{sub}</p>}
    </div>
  );
}
