'use client';

import { useState } from 'react';
import { ShieldAlert, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { REPORT_REASONS } from '@/lib/demo';
import type { ReportReason } from '@/lib/types';

interface Props {
  targetName: string;
}

export function ReportDialog({ targetName }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'select' | 'detail' | 'sending' | 'done'>('select');
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [detail, setDetail] = useState('');

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setStep('select');
      setReason(null);
      setDetail('');
    }, 200);
  };

  const submit = () => {
    setStep('sending');
    setTimeout(() => setStep('done'), 1200);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        aria-label="通報する"
      >
        <ShieldAlert className="h-3.5 w-3.5" aria-hidden />
        違反を通報
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 backdrop-blur-sm sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-xl overflow-y-auto rounded-t-2xl border border-border bg-background sm:rounded-2xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-border bg-background px-6 py-5">
              <h2 className="text-base font-semibold tracking-tight">
                {step === 'done' ? '受付完了' : `${targetName}さんを通報`}
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
              {step === 'select' && (
                <div className="flex flex-col gap-6">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    通報内容は厳重に取り扱われ、相手に通知されることはありません。
                  </p>
                  <div className="flex flex-col gap-3">
                    {REPORT_REASONS.map((r) => (
                      <button
                        key={r.value}
                        onClick={() => setReason(r.value)}
                        className={cn(
                          'flex flex-col gap-1 rounded-lg border p-5 text-left transition-colors',
                          reason === r.value
                            ? 'border-foreground bg-foreground/[0.03]'
                            : 'border-border hover:bg-muted'
                        )}
                      >
                        <span className="text-sm font-semibold">{r.label}</span>
                        <span className="text-xs text-muted-foreground">{r.desc}</span>
                      </button>
                    ))}
                  </div>
                  <Button
                    fullWidth
                    size="lg"
                    disabled={!reason}
                    onClick={() => setStep('detail')}
                  >
                    次へ
                  </Button>
                </div>
              )}

              {step === 'detail' && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">詳細を記入（任意）</label>
                    <Textarea
                      placeholder="状況や根拠を具体的に記入していただけると、対応がスムーズになります。"
                      maxLength={500}
                      value={detail}
                      onChange={(e) => setDetail(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">{detail.length} / 500</p>
                  </div>
                  <p className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                    送信後、24〜72時間以内に運営が確認します。緊急性の高い案件は最優先で対応します。
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button fullWidth size="lg" onClick={submit}>
                      送信する
                    </Button>
                    <Button fullWidth size="lg" variant="ghost" onClick={() => setStep('select')}>
                      戻る
                    </Button>
                  </div>
                </div>
              )}

              {step === 'sending' && (
                <div className="flex min-h-[40vh] items-center justify-center">
                  <p className="text-sm text-muted-foreground">送信中…</p>
                </div>
              )}

              {step === 'done' && (
                <div className="flex flex-col items-center gap-6 py-8 text-center">
                  <CheckCircle2 className="h-10 w-10" strokeWidth={1.4} aria-hidden />
                  <div className="flex flex-col gap-2">
                    <p className="text-base font-medium">通報を受け付けました</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      24〜72時間以内に運営が確認します。
                      <br />
                      ご協力ありがとうございます。
                    </p>
                  </div>
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
