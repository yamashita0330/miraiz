'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Loader2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function StaffLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim() || !code.trim()) {
      setError('すべての項目を入力してください');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      router.push('/staff');
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-10">
        <header className="mb-12 flex flex-col gap-3">
          <div className="inline-flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" strokeWidth={1.6} aria-hidden />
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Staff Login
            </span>
          </div>
          <h1 className="text-2xl font-semibold leading-tight tracking-tight">
            運営ログイン
          </h1>
          <p className="text-xs leading-relaxed text-muted-foreground">
            運営スタッフ専用ログインページです。<br />
            一般会員様はこの画面にアクセスする必要はありません。
          </p>
        </header>

        <form onSubmit={submit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="staff@koifes.app"
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

          <div className="flex flex-col gap-2">
            <Label htmlFor="code">2段階認証コード</Label>
            <Input
              id="code"
              type="text"
              required
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              className="font-mont tracking-widest"
            />
            <p className="text-[10px] text-muted-foreground">
              認証アプリ（Google Authenticator等）の6桁コード
            </p>
          </div>

          {error && (
            <div role="alert" className="rounded-lg border border-border bg-muted px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <Button type="submit" fullWidth size="lg" loading={loading} className="gap-2">
            {!loading && <Lock className="h-4 w-4" aria-hidden />}
            {loading ? 'ログイン中…' : 'ログイン'}
          </Button>

          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-[10px] leading-relaxed text-muted-foreground">
            <Lock className="mr-1 inline-block h-3 w-3" aria-hidden />
            このページは運営スタッフのみがアクセスする専用URLです。<br />
            ブックマークは推奨しません。URLは社外秘で管理してください。
          </div>
        </form>

        <p className="mt-12 text-center text-[10px] text-muted-foreground">
          一般のお問い合わせは{' '}
          <a href="mailto:support@koifes.app" className="underline-offset-4 hover:underline">
            support@koifes.app
          </a>
          {' '}まで
        </p>
      </div>
    </main>
  );
}
