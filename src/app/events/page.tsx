import Link from 'next/link';
import { MapPin, ArrowRight, Heart, Users, Clock, Ticket, CheckCircle2, Sparkles } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { DEMO_EVENTS_LIST, DEMO_USER_STATE, DEMO_EVENT_CONVERSATIONS } from '@/lib/demo';

export const dynamic = 'force-dynamic';

const PAST_PARTICIPATION_META: Record<string, { conversations_completed: number; conversations_total: number; mutual_match_count: number }> = {
  vol4: { conversations_completed: 7, conversations_total: 7, mutual_match_count: 1 },
};

export default function EventsPage() {
  const events = DEMO_EVENTS_LIST;
  const userTickets = DEMO_USER_STATE.event_tickets;
  const live = events.find((e) => e.status === 'live' && userTickets.includes(e.token));
  const upcoming = events.filter((e) => e.status === 'upcoming');
  const past = events.filter((e) => e.status === 'past' && userTickets.includes(e.token));

  const liveProgress = {
    completed: DEMO_EVENT_CONVERSATIONS.filter((c) => c.status === 'completed').length,
    total: DEMO_EVENT_CONVERSATIONS.length,
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-8">
          {/* ページヘッダー */}
          <header className="mb-8">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Events
            </span>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">イベント</h1>
          </header>

          {/* ============= 進行中（Live） ============= */}
          {live && (
            <Link
              href={`/event/${live.token}/mid`}
              className="group mb-8 block overflow-hidden rounded-3xl border-2 border-rose bg-foreground text-background"
            >
              {/* ライブヘッダー帯 */}
              <div className="flex items-center justify-between bg-rose px-5 py-2.5 text-rose-foreground">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-foreground opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-foreground" />
                  </span>
                  開催中・参加中
                </span>
                <span className="font-mont text-[11px]">
                  {liveProgress.completed}/{liveProgress.total} 完了
                </span>
              </div>
              <div className="p-6">
                <p className="text-lg font-semibold leading-snug">{live.name}</p>
                <div className="mt-2 flex flex-col gap-1 text-[11px] opacity-70">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3 w-3" aria-hidden />{formatDateTime(live.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" aria-hidden />{live.venue}
                  </span>
                </div>
                {/* 進捗バー */}
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-background/15">
                  <div
                    className="h-full rounded-full bg-rose transition-all"
                    style={{ width: `${(liveProgress.completed / liveProgress.total) * 100}%` }}
                  />
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-background px-4 py-2 text-xs font-semibold text-foreground">
                  評価入力に戻る
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </div>
              </div>
            </Link>
          )}

          {/* ============= これからのイベント ============= */}
          {upcoming.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                Upcoming
              </h2>
              <ul className="flex flex-col gap-5">
                {upcoming.map((event) => {
                  const d = new Date(event.date);
                  const hasTicket = userTickets.includes(event.token);
                  return (
                    <li key={event.id}>
                      <Link
                        href={`/event/${event.token}`}
                        className="group block overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-foreground/30 hover:shadow-lg"
                      >
                        {/* ヒーロー帯：日付ブロック */}
                        <div className="relative flex items-center gap-5 bg-gradient-to-br from-rose/10 via-card to-card px-6 pt-6 pb-5">
                          {/* 大型日付 */}
                          <div className="flex flex-col items-center rounded-2xl border-2 border-foreground bg-foreground px-4 py-3 text-background">
                            <span className="font-mont text-[10px] uppercase tracking-wider opacity-70">
                              {d.getFullYear()}.{(d.getMonth() + 1).toString().padStart(2, '0')}
                            </span>
                            <span className="font-mont text-3xl font-medium leading-none">
                              {d.getDate()}
                            </span>
                            <span className="mt-0.5 text-[10px] opacity-70">
                              {['日', '月', '火', '水', '木', '金', '土'][d.getDay()]}曜
                            </span>
                          </div>
                          {/* タイトル + カウントダウン */}
                          <div className="min-w-0 flex-1">
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose px-2.5 py-0.5 text-[10px] font-semibold text-rose-foreground">
                              <Sparkles className="h-2.5 w-2.5" aria-hidden />
                              {countdownLabel(event.date)}
                            </span>
                            <p className="mt-2 text-base font-semibold leading-snug">
                              {event.name}
                            </p>
                          </div>
                          {hasTicket && (
                            <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-success px-2 py-0.5 text-[9px] font-semibold text-success-foreground">
                              <CheckCircle2 className="h-2.5 w-2.5" aria-hidden />チケット保有
                            </span>
                          )}
                        </div>

                        {/* 情報行 */}
                        <div className="px-6 py-4">
                          <div className="flex flex-col gap-2 text-[12px]">
                            <span className="inline-flex items-center gap-2 text-muted-foreground">
                              <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
                              {formatTimeRange(event.date, event.end_date)}
                            </span>
                            <span className="inline-flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                              {event.venue}
                            </span>
                            <span className="inline-flex items-center gap-2 text-muted-foreground">
                              <Users className="h-3.5 w-3.5 shrink-0" aria-hidden />
                              定員 {event.capacity}名
                            </span>
                          </div>

                          {/* ハイライト チップ */}
                          {event.highlights && event.highlights.length > 0 && (
                            <ul className="mt-3 flex flex-wrap gap-1.5">
                              {event.highlights.slice(0, 3).map((h, i) => (
                                <li
                                  key={i}
                                  className="rounded-full bg-muted px-2.5 py-1 text-[10px] text-muted-foreground"
                                >
                                  {h.length > 16 ? h.slice(0, 16) + '…' : h}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* フッター：価格 + CTA */}
                        <div className="flex items-center justify-between border-t border-border bg-muted/30 px-6 py-3.5">
                          <span className="inline-flex items-baseline gap-1">
                            <Ticket className="h-3.5 w-3.5 self-center text-muted-foreground" aria-hidden />
                            <span className="font-mont text-base font-semibold">
                              ¥{event.ticket_price.toLocaleString()}
                            </span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background transition-transform group-hover:scale-105">
                            {hasTicket ? '詳細を見る' : '詳細・申込'}
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* ============= 参加履歴 ============= */}
          {past.length > 0 && (
            <section>
              <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                Past
              </h2>
              <ul className="flex flex-col gap-3">
                {past.map((event) => {
                  const meta = PAST_PARTICIPATION_META[event.token];
                  return (
                    <li key={event.id}>
                      <Link
                        href={`/event/${event.token}/result`}
                        className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-foreground/30"
                      >
                        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-muted">
                          <span className="font-mont text-lg font-medium leading-none">
                            {new Date(event.date).getMonth() + 1}
                          </span>
                          <span className="text-[8px] text-muted-foreground">月</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{event.name}</p>
                          <p className="text-[10px] text-muted-foreground">{formatDate(event.date)}</p>
                          {meta && (
                            <div className="mt-1.5 flex items-center gap-3 text-[10px]">
                              <span className="inline-flex items-center gap-1 text-muted-foreground">
                                <Users className="h-3 w-3" aria-hidden />
                                {meta.conversations_completed}/{meta.conversations_total} 会話
                              </span>
                              <span className="inline-flex items-center gap-1 font-medium text-rose">
                                <Heart className="h-3 w-3 fill-rose" aria-hidden />
                                両想い {meta.mutual_match_count}
                              </span>
                            </div>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* 何もないステート */}
          {!live && upcoming.length === 0 && past.length === 0 && (
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Ticket className="h-7 w-7 text-muted-foreground" strokeWidth={1.4} aria-hidden />
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
  const wd = ['日', '月', '火', '水', '木', '金', '土'][d.getDay()];
  const hh = d.getHours().toString().padStart(2, '0');
  const mm = d.getMinutes().toString().padStart(2, '0');
  return `${d.getMonth() + 1}/${d.getDate()}(${wd}) ${hh}:${mm}`;
}

function formatTimeRange(startIso: string, endIso?: string): string {
  const s = new Date(startIso);
  const sh = `${s.getHours().toString().padStart(2, '0')}:${s.getMinutes().toString().padStart(2, '0')}`;
  if (!endIso) return `${sh} 〜`;
  const e = new Date(endIso);
  const eh = `${e.getHours().toString().padStart(2, '0')}:${e.getMinutes().toString().padStart(2, '0')}`;
  return `${sh} 〜 ${eh}`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function countdownLabel(iso: string): string {
  const diff = Math.ceil((new Date(iso).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff <= 0) return '開催間近';
  if (diff <= 7) return `あと${diff}日`;
  if (diff <= 30) return `あと${Math.ceil(diff / 7)}週間`;
  return `あと${Math.ceil(diff / 30)}ヶ月`;
}
