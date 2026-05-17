'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Sparkles,
  ChevronRight,
  ClipboardList,
  ArrowRight,
  Heart,
  Target,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { findDemoEvent, hasEventTicket, DEMO_EVENT_INTENTIONS, type EventIntention } from '@/lib/demo';
import { IntentionCard } from './IntentionCard';
import { SponsorSlot } from '@/components/SponsorSlot';

export default function EventDetailPage() {
  const params = useParams<{ token: string }>();
  const event = findDemoEvent(params.token);
  const [hasTicket, setHasTicket] = useState(false);
  const [intention, setIntention] = useState<EventIntention | null>(
    DEMO_EVENT_INTENTIONS[params.token] ?? null
  );
  // メニューで開いているセクション（チケット保有者用）
  const [openSection, setOpenSection] = useState<'intention' | 'schedule' | 'highlights' | null>(null);

  useEffect(() => {
    setHasTicket(hasEventTicket(params.token));
  }, [params.token]);

  if (!event) notFound();

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-8">
          <Link
            href="/events"
            className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden />
            イベント一覧へ戻る
          </Link>

          {/* サムネイル */}
          {event.thumbnail && (
            <div className="mb-6 overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={event.thumbnail} alt="" className="h-48 w-full object-cover" />
            </div>
          )}

          {/* タイトル */}
          <div className="mb-6">
            <div className="mb-2 flex flex-wrap items-baseline gap-2">
              <Badge
                variant={event.status === 'live' ? 'rose' : event.status === 'upcoming' ? 'soft' : 'outline'}
                className="text-[10px]"
              >
                {event.status === 'live' ? 'LIVE' : event.status === 'upcoming' ? '受付中' : '終了'}
              </Badge>
              {hasTicket && (
                <Badge variant="goldSoft" className="text-[10px]">
                  チケット保有中
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">{event.name}</h1>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {event.description}
            </p>
          </div>

          {/* イベント用プロフィール入力（チケット保有者・最優先・上部配置） */}
          {hasTicket && event.status !== 'past' && (
            <Link
              href={`/event/${event.token}/profile`}
              className="group mb-6 block overflow-hidden rounded-2xl border-2 border-rose bg-rose"
            >
              <div className="flex items-center gap-4 p-5 text-rose-foreground">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-foreground/15">
                  <ClipboardList className="h-6 w-6" strokeWidth={1.8} aria-hidden />
                </span>
                <div className="flex-1">
                  <span className="rounded-full bg-rose-foreground/20 px-2 py-0.5 text-[9px] font-bold tracking-wide">
                    まず最初に
                  </span>
                  <p className="mt-1 text-[15px] font-bold leading-snug">
                    イベント用プロフィールを入力
                  </p>
                  <p className="mt-0.5 text-[11px] opacity-80">
                    当日の席順マッチングに使います
                  </p>
                </div>
                <ArrowRight
                  className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </div>
            </Link>
          )}

          {/* 基本情報 */}
          <section className="mb-6 flex flex-col gap-2 rounded-2xl border border-border bg-card p-5">
            <InfoLine
              Icon={Calendar}
              label="開催日時"
              value={`${formatDateTime(event.date)} - ${formatTimeOnly(event.end_date)}`}
            />
            <InfoLine Icon={MapPin} label="会場" value={event.venue} />
            <InfoLine Icon={MapPin} label="住所" value={event.address} />
            <InfoLine Icon={Users} label="定員" value={`${event.capacity}名`} />
          </section>

          {/* イベントメニュー（チケット保有者向けクイック導線） */}
          {hasTicket && event.status !== 'past' && (
            <section className="mb-6">
              <h2 className="mb-3 text-xs tracking-[0.15em] text-muted-foreground">
                イベントメニュー
              </h2>
              <div className="grid grid-cols-3 gap-2">
                <EventMenuItem href={`/event/${event.token}/profile`} Icon={ClipboardList} label="プロフィール入力" />
                <EventMenuItem href={`/event/${event.token}/mid`} Icon={Heart} label="お相手を評価する" />
                <EventMenuItem
                  Icon={Target}
                  label="今回の試み"
                  active={openSection === 'intention'}
                  onClick={() => setOpenSection((s) => (s === 'intention' ? null : 'intention'))}
                />
                <EventMenuItem
                  Icon={Clock}
                  label="タイムスケジュール"
                  active={openSection === 'schedule'}
                  onClick={() => setOpenSection((s) => (s === 'schedule' ? null : 'schedule'))}
                />
                <EventMenuItem
                  Icon={Sparkles}
                  label="イベントの見どころ"
                  active={openSection === 'highlights'}
                  onClick={() => setOpenSection((s) => (s === 'highlights' ? null : 'highlights'))}
                />
              </div>
            </section>
          )}

          {/* 今回の試み（メニューで「今回の試み」を選択時のみ表示） */}
          {hasTicket && event.status !== 'past' && openSection === 'intention' && (
            <section id="intention" className="mb-6 scroll-mt-20">
              <IntentionCard
                initialIntention={intention}
                eventToken={event.token}
                onSave={setIntention}
              />
            </section>
          )}

          {/* 過去イベント：振り返り表示 */}
          {hasTicket && event.status === 'past' && intention && (
            <section className="mb-6 rounded-2xl border border-border bg-card p-5">
              <p className="mb-2 text-[10px] tracking-[0.15em] text-muted-foreground">
                前回の試み
              </p>
              <p className="text-sm font-semibold mb-3">この日の試み</p>
              <div className="flex flex-wrap gap-1.5">
                {intention.tags.map((tag) => {
                  const achieved = intention.achieved_tags.includes(tag);
                  return (
                    <Badge
                      key={tag}
                      variant={achieved ? 'rose' : 'soft'}
                      className="text-[10px]"
                    >
                      {achieved ? '◯ 達成' : '—'} {tag}
                    </Badge>
                  );
                })}
              </div>
            </section>
          )}

          {/* ハイライト（未保有者は常時表示／保有者はメニュー選択時） */}
          {event.highlights.length > 0 &&
            (!hasTicket || event.status === 'past' || openSection === 'highlights') && (
            <section id="highlights" className="mb-6 scroll-mt-20">
              <h2 className="mb-3 text-xs tracking-[0.15em] text-muted-foreground">
                イベントの見どころ
              </h2>
              <ul className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5">
                {event.highlights.map((h, i) => (
                  <li key={i} className="flex items-baseline gap-2 text-xs leading-relaxed">
                    <Sparkles className="h-3 w-3 shrink-0 text-rose" strokeWidth={1.8} aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* スケジュール（未保有者は常時表示／保有者はメニュー選択時） */}
          {event.schedule.length > 0 &&
            (!hasTicket || event.status === 'past' || openSection === 'schedule') && (
            <section id="schedule" className="mb-6 scroll-mt-20">
              <h2 className="mb-3 text-xs tracking-[0.15em] text-muted-foreground">
                当日のタイムスケジュール
              </h2>
              <ul className="flex flex-col gap-2">
                {event.schedule.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-3 rounded-lg border border-border bg-card px-4 py-3"
                  >
                    <Clock className="h-3 w-3 shrink-0 text-muted-foreground" strokeWidth={1.6} aria-hidden />
                    <span className="font-mont text-[10px] text-muted-foreground w-20 shrink-0">
                      {s.time}
                    </span>
                    <span className="text-xs">{s.content}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 注意事項 */}
          {event.notes.length > 0 && (
            <section className="mb-6 rounded-2xl border border-border bg-muted/30 px-5 py-4">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                注意事項
              </p>
              <ul className="flex flex-col gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
                {event.notes.map((n, i) => (
                  <li key={i} className="flex items-baseline gap-1.5">
                    <span>※</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 協賛企業プロモ枠 */}
          <SponsorSlot placement="event_detail" max={1} className="mb-6" />

          {/* CTA */}
          {hasTicket ? (
            <div className="flex flex-col gap-2">
              {event.status !== 'past' && (
                <Link href={`/event/${event.token}/mid`}>
                  <Button fullWidth size="lg" className="gap-2">
                    <Sparkles className="h-4 w-4" aria-hidden />
                    {event.status === 'live' ? '評価入力に戻る' : '会場へ向かう（参加者画面）'}
                  </Button>
                </Link>
              )}
              <Link href={`/event/${event.token}/result`}>
                <Button fullWidth size="lg" variant="outline">
                  両想い結果を見る
                </Button>
              </Link>
            </div>
          ) : event.status === 'past' ? (
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-muted/30 px-4 py-5 text-center text-xs text-muted-foreground">
              このイベントは終了しました
            </div>
          ) : (
            <>
              <div className="mb-3 flex items-baseline justify-between rounded-2xl border-2 border-rose bg-rose-50 px-5 py-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium">参加チケット</span>
                  <span className="text-[10px] text-muted-foreground">クレジットカード決済</span>
                </div>
                <span className="font-mont text-2xl font-medium tracking-tight text-rose">
                  ¥{event.ticket_price.toLocaleString()}
                </span>
              </div>
              <Link href={`/event/${event.token}/checkout`}>
                <Button fullWidth size="lg" className="gap-2">
                  チケットを購入する
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Button>
              </Link>
            </>
          )}
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function InfoLine({
  Icon,
  label,
  value,
}: {
  Icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-baseline gap-2 text-xs">
      <Icon className="h-3 w-3 shrink-0 text-muted-foreground" strokeWidth={1.6} aria-hidden />
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground w-16 shrink-0">
        {label}
      </span>
      <span className="flex-1 font-medium">{value}</span>
    </div>
  );
}

function EventMenuItem({
  href,
  Icon,
  label,
  active,
  onClick,
}: {
  href?: string;
  Icon: typeof Calendar;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const cls = cn(
    'flex aspect-square flex-col items-center justify-center gap-1.5 rounded-2xl border p-2 text-center transition-colors',
    active
      ? 'border-foreground bg-foreground text-background'
      : 'border-border bg-card hover:border-foreground/30 hover:bg-muted/40'
  );
  const inner = (
    <>
      <Icon
        className={cn('h-5 w-5', active ? 'text-background' : 'text-rose')}
        strokeWidth={1.7}
        aria-hidden
      />
      <span className="text-[11px] font-medium leading-tight">{label}</span>
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
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

function formatTimeOnly(iso: string): string {
  const d = new Date(iso);
  const hh = d.getHours().toString().padStart(2, '0');
  const mm = d.getMinutes().toString().padStart(2, '0');
  return `${hh}:${mm}`;
}
