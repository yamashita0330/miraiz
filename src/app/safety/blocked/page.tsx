'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Ban } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { DEMO_BLOCKED_USERS } from '@/lib/demo';

export default function BlockedListPage() {
  const [list, setList] = useState(DEMO_BLOCKED_USERS);

  const unblock = (id: string) => setList((prev) => prev.filter((u) => u.id !== id));

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <Link
            href="/mypage"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            マイページ
          </Link>

          <header className="mt-10 flex flex-col gap-4">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Block List
            </span>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight">
              ブロック一覧
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              ブロックを解除すると、相手から再びあなたが見えるようになります。
            </p>
          </header>

          <section className="mt-12">
            {list.length === 0 ? (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border p-12 text-center">
                <Ban className="h-8 w-8 text-muted-foreground" strokeWidth={1.4} aria-hidden />
                <p className="text-sm text-muted-foreground">ブロック中の相手はいません</p>
              </div>
            ) : (
              <ul className="flex flex-col divide-y divide-border">
                {list.map((u) => (
                  <li key={u.id} className="flex items-center justify-between gap-4 py-5">
                    <div className="flex flex-col gap-1 min-w-0">
                      <p className="truncate text-sm font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.blockedAt} に追加</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => unblock(u.id)}>
                      解除
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <p className="mt-12 text-xs leading-relaxed text-muted-foreground">
            違反行為を見つけた場合は、相手のプロフィールから通報してください。運営が確認します。
          </p>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
