'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DEMO_MODE } from '@/lib/demo';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/home';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (DEMO_MODE) {
      router.push(redirectTo);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ログインに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-xl px-8 pt-20 pb-12">
        <div className="mb-12 flex flex-col gap-2">
          <span className="font-mont text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            Login
          </span>
          <h1 className="text-3xl font-semibold tracking-tight">おかえりなさい</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div role="alert" className="rounded-lg border border-border bg-muted px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <Button type="submit" fullWidth size="lg" loading={loading}>
            ログイン
          </Button>
        </form>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          アカウントをお持ちでない方は{' '}
          <Link href="/register" className="font-medium text-foreground underline-offset-4 hover:underline">
            新規登録
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-muted-foreground">読み込み中…</div>}>
      <LoginForm />
    </Suspense>
  );
}
