import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, ArrowRight, TrendingUp, Sparkles, Tag, Coins, Eye, Stamp } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  findDemoPartner,
  PARTNER_CATEGORY_LABEL,
  VISIT_SCORE_UPLIFT,
  SCORE_DIMENSION_LABEL,
  DEMO_USER_STATE,
  DEMO_VISITS,
  calcCustomerReward,
} from '@/lib/demo';

export default function ScanResultPage({ params }: { params: { id: string } }) {
  const partner = findDemoPartner(params.id);
  if (!partner) notFound();

  const uplifts = VISIT_SCORE_UPLIFT[partner.category] ?? [];
  const visitDate = new Date().toISOString().slice(0, 10);

  // モック：来店金額（メニュー価格）→ 5%還元
  const expectedAmount = partner.menus?.[0]?.member_price ?? partner.base_price;
  const reward = calcCustomerReward(expectedAmount);

  // 自分の来店履歴とスタンプカード（8カテゴリ全制覇まで）
  const myVisits = DEMO_VISITS.filter((v) => v.user_id === DEMO_USER_STATE_ID());
  const visitedCategories = new Set(
    myVisits.map((v) => findDemoPartner(v.partner_id)?.category).filter(Boolean)
  );
  visitedCategories.add(partner.category); // 今回の来店を加算
  const totalCategories = 8;
  const stampProgress = Math.min(visitedCategories.size, totalCategories);
  const stampLeft = totalCategories - stampProgress;

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          {/* 成功 */}
          <header className="flex flex-col items-center gap-3 text-center">
            <CheckCircle2 className="h-12 w-12 text-success" strokeWidth={1.4} aria-hidden />
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Visit Recorded
            </span>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight">
              来店を記録しました
            </h1>
            <p className="text-xs text-muted-foreground">{visitDate}</p>
          </header>

          {/* 店員提示用バナー（最重要・スキャン後の主役） */}
          <section className="mt-10 rounded-3xl border-2 border-foreground bg-foreground p-8 text-background">
            <div className="flex items-baseline justify-between">
              <span className="font-mont text-[10px] uppercase tracking-[0.4em] opacity-70">
                Show This to Staff
              </span>
              <Eye className="h-4 w-4 opacity-70" aria-hidden />
            </div>
            <p className="mt-4 text-xl font-semibold leading-snug">
              この画面を<br />スタッフにご提示ください
            </p>
            <p className="mt-3 text-xs leading-relaxed opacity-80">
              提示で会員価格が適用されます。<br />
              提示しないと一般価格になります。
            </p>
            <div className="mt-5 flex items-baseline gap-2 rounded-lg bg-background/10 px-4 py-3">
              <Tag className="h-3.5 w-3.5 opacity-70" aria-hidden />
              <span className="text-xs font-medium">{partner.member_offer}</span>
            </div>
          </section>

          {/* 店舗情報 */}
          <section className="mt-6 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <Badge variant="soft" className="text-[9px]">
                {PARTNER_CATEGORY_LABEL[partner.category]}
              </Badge>
              {partner.is_owned && <Badge variant="goldSoft" className="text-[9px]">公式</Badge>}
            </div>
            <p className="mt-3 text-base font-semibold">{partner.name}</p>
            <p className="text-xs text-muted-foreground">{partner.address}</p>
          </section>

          {/* メリット 1: キャッシュバック（経済的価値・最重要） */}
          <section className="mt-6 rounded-2xl border-2 border-rose bg-rose-50 p-6">
            <div className="flex items-baseline gap-2 text-rose">
              <Coins className="h-4 w-4" strokeWidth={1.8} aria-hidden />
              <p className="text-xs font-medium">来店キャッシュバック</p>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-mont text-3xl font-medium tracking-tight text-rose">
                ¥{reward.toLocaleString()}
              </span>
              <span className="text-sm text-rose">分のクーポン</span>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              来店金額の <span className="font-mont">5%</span> を次回提携サロン来店時に使える
              <span className="font-medium">キャッシュバッククーポン</span>として進呈。
            </p>
            <div className="mt-4 flex items-baseline justify-between rounded-lg bg-white/50 px-4 py-3">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                クーポン残高
              </span>
              <span className="font-mont text-sm font-medium">
                ¥{(DEMO_USER_STATE.points + reward).toLocaleString()}
              </span>
            </div>
          </section>

          {/* メリット 2: 通知表スコアアップ */}
          {uplifts.length > 0 && (
            <section className="mt-6 rounded-2xl border-2 border-success bg-success-50 p-6">
              <div className="flex items-baseline gap-2 text-success">
                <TrendingUp className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                <p className="text-xs font-medium">通知表スコア アップ</p>
              </div>
              <ul className="mt-4 flex flex-col gap-3">
                {uplifts.map((u) => (
                  <li key={u.dimension} className="flex items-baseline justify-between">
                    <span className="text-sm font-medium">
                      {SCORE_DIMENSION_LABEL[u.dimension]}
                    </span>
                    <span className="font-mont text-xl font-medium tracking-tight text-success">
                      +{u.delta}
                      <span className="ml-1 text-[10px] text-muted-foreground">点</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground">
                次回イベントで{partner.category === 'communication' ? '話しやすさ' : '見た目印象'}が上がっているはずです。
              </p>
            </section>
          )}

          {/* メリット 3: スタンプカード */}
          <section className="mt-6 rounded-2xl border-2 border-brandGold bg-brandGold-50 p-6">
            <div className="flex items-baseline gap-2 text-brandGold">
              <Stamp className="h-4 w-4" strokeWidth={1.8} aria-hidden />
              <p className="text-xs font-medium">垢抜けスタンプ</p>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-mont text-3xl font-medium tracking-tight text-brandGold">
                {stampProgress}
              </span>
              <span className="font-mont text-sm text-muted-foreground">/ {totalCategories}</span>
              <span className="ml-auto text-[10px] text-muted-foreground">
                {stampLeft > 0 ? `あと${stampLeft}カテゴリ` : 'コンプリート！'}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-8 gap-1.5">
              {Array.from({ length: totalCategories }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-md ${
                    i < stampProgress
                      ? 'bg-brandGold'
                      : 'bg-white/60 border border-brandGold/30'
                  }`}
                  aria-hidden
                />
              ))}
            </div>
            <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground">
              3カテゴリ達成で<span className="font-medium">山下代表との仲人1時間Zoom相談</span>が解放されます。
            </p>
          </section>

          {/* CTAs */}
          <div className="mt-12 flex flex-col gap-3">
            <Link href="/points">
              <Button fullWidth size="lg" className="gap-2">
                <Coins className="h-4 w-4" aria-hidden />
                クーポン残高を見る
              </Button>
            </Link>
            <Link href="/tsuchihyo">
              <Button fullWidth variant="outline" size="lg" className="gap-2">
                <Sparkles className="h-4 w-4" aria-hidden />
                通知表でスコアを確認
              </Button>
            </Link>
            <Link href="/home" className="text-center text-xs text-muted-foreground hover:text-foreground">
              ホームに戻る
            </Link>
          </div>

          {/* 来店履歴 */}
          <section className="mt-12 border-t border-border pt-12">
            <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              Visit History
            </h2>
            <Link
              href="/mypage"
              className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 transition-all hover:border-foreground/30"
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium">来店履歴・累計還元ポイント</p>
                <p className="text-[10px] text-muted-foreground">過去の来店記録・スコア成長グラフ</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />
            </Link>
          </section>
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function DEMO_USER_STATE_ID(): string {
  return 'demo-me';
}
