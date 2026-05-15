import Link from 'next/link';
import { ArrowRight, ShieldCheck, MessageSquare, Quote } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Badge } from '@/components/ui/badge';
import { DEMO_PACKAGES, DEMO_COACHING_TESTIMONIALS } from '@/lib/demo';

export default function PackagesPage() {
  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          {/* ヒーロー */}
          <header className="flex flex-col gap-5">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Coaching Program
            </span>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight">
              本気の方のための<br />個別コーチング
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              恋の通知表のスコアを起点に、徳島の専属カウンセラーが<br />
              <span className="font-medium text-foreground">2〜4ヶ月</span> であなたの婚活を完走させます。
            </p>
          </header>

          {/* 信頼担保（情報として静かに） */}
          <section className="mt-12 grid grid-cols-3 gap-4 border-y border-border py-8">
            <Stat label="累計相談数" value="68" suffix="名" />
            <Stat label="成婚率" value="42" suffix="%" />
            <Stat label="平均到達期間" value="4.2" suffix="ヶ月" />
          </section>

          {/* 3つのプラン */}
          <section className="mt-12">
            <h2 className="mb-2 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              3 Plans
            </h2>
            <p className="mb-6 text-xs leading-relaxed text-muted-foreground">
              無料相談で現状をヒアリングしたうえで、最適なプランをご案内します。<br />
              3プランすべて受講前にあなたとの相性確認をします。
            </p>

            <ul className="flex flex-col gap-4">
              {DEMO_PACKAGES.map((p) => (
                <li
                  key={p.id}
                  className="rounded-2xl border border-border bg-card overflow-hidden"
                >
                  <div className="border-b border-border bg-muted/30 px-6 py-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mont text-3xl font-medium tracking-tight">{p.id}</span>
                        <span className="text-sm font-semibold">{p.name}</span>
                      </div>
                      <Badge variant="outline" className="text-[10px]">{p.duration}</Badge>
                    </div>
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      {p.forPeople}
                    </p>
                  </div>

                  <div className="px-6 py-6">
                    <h3 className="mb-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                      到達ゴール
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {p.outcomes.map((o, i) => (
                        <li key={i} className="flex gap-2 text-xs leading-relaxed">
                          <span className="text-muted-foreground" aria-hidden>—</span>
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <details className="border-t border-border px-6 py-4">
                    <summary className="cursor-pointer list-none text-xs font-medium text-muted-foreground">
                      含まれるサポート ▾
                    </summary>
                    <ul className="mt-3 flex flex-col gap-2">
                      {p.inclusions.map((inc, i) => (
                        <li key={i} className="flex gap-2 text-xs leading-relaxed">
                          <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" strokeWidth={1.6} aria-hidden />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[10px] text-muted-foreground">
                      参考価格 {p.priceLabel}（無料相談で詳細をご案内）
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </section>

          {/* 卒業生の声 */}
          <section className="mt-12 border-t border-border pt-12">
            <h2 className="mb-6 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              Voices
            </h2>
            <ul className="flex flex-col gap-4">
              {DEMO_COACHING_TESTIMONIALS.map((t) => (
                <li key={t.id} className="flex gap-3 rounded-2xl border border-border bg-card p-5">
                  <Quote className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  <div className="flex flex-1 flex-col gap-3">
                    <p className="text-sm leading-relaxed">「{t.quote}」</p>
                    <div className="flex flex-wrap items-center gap-2 text-[10px]">
                      <span className="font-medium">{t.pseudonym}（{t.age}）</span>
                      <span className="text-muted-foreground">{t.occupation}</span>
                      <Badge variant="soft" className="text-[9px]">プラン{t.package}</Badge>
                      <span className="ml-auto font-medium text-foreground">
                        ◯ {t.result}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* よくある質問 */}
          <section className="mt-12 border-t border-border pt-12">
            <h2 className="mb-6 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              FAQ
            </h2>
            <ul className="flex flex-col divide-y divide-border">
              <Faq
                q="Q. 必ず申し込まないといけませんか？"
                a="無料相談はあくまで現状把握のためのご案内です。必要だと感じた方のみ、ご自分のペースで検討ください。押し売りは一切ありません。"
              />
              <Faq
                q="Q. 返金保証はありますか？"
                a="プラン開始から14日以内、初回コーチング受講前であれば全額返金いたします。プラン開始後は途中解約規定が適用されます。"
              />
              <Faq
                q="Q. 結婚相談所との違いは？"
                a="結婚相談所は「お相手紹介」、本プランは「あなた自身の魅力を高める」ことに特化しています。並行で利用される方が成果が出やすいです。"
              />
              <Faq
                q="Q. オンラインだけで完結しますか？"
                a="プランA・Bはオンラインで完結可能です。プランCは月2回ほど対面（徳島市内）が含まれます。県外の方もリモートに調整可能です。"
              />
            </ul>
          </section>

          {/* CTAは静かに */}
          <section className="mt-12 rounded-2xl border border-border bg-muted/30 p-6">
            <p className="text-xs leading-relaxed">
              気になる方は無料相談（Zoom 30分）から。代表 山下が直接お話しします。
            </p>
            <Link
              href="/packages/consult"
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium underline-offset-4 hover:underline"
            >
              <MessageSquare className="h-3 w-3" aria-hidden />
              無料相談を申し込む
              <ArrowRight className="h-3 w-3" aria-hidden />
            </Link>
          </section>

          <p className="mt-6 text-[10px] leading-relaxed text-muted-foreground">
            ※ 価格・期間・含まれるサポートは、無料相談時の現状把握をもとに最終調整します。<br />
            ※ プラン開始までに二者面談で「相互の合意」を確認してから開始します。<br />
            ※ 押し売りは一切ありません。
          </p>
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

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <li className="py-5">
      <details className="group">
        <summary className="cursor-pointer list-none text-sm font-medium">
          <span className="inline-flex w-full items-baseline justify-between gap-3">
            <span>{q}</span>
            <span className="text-xs text-muted-foreground transition-transform group-open:rotate-180" aria-hidden>▾</span>
          </span>
        </summary>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{a}</p>
      </details>
    </li>
  );
}
