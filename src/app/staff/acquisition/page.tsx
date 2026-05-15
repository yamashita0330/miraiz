'use client';

import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Megaphone, Calendar, Search, Camera, Heart, Building2, Newspaper, Link2, Music2, HelpCircle, Download } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DEMO_ACQUISITION_MONTHLY,
  DEMO_EVENT_ACQUISITION_FUNNEL,
  DEMO_LEADS,
  ACQUISITION_SOURCE_LABEL,
  ACQUISITION_SOURCE_GROUP,
  ACQUISITION_SOURCE_GROUP_LABEL,
  ACQUISITION_SOURCE_MONTHLY_COST,
  type AcquisitionSource,
} from '@/lib/demo';
import { exportRowsAsCsv, todayStamp } from '@/lib/csv';

const SOURCE_ICONS: Partial<Record<AcquisitionSource, LucideIcon>> = {
  organic_search: Search,
  instagram_ad: Megaphone,
  instagram_organic: Camera,
  tiktok: Music2,
  google_ad: Megaphone,
  friend_referral: Heart,
  event_walkin: Calendar,
  event_attendee: Calendar,
  press_article: Newspaper,
  lp_direct: Link2,
  partner_shop: Building2,
  unknown: HelpCircle,
};

export default function AcquisitionPage() {
  const months = DEMO_ACQUISITION_MONTHLY;
  const current = months[months.length - 1];
  const prev = months[months.length - 2];
  const leadGrowth = prev ? Math.round(((current.leads_total - prev.leads_total) / prev.leads_total) * 100) : 0;
  const appsGrowth = prev ? Math.round(((current.applications_total - prev.applications_total) / prev.applications_total) * 100) : 0;

  // 流入経路別の累計（過去6ヶ月）
  const sourceTotals = months.reduce((acc, m) => {
    Object.entries(m.leads_by_source).forEach(([k, v]) => {
      const key = k as AcquisitionSource;
      acc[key] = (acc[key] ?? 0) + (v ?? 0);
    });
    return acc;
  }, {} as Partial<Record<AcquisitionSource, number>>);

  const sourceAppTotals = months.reduce((acc, m) => {
    Object.entries(m.applications_by_source).forEach(([k, v]) => {
      const key = k as AcquisitionSource;
      acc[key] = (acc[key] ?? 0) + (v ?? 0);
    });
    return acc;
  }, {} as Partial<Record<AcquisitionSource, number>>);

  const sortedSources = (Object.keys(sourceTotals) as AcquisitionSource[]).sort(
    (a, b) => (sourceTotals[b] ?? 0) - (sourceTotals[a] ?? 0)
  );

  const totalLeadsYTD = months.reduce((s, m) => s + m.leads_total, 0);
  const totalAppsYTD = months.reduce((s, m) => s + m.applications_total, 0);
  const totalAdSpend = months.reduce((s, m) => s + m.ad_spend, 0);
  const avgCAC = totalAppsYTD > 0 ? Math.round(totalAdSpend / totalAppsYTD) : 0;
  const avgCV = totalLeadsYTD > 0 ? Math.round((totalAppsYTD / totalLeadsYTD) * 100) : 0;

  const maxLeads = Math.max(...months.map((m) => m.leads_total));

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <div className="flex items-baseline justify-between">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight">集客分析</h1>
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => {
                exportRowsAsCsv(
                  `acquisition_${todayStamp()}.csv`,
                  months.map((m) => ({
                    month: m.month,
                    leads_total: m.leads_total,
                    applications_total: m.applications_total,
                    conversion_rate_pct: m.conversion_rate_pct,
                    ad_spend: m.ad_spend,
                    cac: m.cac,
                  })),
                  [
                    { key: 'month', label: '月' },
                    { key: 'leads_total', label: 'リード数' },
                    { key: 'applications_total', label: '本会員数' },
                    { key: 'conversion_rate_pct', label: 'CV率(%)' },
                    { key: 'ad_spend', label: '広告費' },
                    { key: 'cac', label: 'CAC' },
                  ]
                );
              }}
            >
              <Download className="h-3 w-3" aria-hidden />CSV出力
            </Button>
          </div>
          <p className="mb-8 text-xs text-muted-foreground">月次推移・流入経路別ファネル・イベント→本会員の転換率・CAC</p>

          {/* YTD KPI */}
          <section className="mb-8 rounded-2xl border-2 border-foreground bg-foreground p-6 text-background">
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-70">YTD（過去6ヶ月累計）</p>
            <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Stat label="リード獲得" value={`${totalLeadsYTD}件`} />
              <Stat label="本会員転換" value={`${totalAppsYTD}件`} />
              <Stat label="平均CV率" value={`${avgCV}%`} />
              <Stat label="平均CAC" value={`¥${avgCAC.toLocaleString()}`} />
            </div>
          </section>

          {/* 今月のサマリー */}
          <section className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            <CurrentKpi
              label="今月のリード"
              value={`${current.leads_total}件`}
              delta={leadGrowth}
              sub={`前月 ${prev?.leads_total ?? 0}件`}
            />
            <CurrentKpi
              label="今月の本会員"
              value={`${current.applications_total}件`}
              delta={appsGrowth}
              sub={`前月 ${prev?.applications_total ?? 0}件`}
            />
            <CurrentKpi
              label="今月CV率"
              value={`${current.conversion_rate_pct}%`}
              sub="リード→本会員"
            />
            <CurrentKpi
              label="今月CAC"
              value={`¥${current.cac.toLocaleString()}`}
              sub={`広告費¥${current.ad_spend.toLocaleString()}`}
            />
          </section>

          {/* 月次推移グラフ */}
          <section className="mb-8 rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">Monthly Trend</h2>
            <div className="flex items-end gap-2 h-48">
              {months.map((m) => {
                const leadHeightPct = (m.leads_total / maxLeads) * 100;
                const appHeightPct = (m.applications_total / maxLeads) * 100;
                return (
                  <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                    <span className="font-mont text-[9px] text-muted-foreground">{m.leads_total}</span>
                    <div className="relative w-full flex-1 flex items-end gap-0.5">
                      <div className="flex-1 rounded-t-md bg-foreground/20 transition-all" style={{ height: `${leadHeightPct}%` }} />
                      <div className="flex-1 rounded-t-md bg-rose transition-all" style={{ height: `${appHeightPct}%` }} />
                    </div>
                    <span className="text-[9px] text-muted-foreground">{m.month.slice(-2)}月</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-baseline justify-end gap-3 text-[10px]">
              <span className="inline-flex items-baseline gap-1">
                <span className="inline-block h-2 w-2 rounded-sm bg-foreground/20" />リード
              </span>
              <span className="inline-flex items-baseline gap-1">
                <span className="inline-block h-2 w-2 rounded-sm bg-rose" />本会員
              </span>
            </div>
          </section>

          {/* 月次明細テーブル */}
          <section className="mb-8 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid grid-cols-6 gap-2 border-b border-border bg-muted/30 px-5 py-2.5 text-[10px] font-mont uppercase tracking-wider text-muted-foreground">
              <div>月</div>
              <div className="text-right">リード</div>
              <div className="text-right">本会員</div>
              <div className="text-right">CV率</div>
              <div className="text-right">広告費</div>
              <div className="text-right">CAC</div>
            </div>
            {months.slice().reverse().map((m, i) => (
              <div key={m.month} className={cn('grid grid-cols-6 gap-2 px-5 py-3 text-[11px]', i !== months.length - 1 && 'border-b border-border')}>
                <div className="font-mont">{m.month}</div>
                <div className="text-right font-mont">{m.leads_total}</div>
                <div className="text-right font-mont text-rose">{m.applications_total}</div>
                <div className="text-right font-mont">{m.conversion_rate_pct}%</div>
                <div className="text-right font-mont">¥{(m.ad_spend / 1000).toFixed(0)}k</div>
                <div className="text-right font-mont font-semibold">¥{m.cac.toLocaleString()}</div>
              </div>
            ))}
          </section>

          {/* 流入経路別ファネル */}
          <section className="mb-8">
            <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">流入経路別ファネル（YTD）</h2>
            <ul className="overflow-hidden rounded-2xl border border-border bg-card">
              {sortedSources.map((src, i) => {
                const Icon = SOURCE_ICONS[src] ?? HelpCircle;
                const leads = sourceTotals[src] ?? 0;
                const apps = sourceAppTotals[src] ?? 0;
                const cv = leads > 0 ? Math.round((apps / leads) * 100) : 0;
                const cost = ACQUISITION_SOURCE_MONTHLY_COST[src];
                const annualCost = cost ? cost * 12 : 0;
                const cac = cost && apps > 0 ? Math.round((annualCost) / apps) : null;
                const group = ACQUISITION_SOURCE_GROUP[src];
                return (
                  <li key={src} className={cn('px-5 py-4', i !== sortedSources.length - 1 && 'border-b border-border')}>
                    <div className="mb-2 flex items-baseline gap-3">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.6} aria-hidden />
                      <span className="text-sm font-medium">{ACQUISITION_SOURCE_LABEL[src]}</span>
                      <Badge variant={group === 'paid' ? 'rose' : 'outline'} className="text-[10px]">
                        {ACQUISITION_SOURCE_GROUP_LABEL[group]}
                      </Badge>
                      <span className="ml-auto font-mont text-[10px] text-muted-foreground">CV {cv}%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-2 md:grid-cols-4">
                      <Mini label="リード" value={`${leads}件`} />
                      <Mini label="本会員" value={`${apps}件`} highlight />
                      <Mini label="CV率" value={`${cv}%`} />
                      <Mini label={cac ? 'CAC' : '広告費'} value={cac ? `¥${cac.toLocaleString()}` : (cost ? `¥${cost.toLocaleString()}/月` : '無料')} />
                    </div>
                    <FunnelBar leads={leads} apps={apps} totalMax={Math.max(...sortedSources.map((s) => sourceTotals[s] ?? 0))} />
                  </li>
                );
              })}
            </ul>
          </section>

          {/* イベント別ファネル */}
          <section className="mb-8">
            <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">イベント→本会員ファネル</h2>
            <ul className="flex flex-col gap-3">
              {DEMO_EVENT_ACQUISITION_FUNNEL.map((e) => (
                <li key={e.event_token} className="rounded-2xl border border-border bg-card p-5">
                  <div className="mb-3 flex flex-wrap items-baseline gap-3">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.6} aria-hidden />
                    <span className="text-base font-semibold">{e.event_name}</span>
                    <span className="font-mont text-[10px] text-muted-foreground">{e.event_date}</span>
                    <Badge variant="rose" className="ml-auto text-[10px]">CV {e.conversion_rate_pct}%</Badge>
                  </div>

                  <div className="mb-3 grid grid-cols-2 gap-2 md:grid-cols-4">
                    <Mini label="参加者" value={`${e.attended}名`} />
                    <Mini label="リード化" value={`${e.leads_generated}件`} />
                    <Mini label="無料登録" value={`${e.free_signups}件`} />
                    <Mini label="本会員" value={`${e.paid_signups}件`} highlight />
                  </div>

                  <div className="mb-3 grid grid-cols-4 gap-1 text-[9px]">
                    <FunnelStep label="参加" value={e.attended} max={e.attended} />
                    <FunnelStep label="リード" value={e.leads_generated} max={e.attended} />
                    <FunnelStep label="無料" value={e.free_signups} max={e.attended} />
                    <FunnelStep label="本会員" value={e.paid_signups} max={e.attended} highlight />
                  </div>

                  <div className="rounded-lg bg-muted/30 px-3 py-2 text-[10px]">
                    <span className="text-muted-foreground">本会員売上：</span>
                    <span className="font-mont font-semibold ml-1">¥{e.paid_revenue.toLocaleString()}</span>
                    <span className="text-muted-foreground ml-2">／参加者あたり ¥{Math.round(e.paid_revenue / e.attended).toLocaleString()}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* リード状態 */}
          <section>
            <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">現在のリード状態</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              <LeadStateCard label="新規・未対応" count={DEMO_LEADS.filter((l) => l.status === 'new').length} variant="warn" />
              <LeadStateCard label="エンゲージ中" count={DEMO_LEADS.filter((l) => l.status === 'engaged').length} />
              <LeadStateCard label="無料登録済" count={DEMO_LEADS.filter((l) => l.status === 'converted_free').length} />
              <LeadStateCard label="本会員昇格" count={DEMO_LEADS.filter((l) => l.status === 'converted_paid').length} variant="success" />
              <LeadStateCard label="休眠" count={DEMO_LEADS.filter((l) => l.status === 'cold').length} />
              <LeadStateCard label="対象外" count={DEMO_LEADS.filter((l) => l.status === 'rejected').length} />
            </div>
            <div className="mt-4 text-center">
              <Link href="/staff/leads" className="text-[11px] text-rose hover:underline">
                リード管理画面へ →
              </Link>
            </div>
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

function CurrentKpi({ label, value, sub, delta }: { label: string; value: string; sub: string; delta?: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] text-muted-foreground">{label}</p>
        {delta !== undefined && delta !== 0 && (
          <span className={cn('inline-flex items-center gap-0.5 text-[9px]', delta > 0 ? 'text-success' : 'text-warn')}>
            {delta > 0 ? <TrendingUp className="h-2.5 w-2.5" aria-hidden /> : <TrendingDown className="h-2.5 w-2.5" aria-hidden />}
            {delta > 0 ? '+' : ''}{delta}%
          </span>
        )}
      </div>
      <p className="mt-1 font-mont text-xl font-medium">{value}</p>
      <p className="mt-1 text-[10px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function Mini({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg bg-muted/30 px-3 py-2">
      <p className="text-[9px] text-muted-foreground">{label}</p>
      <p className={cn('font-mont mt-0.5 text-sm font-medium', highlight && 'text-rose')}>{value}</p>
    </div>
  );
}

function FunnelBar({ leads, apps, totalMax }: { leads: number; apps: number; totalMax: number }) {
  const leadPct = totalMax > 0 ? (leads / totalMax) * 100 : 0;
  const appPct = totalMax > 0 ? (apps / totalMax) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex h-2 rounded-full bg-muted overflow-hidden">
        <div className="bg-foreground/20 transition-all" style={{ width: `${leadPct}%` }} />
      </div>
      <div className="flex h-2 rounded-full bg-muted overflow-hidden">
        <div className="bg-rose transition-all" style={{ width: `${appPct}%` }} />
      </div>
    </div>
  );
}

function FunnelStep({ label, value, max, highlight }: { label: string; value: number; max: number; highlight?: boolean }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="text-center">
      <div className={cn('h-1.5 rounded-sm transition-all', highlight ? 'bg-rose' : 'bg-foreground/20')} style={{ width: `${pct}%` }} />
      <p className="mt-1 text-muted-foreground">{label}</p>
      <p className={cn('font-mont font-medium', highlight && 'text-rose')}>{value}</p>
    </div>
  );
}

function LeadStateCard({ label, count, variant }: { label: string; count: number; variant?: 'warn' | 'success' }) {
  return (
    <div className={cn(
      'rounded-2xl border p-4',
      variant === 'warn' ? 'border-warn/40 bg-warn-50' :
      variant === 'success' ? 'border-success/40 bg-success/5' :
      'border-border bg-card'
    )}>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-mont text-xl font-medium">{count}名</p>
    </div>
  );
}
