import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Calendar, Star, Tag, Sparkles } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  findDemoPartner,
  PARTNER_CATEGORY_LABEL,
  PARTNER_CATEGORY_DESC,
  DEMO_PARTNERS,
} from '@/lib/demo';

export default function PartnerDetailPage({ params }: { params: { id: string } }) {
  const partner = findDemoPartner(params.id);
  if (!partner) notFound();

  const related = DEMO_PARTNERS.filter((p) => p.category === partner.category && p.id !== partner.id);

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            加盟店一覧
          </Link>

          <div className="mt-6 flex aspect-[16/9] items-center justify-center rounded-2xl bg-gradient-to-br from-muted to-muted/50">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-foreground/30">
              {PARTNER_CATEGORY_LABEL[partner.category]}
            </span>
          </div>

          <header className="mt-8 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="soft" className="text-[10px]">
                {PARTNER_CATEGORY_LABEL[partner.category]}
              </Badge>
              {partner.is_owned && <Badge variant="goldSoft" className="text-[10px]">恋フェス公式</Badge>}
            </div>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight">{partner.name}</h1>
            <p className="text-sm text-muted-foreground">{partner.tagline}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Star className="h-3 w-3 fill-foreground text-foreground" aria-hidden />
                <span className="font-mont font-medium text-foreground">{partner.rating}</span>
              </span>
              <span>{partner.review_count}件のレビュー</span>
            </div>
          </header>

          <section className="mt-10 rounded-2xl border-2 border-foreground bg-foreground/[0.03] p-6">
            <div className="flex items-baseline gap-2">
              <Tag className="h-4 w-4" strokeWidth={1.8} aria-hidden />
              <p className="text-xs font-medium">恋フェス会員特典</p>
            </div>
            <p className="mt-3 text-base font-semibold leading-relaxed">
              {partner.member_offer}
            </p>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              恋の通知表「{PARTNER_CATEGORY_DESC[partner.category]}」スコアアップに直結。
              来店QRスキャンで自動的にスコア反映されます。
            </p>
          </section>

          <Section title="About">
            <p className="text-sm leading-relaxed">{partner.description}</p>
          </Section>

          <Section title="Detail">
            <dl className="flex flex-col gap-5">
              <div className="flex gap-4">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.6} aria-hidden />
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">所在地</dt>
                  <dd className="text-sm">{partner.address}</dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.6} aria-hidden />
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">営業時間</dt>
                  <dd className="text-sm">{partner.hours}</dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.6} aria-hidden />
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">定休日</dt>
                  <dd className="text-sm">{partner.closed}</dd>
                </div>
              </div>
            </dl>
          </Section>

          <Section title="How it works">
            <ol className="flex flex-col gap-5">
              {[
                'クーポンを発行（恋フェス会員価格が適用）',
                'お店で予約 or 来店時にQRをスキャン',
                '通知表スコアが自動で反映される',
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-mont text-sm tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </Section>

          {related.length > 0 && (
            <Section title="Same Category">
              <ul className="flex flex-col divide-y divide-border">
                {related.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/partners/${p.id}`}
                      className="flex items-center gap-3 py-4 transition-opacity hover:opacity-70"
                    >
                      <div className="flex flex-1 flex-col gap-1 min-w-0">
                        <p className="truncate text-sm font-medium">{p.name}</p>
                        <p className="truncate text-[11px] text-muted-foreground">{p.tagline}</p>
                      </div>
                      <span className="text-muted-foreground" aria-hidden>›</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <div className="mt-12 flex flex-col gap-3">
            {partner.bookable && partner.menus && partner.menus.length > 0 ? (
              <Link href={`/partners/${partner.id}/book`}>
                <Button fullWidth size="lg" className="gap-2">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  予約する
                </Button>
              </Link>
            ) : (
              <Button fullWidth size="lg" className="gap-2" disabled>
                オンライン予約準備中
              </Button>
            )}
            <Button fullWidth size="lg" variant="outline">
              クーポンを発行する
            </Button>
          </div>

          <p className="mt-6 text-[11px] leading-relaxed text-muted-foreground">
            ※ ご予約は店舗の承認後に確定します（通常24時間以内）。<br />
            ※ クーポンは発行から30日間有効です。<br />
            ※ 来店時に「恋フェス会員」とお伝えください。
          </p>
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 border-t border-border pt-12">
      <h2 className="mb-6 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}
