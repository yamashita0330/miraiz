'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, CreditCard, MapPin, Calendar, QrCode, Loader2, Play } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { DEMO_NEXT_EVENT, DEMO_USER_STATE } from '@/lib/demo';

type Step = 'detail' | 'checkout' | 'paying' | 'ticket';

export default function NextEventPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(
    DEMO_USER_STATE.ticketStatus === 'paid' ? 'ticket' : 'detail'
  );

  const handlePay = () => {
    setStep('paying');
    setTimeout(() => setStep('ticket'), 1500);
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          {step === 'detail' && (
            <article className="flex flex-col gap-12">
              <header className="flex flex-col gap-4">
                <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  Vol.5 — Tokushima
                </span>
                <h1 className="text-3xl font-semibold leading-tight tracking-tight">
                  {DEMO_NEXT_EVENT.title}
                </h1>
                <div className="flex items-baseline gap-3">
                  <span className="font-mont text-4xl font-medium tracking-tight">
                    ¥{DEMO_NEXT_EVENT.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">／お一人様</span>
                </div>
                <Badge variant="outline" className="self-start">
                  残り{DEMO_NEXT_EVENT.remaining}席 / 定員{DEMO_NEXT_EVENT.capacity}名
                </Badge>
              </header>

              {/* YouTube動画（イベント詳細） */}
              <section className="flex flex-col gap-4">
                <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                  Watch
                </h2>
                <a
                  href={`https://www.youtube.com/watch?v=${DEMO_NEXT_EVENT.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-video overflow-hidden rounded-2xl border border-border bg-foreground"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${DEMO_NEXT_EVENT.videoId}/hqdefault.jpg`}
                    alt={DEMO_NEXT_EVENT.videoTitle}
                    className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 transition-colors group-hover:bg-foreground/10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose text-rose-foreground shadow-lg transition-transform group-hover:scale-110">
                      <Play className="ml-1 h-7 w-7" fill="currentColor" aria-hidden />
                    </div>
                  </div>
                  <div className="absolute right-3 bottom-3 rounded bg-foreground/85 px-2 py-0.5 font-mont text-[11px] text-background">
                    {DEMO_NEXT_EVENT.videoDuration}
                  </div>
                </a>
                <div className="flex items-baseline justify-between gap-3 px-1">
                  <p className="text-sm font-medium">{DEMO_NEXT_EVENT.videoTitle}</p>
                  <span className="text-[10px] text-muted-foreground">YouTubeで見る →</span>
                </div>
              </section>

              <section className="flex flex-col gap-6 border-t border-border pt-12">
                <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                  Detail
                </h2>
                <dl className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1.6} aria-hidden />
                    <div className="flex flex-col gap-1">
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">Date</dt>
                      <dd className="text-sm leading-relaxed">{DEMO_NEXT_EVENT.dateLabel}</dd>
                      <dd className="text-xs text-muted-foreground">
                        {DEMO_NEXT_EVENT.parts.join('  /  ')}
                      </dd>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1.6} aria-hidden />
                    <div className="flex flex-col gap-1">
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">Venue</dt>
                      <dd className="text-sm leading-relaxed">{DEMO_NEXT_EVENT.venue}</dd>
                      <dd className="text-xs text-muted-foreground">{DEMO_NEXT_EVENT.address}</dd>
                    </div>
                  </div>
                </dl>
              </section>

              <section className="flex flex-col gap-6 border-t border-border pt-12">
                <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                  Highlights
                </h2>
                <ul className="flex flex-col gap-4">
                  {DEMO_NEXT_EVENT.highlights.map((h, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-mont text-sm tabular-nums text-muted-foreground">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-border bg-muted/30 p-8">
                <p className="text-sm font-medium">参加者全員に「恋の通知表」配信</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  当日の印象スコア・両想い候補・改善提案をイベント後にお届けします。
                </p>
              </section>

              <div className="flex flex-col gap-3">
                <Button fullWidth size="lg" onClick={() => setStep('checkout')}>
                  ¥{DEMO_NEXT_EVENT.price.toLocaleString()} で申し込む
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  20歳以上・本人確認済みの方のみご参加いただけます
                </p>
              </div>
            </article>
          )}

          {step === 'checkout' && (
            <div className="flex flex-col gap-10">
              <header className="flex flex-col gap-2">
                <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  Checkout
                </span>
                <h1 className="text-2xl font-semibold tracking-tight">お支払い</h1>
              </header>

              <div className="rounded-2xl border border-border p-8">
                <p className="text-xs text-muted-foreground">{DEMO_NEXT_EVENT.title}</p>
                <p className="mt-2 font-mont text-3xl font-medium tracking-tight">
                  ¥{DEMO_NEXT_EVENT.price.toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <CreditCard className="h-3.5 w-3.5" aria-hidden />
                  Powered by Stripe
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="card">カード番号</Label>
                  <Input id="card" defaultValue="4242 4242 4242 4242" className="font-mont" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="exp">有効期限</Label>
                    <Input id="exp" defaultValue="12/28" className="font-mont" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" defaultValue="123" className="font-mont" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button fullWidth size="lg" onClick={handlePay}>
                  支払う
                </Button>
                <Button
                  fullWidth
                  variant="ghost"
                  size="lg"
                  onClick={() => setStep('detail')}
                >
                  戻る
                </Button>
              </div>
            </div>
          )}

          {step === 'paying' && (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" aria-hidden />
              <p className="text-sm font-medium">決済処理中…</p>
              <p className="text-xs text-muted-foreground">Stripeで安全に処理しています</p>
            </div>
          )}

          {step === 'ticket' && (
            <div className="flex flex-col gap-10">
              <header className="flex flex-col items-center gap-3 text-center">
                <CheckCircle2 className="h-10 w-10 text-foreground" strokeWidth={1.4} aria-hidden />
                <p className="text-base font-medium">参加申込が完了しました</p>
              </header>

              <div className="rounded-2xl border border-border p-8">
                <div className="flex flex-col items-center gap-4 text-center">
                  <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                    Your Ticket
                  </span>
                  <h2 className="text-lg font-semibold tracking-tight">{DEMO_NEXT_EVENT.title}</h2>
                  <p className="text-xs text-muted-foreground">{DEMO_NEXT_EVENT.dateLabel}</p>

                  <div className="my-4 flex aspect-square w-48 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30">
                    <QrCode className="h-24 w-24" strokeWidth={1.2} aria-hidden />
                  </div>

                  <p className="font-mont text-xs tracking-widest text-muted-foreground">
                    QR-VOL5-DEMO
                  </p>
                </div>

                <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-6 text-center">
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">受付番号</dt>
                    <dd className="mt-1 font-mont text-base">#0214</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">参加部</dt>
                    <dd className="mt-1 text-sm">第1部</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">座席</dt>
                    <dd className="mt-1 text-sm">AI割当</dd>
                  </div>
                </dl>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                当日このQRを受付でかざしてチェックインしてください
              </p>

              <Button fullWidth variant="outline" size="lg" onClick={() => router.push('/home')}>
                ホームに戻る
              </Button>
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
