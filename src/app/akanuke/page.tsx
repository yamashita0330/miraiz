import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Star } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScoreCardVisual } from '@/components/ScoreCardVisual';
import {
  DEMO_PARTNERS,
  PARTNER_CATEGORY_LABEL,
  PARTNER_CATEGORY_DESC,
  DEMO_TSUCHIHYO_SAMPLE,
  type PartnerCategory,
} from '@/lib/demo';

// 通知表のサンプルスコアから、改善優先度を計算
function priorityCategories(): { category: PartnerCategory; score: number; reason: string }[] {
  const s = DEMO_TSUCHIHYO_SAMPLE.scores;
  const items: { category: PartnerCategory; score: number; reason: string }[] = [
    { category: 'facial', score: s.appearance, reason: '見た目印象スコア' },
    { category: 'communication', score: s.talkability, reason: '話しやすさスコア' },
    { category: 'hair_salon', score: s.appearance, reason: '見た目印象スコア' },
    { category: 'hair_removal', score: s.appearance, reason: '見た目印象スコア' },
    { category: 'fashion', score: s.appearance, reason: '見た目印象スコア' },
    { category: 'eyelash', score: s.appearance, reason: '見た目印象スコア' },
    { category: 'eyebrow', score: s.appearance, reason: '見た目印象スコア' },
    { category: 'bodymake', score: s.appearance, reason: '見た目印象スコア' },
  ];
  return items.sort((a, b) => a.score - b.score);
}

export default function AkanukePage() {
  const priorities = priorityCategories();
  const topCategories = priorities.slice(0, 3).map((p) => p.category);
  const recommendedPartners = DEMO_PARTNERS
    .filter((p) => topCategories.includes(p.category))
    .slice(0, 4);

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          {/* ヒーロー */}
          <header className="flex flex-col gap-5">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Akanuke
            </span>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight">
              本気の人ほど、<br />垢抜けている。
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              恋の通知表のスコアを起点に、徳島で信頼できる加盟店から<br />
              <span className="font-medium text-foreground">あなたに最も足りないもの</span>を、会員価格で受けられます。
            </p>
          </header>

          {/* 前回の評価ビジュアライズ */}
          <section className="mt-12 rounded-3xl border border-border bg-card p-8">
            <ScoreCardVisual variant="compact" showPartnerCTA={false} />
          </section>

          {/* 4ステップ */}
          <section className="mt-12 border-t border-border pt-12">
            <h2 className="mb-8 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              How it works
            </h2>
            <ol className="flex flex-col gap-8">
              {[
                { title: '恋の通知表でスコアを確認', desc: '前回イベントでもらった印象データから弱点を特定' },
                { title: 'AIが改善カテゴリを推薦', desc: '見た目・話しやすさ・相性スコアの中で最も低い項目を提案' },
                { title: '加盟店から特典を選ぶ', desc: '会員特典で初回50%OFF・無料体験など' },
                { title: '次のイベントで「垢抜けた自分」', desc: '来店QRで通知表スコアが自動アップ' },
              ].map((s, i) => (
                <li key={i} className="flex gap-5">
                  <span className="font-mont text-base font-medium tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold">{s.title}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* あなたへの推薦 */}
          <section className="mt-12 border-t border-border pt-12">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                For You
              </h2>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                通知表スコアから推薦
              </span>
            </div>

            <div className="rounded-2xl border-2 border-foreground bg-foreground/[0.03] p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                改善優先度が高い項目
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {priorities.slice(0, 3).map((p, i) => (
                  <li key={p.category} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mont text-xs tabular-nums text-muted-foreground">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-medium">
                        {PARTNER_CATEGORY_LABEL[p.category]}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {PARTNER_CATEGORY_DESC[p.category]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="mt-6 flex flex-col gap-3">
              {recommendedPartners.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/partners/${p.id}`}
                    className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-foreground/30"
                  >
                    <div className="flex aspect-square h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <span className="font-mont text-[10px] uppercase tracking-[0.2em]">
                        {PARTNER_CATEGORY_LABEL[p.category].slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <p className="truncate text-sm font-semibold">{p.name}</p>
                        {p.is_owned && <Badge variant="goldSoft" className="text-[9px]">公式</Badge>}
                      </div>
                      <p className="line-clamp-1 text-[11px] text-muted-foreground">
                        {p.tagline}
                      </p>
                      <p className="line-clamp-1 text-[11px] font-medium">
                        {p.member_offer}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                        <Star className="h-3 w-3 fill-current" aria-hidden />
                        <span>{p.rating}</span>
                      </div>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>

            <Link href="/partners" className="mt-6 block">
              <Button fullWidth variant="outline" size="lg">
                全カテゴリーを見る
              </Button>
            </Link>
          </section>

          {/* 効果 */}
          <section className="mt-12 grid grid-cols-3 gap-4 border-y border-border py-10">
            <Stat label="平均スコア改善" value="+18" suffix="点" />
            <Stat label="次回マッチング率" value="2.4" suffix="x" />
            <Stat label="平均利用カテゴリ" value="2.1" />
          </section>

          {/* 安心 */}
          <section className="mt-12 rounded-2xl border border-border bg-muted/30 p-6">
            <div className="flex items-baseline gap-2">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" strokeWidth={1.6} aria-hidden />
              <p className="text-xs font-medium">恋フェスが選ぶ加盟店だけ</p>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              全カテゴリー1店舗独占。
              恋フェス運営が事前に契約・サービス品質を確認した信頼パートナーのみと提携しています。
              押し売り・しつこい営業は一切ありません。
            </p>
          </section>

          {/* CTA */}
          <div className="mt-12 flex flex-col gap-3">
            <Link href="/partners">
              <Button fullWidth size="lg" className="gap-2">
                <Sparkles className="h-4 w-4" aria-hidden />
                加盟店を選ぶ
              </Button>
            </Link>
            <Link href="/tsuchihyo">
              <Button fullWidth variant="outline" size="lg">
                通知表をもう一度見る
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function Stat({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-1">
        <span className="font-mont text-3xl font-medium tracking-tight">{value}</span>
        {suffix && <span className="font-mont text-xs text-muted-foreground">{suffix}</span>}
      </div>
      <span className="text-[10px] leading-snug text-muted-foreground">{label}</span>
    </div>
  );
}
