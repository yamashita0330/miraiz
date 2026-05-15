import Link from 'next/link';
import { redirect } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { ProfileCard } from '@/components/ProfileCard';
import {
  DEMO_MODE,
  DEMO_MEMBERS,
  DEMO_FAVORITED_BY_ME,
  DEMO_FAVORITED_ME,
  DEMO_MUTUAL_IDS,
} from '@/lib/demo';

export const dynamic = 'force-dynamic';

export default async function FavoritesPage() {
  let myFavorites: any[];
  let receivedFavs: any[];
  let mutuals: any[];
  let isMutual: (id: string) => boolean;

  if (DEMO_MODE) {
    myFavorites = DEMO_MEMBERS.filter((m) => DEMO_FAVORITED_BY_ME.has(m.id));
    receivedFavs = DEMO_MEMBERS.filter((m) => DEMO_FAVORITED_ME.has(m.id));
    isMutual = (id: string) => DEMO_MUTUAL_IDS.has(id);
    mutuals = myFavorites.filter((u) => isMutual(u.id));
  } else {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const { data: iFavRows } = await supabase
      .from('favorites')
      .select('to_user_id, users:to_user_id(id, name, age, prefecture, photo_url, hope_type)')
      .eq('from_user_id', user.id)
      .order('created_at', { ascending: false });

    const { data: gotFavRows } = await supabase
      .from('favorites')
      .select('from_user_id, users:from_user_id(id, name, age, prefecture, photo_url, hope_type)')
      .eq('to_user_id', user.id)
      .order('created_at', { ascending: false });

    const iFavIds = new Set((iFavRows ?? []).map((r) => r.to_user_id));
    const gotFavIds = new Set((gotFavRows ?? []).map((r) => r.from_user_id));
    isMutual = (id: string) => iFavIds.has(id) && gotFavIds.has(id);
    myFavorites = (iFavRows ?? []).map((r) => r.users).filter(Boolean) as any[];
    receivedFavs = (gotFavRows ?? []).map((r) => r.users).filter(Boolean) as any[];
    mutuals = myFavorites.filter((u) => isMutual(u.id));
  }

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <header className="mb-12">
            <h1 className="text-2xl font-semibold tracking-tight">気になる</h1>
          </header>

          {mutuals.length > 0 && (
            <>
              <Section title="Mutual" subtitle={`${mutuals.length}名`} accent>
                {mutuals.map((u) => <ProfileCard key={u.id} user={u} mutual />)}
              </Section>

              <Link
                href="/messages"
                className="-mt-6 mb-12 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-6 py-5 transition-all hover:border-foreground/30"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-muted-foreground" strokeWidth={1.6} aria-hidden />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium">トークを開く</p>
                    <p className="text-xs text-muted-foreground">両想いの相手とメッセージ</p>
                  </div>
                </div>
                <span className="text-muted-foreground" aria-hidden>›</span>
              </Link>
            </>
          )}

          <Section
            title="From You"
            subtitle={`${myFavorites.length}名`}
            empty={myFavorites.length === 0 ? 'まだ★を付けていません' : undefined}
          >
            {myFavorites.map((u) => <ProfileCard key={u.id} user={u} mutual={isMutual(u.id)} />)}
          </Section>

          <Section
            title="From Them"
            subtitle={`${receivedFavs.length}名`}
            empty={receivedFavs.length === 0 ? 'まだ★を受け取っていません' : undefined}
          >
            {receivedFavs.map((u) => <ProfileCard key={u.id} user={u} mutual={isMutual(u.id)} />)}
          </Section>
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function Section({
  title,
  subtitle,
  children,
  empty,
  accent = false,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  empty?: string;
  accent?: boolean;
}) {
  return (
    <section className="mb-12">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className={`text-xs font-mont uppercase tracking-[0.3em] ${accent ? 'text-foreground' : 'text-muted-foreground'}`}>
          {title}
        </h2>
        <span className="font-mont text-xs text-muted-foreground">{subtitle}</span>
      </div>
      {empty ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          {empty}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">{children}</div>
      )}
    </section>
  );
}
