'use client';

import { useState } from 'react';
import { Ban, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  targetName: string;
}

export function BlockButton({ targetName }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'confirm' | 'done'>('confirm');

  const close = () => {
    setOpen(false);
    setTimeout(() => setStep('confirm'), 200);
  };

  const submit = () => setStep('done');

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        aria-label="ブロックする"
      >
        <Ban className="h-3.5 w-3.5" aria-hidden />
        ブロック
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 backdrop-blur-sm sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-xl rounded-t-2xl border border-border bg-background sm:rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="text-base font-semibold tracking-tight">
                {step === 'done' ? 'ブロック完了' : `${targetName}さんをブロック`}
              </h2>
              <button
                onClick={close}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="閉じる"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="px-6 py-8">
              {step === 'confirm' && (
                <div className="flex flex-col gap-6">
                  <p className="text-sm leading-relaxed">
                    ブロックすると、{targetName}さんは:
                  </p>
                  <ul className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
                    <li>— あなたのプロフィールが見えなくなります</li>
                    <li>— ホームの会員一覧に表示されなくなります</li>
                    <li>— ★やメッセージが届かなくなります</li>
                  </ul>
                  <p className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                    ブロックは相手に通知されません。マイページからいつでも解除できます。
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button fullWidth size="lg" onClick={submit}>
                      ブロックする
                    </Button>
                    <Button fullWidth size="lg" variant="ghost" onClick={close}>
                      キャンセル
                    </Button>
                  </div>
                </div>
              )}

              {step === 'done' && (
                <div className="flex flex-col items-center gap-6 py-8 text-center">
                  <CheckCircle2 className="h-10 w-10" strokeWidth={1.4} aria-hidden />
                  <p className="text-base font-medium">{targetName}さんをブロックしました</p>
                  <Button size="lg" onClick={close}>閉じる</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
