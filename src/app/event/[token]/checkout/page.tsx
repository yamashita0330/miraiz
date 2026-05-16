'use client';

import { useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Lock, Loader2, Check, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { findDemoEvent, grantEventTicket } from '@/lib/demo';

type Step = 'form' | 'processing' | 'done';

export default function CheckoutPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const event = findDemoEvent(params.token);

  const [step, setStep] = useState<Step>('form');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [holderName, setHolderName] = useState('');

  if (!event) notFound();

  const cardValid =
    cardNumber.replace(/\s/g, '').length === 16 &&
    /^\d{2}\/\d{2}$/.test(expiry) &&
    cvc.length >= 3 &&
    holderName.trim().length > 0;

  const submit = () => {
    if (!cardValid) return;
    setStep('processing');
    setTimeout(() => {
      grantEventTicket(params.token);
      setStep('done');
    }, 1800);
  };

  const formatCardNumber = (input: string) => {
    const digits = input.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (input: string) => {
    const digits = input.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-8">
          {step === 'form' && (
            <Link
              href={`/event/${params.token}`}
              className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" aria-hidden />
              イベント詳細へ戻る
            </Link>
          )}

          {/* FORM */}
          {step === 'form' && (
            <>
              <h1 className="mb-2 text-xl font-semibold tracking-tight">お支払い</h1>
              <p className="mb-6 text-xs leading-relaxed text-muted-foreground">
                クレジットカード情報を入力してください。お支払いはStripeで安全に処理されます。
              </p>

              {/* 注文内容 */}
              <section className="mb-6 rounded-2xl border border-border bg-card p-5">
                <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  注文内容
                </p>
                <p className="text-sm font-semibold">{event.name}</p>
                <div className="mt-2 flex flex-col gap-1 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" aria-hidden />
                    {formatDateTime(event.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" aria-hidden />
                    {event.venue}
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between border-t border-border pt-3">
                  <span className="text-xs font-medium">小計</span>
                  <span className="font-mont text-base font-medium">
                    ¥{event.ticket_price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-xs font-medium">合計</span>
                  <span className="font-mont text-2xl font-medium tracking-tight text-rose">
                    ¥{event.ticket_price.toLocaleString()}
                  </span>
                </div>
              </section>

              {/* カード情報 */}
              <section className="mb-6">
                <h2 className="mb-3 flex items-baseline gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  <CreditCard className="h-3 w-3" aria-hidden />
                  カード情報
                </h2>
                <div className="flex flex-col gap-3">
                  <Field label="カード番号">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="4242 4242 4242 4242"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 font-mont text-sm tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="有効期限">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 font-mont text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </Field>
                    <Field label="CVC">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="123"
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 font-mont text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </Field>
                  </div>
                  <Field label="カード名義（ローマ字）">
                    <input
                      type="text"
                      value={holderName}
                      onChange={(e) => setHolderName(e.target.value.toUpperCase())}
                      placeholder="TARO YAMASHITA"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </Field>
                </div>

                <p className="mt-3 inline-flex items-baseline gap-1 text-[10px] text-muted-foreground">
                  <Lock className="h-3 w-3 shrink-0" aria-hidden />
                  暗号化された安全な決済（Stripe）
                </p>
              </section>

              <Button fullWidth size="lg" disabled={!cardValid} onClick={submit}>
                ¥{event.ticket_price.toLocaleString()} を支払う
              </Button>

              <p className="mt-4 rounded-lg border border-border bg-muted/30 px-3 py-2 text-[10px] leading-relaxed text-muted-foreground">
                ※ デモ用です。実際の決済は行われません。「4242 4242 4242 4242」など任意の値で進めます。
              </p>
            </>
          )}

          {/* PROCESSING */}
          {step === 'processing' && (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" aria-hidden />
              <p className="text-sm font-medium">決済処理中…</p>
              <p className="text-[11px] text-muted-foreground">数秒お待ちください</p>
            </div>
          )}

          {/* DONE */}
          {step === 'done' && (
            <div className="flex flex-col items-center gap-5 px-2 py-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success text-success-foreground">
                <Check className="h-7 w-7" strokeWidth={2.5} aria-hidden />
              </div>
              <Badge variant="goldSoft" className="text-[10px]">
                チケット発行完了
              </Badge>
              <h1 className="text-xl font-semibold tracking-tight">
                ご購入ありがとうございます
              </h1>
              <p className="text-xs leading-relaxed text-muted-foreground max-w-sm">
                {event.name}<br />
                {formatDateTime(event.date)}<br />
                {event.venue}
              </p>

              {/* 次のステップ：イベント用プロフィール */}
              <div className="mt-2 w-full max-w-sm rounded-2xl border-2 border-rose bg-rose-50 p-5 text-left">
                <p className="font-mont text-[10px] uppercase tracking-[0.3em] text-rose">
                  Next Step
                </p>
                <p className="mt-1.5 text-sm font-semibold">イベント用プロフィールを入力</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  当日の席順マッチングに使います。マイページ入力済みの方は情報を引き継げます。
                </p>
              </div>

              <div className="mt-2 flex w-full max-w-xs flex-col gap-2">
                <Button
                  fullWidth
                  size="lg"
                  onClick={() => router.push(`/event/${params.token}/profile`)}
                  className="gap-2"
                >
                  イベント用プロフィールを入力
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Button>
                <Button
                  fullWidth
                  size="lg"
                  variant="ghost"
                  onClick={() => router.push(`/event/${params.token}`)}
                >
                  あとで（イベント詳細へ）
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const wd = ['日', '月', '火', '水', '木', '金', '土'][d.getDay()];
  const hh = d.getHours().toString().padStart(2, '0');
  const mm = d.getMinutes().toString().padStart(2, '0');
  return `${month}/${day}(${wd}) ${hh}:${mm}`;
}
