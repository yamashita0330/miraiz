'use client';

import { useState, useRef, useEffect } from 'react';
import { CheckCircle2, Loader2, TrendingUp, TrendingDown, Heart, Users, Sparkles, Smile, MessageCircle, BarChart3 } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  DEMO_TSUCHIHYO_SAMPLE,
  DEMO_USER_STATE,
  DEMO_MY_EVENT_HISTORY,
  DEMO_MY_SWIPE_STATS,
  DEMO_LOOK_FEEDBACK_AGGREGATE,
  LOOK_TAGS,
  LOOK_TAG_LABEL,
  type ScoreDimension,
  type LookTag,
} from '@/lib/demo';
import Link from 'next/link';
import { ScoreCardVisual } from '@/components/ScoreCardVisual';
import { DimensionDetail } from '@/components/DimensionDetail';
import { EventComments } from '@/components/EventComments';
import { PaywallLock } from '@/components/PaywallLock';
import { cn } from '@/lib/utils';

type Step = 'preview' | 'checkout' | 'paying' | 'report';

export default function TsuchihyoPage() {
  const [step, setStep] = useState<Step>(
    DEMO_USER_STATE.tsuchihyoOrdered ? 'report' : 'preview'
  );
  const s = DEMO_TSUCHIHYO_SAMPLE;

  // 参加した過去イベント一覧（直近→過去）。デモは最新を選択中扱い。
  const eventTabs = DEMO_MY_EVENT_HISTORY;
  const [selectedEventToken, setSelectedEventToken] = useState<string>(
    eventTabs[0]?.event_token ?? ''
  );
  const selectedEvent = eventTabs.find((e) => e.event_token === selectedEventToken) ?? eventTabs[0];

  const handlePay = () => {
    setStep('paying');
    setTimeout(() => setStep('report'), 1500);
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          {step === 'preview' && (
            <div className="flex flex-col gap-10">
              <header className="flex flex-col gap-4">
                <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  Koi-no-Tsuchihyo
                </span>
                <h1 className="text-3xl font-semibold leading-tight tracking-tight">恋の通知表</h1>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  当日あなたがどう見られていたか、データを全てお渡しします。<br />
                  下のプレビューは購入後の実画面です。
                </p>
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="font-mont text-4xl font-medium tracking-tight">¥1,980</span>
                  <span className="text-sm text-muted-foreground">／回</span>
                </div>
              </header>

              {/* スコア & 学術根拠 */}
              <PaywallLock
                title="6項目スコア＋学術根拠と参加者平均比較"
                description="UCLA・ゴットマン・ハーバード・アロン・心理的安全性の5研究を根拠に、あなたの印象を6項目で可視化します。"
                onUnlock={() => setStep('checkout')}
                soft
                badge="Score Locked"
              >
                <div className="p-6">
                  <ScoreCardVisual variant="compact" showPartnerCTA={false} />
                </div>
              </PaywallLock>

              {/* 詳細フィードバック */}
              <PaywallLock
                title="項目ごとの良かった点・指摘点・改善Tip"
                description={`参加者からの「${s.eventTitle}」での実コメントを、6項目すべてで閲覧できます。眉毛・髪型・話の進め方など具体的な指摘を確認。`}
                onUnlock={() => setStep('checkout')}
                badge="Feedback Locked"
              >
                <div className="flex flex-col gap-3 p-6">
                  {(['appearance', 'talkability', 'gottman'] as ScoreDimension[]).map((d) => (
                    <DimensionDetail
                      key={d}
                      dimension={d}
                      score={s.scores[d]}
                      averageScore={s.averageScores[d]}
                    />
                  ))}
                </div>
              </PaywallLock>

              {/* イベント後コメント */}
              <PaywallLock
                title={`参加者から受けた ${12} 件の匿名コメント`}
                description="ポジティブ・建設的の両面で、当日あなたを評価したコメントが匿名で読めます。投稿者の特定はできません。"
                onUnlock={() => setStep('checkout')}
                badge="Comments Locked"
              >
                <div className="p-6">
                  <EventComments />
                </div>
              </PaywallLock>

              <div className="flex flex-col gap-3">
                <Button fullWidth size="lg" onClick={() => setStep('checkout')}>
                  ¥1,980 でデータを受け取る
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  参加された全イベントの通知表を1回購入で閲覧できます
                </p>
              </div>
            </div>
          )}

          {step === 'checkout' && (
            <div className="flex flex-col gap-10">
              <h1 className="text-2xl font-semibold tracking-tight">お支払い</h1>
              <div className="rounded-2xl border border-border p-8">
                <p className="text-xs text-muted-foreground">恋の通知表（{s.eventTitle}）</p>
                <p className="mt-2 font-mont text-3xl font-medium tracking-tight">¥1,980</p>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Powered by Stripe</p>
                <div className="flex flex-col gap-2">
                  <Label>カード番号</Label>
                  <Input defaultValue="4242 4242 4242 4242" className="font-mont" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input defaultValue="12/28" className="font-mont" />
                  <Input defaultValue="123" className="font-mont" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button fullWidth size="lg" onClick={handlePay}>支払う</Button>
                <Button fullWidth variant="ghost" size="lg" onClick={() => setStep('preview')}>戻る</Button>
              </div>
            </div>
          )}

          {step === 'paying' && (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" aria-hidden />
              <p className="text-sm font-medium">通知表を生成中…</p>
            </div>
          )}

          {step === 'report' && (
            <div className="flex flex-col gap-12">
              <header className="flex flex-col gap-3">
                <CheckCircle2 className="h-8 w-8 text-foreground" strokeWidth={1.4} aria-hidden />
                <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  {selectedEvent ? formatDate(selectedEvent.date) : s.date}
                </span>
                <h1 className="text-2xl font-semibold leading-tight tracking-tight">
                  {selectedEvent ? selectedEvent.event_name : s.eventTitle}
                  <br />通知表
                </h1>
                <p className="text-sm text-muted-foreground">{s.participantName}</p>
              </header>

              {/* ============= 参加イベント切替（ヘッダー直下） ============= */}
              {eventTabs.length > 1 && (
                <EventSwitcher
                  events={eventTabs}
                  selected={selectedEventToken}
                  onSelect={setSelectedEventToken}
                />
              )}

              {/* ============= スティッキータブナビ ============= */}
              <SectionTabs />

              {/* ============= ひと目でわかるサマリー（NEW・最上部） ============= */}
              <HeroSummarySection />

              {/* ============= スワイプ統計（重要数値・上部配置） ============= */}
              <SwipeStatsSection />

              {/* ============= 見た目 ============= */}
              <div id="look" className="scroll-mt-24 flex flex-col gap-12">
                <LookFeedbackSection />
                <section className="border-t border-border pt-12">
                  <h2 className="mb-6 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                    Score Detail
                  </h2>
                  <ScoreCardVisual variant="full" showPartnerCTA />
                </section>
              </div>

              {/* ============= コミュニケーション ============= */}
              <div id="comm" className="scroll-mt-24">
                <section className="border-t border-border pt-12">
                  <div className="mb-6 flex items-baseline justify-between">
                    <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                      Communication（項目別フィードバック）
                    </h2>
                  </div>
                  <div className="flex flex-col gap-3">
                    {(['appearance', 'talkability', 'gottman', 'comfort', 'timeless', 'safety'] as ScoreDimension[]).map((d) => (
                      <DimensionDetail
                        key={d}
                        dimension={d}
                        score={s.scores[d]}
                        averageScore={s.averageScores[d]}
                      />
                    ))}
                  </div>
                </section>
              </div>

              {/* ============= 評価 ============= */}
              <div id="eval" className="scroll-mt-24 flex flex-col gap-12">
                <section className="border-t border-border pt-12">
                  <EventComments />
                </section>

                <section className="flex flex-col gap-6 border-t border-border pt-12">
                  <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                    YES / NO
                  </h2>
                  <div className="rounded-2xl border border-border p-8 text-center">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      YESを付けてくれた人
                    </p>
                    <p className="mt-2 font-mont text-5xl font-medium tracking-tight">
                      {s.positiveCount}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">名</p>
                  </div>
                  <div>
                    <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">
                      NO理由
                    </p>
                    <ul className="divide-y divide-border">
                      {s.negativeReasons.map((n) => (
                        <li key={n.reason} className="flex justify-between py-3 text-sm">
                          <span>{n.reason}</span>
                          <span className="font-mont text-muted-foreground">{n.count}件</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

              </div>

            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </>
  );
}

// ============= 参加イベント切替 =============
function EventSwitcher({
  events,
  selected,
  onSelect,
}: {
  events: typeof DEMO_MY_EVENT_HISTORY;
  selected: string;
  onSelect: (token: string) => void;
}) {
  return (
    <section className="-mx-6">
      <div className="px-6 mb-2 flex items-baseline justify-between">
        <span className="font-mont text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Event
        </span>
        <span className="text-[10px] text-muted-foreground">参加 {events.length} 回</span>
      </div>
      <div className="flex gap-2 overflow-x-auto px-6 pb-1">
        {events.map((e) => {
          const isActive = e.event_token === selected;
          return (
            <button
              key={e.event_token}
              type="button"
              onClick={() => onSelect(e.event_token)}
              className={cn(
                'shrink-0 rounded-2xl border px-4 py-2.5 text-left transition-all',
                isActive
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-card hover:border-foreground/30'
              )}
            >
              <p
                className={cn(
                  'font-mont text-[9px] uppercase tracking-wider',
                  isActive ? 'opacity-70' : 'text-muted-foreground'
                )}
              >
                {formatDate(e.date)}
              </p>
              <p className="mt-0.5 text-[12px] font-semibold leading-tight whitespace-nowrap">
                {e.event_name}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ============= ひと目でわかるサマリー（最上部） =============
// ============= セクション切替タブ =============
const TABS = [
  { id: 'look', label: '見た目', Icon: Smile },
  { id: 'comm', label: 'コミュニケーション', Icon: MessageCircle },
  { id: 'eval', label: '評価', Icon: BarChart3 },
] as const;

function SectionTabs() {
  const [active, setActive] = useState<string>('look');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const offsets: { id: string; top: number }[] = [];
      TABS.forEach((t) => {
        const el = document.getElementById(t.id);
        if (!el) return;
        offsets.push({ id: t.id, top: el.getBoundingClientRect().top });
      });
      // 画面上から最も近い（top<=140）セクションをactiveにする
      const visible = offsets.filter((o) => o.top <= 140);
      if (visible.length > 0) {
        setActive(visible[visible.length - 1].id);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      ref={containerRef}
      className="sticky top-14 z-30 -mx-6 border-b border-border bg-background/95 backdrop-blur px-4 py-3"
    >
      <ul className="flex gap-1 overflow-x-auto">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <li key={id} className="shrink-0">
              <button
                onClick={() => scrollTo(id)}
                className={cn(
                  'inline-flex items-baseline gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium whitespace-nowrap transition-all',
                  isActive
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                )}
              >
                <Icon className="h-3 w-3" aria-hidden />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// 全参加者の平均スコア（徳島参加者351人ベース）
const TOKUSHIMA_AVG_SCORES = {
  appearance: 67,
  talkability: 65,
  comfort: 64,
  timeless: 60,
  safety: 68,
};
const TOKUSHIMA_AVG_TOTAL =
  (TOKUSHIMA_AVG_SCORES.appearance + TOKUSHIMA_AVG_SCORES.talkability + TOKUSHIMA_AVG_SCORES.comfort + TOKUSHIMA_AVG_SCORES.timeless + TOKUSHIMA_AVG_SCORES.safety) / 5;

function HeroSummarySection() {
  const history = DEMO_MY_EVENT_HISTORY;
  const stats = DEMO_MY_SWIPE_STATS;
  const latest = history[history.length - 1];
  const prev = history.length > 1 ? history[history.length - 2] : null;

  // 平均スコア
  const totalAvg = (latest.scores.appearance + latest.scores.talkability + latest.scores.comfort + latest.scores.timeless + latest.scores.safety) / 5;
  const prevTotalAvg = prev
    ? (prev.scores.appearance + prev.scores.talkability + prev.scores.comfort + prev.scores.timeless + prev.scores.safety) / 5
    : null;
  const scoreDelta = prevTotalAvg !== null ? totalAvg - prevTotalAvg : null;

  // 全参加者平均との差
  const vsAvgDelta = totalAvg - TOKUSHIMA_AVG_TOTAL;
  // 上位 X% 計算（簡易：差分から推定）
  const percentile = (() => {
    if (vsAvgDelta >= 15) return 10;
    if (vsAvgDelta >= 10) return 20;
    if (vsAvgDelta >= 5) return 35;
    if (vsAvgDelta >= 0) return 50;
    if (vsAvgDelta >= -5) return 65;
    return 80;
  })();

  // 最強・最弱項目
  const dims: { key: keyof typeof latest.scores; label: string }[] = [
    { key: 'appearance', label: '見た目' },
    { key: 'talkability', label: '話しやすさ' },
    { key: 'comfort', label: '居心地' },
    { key: 'timeless', label: '時間を忘れて話せた' },
    { key: 'safety', label: '否定されなかった' },
  ];
  const sortedDims = [...dims].sort((a, b) => latest.scores[b.key] - latest.scores[a.key]);
  const best = sortedDims[0];
  const worst = sortedDims[sortedDims.length - 1];

  // 自己肯定感の変化
  const esteemDelta = latest.self_esteem_post - latest.self_esteem_pre;

  // 1行のひとこと
  const insight = (() => {
    if (scoreDelta && scoreDelta >= 1) {
      return `前回より大きく成長。${best.label}が特に光っています。`;
    } else if (worst.key === 'timeless' || worst.key === 'comfort') {
      return `${worst.label}を磨くと、関係性が一段深まります。`;
    } else {
      return `${best.label}が強み。次は${worst.label}で差をつけましょう。`;
    }
  })();

  return (
    <section>
      {/* ヒーロー：総合スコア（大きく） */}
      <div className="rounded-3xl border-2 border-foreground bg-foreground p-8 text-background">
        <div className="flex items-baseline gap-2">
          <span className="font-mont text-7xl font-medium tracking-tight">
            {Math.round(totalAvg)}
          </span>
          <span className="font-mont text-lg opacity-50">/100</span>
        </div>

        {/* 平均との差をシンプルに大きく */}
        <div className="mt-6">
          <div className="relative h-3 overflow-hidden rounded-full bg-background/15">
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-background"
              style={{ left: `${TOKUSHIMA_AVG_TOTAL}%` }}
              aria-hidden
            />
            <div
              className="h-full bg-rose"
              style={{ width: `${Math.min(100, totalAvg)}%` }}
            />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-xs opacity-50">平均 {Math.round(TOKUSHIMA_AVG_TOTAL)}</span>
            <span className="font-mont text-2xl font-semibold text-rose">
              上位 {percentile}%
            </span>
          </div>
        </div>
      </div>

      {/* 4セルサマリー：シンプル化（小文字説明削除） */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <BigCard
          icon="◯"
          label="強み"
          mainValue={String(Math.round(latest.scores[best.key]))}
          subValue={best.label}
          tone="positive"
        />
        <BigCard
          icon="!"
          label="磨きたい"
          mainValue={String(Math.round(latest.scores[worst.key]))}
          subValue={worst.label}
          tone="warning"
        />
        <BigCard
          icon="↑"
          label="自己肯定感"
          mainValue={`${latest.self_esteem_pre}→${latest.self_esteem_post}`}
          subValue={`${esteemDelta >= 0 ? '+' : ''}${esteemDelta}pt`}
          tone={esteemDelta > 0 ? 'positive' : 'neutral'}
        />
        <BigCard
          icon="♥"
          label="両想い"
          mainValue={String(stats.mutual_count)}
          subValue="組"
          tone="rose"
        />
      </div>
    </section>
  );
}

function BigCard({
  icon,
  label,
  mainValue,
  subValue,
  tone,
}: {
  icon: string;
  label: string;
  mainValue: string;
  subValue: string;
  tone: 'positive' | 'warning' | 'neutral' | 'rose';
}) {
  const styles = {
    positive: 'border-success bg-success-50 text-success',
    warning: 'border-warn bg-warn-50 text-warn',
    neutral: 'border-border bg-card text-muted-foreground',
    rose: 'border-rose bg-rose-50 text-rose',
  };
  return (
    <div className={cn('rounded-2xl border-2 p-5', styles[tone])}>
      <div className="flex items-baseline gap-1.5">
        <span className="font-mont text-base font-semibold">{icon}</span>
        <span className="text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-3 font-mont text-3xl font-semibold leading-none tracking-tight text-foreground">
        {mainValue}
      </p>
      <p className="mt-2 text-xs font-medium text-foreground">{subValue}</p>
    </div>
  );
}

// ============= 参加履歴とスコア推移 =============
function EventHistorySection() {
  const history = DEMO_MY_EVENT_HISTORY;
  if (history.length === 0) return null;

  return (
    <section className="flex flex-col gap-6 border-t border-border pt-12">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
          Past Events
        </h2>
        <span className="text-[10px] text-muted-foreground">
          参加 {history.length} 回
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {history.map((entry, i) => {
          const prev = i > 0 ? history[i - 1] : null;
          return <EventHistoryCard key={entry.event_token} entry={entry} prev={prev} />;
        })}
      </div>
    </section>
  );
}

function EventHistoryCard({
  entry,
  prev,
}: {
  entry: typeof DEMO_MY_EVENT_HISTORY[number];
  prev: typeof DEMO_MY_EVENT_HISTORY[number] | null;
}) {
  const totalAvg = (entry.scores.appearance + entry.scores.talkability + entry.scores.comfort + entry.scores.timeless + entry.scores.safety) / 5;
  const prevAvg = prev
    ? (prev.scores.appearance + prev.scores.talkability + prev.scores.comfort + prev.scores.timeless + prev.scores.safety) / 5
    : null;
  const delta = prevAvg !== null ? totalAvg - prevAvg : null;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold">{entry.event_name}</p>
          <p className="text-[10px] text-muted-foreground">{formatDate(entry.date)}</p>
        </div>
        {delta !== null && (
          <Badge
            variant={delta >= 0 ? 'rose' : 'outline'}
            className="gap-1 text-[10px]"
          >
            {delta >= 0 ? (
              <TrendingUp className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden />
            ) : (
              <TrendingDown className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden />
            )}
            {delta >= 0 ? '+' : ''}
            {delta.toFixed(1)}pt
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <ScoreMini label="見た目" value={entry.scores.appearance} />
        <ScoreMini label="話しやすさ" value={entry.scores.talkability} />
        <ScoreMini label="居心地" value={entry.scores.comfort} />
      </div>

      <div className="flex items-baseline gap-3 border-t border-border pt-3 text-[11px]">
        <span className="text-muted-foreground">
          YES <span className="font-mont font-semibold text-rose">{entry.yes_received}</span>/{entry.participants_total / 2 | 0}
        </span>
        <span className="text-muted-foreground">
          両想い <span className="font-mont font-semibold text-rose">{entry.mutual_count}</span>
        </span>
      </div>

      {entry.top_keyword && (
        <p className="mt-2 text-[10px] text-muted-foreground italic">
          「{entry.top_keyword}」と評価されました
        </p>
      )}
    </div>
  );
}

function ScoreMini({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-muted/40 px-2 py-2 text-center">
      <p className="text-[9px] text-muted-foreground">{label}</p>
      <p className="font-mont text-sm font-semibold mt-0.5">{value}</p>
    </div>
  );
}

// ============= スワイプ統計 =============
function SwipeStatsSection() {
  const s = DEMO_MY_SWIPE_STATS;
  const matchRate = s.total_likes_received > 0
    ? (s.mutual_count / s.total_likes_received) * 100
    : 0;

  return (
    <section className="flex flex-col gap-6 border-t border-border pt-12">
      <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
        Swipe Stats
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          Icon={Heart}
          label="あなたが⚪︎した"
          value={s.total_likes_given}
          unit="人"
        />
        <StatCard
          Icon={Heart}
          label="あなたに⚪︎をくれた"
          value={s.total_likes_received}
          unit="人"
          highlight
        />
        <StatCard
          Icon={Sparkles}
          label="両想い成立"
          value={s.mutual_count}
          unit="人"
          highlight
        />
        <StatCard
          Icon={Users}
          label="マッチ率"
          value={Math.round(matchRate)}
          unit="%"
        />
      </div>
    </section>
  );
}

function StatCard({
  Icon,
  label,
  value,
  unit,
  highlight,
}: {
  Icon: typeof Heart;
  label: string;
  value: number;
  unit: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-4',
        highlight ? 'border-rose bg-rose-50' : 'border-border bg-card'
      )}
    >
      <div className={cn('flex items-center gap-1.5', highlight ? 'text-rose' : 'text-muted-foreground')}>
        <Icon className={cn('h-3 w-3', highlight && 'fill-rose')} strokeWidth={1.8} aria-hidden />
        <span className="text-[10px] font-medium">{label}</span>
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className={cn('font-mont text-2xl font-medium tracking-tight', highlight && 'text-rose')}>
          {value}
        </span>
        <span className="text-[10px] text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}

// ============= 自己肯定感の変化 =============
function SelfEsteemTimelineSection() {
  const history = DEMO_MY_EVENT_HISTORY;
  if (history.length === 0) return null;

  // 最新の参加イベントの自己肯定感推移
  const latest = history[history.length - 1];
  const points = [
    { label: '開始前', value: latest.self_esteem_pre, date: '直前' },
    { label: '当日終了', value: latest.self_esteem_post, date: latest.date },
    latest.self_esteem_1month !== null
      ? { label: '1ヶ月後', value: latest.self_esteem_1month, date: addMonths(latest.date, 1) }
      : null,
    latest.self_esteem_6month !== null
      ? { label: '6ヶ月後', value: latest.self_esteem_6month, date: addMonths(latest.date, 6) }
      : null,
  ].filter(Boolean) as Array<{ label: string; value: number; date: string }>;

  const max = 10;
  const start = points[0].value;
  const end = points[points.length - 1].value;
  const totalDelta = end - start;

  return (
    <section className="flex flex-col gap-6 border-t border-border pt-12">
      <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
        Self-Esteem
      </h2>

      {/* タイムライン */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-baseline justify-between">
          <span className="text-[10px] text-muted-foreground">
            {latest.event_name}
          </span>
          {totalDelta !== 0 && (
            <Badge variant={totalDelta > 0 ? 'rose' : 'outline'} className="gap-1 text-[10px]">
              {totalDelta > 0 ? (
                <TrendingUp className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden />
              ) : (
                <TrendingDown className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden />
              )}
              {totalDelta > 0 ? '+' : ''}
              {totalDelta.toFixed(1)}
            </Badge>
          )}
        </div>

        {/* 視覚化：バー */}
        <div className="flex items-end justify-between gap-2 h-32">
          {points.map((p, i) => {
            const heightPct = (p.value / max) * 100;
            const isLatest = i === points.length - 1;
            return (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <span className={cn(
                  'font-mont text-base font-semibold',
                  isLatest ? 'text-rose' : 'text-muted-foreground'
                )}>
                  {p.value}
                </span>
                <div className="relative w-full flex-1 flex items-end">
                  <div
                    className={cn(
                      'w-full rounded-t-md transition-all',
                      isLatest ? 'bg-rose' : 'bg-foreground/20'
                    )}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className="text-[9px] text-muted-foreground text-center leading-tight">
                  {p.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

// ============= 見た目詳細レポート（参加者からの匿名集計フィードバック） =============
function LookFeedbackSection() {
  const data = DEMO_LOOK_FEEDBACK_AGGREGATE;
  const total = data.total_evaluators;

  // 全項目を点数化（0-100）
  // 計算式: ((attractive - improve) / total) * 50 + 50
  // → 全員が魅力と評価=100点 / 全員が磨きどころと評価=0点 / どちらでもない=50点
  const all = LOOK_TAGS.map((t) => {
    const atCount = data.attractive_counts[t.value] ?? 0;
    const imCount = data.improve_counts[t.value] ?? 0;
    const score = Math.round(((atCount - imCount) / total) * 50 + 50);
    return {
      tag: t.value as string,
      label: t.label,
      partnerCategory: t.partnerCategory,
      attractive: atCount,
      improve: imCount,
      score,
      // 70点以上=魅力 / 35点未満=磨きどころ / 中間=普通
      status: score >= 70 ? 'attractive' : score < 35 ? 'improve' : 'neutral',
    };
  });

  // 点数高い順で並べる
  const sorted = [...all].sort((a, b) => b.score - a.score);

  // 平均点
  const avg = Math.round(all.reduce((s, x) => s + x.score, 0) / all.length);

  // 人型図に表示する各部位の状態
  const partStatus: Record<string, 'attractive' | 'improve' | 'neutral'> = {};
  all.forEach((x) => {
    partStatus[x.tag] = x.status as 'attractive' | 'improve' | 'neutral';
  });

  return (
    <section className="flex flex-col gap-6 border-t border-border pt-12">
      <div className="flex items-baseline justify-between">
        <div>
          <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
            Look Feedback
          </h2>
          <p className="mt-2 text-[11px] text-muted-foreground">
            参加者{total}人からの匿名集計
          </p>
        </div>
        <div className="text-right">
          <p className="font-mont text-[9px] uppercase tracking-wider text-muted-foreground">Average</p>
          <p className="font-mont text-3xl font-semibold leading-none">
            {avg}
            <span className="ml-0.5 text-xs text-muted-foreground">点</span>
          </p>
        </div>
      </div>

      {/* ============= 人型ビジュアル ============= */}
      <div className="rounded-3xl border border-border bg-card p-6">
        <div className="mb-3 flex items-baseline justify-between">
          <p className="text-[11px] font-medium">あなたの印象マップ</p>
          <div className="flex items-baseline gap-3 text-[9px] text-muted-foreground">
            <span className="inline-flex items-baseline gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-success" aria-hidden /> 魅力
            </span>
            <span className="inline-flex items-baseline gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-rose" aria-hidden /> 磨きどころ
            </span>
            <span className="inline-flex items-baseline gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-muted-foreground/30" aria-hidden /> 普通
            </span>
          </div>
        </div>

        <div className="relative mx-auto" style={{ maxWidth: 320 }}>
          <BodyDiagram partStatus={partStatus} />
        </div>
      </div>

      {/* ============= 8項目スコア・3列グリッド ============= */}
      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <p className="text-sm font-semibold">項目別スコア</p>
          <p className="text-[10px] text-muted-foreground">点数高い順</p>
        </div>
        <ul className="grid grid-cols-3 gap-2">
          {sorted.map((x) => {
            const isAttractive = x.status === 'attractive';
            const isImprove = x.status === 'improve';
            return (
              <li
                key={x.tag}
                className={`flex aspect-square flex-col justify-between rounded-2xl border p-3 ${
                  isAttractive
                    ? 'border-success bg-success-50'
                    : isImprove
                    ? 'border-rose bg-rose-50'
                    : 'border-border bg-card'
                }`}
              >
                <div>
                  <span
                    className={`font-mont text-3xl font-bold leading-none ${
                      isAttractive
                        ? 'text-success'
                        : isImprove
                        ? 'text-rose'
                        : 'text-foreground'
                    }`}
                  >
                    {x.score}
                  </span>
                  <span className="ml-0.5 text-[9px] text-muted-foreground">点</span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold leading-tight">{x.label}</p>
                  {isImprove && x.partnerCategory ? (
                    <Link
                      href="/partners"
                      className="mt-0.5 inline-flex items-baseline gap-0.5 text-[9px] font-medium text-rose hover:underline"
                    >
                      {x.partnerCategory} →
                    </Link>
                  ) : (
                    <p className="mt-0.5 text-[9px] text-muted-foreground">
                      {x.attractive > 0 && `+${x.attractive}`}
                      {x.attractive > 0 && x.improve > 0 && ' / '}
                      {x.improve > 0 && `-${x.improve}`}
                      {x.attractive === 0 && x.improve === 0 && '評価なし'}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// ============= 人型ビジュアル（マネキンアウトライン全身） =============
// 連続した1本のアウトラインで全身を描き、各ゾーンを薄い色で塗り分ける
function BodyDiagram({ partStatus }: { partStatus: Record<string, 'attractive' | 'improve' | 'neutral'> }) {
  const colorFor = (status: 'attractive' | 'improve' | 'neutral' | undefined) => {
    if (status === 'attractive') return '#22c55e';
    if (status === 'improve') return '#f43f5e';
    return 'currentColor';
  };
  const opacityFor = (status: 'attractive' | 'improve' | 'neutral' | undefined) => {
    if (status === 'neutral' || !status) return 0.15;
    return 0.7;
  };

  // 主要寸法
  // 全身アウトライン1本（時計回り：頭頂→右側→足→左側→頭頂）
  const bodyOutline =
    'M 160 30 ' +
    'C 184 30, 200 50, 200 75 ' + // 右頭
    'C 200 90, 192 100, 184 106 ' + // 右こめかみ→あご
    'C 184 114, 184 118, 184 124 ' + // 首右
    'C 198 126, 215 134, 222 150 ' + // 右肩→上腕
    'L 232 230 ' + // 上腕→前腕
    'C 234 245, 230 252, 220 254 ' + // 手首〜手
    'C 212 254, 208 248, 208 240 ' + // 手のひら内側
    'L 200 150 ' + // 前腕内側
    'L 196 250 ' + // 胴体右
    'L 192 410 ' + // 右脚外側
    'C 195 422, 195 426, 188 428 ' + // 右足甲
    'L 170 428 ' + // 右足底
    'C 165 428, 162 425, 162 420 ' + // 右くるぶし内
    'L 162 270 ' + // 右もも内側〜股
    'L 158 270 ' + // 股
    'L 158 420 ' + // 左もも内側
    'C 158 425, 155 428, 150 428 ' + // 左くるぶし内
    'L 132 428 ' + // 左足底
    'C 125 426, 125 422, 128 410 ' + // 左足甲
    'L 124 250 ' + // 左脚外側
    'L 120 150 ' + // 胴体左
    'L 112 240 ' + // 前腕内側
    'C 112 248, 108 254, 100 254 ' + // 手のひら内側
    'C 90 252, 86 245, 88 230 ' + // 手首〜手
    'L 98 150 ' + // 上腕→前腕
    'C 105 134, 122 126, 136 124 ' + // 左肩→上腕
    'C 136 118, 136 114, 136 106 ' + // 首左
    'C 128 100, 120 90, 120 75 ' + // 左こめかみ→あご
    'C 120 50, 136 30, 160 30 Z'; // 左頭→頭頂

  return (
    <svg viewBox="0 0 320 460" className="w-full text-muted-foreground" role="img" aria-label="印象マップ">
      <defs>
        <filter id="aura-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        {/* 全身をクリップ用に流用 */}
        <clipPath id="body-clip">
          <path d={bodyOutline} />
        </clipPath>
      </defs>

      {/* 雰囲気（外周点線） */}
      <ellipse
        cx="160"
        cy="240"
        rx="140"
        ry="215"
        fill="none"
        stroke={colorFor(partStatus.atmosphere)}
        strokeOpacity={opacityFor(partStatus.atmosphere) * 0.6}
        strokeWidth="2"
        strokeDasharray="3 5"
      />

      {/* 清潔感（全身ぼかしオーラ） */}
      {partStatus.cleanliness && partStatus.cleanliness !== 'neutral' && (
        <path
          d={bodyOutline}
          fill={colorFor(partStatus.cleanliness)}
          fillOpacity={0.18}
          filter="url(#aura-soft)"
        />
      )}

      {/* ==== ゾーンハイライト（人型の中だけに着色） ==== */}
      <g clipPath="url(#body-clip)">
        {/* 髪型：頭頂部 */}
        <ellipse
          cx="160"
          cy="55"
          rx="50"
          ry="32"
          fill={colorFor(partStatus.hairstyle)}
          fillOpacity={opacityFor(partStatus.hairstyle) * 0.6}
        />
        {/* 服の色（胴体左半分） */}
        <rect
          x="80"
          y="120"
          width="80"
          height="120"
          fill={colorFor(partStatus.clothing_color)}
          fillOpacity={opacityFor(partStatus.clothing_color) * 0.55}
        />
        {/* 服のサイズ（胴体右半分） */}
        <rect
          x="160"
          y="120"
          width="80"
          height="120"
          fill={colorFor(partStatus.clothing_size)}
          fillOpacity={opacityFor(partStatus.clothing_size) * 0.55}
        />
      </g>

      {/* 顔の中（眉・笑顔の小マーク） */}
      <line
        x1="148"
        y1="68"
        x2="155"
        y2="68"
        stroke={colorFor(partStatus.eyebrows)}
        strokeOpacity={opacityFor(partStatus.eyebrows) * 1.4}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="165"
        y1="68"
        x2="172"
        y2="68"
        stroke={colorFor(partStatus.eyebrows)}
        strokeOpacity={opacityFor(partStatus.eyebrows) * 1.4}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 152 82 Q 160 88 168 82"
        stroke={colorFor(partStatus.smile)}
        strokeOpacity={opacityFor(partStatus.smile) * 1.4}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* 姿勢：背骨ライン（頭から足首まで） */}
      <line
        x1="160"
        y1="115"
        x2="160"
        y2="420"
        stroke={colorFor(partStatus.posture)}
        strokeOpacity={opacityFor(partStatus.posture) * 1.4}
        strokeWidth="2"
        strokeDasharray="4 4"
      />

      {/* ==== 人型のアウトライン（最後に最前面で描く） ==== */}
      <path
        d={bodyOutline}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* ====== ラベル（引き出し線） ====== */}
      <BodyLabel x1={200} y1={45} x2={264} y2={45} label="髪型" status={partStatus.hairstyle} />
      <BodyLabel x1={120} y1={68} x2={56} y2={62} label="眉毛" status={partStatus.eyebrows} alignRight />
      <BodyLabel x1={200} y1={82} x2={264} y2={88} label="笑顔" status={partStatus.smile} />
      <BodyLabel x1={120} y1={106} x2={56} y2={120} label="清潔感" status={partStatus.cleanliness} alignRight />
      <BodyLabel x1={120} y1={170} x2={56} y2={170} label="服の色" status={partStatus.clothing_color} alignRight />
      <BodyLabel x1={200} y1={170} x2={264} y2={170} label="服のサイズ" status={partStatus.clothing_size} />
      <BodyLabel x1={196} y1={320} x2={264} y2={320} label="姿勢" status={partStatus.posture} />
      <BodyLabel x1={120} y1={320} x2={56} y2={320} label="雰囲気" status={partStatus.atmosphere} alignRight />
    </svg>
  );
}

function BodyLabel({
  x1,
  y1,
  x2,
  y2,
  label,
  status,
  alignRight = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  status: 'attractive' | 'improve' | 'neutral' | undefined;
  alignRight?: boolean;
}) {
  const color =
    status === 'attractive'
      ? '#22c55e'
      : status === 'improve'
      ? '#f43f5e'
      : 'currentColor';
  const opacity = !status || status === 'neutral' ? 0.4 : 1;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeOpacity={opacity * 0.6} strokeWidth="0.8" />
      <circle cx={x1} cy={y1} r="3" fill={color} fillOpacity={opacity} />
      <text
        x={alignRight ? x2 - 4 : x2 + 4}
        y={y2}
        fontSize="11"
        fontWeight="600"
        fill={color}
        fillOpacity={opacity}
        textAnchor={alignRight ? 'end' : 'start'}
        dominantBaseline="middle"
      >
        {label}
      </text>
    </g>
  );
}

function addMonths(iso: string, n: number): string {
  const d = new Date(iso);
  d.setMonth(d.getMonth() + n);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

