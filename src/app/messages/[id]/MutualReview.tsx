'use client';

import { useState, useEffect } from 'react';
import { Loader2, Sparkles, Lock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  REVIEW_BADGES,
  REVIEW_BADGE_LABEL,
  REVIEW_MIN_BADGES,
  REVIEW_MAX_BADGES,
  type ReviewBadgeId,
  type ThreadReviewState,
} from '@/lib/demo';

interface Props {
  partnerName: string;
  threadId: string;
  initialState: ThreadReviewState;
  onClose: () => void;
}

export function MutualReview({ partnerName, threadId, initialState, onClose }: Props) {
  const [step, setStep] = useState<'select' | 'submitting' | 'waiting' | 'result'>(() => {
    if (initialState.my_review_submitted && initialState.partner_review_submitted) return 'result';
    if (initialState.my_review_submitted) return 'waiting';
    return 'select';
  });
  const [selected, setSelected] = useState<Set<ReviewBadgeId>>(new Set());
  const [resultBadges, setResultBadges] = useState<ReviewBadgeId[]>(
    initialState.badges_received_from_partner
  );

  const toggle = (id: ReviewBadgeId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < REVIEW_MAX_BADGES) next.add(id);
      return next;
    });
  };

  const submit = () => {
    if (selected.size < REVIEW_MIN_BADGES) return;
    setStep('submitting');
    setTimeout(() => {
      // 相手が既に提出済 → resultへ。未提出 → waitingへ
      if (initialState.partner_review_submitted) {
        setResultBadges(initialState.badges_received_from_partner);
        setStep('result');
      } else {
        setStep('waiting');
      }
    }, 1200);
  };

  // demo: waiting状態なら3秒後に相手も提出してresultへ
  useEffect(() => {
    if (step !== 'waiting') return;
    const t = setTimeout(() => {
      // demoでは初期にbadges_received_from_partnerが空なら適当に4つランダム付与
      if (resultBadges.length === 0) {
        const sample: ReviewBadgeId[] = ['fun_conversation', 'natural', 'sincere', 'good_listener'];
        setResultBadges(sample);
      }
      setStep('result');
    }, 3000);
    return () => clearTimeout(t);
  }, [step, resultBadges.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 backdrop-blur-sm sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        className="pb-safe w-full max-w-xl rounded-t-3xl border border-border bg-background sm:rounded-3xl"
      >
        {step === 'select' && (
          <div className="flex flex-col gap-6 px-6 py-8">
            <header className="flex flex-col gap-2 text-center">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose">
                <Sparkles className="h-5 w-5" strokeWidth={1.8} aria-hidden />
              </div>
              <h2 className="text-lg font-semibold tracking-tight">
                {partnerName}さんへの感謝
              </h2>
              <p className="text-xs leading-relaxed text-muted-foreground">
                良かった点を <span className="font-medium text-foreground">{REVIEW_MIN_BADGES}〜{REVIEW_MAX_BADGES}個</span> 選んでください。<br />
                ネガティブ評価はありません。両者の提出後に互いに開示されます。
              </p>
            </header>

            <div className="grid grid-cols-2 gap-2">
              {REVIEW_BADGES.map((b) => {
                const isOn = selected.has(b.id);
                const reachedMax = !isOn && selected.size >= REVIEW_MAX_BADGES;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => toggle(b.id)}
                    disabled={reachedMax}
                    className={cn(
                      'flex items-center gap-2 rounded-lg border px-3 py-3 text-left text-xs leading-tight transition-colors',
                      isOn
                        ? 'border-rose bg-rose-50 text-rose-foreground'
                        : 'border-border hover:bg-muted',
                      reachedMax && 'opacity-40'
                    )}
                  >
                    <span
                      className={cn(
                        'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                        isOn ? 'border-rose bg-rose text-rose-foreground' : 'border-border'
                      )}
                    >
                      {isOn && <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />}
                    </span>
                    <span className="flex-1">{b.label}</span>
                  </button>
                );
              })}
            </div>

            <p className="text-center text-[10px] text-muted-foreground">
              {selected.size}/{REVIEW_MAX_BADGES} 選択中（最低{REVIEW_MIN_BADGES}個）
            </p>

            <div className="flex flex-col gap-2">
              <Button
                fullWidth
                size="lg"
                disabled={selected.size < REVIEW_MIN_BADGES}
                onClick={submit}
              >
                評価を提出する
              </Button>
              <Button fullWidth size="lg" variant="ghost" onClick={onClose}>
                あとで
              </Button>
            </div>
          </div>
        )}

        {step === 'submitting' && (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6 py-12 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" aria-hidden />
            <p className="text-sm font-medium">送信中…</p>
          </div>
        )}

        {step === 'waiting' && (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-5 px-6 py-12 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Lock className="h-5 w-5" strokeWidth={1.8} aria-hidden />
            </div>
            <h2 className="text-base font-semibold">提出ありがとうございます</h2>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {partnerName}さんが評価を提出するまで、<br />
              内容は互いに見えません。<br />
              （デモ：3秒後に相手も提出します）
            </p>
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-hidden />
          </div>
        )}

        {step === 'result' && (
          <div className="flex flex-col gap-6 px-6 py-8">
            <header className="flex flex-col items-center gap-3 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success text-success-foreground">
                <Sparkles className="h-5 w-5" strokeWidth={1.8} aria-hidden />
              </div>
              <h2 className="text-lg font-semibold tracking-tight">
                両者の評価が開示されました
              </h2>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {partnerName}さんからあなたへ
              </p>
            </header>

            <ul className="flex flex-col gap-2">
              {resultBadges.map((id) => (
                <li
                  key={id}
                  className="flex items-center gap-3 rounded-lg border border-rose-100 bg-rose-50 px-4 py-3"
                >
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose text-rose-foreground">
                    <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                  </span>
                  <span className="text-sm font-medium">{REVIEW_BADGE_LABEL[id]}</span>
                </li>
              ))}
            </ul>

            <p className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-[11px] leading-relaxed text-muted-foreground">
              受け取ったバッジはあなたのプロフィールにも累積表示されます（人数のみ）。
            </p>

            <Button fullWidth size="lg" onClick={onClose}>
              閉じる
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
