'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { DEMO_MODE } from '@/lib/demo';

interface HeaderProps {
  showLogout?: boolean;
}

export function Header({ showLogout = false }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    if (DEMO_MODE) {
      router.push('/');
      return;
    }
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-foreground backdrop-blur">
      <div className="mx-auto flex h-11 max-w-xl items-center justify-between px-4">
        <Link
          href="/home"
          className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-background"
          aria-label="MIRAIZホーム"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-background" aria-hidden />
          MIRAIZ
        </Link>
        {showLogout && (
          <button
            onClick={handleLogout}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-background/60 transition-colors hover:bg-background/10 hover:text-background"
            aria-label="ログアウト"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden />
          </button>
        )}
      </div>
    </header>
  );
}
