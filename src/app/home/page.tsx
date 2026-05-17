import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowRight, FileBarChart2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { PWAInstallBanner } from '@/components/PWAInstallBanner';
import { HomeContent } from './HomeContent';
import type { UserProfile } from '@/lib/types';
import {
  DEMO_MODE,
  DEMO_MEMBERS,
  DEMO_MUTUAL_IDS,
  DEMO_TSUCHIHYO_SAMPLE,
} from '@/lib/demo';

export const dynamic = 'force-dynamic';

export default async function HomeFeedPage() {
  let members: UserProfile[];
  let mutualIds: string[];

  if (DEMO_MODE) {
    members = DEMO_MEMBERS;
    mutualIds = Array.from(DEMO_MUTUAL_IDS);
  } else {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login?redirect=/home');

    const { data: me } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .maybeSingle<UserProfile>();
    if (!me) redirect('/register');

    const oppositeGender = me.gender === 'male' ? 'female' : 'male';
    const { data: rows } = await supabase
      .from('users')
      .select('*')
      .eq('gender', oppositeGender)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(200);
    members = (rows ?? []) as UserProfile[];

    const { data: myFavs } = await supabase
      .from('favorites')
      .select('to_user_id')
      .eq('from_user_id', user.id);
    const { data: gotFavs } = await supabase
      .from('favorites')
      .select('from_user_id')
      .eq('to_user_id', user.id);
    const iFav = new Set((myFavs ?? []).map((f) => f.to_user_id));
    const theyFav = new Set((gotFavs ?? []).map((f) => f.from_user_id));
    mutualIds = Array.from(iFav).filter((id) => theyFav.has(id));
  }

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-8">
          {/* 通知表が届いた通知（イベント翌日） */}
          <Link
            href="/tsuchihyo"
            className="group mb-6 flex items-center gap-3 rounded-2xl border-2 border-foreground bg-foreground p-4 text-background transition-opacity hover:opacity-95"
          >
            <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background/10">
              <FileBarChart2 className="h-5 w-5" strokeWidth={1.8} aria-hidden />
              <span className="absolute -right-1 -top-1 inline-flex h-2.5 w-2.5 rounded-full border-2 border-foreground bg-rose" aria-hidden />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold">
                {DEMO_TSUCHIHYO_SAMPLE.eventTitle}の通知表が届きました
              </p>
              <p className="text-[11px] opacity-70">
                あなたの順位を無料でチェック
              </p>
            </div>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>

          {/* スワイプデッキ + 完了後分析 */}
          <HomeContent members={members} mutualIds={mutualIds} />

        </div>
      </main>
      <PWAInstallBanner />
      <BottomNav />
    </>
  );
}
