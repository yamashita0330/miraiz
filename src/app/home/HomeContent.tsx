'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  TrendingDown,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SwipeDeck } from '@/components/SwipeDeck';
import { Badge } from '@/components/ui/badge';
import { compatibility } from '@/lib/compatibility';
import {
  DEMO_ME,
  DAILY_SWIPE_LIMIT,
  DEMO_MATCH_ANALYSIS,
  PASS_REASONS,
} from '@/lib/demo';
import type { UserProfile } from '@/lib/types';

interface Props {
  members: UserProfile[];
  mutualIds: string[];
}

export function HomeContent({ members, mutualIds }: Props) {
  const [completed, setCompleted] = useState(false);

  // 相性が高い順に並べ、上位3人だけスワイプ可能に
  const sorted = [...members].sort(
    (a, b) => compatibility(DEMO_ME, b).total - compatibility(DEMO_ME, a).total
  );

  return (
    <>
      {/* タイトル＋残数表示 */}
      <header className="mb-6 flex items-baseline justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Encounter
          </span>
          <h1 className="text-2xl font-semibold leading-tight tracking-tight">出逢う</h1>
        </div>
        {!completed && (
          <Badge variant="outline" className="text-[10px]">
            本日 {DAILY_SWIPE_LIMIT}人 まで
          </Badge>
        )}
      </header>

      {!completed && (
        <p className="mb-6 text-xs leading-relaxed text-muted-foreground">
          1日3人まで厳選してご紹介します。<br />
          プロフィールを最後まで読んでから、★かパスを選んでください。
        </p>
      )}

      {!completed ? (
        <SwipeDeck
          members={sorted}
          initialMutualIds={mutualIds}
          dailyLimit={DAILY_SWIPE_LIMIT}
          onComplete={() => setCompleted(true)}
        />
      ) : (
        <DailyDoneAnalysis />
      )}
    </>
  );
}

function DailyDoneAnalysis() {
  const a = DEMO_MATCH_ANALYSIS;
  const mutualPct = Math.round(a.mutualRate * 100);

  return (
    <div className="flex flex-col gap-8">
      {/* 完了通知 */}
      <section className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-8 py-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-success" strokeWidth={1.4} aria-hidden />
        <p className="text-base font-semibold">本日の3人を見終わりました</p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          明日また厳選した相手をご紹介します。<br />
          少し時間が空くので、自分のデータを確認してみませんか？
        </p>
      </section>

      {/* 今週のサマリー */}
      <section>
        <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
          {a.weeksData.weekLabel}の活動
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <Stat label="送った★" value={a.weeksData.sentLikes} />
          <Stat label="受け取った★" value={a.weeksData.receivedLikes} />
          <Stat label="両想い" value={a.weeksData.matched} accent />
        </div>
      </section>

      {/* マッチ率分析 */}
      <section className="rounded-2xl border-2 border-info bg-info-50 p-6">
        <div className="flex items-baseline gap-2 text-info">
          <TrendingDown className="h-4 w-4" strokeWidth={1.8} aria-hidden />
          <p className="text-xs font-medium">あなたの両想い率</p>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-mont text-4xl font-medium tracking-tight text-info">
            {mutualPct}
          </span>
          <span className="text-sm text-info">%</span>
          <span className="ml-2 text-[10px] text-muted-foreground">
            （平均 24%）
          </span>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          あなたが★を付けた相手のうち、両想いになる確率です。<br />
          平均より低めなので、改善の余地があります。
        </p>
      </section>

      {/* 受けたパス理由 */}
      <section>
        <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
          相手があなたをパスした理由
        </h2>
        <ul className="flex flex-col gap-3">
          {a.receivedPassReasons.map((r, i) => {
            const def = PASS_REASONS.find((p) => p.value === r.reason);
            return (
              <li
                key={r.reason}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mont text-sm tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-medium">
                    {def?.label ?? r.reason}
                  </span>
                </div>
                <Badge variant="warnSoft" className="text-[10px]">{r.count}件</Badge>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
          ※ 直近30日のパス理由を集計。AIマッチングの分析データから抽出。
        </p>
      </section>

      {/* 改善のヒント */}
      <section>
        <div className="mb-4 flex items-baseline gap-2">
          <Sparkles className="h-3.5 w-3.5 text-brandGold" strokeWidth={1.8} aria-hidden />
          <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
            あなたへの改善提案
          </h2>
        </div>
        <ul className="flex flex-col gap-3">
          {a.improvementTips.map((tip, i) => {
            const content = (
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all">
                <span className="font-mont text-sm tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-sm font-semibold">{tip.title}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {tip.description}
                  </p>
                </div>
                {tip.href && (
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                )}
              </div>
            );
            return (
              <li key={i}>
                {tip.href ? (
                  <Link href={tip.href} className="block hover:opacity-80">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <p className="text-center text-[11px] text-muted-foreground">
        本日のスワイプは終了しました。明日また3人をご紹介します。
      </p>
    </div>
  );
}

function Stat({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4">
      <span className={`font-mont text-2xl font-medium tracking-tight ${accent ? 'text-rose' : ''}`}>
        {value}
      </span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}
