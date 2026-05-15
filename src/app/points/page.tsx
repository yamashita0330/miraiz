import Link from 'next/link';
import { Coins, Store, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { DEMO_USER_STATE } from '@/lib/demo';

export const dynamic = 'force-dynamic';

const HISTORY = [
  { date: '2026-04-28', label: '来店キャッシュバック（5%）', shop: 'Hair&Make ROSE', amount: 540 },
  { date: '2026-04-15', label: '来店キャッシュバック（5%）', shop: 'NAIL atelier 徳島', amount: 320 },
  { date: '2026-03-30', label: '来店キャッシュバック（5%）', shop: 'BARBER 麗', amount: 250 },
  { date: '2026-03-12', label: 'スタンプ3カテゴリ達成ボーナス', shop: '—', amount: 500 },
];

export default function CouponPage() {
  const balance = DEMO_USER_STATE.points;

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <div className="flex flex-col gap-12">
            {/* 残高 */}
            <header className="flex flex-col gap-4">
              <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Coupon Balance
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-mont text-5xl font-medium tracking-tight">
                  ¥{balance.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                次回の提携サロン来店時に¥1単位で利用可能。有効期限は最終獲得日から1年。
              </p>
            </header>

            {/* 増やし方 */}
            <section className="rounded-2xl border-2 border-rose bg-rose-50 p-6">
              <div className="flex items-baseline gap-2 text-rose">
                <Coins className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                <p className="text-xs font-medium">クーポンの貯め方</p>
              </div>
              <ul className="mt-3 flex flex-col gap-2 text-[11px] leading-relaxed">
                <li className="flex items-baseline gap-2">
                  <span className="text-rose">①</span>
                  <span>提携サロン来店時にQRスキャン → <span className="font-medium">来店金額の5%</span>がキャッシュバック</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-rose">②</span>
                  <span>垢抜けスタンプ3カテゴリ達成 → <span className="font-medium">¥500ボーナス</span></span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-rose">③</span>
                  <span>8カテゴリ全制覇 → <span className="font-medium">¥3,000クーポン＋バッジ</span></span>
                </li>
              </ul>
              <Link href="/partners" className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-rose">
                提携サロンを見る
                <ArrowRight className="h-3 w-3" aria-hidden />
              </Link>
            </section>

            {/* 履歴 */}
            <section>
              <h2 className="mb-6 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                History
              </h2>
              <ul className="flex flex-col gap-3">
                {HISTORY.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-baseline justify-between rounded-2xl border border-border bg-card px-5 py-4"
                  >
                    <div className="flex flex-col gap-0.5">
                      <p className="text-xs font-medium">{h.label}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {h.date}{h.shop !== '—' ? ` ・ ${h.shop}` : ''}
                      </p>
                    </div>
                    <span className="font-mont text-sm font-medium text-rose">
                      +¥{h.amount.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* CTA */}
            <Link href="/partners">
              <Button fullWidth size="lg" className="gap-2">
                <Store className="h-4 w-4" aria-hidden />
                提携サロンで使う
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
