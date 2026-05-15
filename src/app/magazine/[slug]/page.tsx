import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { findDemoArticle, DEMO_ARTICLES } from '@/lib/demo';

const COVER_GRADIENTS: Record<string, string> = {
  'gradient-1': 'from-slate-200 to-slate-50',
  'gradient-2': 'from-rose-100 to-slate-50',
  'gradient-3': 'from-stone-200 to-slate-50',
  'gradient-4': 'from-amber-100 to-slate-50',
  'gradient-5': 'from-zinc-200 to-slate-50',
  'gradient-6': 'from-neutral-200 to-slate-50',
};

export default function MagazineArticlePage({ params }: { params: { slug: string } }) {
  const article = findDemoArticle(params.slug);
  if (!article) notFound();

  const otherArticles = DEMO_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <Link
            href="/magazine"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            マガジン一覧
          </Link>

          <article className="mt-10 flex flex-col gap-8">
            <header className="flex flex-col gap-4">
              <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                {article.category}
              </span>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight">
                {article.title}
              </h1>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{article.author}</span>
                <span>—</span>
                <span>{article.publishedAt}</span>
                <span>—</span>
                <span>{article.readingTime} min read</span>
              </div>
            </header>

            <div className={`flex aspect-[16/10] items-center justify-center rounded-2xl bg-gradient-to-br ${COVER_GRADIENTS[article.cover] || 'from-slate-200 to-slate-50'}`}>
              <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-foreground/40">
                Cover
              </span>
            </div>

            <div className="prose prose-neutral max-w-none">
              {article.body.split('\n\n').map((para, i) => {
                if (para.startsWith('## ')) {
                  return (
                    <h2 key={i} className="mt-10 text-xl font-semibold leading-tight tracking-tight">
                      {para.replace('## ', '')}
                    </h2>
                  );
                }
                if (/^\d+\.\s/.test(para) || para.startsWith('- ')) {
                  const items = para.split('\n');
                  return (
                    <ul key={i} className="ml-1 mt-4 flex flex-col gap-2 text-sm leading-relaxed">
                      {items.map((line, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="text-muted-foreground">—</span>
                          <span>{line.replace(/^\d+\.\s/, '').replace(/^-\s/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="mt-5 text-sm leading-relaxed">{para}</p>
                );
              })}
            </div>
          </article>

          <section className="mt-16 border-t border-border pt-12">
            <h2 className="mb-6 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              Read More
            </h2>
            <ul className="flex flex-col divide-y divide-border">
              {otherArticles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/magazine/${a.slug}`}
                    className="flex flex-col gap-2 py-5 transition-opacity hover:opacity-70"
                  >
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {a.category}
                    </span>
                    <p className="text-sm font-semibold leading-snug">{a.title}</p>
                    <span className="text-[10px] text-muted-foreground">{a.publishedAt}</span>
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
