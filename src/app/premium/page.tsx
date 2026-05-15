'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DEMO_USER_STATE } from '@/lib/demo';

type Tier = {
  id: 'ume' | 'take' | 'matsu';
  number: string;
  enName: string;
  jaName: string;
  subtitle: string;
  price: string;
  priceUnit: string;
  paymentNote: string;
  features: string[];
  ctaPath: string;
  isPremium: boolean;
};

const TIERS: Tier[] = [
  {
    id: 'ume',
    number: '01',
    enName: 'UME',
    jaName: '梅',
    subtitle: 'まず気軽に試す（女性は永年無料）',
    price: '2,980',
    priceUnit: '円 / 月（男性）',
    paymentNote: 'クレジットカード・自動継続 / 女性は永年無料',
    features: [
      '1日3人スワイプ',
      'スワイプ通知表 5人まで閲覧',
      '既読確認',
      '月例マインドセット会 初回無料',
      '自分の通知表 月1回無料閲覧',
      'プロ撮影 加盟スタジオ ¥6,000で予約可',
    ],
    ctaPath: '/premium/apply?plan=ume',
    isPremium: false,
  },
  {
    id: 'take',
    number: '02',
    enName: 'TAKE',
    jaName: '竹',
    subtitle: '仲人が伴走する',
    price: '12,000',
    priceUnit: '円 / 月',
    paymentNote: 'クレジットカード・自動継続',
    features: [
      '梅プランの全機能',
      '仲人 Zoom 30分 月1回',
      'デート前ブリーフィング',
      'デート後カウンセリング（Zoom）',
      'スワイプ通知表 15人まで閲覧',
      '加盟店 月1回 半額利用',
      'プロ撮影 ¥6,000 予約優先枠',
      'イベント早割 1,000円・優先入場',
      '入会時 山下代表との初回相談（任意・無料）',
      '3ヶ月マッチなし保証（4ヶ月目以降の月額半額）',
    ],
    ctaPath: '/premium/apply?plan=take',
    isPremium: false,
  },
  {
    id: 'matsu',
    number: '03',
    enName: 'MATSU',
    jaName: '松',
    subtitle: '結婚まで完全コーチング',
    price: '298,000',
    priceUnit: '円 / 年（月¥24,833相当）',
    paymentNote: '銀行振込・年一括前払い',
    features: [
      '竹プランの全機能',
      '対面マッチングセッション 月1回',
      '仲人 Zoom 30分 月2回',
      '両想い後 対面で話す',
      '加盟店 月1回 完全無料',
      'スワイプ通知表 30人まで＋月次レポート',
      '通知表 読み放題',
      'プロ撮影 年1回 完全無料（通常¥18,000）',
      '300名以上イベント 無料招待',
      '成婚お祝い金 30,000円',
      '3ヶ月マッチなし保証（4ヶ月目以降の月額半額相当の延長）',
    ],
    ctaPath: '/premium/apply?plan=matsu',
    isPremium: true,
  },
];

const COMPARISON_ROWS = [
  { label: '月額（男性）', free: '¥0', ume: '¥2,980', take: '¥12,000', matsu: '¥24,833相当' },
  { label: '女性料金', free: '¥0', ume: '永年無料', take: '¥12,000', matsu: '¥24,833相当' },
  { label: '1日のスワイプ', free: '1人', ume: '3人', take: '3人', matsu: '3人' },
  { label: 'スワイプ通知表', free: '—', ume: '5人', take: '15人', matsu: '30人' },
  { label: '既読確認', free: '—', ume: '◯', take: '◯', matsu: '◯' },
  { label: '仲人 Zoom', free: '—', ume: '—', take: '月 1回', matsu: '月 2回' },
  { label: '対面セッション', free: '—', ume: '—', take: '—', matsu: '月 1回' },
  { label: 'デート前後ブリーフィング', free: '—', ume: '—', take: '◯', matsu: '◯' },
  { label: '加盟店利用', free: '—', ume: '—', take: '月1半額', matsu: '月1無料' },
  { label: 'プロ撮影', free: '通常¥18,000', ume: '¥6,000', take: '¥6,000 優先枠', matsu: '年1回無料' },
  { label: '3ヶ月マッチなし保証', free: '—', ume: '—', take: '◯', matsu: '◯' },
  { label: '300名超イベント', free: '—', ume: '—', take: '—', matsu: '無料招待' },
  { label: '成婚お祝い金', free: '—', ume: '—', take: '—', matsu: '30,000円' },
];

export default function PremiumPage() {
  const [showCompare, setShowCompare] = useState(false);
  const currentPlan = DEMO_USER_STATE.plan;

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-32">
        <div className="mx-auto max-w-xl px-8 pt-16 pb-12">
          {/* タイトル */}
          <header className="mb-20 flex flex-col gap-6">
            <span className="font-mont text-[10px] uppercase tracking-[0.6em] text-muted-foreground">
              MIRAIZ Membership
            </span>
            <h1 className="text-[44px] font-light leading-[1.1] tracking-tight">
              未来を磨く、<br />
              三つの選択。
            </h1>
            <p className="max-w-[320px] text-[13px] leading-[1.85] text-muted-foreground">
              出逢いの解像度は、関係性の温度で変わる。
              一人で動くか、仲人と歩むか、結婚まで伴走されるか。
            </p>

            {/* 女性永年無料バナー */}
            <div className="mt-6 inline-flex items-baseline gap-2 rounded-full bg-rose-50 border border-rose px-4 py-2 text-[11px] w-fit">
              <span className="font-mont font-semibold text-rose">FEMALE FREE</span>
              <span className="text-foreground">女性は梅プラン永年無料</span>
            </div>
          </header>

          {/* 現在のプラン表示 */}
          {currentPlan !== 'free' && (
            <div className="mb-12 inline-flex items-baseline gap-3 border-l-2 border-foreground pl-4">
              <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Current
              </span>
              <span className="text-sm font-medium">
                {TIERS.find((t) => t.id === currentPlan)?.jaName}プラン 加入中
              </span>
            </div>
          )}

          {/* 3プラン縦並び */}
          <section className="flex flex-col">
            {TIERS.map((tier, i) => (
              <PlanSection
                key={tier.id}
                tier={tier}
                isCurrent={currentPlan === tier.id}
                isLast={i === TIERS.length - 1}
              />
            ))}
          </section>

          {/* 比較表トグル */}
          <button
            type="button"
            onClick={() => setShowCompare(!showCompare)}
            className="mt-16 flex w-full items-center justify-center gap-2 border-y border-border py-5 text-xs font-medium tracking-wider uppercase hover:bg-muted/30 transition-colors"
          >
            Compare All Plans
            <ChevronDown
              className={cn('h-3 w-3 transition-transform', showCompare && 'rotate-180')}
              aria-hidden
            />
          </button>

          {/* 比較表 */}
          {showCompare && (
            <section className="mt-8">
              <div className="grid grid-cols-5 gap-1 border-b border-foreground pb-3 text-[10px] font-mont uppercase tracking-wider">
                <div className="col-span-1 text-muted-foreground">Feature</div>
                <div className="text-center text-muted-foreground">Free</div>
                <div className="text-center">Ume</div>
                <div className="text-center">Take</div>
                <div className="text-center">Matsu</div>
              </div>
              {COMPARISON_ROWS.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-5 gap-1 border-b border-border py-3.5 text-[11px]"
                >
                  <div className="col-span-1 text-foreground">{row.label}</div>
                  <div className="text-center text-muted-foreground">{row.free}</div>
                  <div className="text-center">{row.ume}</div>
                  <div className="text-center font-medium">{row.take}</div>
                  <div className="text-center font-semibold">{row.matsu}</div>
                </div>
              ))}
            </section>
          )}

          {/* 法的注意 */}
          <footer className="mt-20 border-t border-border pt-8 text-[10px] leading-[1.85] text-muted-foreground">
            <p>申込前に概要書面（特定継続的役務提供）をご確認ください。</p>
            <p>クーリングオフ8日以内・中途解約時は残月分返金（特商法準拠）。</p>
            <p>運営：株式会社FUSHIME / 徳島県公安委員会届出済</p>
          </footer>
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function PlanSection({
  tier,
  isCurrent,
  isLast,
}: {
  tier: Tier;
  isCurrent: boolean;
  isLast: boolean;
}) {
  return (
    <article
      className={cn(
        'flex flex-col gap-8 py-12',
        !isLast && 'border-b border-border'
      )}
    >
      {/* ナンバリング + 英名 */}
      <div className="flex items-baseline gap-4">
        <span className="font-mont text-xs tracking-[0.4em] text-muted-foreground">
          {tier.number}
        </span>
        <span
          className={cn(
            'font-mont text-[11px] uppercase tracking-[0.5em]',
            tier.isPremium ? 'text-foreground font-semibold' : 'text-muted-foreground'
          )}
        >
          {tier.enName}
        </span>
      </div>

      {/* メインタイトル */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[40px] font-light leading-none tracking-tight">
          {tier.jaName}
        </h2>
        <p className="text-[13px] text-muted-foreground">{tier.subtitle}</p>
      </div>

      {/* 価格 */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline gap-2">
          <span className="font-mont text-[44px] font-light leading-none tracking-tight">
            {tier.price}
          </span>
          <span className="text-[12px] text-muted-foreground">{tier.priceUnit}</span>
        </div>
        <p className="text-[10px] tracking-wider text-muted-foreground">
          {tier.paymentNote}
        </p>
      </div>

      {/* 機能リスト */}
      <ul className="flex flex-col gap-3 border-t border-border pt-6">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-baseline gap-3 text-[12.5px] leading-[1.7]">
            <span className="font-mont text-[10px] tabular-nums text-muted-foreground w-5 shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="pt-2">
        {!isCurrent ? (
          <Link href={tier.ctaPath}>
            <Button
              fullWidth
              size="lg"
              variant={tier.isPremium ? 'default' : 'outline'}
              className={cn(
                'h-14 text-[13px] tracking-[0.2em] uppercase',
                tier.isPremium && 'bg-foreground text-background'
              )}
            >
              {tier.jaName}プランへ申し込む
            </Button>
          </Link>
        ) : (
          <div className="flex items-center justify-center gap-2 border border-border py-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <CheckCircle2 className="h-3 w-3" aria-hidden />
            Current Plan
          </div>
        )}
      </div>
    </article>
  );
}
