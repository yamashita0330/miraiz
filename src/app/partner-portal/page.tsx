'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building2, ArrowRight, Lock } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DEMO_PARTNERS } from '@/lib/demo';

export default function PartnerPortalLoginPage() {
  const [email, setEmail] = useState('owner@bii-tokushima.jp');
  const [password, setPassword] = useState('demo1234');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pb-20">
        <div className="mx-auto max-w-xl px-6 py-10">
          <header className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2">
              <Building2 className="h-4 w-4" strokeWidth={1.6} aria-hidden />
              <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Partner Portal
              </span>
            </div>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight">
              加盟店ログイン
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              加盟店オーナー様用の管理画面です。<br />
              予約・営業時間・送客レポートを管理できます。
            </p>
          </header>

          <form
            className="mt-12 flex flex-col gap-6"
            onSubmit={(e) => { e.preventDefault(); }}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-[10px] leading-relaxed text-muted-foreground">
              <Lock className="mr-1 inline-block h-3 w-3" aria-hidden />
              デモ環境：下のリンクから直接ログインできます
            </div>

            <Link href="/partner-portal/p-bii">
              <Button type="button" fullWidth size="lg">
                ログイン（デモ）
              </Button>
            </Link>
          </form>

          <section className="mt-16 border-t border-border pt-12">
            <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              加盟店一覧（デモ用）
            </h2>
            <ul className="flex flex-col divide-y divide-border">
              {DEMO_PARTNERS.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/partner-portal/${p.id}`}
                    className="flex items-center justify-between gap-3 py-4 transition-opacity hover:opacity-70"
                  >
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="truncate text-sm font-medium">{p.name}</span>
                      <span className="text-[10px] text-muted-foreground">{p.tagline}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
