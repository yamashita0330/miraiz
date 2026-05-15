'use client';

import { useState } from 'react';
import { Heart, Check, Loader2, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  FEELING_TAGS,
  type FeelingTag,
  type ThreadSupportState,
} from '@/lib/demo';

interface Props {
  partnerName: string;
  initialState: ThreadSupportState;
  onSubmit: (state: ThreadSupportState) => void;
  onDismiss: () => void;
}

type Step = 'form' | 'submitting' | 'done';

export function MatchSupportCard({ partnerName, initialState, onSubmit, onDismiss }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [step, setStep] = useState<Step>('form');
  const [wantMatchmaker, setWantMatchmaker] = useState<boolean | null>(initialState.want_matchmaker);
  const [wantPreAdvice, setWantPreAdvice] = useState<boolean | null>(initialState.want_pre_advice);
  const [feelings, setFeelings] = useState<FeelingTag[]>(initialState.feelings);
  const [freeNote, setFreeNote] = useState<string>(initialState.free_note ?? '');

  const toggleFeeling = (tag: FeelingTag) => {
    setFeelings((prev) =>
      prev.includes(tag) ? prev.filter((f) => f !== tag) : [...prev, tag]
    );
  };

  const canSubmit = wantMatchmaker !== null && wantPreAdvice !== null;

  const submit = () => {
    if (!canSubmit) return;
    setStep('submitting');
    setTimeout(() => {
      onSubmit({
        submitted: true,
        want_matchmaker: wantMatchmaker,
        want_pre_advice: wantPreAdvice,
        feelings,
        free_note: freeNote.trim() || null,
        submitted_at: new Date().toISOString(),
      });
      setStep('done');
      setTimeout(() => onDismiss(), 2500);
    }, 1000);
  };

  // 折りたたみ表示（カード）
  if (!expanded && step === 'form') {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="flex w-full items-center gap-3 rounded-2xl border-2 border-rose bg-rose-50 px-5 py-4 text-left transition-colors hover:bg-rose-100"
      >
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose text-rose-foreground">
          <Heart className="h-4 w-4" strokeWidth={1.8} aria-hidden />
        </span>
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="text-sm font-semibold">
            デート前にサポートが必要ですか？
          </p>
          <p className="text-[10px] text-muted-foreground">
            {partnerName}さんと会う前の不安・希望を運営にだけ届けられます ・ 30秒
          </p>
        </div>
        <span className="text-xs font-medium text-rose">タップ →</span>
      </button>
    );
  }

  // 完了表示
  if (step === 'done') {
    return (
      <div className="flex items-center gap-3 rounded-2xl border-2 border-success bg-success-50 px-5 py-4">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground">
          <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        </span>
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="text-sm font-semibold">運営に届きました</p>
          <p className="text-[10px] leading-relaxed text-muted-foreground">
            必要に応じて仲人からLINEでご連絡します
          </p>
        </div>
      </div>
    );
  }

  // 送信中
  if (step === 'submitting') {
    return (
      <div className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-muted/30 px-5 py-6">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-hidden />
        <p className="text-sm font-medium">運営に送信中…</p>
      </div>
    );
  }

  // 展開フォーム
  return (
    <div className="rounded-2xl border-2 border-rose bg-rose-50 p-5">
      <div className="mb-5 flex items-baseline justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">
            {partnerName}さんと会う前のサポート
          </p>
          <p className="text-[10px] leading-relaxed text-muted-foreground">
            運営にだけ届きます。相手には見えません。デート当日までに仲人がフォロー可能。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="閉じる"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>

      {/* Q1：仲人サポート */}
      <div className="mb-5">
        <p className="mb-2 text-xs font-medium">
          ❶ 仲人にサポートしてほしい？
        </p>
        <div className="flex gap-2">
          <YesNoChip
            label="はい"
            selected={wantMatchmaker === true}
            onClick={() => setWantMatchmaker(true)}
          />
          <YesNoChip
            label="いいえ"
            selected={wantMatchmaker === false}
            onClick={() => setWantMatchmaker(false)}
          />
        </div>
      </div>

      {/* Q2：事前アドバイス */}
      <div className="mb-5">
        <p className="mb-2 text-xs font-medium">
          ❷ 事前にアドバイスがほしい？
        </p>
        <div className="flex gap-2">
          <YesNoChip
            label="はい"
            selected={wantPreAdvice === true}
            onClick={() => setWantPreAdvice(true)}
          />
          <YesNoChip
            label="いいえ"
            selected={wantPreAdvice === false}
            onClick={() => setWantPreAdvice(false)}
          />
        </div>
      </div>

      {/* Q3：気持ち */}
      <div className="mb-5">
        <p className="mb-2 text-xs font-medium">
          ❸ 今の気持ち（複数選択可）
        </p>
        <div className="flex flex-wrap gap-1.5">
          {FEELING_TAGS.map((t) => {
            const on = feelings.includes(t.value);
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => toggleFeeling(t.value)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors',
                  on
                    ? 'border-rose bg-rose text-rose-foreground'
                    : 'border-border bg-background hover:bg-muted'
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Q4：一言（任意） */}
      <div className="mb-5">
        <p className="mb-2 text-xs font-medium">
          ❹ 一言（任意・運営にだけ届きます）
        </p>
        <textarea
          value={freeNote}
          onChange={(e) => setFreeNote(e.target.value)}
          placeholder="例：相手が大人しそうで話題に困りそう"
          maxLength={120}
          rows={2}
          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <p className="mt-1 text-[10px] text-muted-foreground">
          {freeNote.length}/120 文字
        </p>
      </div>

      {/* CTA */}
      <div className="flex gap-2">
        <Button
          fullWidth
          size="lg"
          disabled={!canSubmit}
          onClick={submit}
        >
          <Sparkles className="mr-1 h-4 w-4" aria-hidden />
          送信する
        </Button>
      </div>
      <button
        type="button"
        onClick={() => setExpanded(false)}
        className="mt-2 w-full py-2 text-[10px] text-muted-foreground"
      >
        あとで答える
      </button>
    </div>
  );
}

function YesNoChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors',
        selected
          ? 'border-rose bg-rose text-rose-foreground'
          : 'border-border bg-background hover:bg-muted'
      )}
    >
      {label}
    </button>
  );
}
