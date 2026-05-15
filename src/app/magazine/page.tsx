import Link from 'next/link';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { DEMO_ARTICLES } from '@/lib/demo';

const COVER_GRADIENTS: Record<string, string> = {
  'gradient-1': 'from-slate-200 to-slate-50',
  'gradient-2': 'from-rose-100 to-slate-50',
  'gradient-3': 'from-stone-200 to-slate-50',
  'gradient-4': 'from-amber-100 to-slate-50',
  'gradient-5': 'from-zinc-200 to-slate-50',
  'gradient-6': 'from-neutral-200 to-slate-50',
};

export default function MagazineIndexPage() {
  const [feature, ...rest] = DEMO_ARTICLES;

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <header className="flex flex-col gap-4">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Magazine
            </span>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight">
              恋フェスマガジン
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              徳島の婚活と、もっと良い出会いのための読み物。
            </p>
          </header>

          {/* Featured */}
          <Link
            href={`/magazine/${feature.slug}`}
            className="group mt-12 block overflow-hidden rounded-2xl border border-border transition-all hover:border-foreground/30"
          >
            <div className={`flex aspect-[16/10] items-center justify-center bg-gradient-to-br ${COVER_GRADIENTS[feature.cover] || 'from-slate-200 to-slate-50'}`}>
              <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-foreground/40">
                Featured
              </span>
            </div>
            <div className="flex flex-col gap-3 p-8">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {feature.category}
              </span>
              <h2 className="text-xl font-semibold leading-tight tracking-tight">
                {feature.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.excerpt}
              </p>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{feature.author}</span>
                <span>—</span>
                <span>{feature.publishedAt}</span>
                <span>—</span>
                <span>{feature.readingTime} min read</span>
              </div>
            </div>
          </Link>

          {/* Article list */}
          <section className="mt-12 border-t border-border pt-12">
            <h2 className="mb-8 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              Latest
            </h2>
            <ul className="flex flex-col divide-y divide-border">
              {rest.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/magazine/${a.slug}`}
                    className="group flex gap-5 py-6 transition-opacity hover:opacity-70"
                  >
                    <div className={`flex aspect-square w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ${COVER_GRADIENTS[a.cover] || 'from-slate-200 to-slate-50'}`}>
                      <span className="font-mont text-[8px] uppercase tracking-[0.3em] text-foreground/30">
                        {a.category.slice(0, 3)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col justify-between gap-2 min-w-0">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {a.category}
                        </span>
                        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
                          {a.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span>{a.publishedAt}</span>
                        <span>·</span>
                        <span>{a.readingTime}min</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
