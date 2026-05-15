'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-warn-50 text-warn">
          <AlertTriangle className="h-6 w-6" strokeWidth={1.6} aria-hidden />
        </div>
        <p className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-2">Error</p>
        <h1 className="text-2xl font-semibold tracking-tight mb-3">予期しないエラーが発生しました</h1>
        <p className="text-xs text-muted-foreground leading-relaxed mb-6">
          一時的な問題かもしれません。もう一度お試しいただくか、ホームに戻ってください。
        </p>
        {error.digest && (
          <p className="font-mont text-[10px] text-muted-foreground mb-6">
            ID: {error.digest}
          </p>
        )}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-baseline gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-xs text-background hover:bg-foreground/90"
          >
            <RotateCcw className="h-3 w-3" aria-hidden />もう一度
          </button>
          <Link
            href="/"
            className="inline-flex items-baseline gap-1.5 rounded-full border border-border bg-background px-5 py-2.5 text-xs hover:bg-muted"
          >
            <Home className="h-3 w-3" aria-hidden />ホーム
          </Link>
        </div>
      </div>
    </main>
  );
}
