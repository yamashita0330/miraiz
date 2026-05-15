import Link from 'next/link';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Compass className="h-6 w-6" strokeWidth={1.6} aria-hidden />
        </div>
        <p className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-2">404</p>
        <h1 className="text-2xl font-semibold tracking-tight mb-3">ページが見つかりません</h1>
        <p className="text-xs text-muted-foreground leading-relaxed mb-6">
          お探しのページは削除されたか、URLが変わった可能性があります。
        </p>
        <Link
          href="/"
          className="inline-flex items-baseline gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-xs text-background hover:bg-foreground/90"
        >
          <Home className="h-3 w-3" aria-hidden />ホームに戻る
        </Link>
      </div>
    </main>
  );
}
