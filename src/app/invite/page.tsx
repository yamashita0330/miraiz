'use client';

import { useState } from 'react';
import { Copy, Check, MessageCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { DEMO_USER_STATE } from '@/lib/demo';

export default function InvitePage() {
  const [copied, setCopied] = useState(false);
  const inviteUrl = `https://koifes.app/r/${DEMO_USER_STATE.inviteCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <header className="flex flex-col gap-4">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Friend Invite
            </span>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight">
              友達紹介プログラム
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              紹介した方も、された方も次回イベント
              <span className="font-mont">¥1,000</span>OFF。
            </p>
          </header>

          <section className="mt-12 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                あなたの紹介コード
              </p>
              <div className="rounded-2xl border border-border bg-muted/30 px-6 py-8 text-center">
                <p className="font-mont text-3xl font-medium tracking-[0.3em]">
                  {DEMO_USER_STATE.inviteCode}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                招待URL
              </p>
              <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-center">
                <p className="break-all font-mont text-sm">{inviteUrl}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button fullWidth size="lg" onClick={handleCopy} className="gap-2">
                {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                {copied ? 'コピーしました' : '招待URLをコピー'}
              </Button>
              <Button fullWidth variant="outline" size="lg" className="gap-2">
                <MessageCircle className="h-4 w-4" aria-hidden />
                LINEで友達に送る
              </Button>
            </div>
          </section>

          <section className="mt-12 border-t border-border pt-12">
            <h2 className="mb-6 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              Performance
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">紹介人数</p>
                <p className="mt-3 font-mont text-3xl font-medium tracking-tight">
                  {DEMO_USER_STATE.invitedCount}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">名</p>
              </div>
              <div className="rounded-2xl border border-border p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">獲得報酬</p>
                <p className="mt-3 font-mont text-3xl font-medium tracking-tight">
                  ¥{DEMO_USER_STATE.rewardYen.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">相当</p>
              </div>
            </div>
          </section>

          <section className="mt-12 border-t border-border pt-12">
            <h2 className="mb-6 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              How it Works
            </h2>
            <ol className="flex flex-col gap-6">
              {[
                '紹介URL（または紹介コード）を友達にシェア',
                '友達がアプリ登録時にコード入力',
                '友達がイベント参加申込で双方に1,000円OFFクーポン',
              ].map((text, i) => (
                <li key={i} className="flex gap-5">
                  <span className="font-mont text-sm tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-relaxed">{text}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
