import Link from 'next/link';
import { redirect } from 'next/navigation';
import { User as UserIcon, MessageCircle, Heart, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import {
  DEMO_MODE,
  DEMO_THREADS,
  DEMO_MESSAGES,
  findDemoMember,
  DEMO_ME,
  DEMO_FAVORITED_ME,
} from '@/lib/demo';

export const dynamic = 'force-dynamic';

export default async function MessagesListPage() {
  if (!DEMO_MODE) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');
  }

  const items = DEMO_THREADS.map((t) => {
    const partnerId = t.participants.find((id) => id !== DEMO_ME.id) ?? '';
    const partner = findDemoMember(partnerId);
    const messages = DEMO_MESSAGES[t.id] ?? [];
    const last = messages[messages.length - 1];
    return { thread: t, partner, last };
  });

  // あなたにいいねした相手
  const likedMe = Array.from(DEMO_FAVORITED_ME)
    .map((id) => findDemoMember(id))
    .filter((m): m is NonNullable<typeof m> => m != null);

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <header className="flex flex-col gap-4">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Messages
            </span>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight">
              トーク
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              両想いになった相手とアプリ内で直接やりとりできます。
            </p>
          </header>

          {/* ============= 気になる一覧 ============= */}
          <Link
            href="/favorites"
            className="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-foreground/30"
          >
            <div className="flex items-center gap-3">
              <Star className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} aria-hidden />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">気になる一覧</span>
                <span className="text-[10px] text-muted-foreground">両想い・送ったいいね</span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>

          {/* ============= あなたにいいねした人 ============= */}
          {likedMe.length > 0 && (
            <section className="mt-8 rounded-2xl border-2 border-rose bg-rose-50 p-5">
              <div className="mb-3 flex items-baseline gap-2">
                <Heart className="h-3.5 w-3.5 text-rose" strokeWidth={2.2} aria-hidden />
                <p className="text-sm font-semibold text-rose">
                  {likedMe.length}人から「いいね」が届いています
                </p>
              </div>
              <ul className="flex gap-3 overflow-x-auto pb-1">
                {likedMe.map((m) => (
                  <li key={m.id} className="shrink-0">
                    <Link href={`/profile/${m.id}`} className="flex flex-col items-center gap-1.5 w-16">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-rose bg-muted">
                        {m.photo_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={m.photo_url} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <UserIcon className="h-6 w-6" strokeWidth={1.4} aria-hidden />
                          </div>
                        )}
                        <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-rose-50 bg-rose text-rose-foreground">
                          <Heart className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden />
                        </span>
                      </div>
                      <span className="truncate w-full text-center text-[11px] font-medium">
                        {m.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/favorites"
                className="mt-3 flex items-center justify-center gap-1 text-[11px] font-medium text-rose hover:underline"
              >
                受け取ったいいねを全部見る
                <ChevronRight className="h-3 w-3" aria-hidden />
              </Link>
            </section>
          )}

          <section className="mt-12">
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border p-12 text-center">
                <MessageCircle className="h-8 w-8 text-muted-foreground" strokeWidth={1.4} aria-hidden />
                <p className="text-sm text-muted-foreground">まだトークはありません</p>
                <p className="text-xs text-muted-foreground">
                  両想いになった相手とトークが始められます
                </p>
              </div>
            ) : (
              <ul className="flex flex-col divide-y divide-border">
                {items.map(({ thread, partner, last }) => (
                  <li key={thread.id}>
                    <Link
                      href={`/messages/${thread.id}`}
                      className="flex items-center gap-4 py-5 transition-opacity hover:opacity-70"
                    >
                      <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                        {partner?.photo_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={partner.photo_url} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <UserIcon className="h-6 w-6" strokeWidth={1.4} aria-hidden />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col gap-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="truncate text-sm font-semibold">
                            {partner?.name ?? '不明なユーザー'}
                          </p>
                          {last && (
                            <span className="shrink-0 font-mont text-[10px] text-muted-foreground">
                              {formatTime(last.sent_at)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <p
                            className={
                              thread.unread_count > 0
                                ? 'truncate text-xs font-medium'
                                : 'truncate text-xs text-muted-foreground'
                            }
                          >
                            {last
                              ? (last.from_user_id === DEMO_ME.id ? '自分: ' : '') + last.text
                              : 'トークを開始'}
                          </p>
                          {thread.unread_count > 0 && (
                            <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-foreground px-1.5 font-mont text-[10px] text-background">
                              {thread.unread_count}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <p className="mt-12 text-xs leading-relaxed text-muted-foreground">
            ※ トークは両想いになった相手のみと開始できます。<br />
            ※ 不適切なメッセージは通報・運営確認の対象になります。
          </p>
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function formatTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  if (sameDay) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
  return `${date.getMonth() + 1}/${date.getDate()}`;
}
