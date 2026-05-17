import Link from 'next/link';
import { Tag, ScanLine, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { BodyDiagram, type BodyPartStatus } from '@/components/BodyDiagram';
import {
  DEMO_PARTNERS,
  DEMO_LOOK_FEEDBACK_AGGREGATE,
  LOOK_TAGS,
  LOOK_TAG_TO_PARTNER_CATEGORY,
  PARTNER_CATEGORY_LABEL,
  PARTNER_CATEGORY_DESC,
  type LookTag,
  type PartnerCategory,
} from '@/lib/demo';
import { PartnersSearch } from './PartnersSearch';
import { PartnerMapSection } from './PartnerMapSection';

export default function PartnersIndexPage() {
  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <header className="flex flex-col gap-4">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Score-up Partners
            </span>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight">
              加盟店プログラム
            </h1>
            <p className="text-xs leading-relaxed tracking-tight text-muted-foreground">
              恋の通知表のスコアを上げる、徳島の信頼パートナー。<br />
              恋フェス会員価格で受けられます。
            </p>
          </header>

          <Link
            href="/scan"
            className="group mt-8 flex items-center justify-between gap-4 rounded-2xl border-2 border-foreground bg-foreground p-5 text-background transition-opacity hover:opacity-95"
          >
            <div className="flex items-center gap-3">
              <ScanLine className="h-5 w-5" strokeWidth={1.8} aria-hidden />
              <div className="flex flex-col gap-0.5">
                <span className="font-mont text-[10px] uppercase tracking-[0.4em] opacity-70">
                  Visit QR
                </span>
                <p className="text-sm font-semibold">来店QRをスキャンして特典適用</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>

          <section className="mt-4 rounded-2xl border border-border bg-muted/30 p-6">
            <div className="flex items-baseline gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" strokeWidth={1.6} aria-hidden />
              <p className="text-xs font-medium">来店QRスキャンで3つの特典</p>
            </div>
            <ul className="mt-3 flex flex-col gap-2 text-xs leading-relaxed">
              <li className="flex items-baseline gap-2">
                <span className="text-rose">①</span>
                <span><span className="font-medium">会員価格が適用</span>（スキャンしないと一般価格）</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="text-rose">②</span>
                <span><span className="font-medium">来店金額の5%をキャッシュバック</span>（次回提携サロンで利用可）</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="text-rose">③</span>
                <span><span className="font-medium">通知表スコアが自動アップ</span>＋スタンプ蓄積</span>
              </li>
            </ul>
          </section>

          {/* ============= あなたに指摘された点におすすめ ============= */}
          <RecommendedSection />

          {/* ============= サロンマップ ============= */}
          <PartnerMapSection />

          <div className="mt-10">
            <PartnersSearch partners={DEMO_PARTNERS} />
          </div>

          <p className="mt-12 text-xs leading-relaxed text-muted-foreground">
            ※ 加盟店は2026年5月時点で8店舗。今後カテゴリ別に拡充予定です。
          </p>
        </div>
      </main>
      <BottomNav />
    </>
  );
}

// ============= あなたに指摘された点におすすめ =============
function RecommendedSection() {
  const data = DEMO_LOOK_FEEDBACK_AGGREGATE;
  const total = data.total_evaluators;

  // 全LookTagを点数化（通知表と同じロジック）
  const allTags = LOOK_TAGS.map((t) => {
    const tag = t.value as LookTag;
    const at = data.attractive_counts[tag] ?? 0;
    const im = data.improve_counts[tag] ?? 0;
    const score = Math.round(((at - im) / total) * 50 + 50);
    return {
      tag,
      label: t.label,
      improve: im,
      score,
      status: (score >= 70 ? 'attractive' : score < 35 ? 'improve' : 'neutral') as BodyPartStatus,
      partnerCategory: LOOK_TAG_TO_PARTNER_CATEGORY[tag],
    };
  });

  // 人型図に渡す各部位の状態
  const partStatus: Record<string, BodyPartStatus> = {};
  allTags.forEach((x) => {
    partStatus[x.tag] = x.status;
  });

  // 磨きどころ（指摘の多い順・加盟店カテゴリがあるもの）
  const improveTags = allTags
    .filter((x) => x.improve > 0 && x.partnerCategory)
    .sort((a, b) => b.improve - a.improve)
    .slice(0, 3);

  if (improveTags.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-rose" strokeWidth={1.8} aria-hidden />
        <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-rose">
          For You
        </h2>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
        通知表で「磨きどころ」と指摘された箇所を、人型マップで確認。
      </p>

      {/* 人型イラストで磨きどころを可視化 */}
      <div className="rounded-3xl border border-border bg-card p-6">
        <div className="mb-2 flex items-baseline justify-between">
          <p className="text-[11px] font-medium">あなたの磨きどころマップ</p>
          <div className="flex items-baseline gap-2.5 text-[9px] text-muted-foreground">
            <span className="inline-flex items-baseline gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-rose" aria-hidden /> 磨きどころ
            </span>
            <span className="inline-flex items-baseline gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-success" aria-hidden /> 魅力
            </span>
          </div>
        </div>
        <div className="mx-auto" style={{ maxWidth: 300 }}>
          <BodyDiagram partStatus={partStatus} />
        </div>
      </div>

      {/* 磨きどころ → 加盟店カテゴリ導線 */}
      <ul className="mt-4 flex flex-col gap-3">
        {improveTags.map((x) => (
          <li key={x.tag}>
            <Link
              href={`/partners?category=${x.partnerCategory}`}
              className="block rounded-2xl border-2 border-rose bg-rose-50 p-5 transition-colors hover:bg-rose-100"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                  <span className="inline-flex items-baseline gap-2 text-[10px] uppercase tracking-wider text-rose">
                    {x.improve}/{total}人 が「{x.label}」を指摘
                  </span>
                  <p className="text-base font-semibold leading-tight">
                    {PARTNER_CATEGORY_LABEL[x.partnerCategory as PartnerCategory]}
                  </p>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {PARTNER_CATEGORY_DESC[x.partnerCategory as PartnerCategory]}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-rose" aria-hidden />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
