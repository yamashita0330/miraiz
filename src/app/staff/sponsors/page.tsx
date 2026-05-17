'use client';

import Link from 'next/link';
import { ArrowLeft, Megaphone, Download, ExternalLink } from 'lucide-react';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DEMO_SPONSORS, SPONSOR_STATUS_LABEL, type SponsorPlacement } from '@/lib/demo';
import { exportRowsAsCsv, todayStamp } from '@/lib/csv';

const PLACEMENT_LABEL: Record<SponsorPlacement, string> = {
  home: 'ホーム',
  events: 'イベント一覧',
  event_detail: 'イベント詳細',
  mypage: 'マイページ',
};

export default function SponsorsPage() {
  const sponsors = DEMO_SPONSORS;
  const active = sponsors.filter((s) => s.status === 'active');
  const monthlyRevenue = active.reduce((s, x) => s + x.monthly_fee, 0);
  const totalImpressions = sponsors.reduce((s, x) => s + x.impressions, 0);
  const totalClicks = sponsors.reduce((s, x) => s + x.clicks, 0);
  const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link href="/staff" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />ダッシュボード
          </Link>
          <div className="flex items-baseline justify-between">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight">協賛広告管理</h1>
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => {
                exportRowsAsCsv(
                  `sponsors_${todayStamp()}.csv`,
                  sponsors.map((s) => ({
                    id: s.id,
                    name: s.name,
                    category: s.category,
                    status: SPONSOR_STATUS_LABEL[s.status],
                    placements: s.placements.map((p) => PLACEMENT_LABEL[p]).join('・'),
                    period: `${s.period_start}〜${s.period_end}`,
                    monthly_fee: s.monthly_fee,
                    impressions: s.impressions,
                    clicks: s.clicks,
                    ctr: s.impressions > 0 ? ((s.clicks / s.impressions) * 100).toFixed(2) + '%' : '-',
                  })),
                  [
                    { key: 'id', label: 'ID' },
                    { key: 'name', label: '出稿企業' },
                    { key: 'category', label: 'カテゴリ' },
                    { key: 'status', label: 'ステータス' },
                    { key: 'placements', label: '掲載枠' },
                    { key: 'period', label: '掲載期間' },
                    { key: 'monthly_fee', label: '月額出稿料' },
                    { key: 'impressions', label: '表示回数' },
                    { key: 'clicks', label: 'クリック数' },
                    { key: 'ctr', label: 'CTR' },
                  ]
                );
              }}
            >
              <Download className="h-3 w-3" aria-hidden />CSV出力
            </Button>
          </div>
          <p className="mb-8 text-xs text-muted-foreground">
            徳島のデート・婚活関連企業のアプリ内広告枠。出稿企業・掲載期間・表示実績を管理します。
          </p>

          <section className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Card label="掲載中" value={String(active.length) + '社'} />
            <Card label="月間広告収益" value={'¥' + monthlyRevenue.toLocaleString()} positive />
            <Card label="総表示回数" value={totalImpressions.toLocaleString()} />
            <Card label="平均CTR" value={ctr.toFixed(2) + '%'} />
          </section>

          <ul className="flex flex-col gap-3">
            {sponsors.map((s) => {
              const sCtr = s.impressions > 0 ? (s.clicks / s.impressions) * 100 : 0;
              return (
                <li key={s.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="flex items-stretch">
                    <span className="w-1.5 shrink-0" style={{ backgroundColor: s.accent }} aria-hidden />
                    <div className="flex-1 p-5">
                      <div className="flex flex-wrap items-baseline gap-2.5">
                        <Megaphone className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.6} aria-hidden />
                        <span className="text-sm font-semibold">{s.name}</span>
                        <span className="text-[11px] text-muted-foreground">{s.category}</span>
                        <Badge
                          variant={s.status === 'active' ? 'rose' : s.status === 'scheduled' ? 'soft' : 'outline'}
                          className="text-[10px]"
                        >
                          {SPONSOR_STATUS_LABEL[s.status]}
                        </Badge>
                      </div>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{s.tagline}</p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {s.placements.map((p) => (
                          <span key={p} className="rounded-full bg-muted px-2.5 py-1 text-[10px] text-muted-foreground">
                            {PLACEMENT_LABEL[p]}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-muted/30 px-3 py-2.5 text-[10px] md:grid-cols-5">
                        <div>
                          <p className="text-muted-foreground">掲載期間</p>
                          <p className="font-mont">{s.period_start}〜{s.period_end}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">月額出稿料</p>
                          <p className="font-mont text-success">¥{s.monthly_fee.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">表示回数</p>
                          <p className="font-mont">{s.impressions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">クリック数</p>
                          <p className="font-mont">{s.clicks.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">CTR</p>
                          <p className="font-mont">{s.impressions > 0 ? sCtr.toFixed(2) + '%' : '-'}</p>
                        </div>
                      </div>

                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground"
                      >
                        遷移先URL <ExternalLink className="h-3 w-3" aria-hidden />
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 rounded-2xl border border-border bg-muted/30 px-4 py-4 text-[11px] leading-relaxed text-muted-foreground">
            掲載は徳島のデート・婚活関連企業（レストラン・美容・ジュエリー・ホテル等）に限定。
            アプリの世界観と利用者の信頼を守るため、無関係な業種・アダルト・ギャンブル等は掲載できません。
          </p>
        </div>
      </main>
    </>
  );
}

function Card(props: { label: string; value: string; positive?: boolean; negative?: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-[10px] text-muted-foreground">{props.label}</p>
      <p className={`mt-1 font-mont text-xl font-medium ${props.positive ? 'text-success' : props.negative ? 'text-rose' : ''}`}>{props.value}</p>
    </div>
  );
}
