import Link from 'next/link';
import { ArrowRight, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { RadarChart } from './RadarChart';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import {
  DEMO_TSUCHIHYO_SAMPLE,
  SCORE_DIMENSION_LABEL,
  SCORE_DIMENSION_DESC,
  SCORE_TO_PARTNER_CATEGORY,
  PARTNER_CATEGORY_LABEL,
  DEMO_PARTNERS,
  type ScoreDimension,
} from '@/lib/demo';

const DIMENSIONS: ScoreDimension[] = [
  'appearance',
  'talkability',
  'gottman',
  'comfort',
  'timeless',
  'safety',
];

interface Props {
  variant?: 'full' | 'compact';
  showPartnerCTA?: boolean;
}

export function ScoreCardVisual({ variant = 'full', showPartnerCTA = true }: Props) {
  const s = DEMO_TSUCHIHYO_SAMPLE;
  const me = DIMENSIONS.map((d) => s.scores[d]);
  const avg = DIMENSIONS.map((d) => s.averageScores[d]);
  const prev = DIMENSIONS.map((d) => s.previousScores[d]);

  // 弱い項目TOP2
  const weakest = [...DIMENSIONS]
    .sort((a, b) => s.scores[a] - s.scores[b])
    .slice(0, 2);

  const totalAvg = Math.round(me.reduce((a, b) => a + b, 0) / me.length);
  const prevAvg = Math.round(prev.reduce((a, b) => a + b, 0) / prev.length);
  const growth = totalAvg - prevAvg;

  const compact = variant === 'compact';

  return (
    <div className="flex flex-col gap-8">
      {!compact && (
        <header className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground">
              前回の評価
            </span>
            <span className="font-mont text-[10px] text-muted-foreground">{s.date}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {s.eventTitle} で参加者からもらった評価
          </p>
        </header>
      )}

      {/* レーダーチャート + 凡例 */}
      <div className="flex flex-col items-center gap-6">
        <div className={cn('w-full', compact ? 'max-w-[260px]' : 'max-w-[320px]')}>
          <RadarChart
            axes={DIMENSIONS.map((d) => ({ key: d, label: SCORE_DIMENSION_LABEL[d] }))}
            series={[
              { name: '参加者平均', values: avg, color: 'muted' },
              { name: 'あなた', values: me, color: 'foreground' },
            ]}
            size={compact ? 260 : 320}
          />
        </div>
        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-4 rounded-sm bg-foreground" aria-hidden />
            <span>あなた</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-4 rounded-sm border border-dashed border-muted-foreground" aria-hidden />
            <span className="text-muted-foreground">参加者平均</span>
          </div>
        </div>
      </div>

      {/* 総合スコア＋成長表示 */}
      {!compact && (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border p-6">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              総合スコア
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-mont text-3xl font-medium tracking-tight">{totalAvg}</span>
              <span className="text-xs text-muted-foreground">/ 100</span>
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground">
              平均 {Math.round(avg.reduce((a, b) => a + b, 0) / avg.length)} 点
            </p>
          </div>
          <div className="rounded-2xl border border-border p-6">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              前回からの成長
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              {growth >= 0 ? (
                <TrendingUp className="h-5 w-5" strokeWidth={1.6} aria-hidden />
              ) : (
                <TrendingDown className="h-5 w-5 text-muted-foreground" strokeWidth={1.6} aria-hidden />
              )}
              <span className="font-mont text-3xl font-medium tracking-tight">
                {growth >= 0 ? '+' : ''}{growth}
              </span>
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground">
              {s.previousEventTitle} 比
            </p>
          </div>
        </div>
      )}

      {/* 項目別スコア（2列グリッド・コンパクト） */}
      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h3 className="text-xs tracking-[0.15em] text-muted-foreground">
            項目別スコア
          </h3>
          <span className="text-[10px] text-muted-foreground">学術根拠＋平均比較</span>
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {DIMENSIONS.map((d) => {
            const value = s.scores[d];
            const avgValue = s.averageScores[d];
            const isWeak = weakest.includes(d);
            const diff = value - avgValue;
            return (
              <li
                key={d}
                className={cn(
                  'flex flex-col gap-2 rounded-2xl border p-3',
                  isWeak ? 'border-warn bg-warn-50/40' : 'border-border bg-card'
                )}
              >
                {/* ラベル＋平均比較 */}
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[12px] font-semibold leading-tight">
                    {SCORE_DIMENSION_LABEL[d]}
                  </span>
                  <span
                    className={cn(
                      'font-mont text-[10px] shrink-0',
                      diff >= 0 ? 'text-success' : 'text-warn'
                    )}
                  >
                    {diff >= 0 ? '+' : ''}{diff}
                  </span>
                </div>

                {/* スコア大表示 */}
                <div className="flex items-baseline gap-1">
                  <span
                    className={cn(
                      'font-mont text-3xl font-bold leading-none tabular-nums',
                      isWeak ? 'text-warn' : 'text-foreground'
                    )}
                  >
                    {value}
                  </span>
                  <span className="text-[9px] text-muted-foreground">/100</span>
                </div>

                {/* バー（平均マーカー付き） */}
                <div className="relative h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="absolute top-0 h-full w-px bg-muted-foreground/60"
                    style={{ left: `${avgValue}%` }}
                    aria-hidden
                  />
                  <div
                    className={cn('h-full transition-all', isWeak ? 'bg-warn' : 'bg-foreground')}
                    style={{ width: `${value}%` }}
                  />
                </div>

                {/* 改善ラベル or 根拠 */}
                {isWeak ? (
                  <Badge variant="warnSoft" className="self-start text-[9px]">
                    ここを高めよう
                  </Badge>
                ) : !compact ? (
                  <p className="text-[9px] leading-snug text-muted-foreground line-clamp-2">
                    {SCORE_DIMENSION_DESC[d]}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
        {!compact && (
          <p className="mt-1 text-right text-[9px] text-muted-foreground">
            縦線＝参加者平均
          </p>
        )}
      </section>

      {/* 改善アクションCTA */}
      {showPartnerCTA && (
        <section className="rounded-2xl border-2 border-brandGold bg-brandGold-50 p-6">
          <div className="flex items-baseline gap-2 text-brandGold">
            <Sparkles className="h-4 w-4" strokeWidth={1.8} aria-hidden />
            <p className="text-xs font-medium text-foreground">あなたが伸ばすべき2項目</p>
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {weakest.map((d) => {
              const cats = SCORE_TO_PARTNER_CATEGORY[d];
              const partner = DEMO_PARTNERS.find((p) => cats.includes(p.category));
              return (
                <li key={d}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden />
                      <span className="text-sm font-semibold">
                        {SCORE_DIMENSION_LABEL[d]}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        現在 {s.scores[d]}点
                      </span>
                    </div>
                  </div>
                  {partner && (
                    <Link
                      href={`/partners/${partner.id}`}
                      className="mt-2 ml-6 flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 text-xs transition-colors hover:border-foreground/40"
                    >
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {PARTNER_CATEGORY_LABEL[partner.category]} 加盟店
                        </span>
                        <span className="truncate font-medium">{partner.name}</span>
                      </div>
                      <span className="shrink-0 text-muted-foreground" aria-hidden>›</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <Link
            href="/akanuke"
            className="mt-5 inline-flex items-center gap-1 text-xs font-medium underline-offset-4 hover:underline"
          >
            垢抜けロードマップを見る
            <ArrowRight className="h-3 w-3" aria-hidden />
          </Link>
        </section>
      )}
    </div>
  );
}
