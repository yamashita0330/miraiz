'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LOVE_QUIZ, calculateQuizResult, type QuizResult } from '@/lib/loveQuiz';
import { HOPE_TYPE_LABEL, type HopeType } from '@/lib/constants';

export default function DiagnosticPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const currentQ = LOVE_QUIZ[step];
  const progress = ((step + (currentQ ? 0 : 1)) / LOVE_QUIZ.length) * 100;

  const select = (optionIdx: number) => {
    if (!currentQ) return;
    const next = { ...answers, [currentQ.id]: optionIdx };
    setAnswers(next);

    if (step + 1 >= LOVE_QUIZ.length) {
      setResult(calculateQuizResult(next));
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const back = () => {
    if (step === 0) return router.push('/mypage');
    setStep(step - 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          {!result && (
            <>
              <header className="flex flex-col gap-4">
                <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  Love Type Quiz
                </span>
                <h1 className="text-2xl font-semibold leading-tight tracking-tight">
                  恋愛タイプ診断
                </h1>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  12問で6タイプの中からあなたに最も近い恋愛観を判定します。
                </p>
              </header>

              <div className="mt-8 flex items-center gap-3">
                <button
                  onClick={back}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="戻る"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                </button>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-mont">
                      {String(step + 1).padStart(2, '0')} / {LOVE_QUIZ.length}
                    </span>
                    <span className="text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-foreground transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>

              {currentQ && (
                <div className="mt-12 flex flex-col gap-8">
                  <h2 className="text-xl font-semibold leading-snug tracking-tight">
                    {currentQ.question}
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {currentQ.options.map((opt, i) => (
                      <li key={i}>
                        <button
                          onClick={() => select(i)}
                          className={cn(
                            'flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-card px-6 py-5 text-left text-sm leading-relaxed transition-all hover:border-foreground/40'
                          )}
                        >
                          <span>{opt.label}</span>
                          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {result && (
            <ResultView result={result} onReset={reset} />
          )}
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function ResultView({ result, onReset }: { result: QuizResult; onReset: () => void }) {
  const sortedScores = useMemo(
    () => (Object.entries(result.scores) as [HopeType, number][])
      .sort((a, b) => b[1] - a[1]),
    [result.scores]
  );
  const maxScore = Math.max(...Object.values(result.scores));

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col items-center gap-4 text-center">
        <Sparkles className="h-8 w-8" strokeWidth={1.4} aria-hidden />
        <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Your Love Type
        </span>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight">
          {HOPE_TYPE_LABEL[result.primary]}
        </h1>
        <p className="text-xs text-muted-foreground">
          副タイプ：{HOPE_TYPE_LABEL[result.secondary]}
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-muted/30 p-8">
        <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
          About You
        </h2>
        <p className="text-sm leading-relaxed">{result.description}</p>
      </section>

      <section className="border-t border-border pt-12">
        <h2 className="mb-6 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
          Score Breakdown
        </h2>
        <ul className="flex flex-col gap-4">
          {sortedScores.map(([type, score], i) => (
            <li key={type} className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <span className={cn('text-sm', i === 0 && 'font-semibold')}>
                  {HOPE_TYPE_LABEL[type]}
                </span>
                <span className="font-mont text-xs text-muted-foreground">{score}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn('h-full transition-all', i === 0 ? 'bg-foreground' : 'bg-muted-foreground/40')}
                  style={{ width: `${maxScore === 0 ? 0 : (score / maxScore) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border pt-12">
        <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
          Match Hints
        </h2>
        <p className="text-sm leading-relaxed">{result.matchHints}</p>
      </section>

      <div className="flex flex-col gap-3 border-t border-border pt-12">
        <Link href="/home" className="block">
          <Button fullWidth size="lg" className="gap-2">
            <Check className="h-4 w-4" aria-hidden />
            このタイプで会員を見る
          </Button>
        </Link>
        <Button variant="ghost" size="lg" onClick={onReset}>
          もう一度診断する
        </Button>
      </div>

      <p className="mt-6 text-center text-[11px] text-muted-foreground">
        さらに掘り下げて相談したい方は{' '}
        <Link
          href="/packages/consult"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          個別相談（無料・30分）
        </Link>
        へ
      </p>
    </div>
  );
}
