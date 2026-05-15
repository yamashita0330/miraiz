import Link from 'next/link';
import { Calendar, MapPin, ChevronRight, Sparkles, Heart, Users } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Badge } from '@/components/ui/badge';
import { DEMO_EVENTS_LIST, DEMO_USER_STATE, DEMO_EVENT_CONVERSATIONS } from '@/lib/demo';

export const dynamic = 'force-dynamic';

// past参加履歴のメタ情報（チケット保持していた過去イベント）
const PAST_PARTICIPATION_META: Record<string, { conversations_completed: number; conversations_total: number; mutual_match_count: number }> = {
  vol4: { conversations_completed: 7, conversations_total: 7, mutual_match_count: 1 },
};

export default function EventsPage() {
  const events = DEMO_EVENTS_LIST;
  const userTickets = DEMO_USER_STATE.event_tickets;
  const live = events.find((e) => e.status === 'live' && userTickets.includes(e.token));
  const upcoming = events.filter((e) => e.status === 'upcoming');
  const past = events.filter((e) => e.status === 'past' && userTickets.includes(e.token));

  // ライブイベントの進捗
  const liveProgress = {
    completed: DEMO_EVENT_CONVERSATIONS.filter((c) => c.status === 'completed').length,
    total: DEMO_EVENT_CONVERSATIONS.length,
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-8">
          {/* 進行中の参加イベント */}
          {live && (
            <section className="mb-10">
              <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-rose">
                Live Now
              </h2>
              <Link
                href={`/event/${live.token}/mid`}
                className="block rounded-2xl border-2 border-rose bg-rose-50 p-6 transition-colors hover:bg-rose-100"
              >
                <div className="flex items-baseline justify-between gap-2 mb-3">
                  <Badge variant="rose" className="text-[10px]">参加中</Badge>
                  <span className="font-mont text-[10px] uppercase tracking-wider text-rose">
                    {liveProgress.completed}/{liveProgress.total} 完了
                  </span>
                </div>
                <p className="text-base font-semibold">{live.name}</p>
                <div className="mt-3 flex flex-col gap-1.5 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" aria-hidden />
                    {formatDateTime(live.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" aria-hidden />
                    {live.venue}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-rose">評価入力に戻る</span>
                  <ChevronRight className="h-4 w-4 text-rose" aria-hidden />
                </div>
              </Link>
            </section>
          )}

          {/* これからのイベント */}
          {upcoming.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                Upcoming
              </h2>
              <ul className="flex flex-col gap-3">
                {upcoming.map((event) => (
                  <li key={event.id}>
                    <Link
                      href={`/event/${event.token}`}
                      className="block overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/30"
                    >
                      {event.thumbnail && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={event.thumbnail}
                          alt=""
                          className="h-32 w-full object-cover"
                        />
                      )}
                      <div className="p-5">
                        <div className="flex items-baseline justify-between gap-2 mb-2">
                          <span className="font-mont text-[10px] uppercase tracking-wider text-muted-foreground">
                            {event.capacity}名定員
                          </span>
                          <Badge variant="soft" className="text-[10px]">
                            {countdownLabel(event.date)}
                          </Badge>
                        </div>
                        <p className="text-sm font-semibold">{event.name}</p>
                        <div className="mt-3 flex flex-col gap-1.5 text-[11px] text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" aria-hidden />
                            {formatDateTime(event.date)}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3 w-3" aria-hidden />
                            {event.venue}
                          </span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs font-medium">詳細・申込</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 参加履歴 */}
          {past.length > 0 && (
            <section>
              <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                Past Participations
              </h2>
              <ul className="flex flex-col gap-3">
                {past.map((event) => {
                  const meta = PAST_PARTICIPATION_META[event.token];
                  return (
                  <li key={event.id}>
                    <Link
                      href={`/event/${event.token}/result`}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:border-foreground/30"
                    >
                      <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted">
                        <Sparkles className="h-5 w-5 text-muted-foreground" strokeWidth={1.4} aria-hidden />
                      </div>
                      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                        <p className="truncate text-sm font-semibold">{event.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {formatDate(event.date)}
                        </p>
                        {meta && (
                          <div className="mt-1 flex items-center gap-3 text-[10px]">
                            <span className="inline-flex items-center gap-1 text-muted-foreground">
                              <Users className="h-3 w-3" aria-hidden />
                              {meta.conversations_completed}/{meta.conversations_total} 会話
                            </span>
                            <span className="inline-flex items-center gap-1 text-rose">
                              <Heart className="h-3 w-3 fill-rose" aria-hidden />
                              両想い {meta.mutual_match_count}人
                            </span>
                          </div>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
                    </Link>
                  </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* 何もないステート（新規ユーザー） */}
          {!live && upcoming.length === 0 && past.length === 0 && (
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Calendar className="h-7 w-7 text-muted-foreground" strokeWidth={1.4} aria-hidden />
              </div>
              <p className="text-sm font-medium">参加できるイベントはまだありません</p>
              <p className="text-[11px] leading-relaxed text-muted-foreground max-w-xs">
                次回開催が決まり次第、こちらに表示されます。
              </p>
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const wd = ['日', '月', '火', '水', '木', '金', '土'][d.getDay()];
  const hh = d.getHours().toString().padStart(2, '0');
  const mm = d.getMinutes().toString().padStart(2, '0');
  return `${month}/${day}(${wd}) ${hh}:${mm}`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${y}年${month}月${day}日`;
}

function countdownLabel(iso: string): string {
  const target = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  if (diff <= 0) return '開催中';
  if (diff <= 7) return `あと${diff}日`;
  if (diff <= 30) return `あと${Math.ceil(diff / 7)}週間`;
  return `あと${Math.ceil(diff / 30)}ヶ月`;
}
