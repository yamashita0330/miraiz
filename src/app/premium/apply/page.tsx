'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  CreditCard,
  Building2,
  Lock,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { MembershipPlan } from '@/lib/demo';

const PLAN_INFO: Record<Exclude<MembershipPlan, 'free'>, {
  name: string;
  emoji: string;
  price: number;
  priceLabel: string;
  paymentMethod: 'card' | 'transfer';
  isAnnual: boolean;
}> = {
  ume: {
    name: '梅',
    emoji: '🌸',
    price: 2390,
    priceLabel: '¥2,390/月',
    paymentMethod: 'card',
    isAnnual: false,
  },
  take: {
    name: '竹',
    emoji: '🎍',
    price: 9800,
    priceLabel: '¥9,800/月',
    paymentMethod: 'card',
    isAnnual: false,
  },
  matsu: {
    name: '松',
    emoji: '🌲',
    price: 298000,
    priceLabel: '¥298,000/年',
    paymentMethod: 'transfer',
    isAnnual: true,
  },
};

function ApplyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planParam = searchParams.get('plan') as 'ume' | 'take' | 'matsu' | null;
  const plan = planParam && PLAN_INFO[planParam] ? planParam : 'ume';
  const info = PLAN_INFO[plan];

  type Step = 'agreement' | 'form' | 'processing' | 'done';
  const [step, setStep] = useState<Step>('agreement');
  const [agreed, setAgreed] = useState(false);
  const [agreedSpecial, setAgreedSpecial] = useState(false);
  const [wantInitialChat, setWantInitialChat] = useState(false); // 竹のみ：山下相談オプション

  // カード情報（梅・竹）
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [holderName, setHolderName] = useState('');

  // 申込者情報（松）
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const formatCardNumber = (input: string) => {
    return input
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();
  };

  const formatExpiry = (input: string) => {
    const digits = input.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const cardValid =
    cardNumber.replace(/\s/g, '').length === 16 &&
    /^\d{2}\/\d{2}$/.test(expiry) &&
    cvc.length >= 3 &&
    holderName.trim().length > 0;

  const transferValid =
    name.trim().length > 0 && email.includes('@') && phone.length >= 10;

  const submit = () => {
    setStep('processing');
    setTimeout(() => setStep('done'), 1800);
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-8">
          {step === 'agreement' && (
            <Link
              href="/premium"
              className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" aria-hidden />
              プラン選択へ戻る
            </Link>
          )}

          {/* STEP 1: 同意・概要書面 */}
          {step === 'agreement' && (
            <>
              <h1 className="mb-2 text-2xl font-semibold tracking-tight">
                {info.emoji} {info.name}プラン お申込み
              </h1>
              <p className="mb-6 text-sm text-muted-foreground">{info.priceLabel}</p>

              {/* 概要書面（特定継続的役務提供）のサマリー */}
              <section className="mb-6 rounded-2xl border-2 border-warn bg-warn-50 p-5">
                <div className="mb-3 flex items-baseline gap-2">
                  <AlertTriangle className="h-4 w-4 text-warn" strokeWidth={1.8} aria-hidden />
                  <p className="text-xs font-semibold text-warn">
                    特定継続的役務提供 概要書面
                  </p>
                </div>
                <ul className="flex flex-col gap-2 text-[11px] leading-relaxed">
                  <li>・サービス内容：MIRAIZ {info.name}プラン会員サービス</li>
                  <li>
                    ・料金：{info.priceLabel}
                    {info.isAnnual ? '（一括前払い・銀行振込）' : '（毎月クレジットカード決済）'}
                  </li>
                  <li>・契約期間：{info.isAnnual ? '1年契約' : '月単位（自動更新）'}</li>
                  <li>
                    ・<strong>クーリングオフ：契約日から8日以内は無条件解約可能（書面通知）</strong>
                  </li>
                  <li>
                    ・中途解約：残月分の按分返金（中途解約手数料は契約金額の2%上限）
                  </li>
                  <li>・運営：株式会社FUSHIME（徳島県）</li>
                  <li>・届出：徳島県公安委員会届出 第7520XXXXX号（インターネット異性紹介事業）</li>
                </ul>
                <p className="mt-3 rounded-lg border border-warn/30 bg-background/60 px-3 py-2 text-[10px] leading-relaxed text-muted-foreground">
                  完全な契約書面（PDF）は申込確定後にメール送付されます。
                </p>
              </section>

              {/* 規約同意 */}
              <div className="mb-3 flex flex-col gap-3">
                <label className="flex items-start gap-3 cursor-pointer rounded-2xl border border-border bg-card p-4 hover:bg-muted/30">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4"
                  />
                  <span className="text-xs leading-relaxed">
                    <strong>利用規約・プライバシーポリシー</strong>に同意します。<br />
                    <span className="text-muted-foreground">
                      将来のパートナー探し以外の目的（遊び・既婚・営業/勧誘等）での利用は禁止。違反確認時は即時退会・返金なしとします。
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer rounded-2xl border border-border bg-card p-4 hover:bg-muted/30">
                  <input
                    type="checkbox"
                    checked={agreedSpecial}
                    onChange={(e) => setAgreedSpecial(e.target.checked)}
                    className="mt-0.5 h-4 w-4"
                  />
                  <span className="text-xs leading-relaxed">
                    <strong>概要書面の内容を理解しました</strong>。<br />
                    <span className="text-muted-foreground">
                      クーリングオフ8日以内・中途解約時の返金規定について理解しました。
                    </span>
                  </span>
                </label>
              </div>

              {/* 竹のみ：山下相談オプション */}
              {plan === 'take' && (
                <label className="mb-6 mt-3 flex items-start gap-3 cursor-pointer rounded-2xl border-2 border-rose bg-rose-50 p-4 hover:bg-rose-100">
                  <input
                    type="checkbox"
                    checked={wantInitialChat}
                    onChange={(e) => setWantInitialChat(e.target.checked)}
                    className="mt-0.5 h-4 w-4"
                  />
                  <span className="text-xs leading-relaxed">
                    <strong className="text-rose">入会時に山下代表との初回相談（30分・無料）を希望する</strong><br />
                    <span className="text-muted-foreground">
                      決済完了後、別メールで予約URLをお送りします。
                    </span>
                  </span>
                </label>
              )}

              <Button
                fullWidth
                size="lg"
                disabled={!agreed || !agreedSpecial}
                onClick={() => setStep('form')}
                className="gap-2"
              >
                {info.paymentMethod === 'card' ? '決済情報入力へ' : '申込情報入力へ'}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Button>
            </>
          )}

          {/* STEP 2: 入力フォーム */}
          {step === 'form' && (
            <>
              <button
                onClick={() => setStep('agreement')}
                className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-3 w-3" aria-hidden />
                戻る
              </button>

              <h1 className="mb-2 text-2xl font-semibold tracking-tight">
                {info.paymentMethod === 'card' ? 'お支払い' : '申込情報'}
              </h1>

              {/* 注文内容 */}
              <section className="mb-6 rounded-2xl border border-border bg-card p-5">
                <p className="text-xs font-medium">{info.emoji} MIRAIZ {info.name}プラン</p>
                <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
                  <span className="text-xs">合計</span>
                  <span className={cn(
                    'font-mont text-2xl font-medium tracking-tight',
                    plan === 'matsu' ? 'text-blue-700' : 'text-rose'
                  )}>
                    {info.priceLabel}
                  </span>
                </div>
              </section>

              {/* カード決済（梅・竹） */}
              {info.paymentMethod === 'card' && (
                <section className="mb-6">
                  <h2 className="mb-3 flex items-baseline gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    <CreditCard className="h-3 w-3" aria-hidden />
                    クレジットカード情報
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
                    Stripeで安全に処理 / 自動継続
                  </p>
                </section>
              )}

              {/* 振込（松） */}
              {info.paymentMethod === 'transfer' && (
                <section className="mb-6">
                  <h2 className="mb-3 flex items-baseline gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    <Building2 className="h-3 w-3" aria-hidden />
                    申込者情報
                  </h2>
                  <div className="flex flex-col gap-3">
                    <Field label="お名前（フルネーム）">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="山下 拓海"
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </Field>
                    <Field label="メールアドレス">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@miraiz.app"
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </Field>
                    <Field label="電話番号">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="08012345678"
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </Field>
                  </div>

                  {/* 振込先案内 */}
                  <section className="mt-5 rounded-2xl border-2 border-blue-700 bg-blue-50 p-5">
                    <div className="mb-3 flex items-baseline gap-2 text-blue-900">
                      <Building2 className="h-4 w-4" aria-hidden />
                      <p className="text-xs font-semibold">振込先口座</p>
                    </div>
                    <dl className="flex flex-col gap-2 text-xs">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">銀行名</dt>
                        <dd className="font-medium">阿波銀行 徳島駅前支店</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">口座種別</dt>
                        <dd className="font-medium">普通</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">口座番号</dt>
                        <dd className="font-mont font-medium">1234567</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">名義</dt>
                        <dd className="font-medium">カ）フシメ</dd>
                      </div>
                      <div className="flex items-baseline justify-between border-t border-blue-700/30 pt-2 mt-2">
                        <dt className="font-semibold">振込金額</dt>
                        <dd className="font-mont text-base font-semibold text-blue-900">¥298,000</dd>
                      </div>
                    </dl>
                    <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
                      ※ 申込確認後、弊社で入金確認次第アクティベートします（通常1-2営業日）
                    </p>
                  </section>
                </section>
              )}

              <Button
                fullWidth
                size="lg"
                disabled={info.paymentMethod === 'card' ? !cardValid : !transferValid}
                onClick={submit}
                className={cn(
                  plan === 'matsu' && 'bg-blue-700 hover:bg-blue-800 text-white'
                )}
              >
                {info.paymentMethod === 'card'
                  ? `${info.priceLabel} を支払う`
                  : '申込内容を送信する'}
              </Button>

              <p className="mt-4 rounded-lg border border-border bg-muted/30 px-3 py-2 text-[10px] leading-relaxed text-muted-foreground">
                ※ デモ用です。実際の決済は行われません。任意の値で進めます。
              </p>
            </>
          )}

          {/* PROCESSING */}
          {step === 'processing' && (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" aria-hidden />
              <p className="text-sm font-medium">
                {info.paymentMethod === 'card' ? '決済処理中…' : '申込内容を送信中…'}
              </p>
            </div>
          )}

          {/* DONE */}
          {step === 'done' && (
            <div className="flex flex-col items-center gap-5 px-2 py-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success text-success-foreground">
                <CheckCircle2 className="h-7 w-7" strokeWidth={2.5} aria-hidden />
              </div>
              <Badge variant="goldSoft" className="text-[10px]">
                {info.paymentMethod === 'card' ? '会員登録完了' : '申込受付完了'}
              </Badge>
              <h1 className="text-xl font-semibold tracking-tight">
                ご申込ありがとうございます
              </h1>
              <p className="text-xs leading-relaxed text-muted-foreground max-w-sm">
                {info.emoji} {info.name}プラン<br />
                {info.priceLabel}<br /><br />
                {info.paymentMethod === 'card' ? (
                  '決済が完了しました。アプリ内のすべての特典がご利用可能になりました。'
                ) : (
                  '振込確認後（通常1-2営業日）、ご登録メールアドレスへ承認通知をお送りします。'
                )}
              </p>

              {plan === 'take' && wantInitialChat && (
                <div className="mt-2 rounded-2xl border border-rose bg-rose-50 px-4 py-3 text-[11px] leading-relaxed">
                  <strong className="text-rose">山下代表との初回相談</strong>の予約URLを別メールでお送りします。
                </div>
              )}

              <div className="mt-4 flex w-full max-w-xs flex-col gap-2">
                <Button fullWidth size="lg" onClick={() => router.push('/mypage')}>
                  マイページへ
                </Button>
                <Link href="/premium">
                  <Button fullWidth size="lg" variant="ghost">
                    プラン一覧へ
                  </Button>
                </Link>
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

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ApplyContent />
    </Suspense>
  );
}
