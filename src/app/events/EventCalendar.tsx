'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export type CalEvent = {
  token: string;
  name: string;
  date: string;
  status: 'upcoming' | 'live' | 'past';
};

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

export function EventCalendar({ events }: { events: CalEvent[] }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed

  // 表示月のイベントを日→イベントでマップ
  const eventsByDay = new Map<number, CalEvent>();
  events.forEach((e) => {
    const d = new Date(e.date);
    if (d.getFullYear() === viewYear && d.getMonth() === viewMonth) {
      eventsByDay.set(d.getDate(), e);
    }
  });
  const monthEvents = Array.from(eventsByDay.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([day, ev]) => ({ day, ev }));

  const isSameMonth = today.getFullYear() === viewYear && today.getMonth() === viewMonth;
  const todayDay = today.getDate();

  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">
      {/* 月ナビ */}
      <div className="flex items-center justify-between border-b border-border px-3 py-3">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="前の月"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>
        <p className="font-mont text-sm font-medium tracking-wide">
          {viewYear}<span className="mx-1 text-muted-foreground">.</span>
          {(viewMonth + 1).toString().padStart(2, '0')}
        </p>
        <button
          type="button"
          onClick={nextMonth}
          aria-label="次の月"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      {/* グリッド */}
      <div className="px-3 py-4">
        <div className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((w, i) => (
            <span
              key={w}
              className={`pb-1 text-center text-[10px] font-medium ${
                i === 0 ? 'text-rose' : i === 6 ? 'text-info' : 'text-muted-foreground'
              }`}
            >
              {w}
            </span>
          ))}
          {cells.map((day, i) => {
            if (day === null) return <span key={i} />;
            const ev = eventsByDay.get(day);
            const isToday = isSameMonth && day === todayDay;
            const dow = i % 7;

            const cellInner = (
              <span
                className={`relative flex aspect-square flex-col items-center justify-center rounded-xl font-mont text-[13px] transition-colors ${
                  ev
                    ? ev.status === 'past'
                      ? 'bg-muted font-semibold text-muted-foreground'
                      : 'bg-rose font-bold text-rose-foreground'
                    : isToday
                    ? 'border border-foreground/40 font-semibold'
                    : dow === 0
                    ? 'text-rose/70'
                    : dow === 6
                    ? 'text-info/70'
                    : 'text-foreground/70'
                }`}
              >
                {day}
                {ev && (
                  <span
                    className={`mt-0.5 h-1 w-1 rounded-full ${
                      ev.status === 'past' ? 'bg-muted-foreground' : 'bg-rose-foreground'
                    }`}
                    aria-hidden
                  />
                )}
              </span>
            );

            return ev ? (
              <Link key={i} href={`/event/${ev.token}`} aria-label={`${ev.name}`}>
                {cellInner}
              </Link>
            ) : (
              <span key={i}>{cellInner}</span>
            );
          })}
        </div>
      </div>

      {/* この月のイベント一覧 */}
      {monthEvents.length > 0 ? (
        <ul className="border-t border-border">
          {monthEvents.map(({ day, ev }) => (
            <li key={ev.token}>
              <Link
                href={`/event/${ev.token}`}
                className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/40"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg font-mont text-[13px] font-bold leading-none ${
                    ev.status === 'past'
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-rose text-rose-foreground'
                  }`}
                >
                  {day}
                  <span className="text-[7px] font-normal opacity-70">日</span>
                </span>
                <span className="min-w-0 flex-1 truncate text-[12px] font-medium">
                  {ev.name}
                </span>
                {ev.status === 'live' && (
                  <span className="shrink-0 rounded-full bg-rose px-2 py-0.5 text-[9px] font-semibold text-rose-foreground">
                    開催中
                  </span>
                )}
                <ArrowRight
                  className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-t border-border px-4 py-4 text-center text-[11px] text-muted-foreground">
          この月のイベントはありません
        </p>
      )}
    </div>
  );
}
