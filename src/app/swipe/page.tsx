import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { SwipeDeck } from '@/components/SwipeDeck';
import { compatibility } from '@/lib/compatibility';
import { DEMO_ME, DEMO_MEMBERS, DEMO_MUTUAL_IDS } from '@/lib/demo';

export const dynamic = 'force-dynamic';

export default function SwipePage() {
  // 相性が高い順に並べ替えて、より良い体験を提供
  const sorted = [...DEMO_MEMBERS].sort(
    (a, b) => compatibility(DEMO_ME, b).total - compatibility(DEMO_ME, a).total
  );

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-8">
          <header className="mb-6 flex items-baseline justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Swipe
              </span>
              <h1 className="text-xl font-semibold tracking-tight">スワイプして出会う</h1>
            </div>
            <Link
              href="/home?view=list"
              className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden />
              リスト
            </Link>
          </header>

          <SwipeDeck members={sorted} initialMutualIds={Array.from(DEMO_MUTUAL_IDS)} />
        </div>
      </main>
      <BottomNav />
    </>
  );
}
