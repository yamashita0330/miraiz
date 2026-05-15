import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Quote, Sparkles, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEMO_NEXT_EVENT, DEMO_GRADUATES, DEMO_SPONSORS } from '@/lib/demo';

const FACTS = [
  { value: '351', suffix: '名', label: 'これまでの参加者' },
  { value: '68', suffix: '組', label: 'カップル成立' },
  { value: '12', suffix: '組', label: 'ご成婚' },
];

const PRESS = [
  { name: '徳島新聞', date: '2026.03' },
  { name: '四国放送', date: '2026.02' },
  { name: 'note特集', date: '2025.12' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* ============ HERO ============ */}
      <section className="relative px-6 pt-16 pb-24">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-20 -right-32 h-[500px] w-[500px] rounded-full bg-rose/10 blur-[120px]" />
          <div className="absolute top-40 -left-20 h-[400px] w-[400px] rounded-full bg-foreground/[0.04] blur-[100px]" />
        </div>

        {/* Brand badge */}
        <div className="flex items-baseline gap-2 mb-12">
          <span className="font-mont text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            MIRAIZ
          </span>
          <span className="h-px w-8 bg-border" aria-hidden />
          <span className="font-mont text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Since 2024 · Tokushima
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-semibold tracking-tight">
          <span className="block text-[44px] leading-[1.05]">
            未来を、
          </span>
          <span className="block text-[44px] leading-[1.05]">
            <span className="bg-gradient-to-br from-rose to-foreground bg-clip-text text-transparent">磨く</span>出会いを。
          </span>
        </h1>

        <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground max-w-md">
          徳島発・リアルイベント連動型の会員制マッチング。<br />
          「アプリ疲れ」と「結婚相談所の重さ」のあいだに、新しい選択肢を。
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-2.5 max-w-sm">
          <Link href="/register">
            <Button fullWidth size="lg" className="group h-12 text-sm">
              <Sparkles className="h-4 w-4" aria-hidden />
              無料で12タイプ恋愛診断
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Button>
          </Link>
          <Link href="/login">
            <Button fullWidth size="lg" variant="ghost" className="h-12 text-xs text-muted-foreground hover:text-foreground">
              すでに登録済みの方
            </Button>
          </Link>
        </div>

        {/* Trust line */}
        <p className="mt-8 inline-flex items-baseline gap-2 text-[10px] text-muted-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-success animate-pulse" aria-hidden />
          <span>20歳以上・本人確認済み・既婚者ブロック</span>
        </p>
      </section>

      {/* ============ STATS ============ */}
      <section className="px-6 pb-24">
        <div className="rounded-3xl border-2 border-foreground bg-foreground p-8 text-background">
          <div className="mb-6 flex items-baseline justify-between">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] opacity-70">
              By the Numbers
            </span>
            <span className="font-mont text-[10px] opacity-50">2024 — 2026</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {FACTS.map((f) => (
              <div key={f.label} className="flex flex-col gap-2">
                <span className="font-mont text-[44px] font-medium leading-none tracking-tight">
                  {f.value}
                  <span className="text-base font-normal opacity-60 ml-1">{f.suffix}</span>
                </span>
                <span className="text-[11px] leading-snug opacity-70">{f.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-baseline gap-2 border-t border-background/10 pt-4 text-[10px] opacity-60">
            <Users className="h-3 w-3" aria-hidden />
            <span>全Vol.合計実績・本人確認済み登録者</span>
          </div>
        </div>
      </section>

      {/* ============ NEXT EVENT ============ */}
      <section className="px-6 pb-24">
        <div className="mb-4 flex items-baseline gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose animate-pulse" aria-hidden />
          <span className="font-mont text-[10px] uppercase tracking-[0.3em] text-rose">
            Next Event
          </span>
        </div>

        <div className="rounded-3xl border border-border bg-card overflow-hidden">
          {/* Hero band */}
          <div className="relative bg-gradient-to-br from-rose/5 via-card to-card px-6 py-7">
            <div className="absolute top-0 right-0 px-5 py-3 text-[10px] font-mont uppercase tracking-wider text-muted-foreground">
              残席 {DEMO_NEXT_EVENT.remaining}/{DEMO_NEXT_EVENT.capacity}
            </div>
            <p className="font-mont text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Vol.5
            </p>
            <h2 className="text-xl font-semibold tracking-tight mb-3 max-w-[200px]">
              {DEMO_NEXT_EVENT.title}
            </h2>
            <p className="font-mont text-2xl font-medium tracking-tight">
              {DEMO_NEXT_EVENT.dateLabel.replace('（日）', '')}
              <span className="ml-2 text-base text-muted-foreground">SUN</span>
            </p>
          </div>

          <div className="border-t border-border px-6 py-5 space-y-3">
            <div className="flex items-baseline gap-3 text-[12px]">
              <MapPin className="h-3 w-3 shrink-0 text-muted-foreground" aria-hidden />
              <span>{DEMO_NEXT_EVENT.venue}</span>
            </div>
            <div className="flex items-baseline gap-3 text-[12px]">
              <Calendar className="h-3 w-3 shrink-0 text-muted-foreground" aria-hidden />
              <span>{DEMO_NEXT_EVENT.parts.join(' / ')}</span>
            </div>
          </div>

          <ul className="border-t border-border bg-muted/30 px-6 py-4 space-y-1.5 text-[11px]">
            {DEMO_NEXT_EVENT.highlights.map((h, i) => (
              <li key={i} className="flex items-baseline gap-2">
                <span className="font-mont text-[9px] text-rose">0{i + 1}</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <Link href="/events" className="block border-t border-border px-6 py-4 hover:bg-muted/30 transition-colors group">
            <div className="flex items-baseline justify-between">
              <span className="text-[12px] font-medium">
                イベント詳細をみる
                <span className="ml-2 font-mont text-[10px] text-muted-foreground">¥{DEMO_NEXT_EVENT.price.toLocaleString()}〜</span>
              </span>
              <ArrowRight className="h-3 w-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
            </div>
          </Link>
        </div>
      </section>

      {/* ============ GRADUATES (ご成婚) ============ */}
      <section className="px-6 pb-24">
        <div className="mb-6 flex items-baseline justify-between">
          <div>
            <p className="font-mont text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">
              Graduates
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              ご成婚 <span className="font-mont text-rose">12</span>組
            </h2>
          </div>
          <Link href="/graduates" className="text-[11px] text-rose hover:underline">
            すべて見る →
          </Link>
        </div>

        <ul className="space-y-3">
          {DEMO_GRADUATES.slice(0, 2).map((g) => (
            <li key={g.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <Heart className="h-3 w-3 text-rose" strokeWidth={2.2} aria-hidden />
                  <span className="text-[12px] font-semibold">{g.coupleName}</span>
                </div>
                <span className="font-mont text-[9px] text-muted-foreground">
                  {g.marriedDate.replace(/-/g, '.')}
                </span>
              </div>
              <Quote className="h-4 w-4 text-rose/30 mb-2" strokeWidth={1.4} aria-hidden />
              <p className="text-[13px] leading-relaxed mb-3">
                {g.message}
              </p>
              <p className="text-[10px] text-muted-foreground border-t border-border pt-2">
                出会い：{g.metEvent}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="px-6 pb-24">
        <div className="mb-6">
          <p className="font-mont text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">
            Why MIRAIZ
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">
            選ばれる、3つの理由。
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {[
            {
              num: '01',
              title: 'リアルから始まる',
              body: '年4回の恋フェスで「実際に会って話した相手」とだけ繋がる。プロフィール写真詐欺ゼロ。',
            },
            {
              num: '02',
              title: '科学的な恋愛診断',
              body: 'UCLA愛着理論×ハーバード成人発達研究ベースの12タイプ診断と、見た目フィードバック付き恋愛通知表。',
            },
            {
              num: '03',
              title: '徳島に根ざした安心',
              body: '本人確認・既婚者ブロック・規約違反退会。徳島で対面オフィスを持つ運営。',
            },
          ].map((f) => (
            <div key={f.num} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mont text-[11px] text-rose">{f.num}</span>
                <h3 className="text-[15px] font-semibold">{f.title}</h3>
              </div>
              <p className="text-[12px] leading-relaxed text-muted-foreground pl-7">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ PARTNERS ============ */}
      <section className="px-6 pb-24">
        <p className="font-mont text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4 text-center">
          Trusted Partners
        </p>
        <ul className="grid grid-cols-2 gap-2 mb-6">
          {DEMO_SPONSORS.slice(0, 4).map((s) => (
            <li key={s.id} className="rounded-xl border border-border bg-card px-3 py-3">
              <p className="font-mont text-[8px] uppercase tracking-wider text-muted-foreground mb-0.5">
                {s.category}
              </p>
              <p className="text-[11px] font-semibold truncate">{s.name}</p>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
          {PRESS.map((p) => (
            <li key={p.name}>
              掲載：{p.name} <span className="font-mont opacity-60">{p.date}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="px-6 pb-16">
        <div className="rounded-3xl bg-foreground p-8 text-background text-center">
          <p className="font-mont text-[10px] uppercase tracking-[0.4em] opacity-70 mb-3">
            Start Free
          </p>
          <h2 className="text-2xl font-semibold tracking-tight mb-2 leading-tight">
            まずは無料で<br />
            12タイプ恋愛診断から。
          </h2>
          <p className="text-[11px] opacity-70 mb-6 leading-relaxed">
            24問・所要3分。<br />
            あなたの「愛着スタイル × 動機」が分かります。
          </p>
          <Link href="/diagnostic">
            <Button fullWidth size="lg" variant="secondary" className="group h-12 text-sm">
              診断を始める（無料）
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Button>
          </Link>
          <p className="mt-4 text-[10px] opacity-50">
            登録なしで体験可能・所要3分
          </p>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-border px-6 py-8 text-center">
        <p className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-2">
          MIRAIZ
        </p>
        <p className="text-[10px] text-muted-foreground mb-3">
          株式会社FUSHIME ／ 徳島県徳島市
        </p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
          <Link href="/legal/tokutei" className="hover:text-foreground">特定商取引法</Link>
          <span>·</span>
          <Link href="/legal/privacy" className="hover:text-foreground">プライバシー</Link>
          <span>·</span>
          <Link href="/legal/terms" className="hover:text-foreground">利用規約</Link>
          <span>·</span>
          <Link href="/safety" className="hover:text-foreground">安全への取り組み</Link>
        </div>
      </footer>
    </main>
  );
}
