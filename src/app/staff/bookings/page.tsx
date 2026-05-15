'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Check, X, Loader2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  DEMO_BOOKINGS,
  PLAN_LABEL,
  BOOKING_TYPE_LABEL,
  type MatchmakerBooking,
  type BookingType,
} from '@/lib/demo';

type FilterType = 'all' | BookingType;

export default function BookingsPage() {
  const [bookings, setBookings] = useState<MatchmakerBooking[]>(DEMO_BOOKINGS);
  const [filter, setFilter] = useState<FilterType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'completed'>('upcoming');

  const filtered = bookings.filter((b) => {
    if (filter !== 'all' && b.type !== filter) return false;
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    return true;
  });

  const sorted = [...filtered].sort(
    (a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
  );

  const markCompleted = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'completed' as const } : b))
    );
  };

  const markNoShow = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'no_show' as const } : b))
    );
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link
            href="/staff"
            className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden />
            ダッシュボード
          </Link>

          <h1 className="mb-2 text-2xl font-semibold tracking-tight">予約管理</h1>
          <p className="mb-8 text-xs text-muted-foreground">
            仲人Zoom・対面セッション・相談会の予約状況
          </p>

          {/* 山下代表の今月の負担表示 */}
          <section className="mb-6 rounded-2xl border-2 border-foreground bg-foreground p-5 text-background">
            <p className="text-[10px] uppercase tracking-wider opacity-70">山下代表 今月の予定</p>
            <div className="mt-2 grid grid-cols-3 gap-3">
              <div>
                <p className="font-mont text-2xl font-medium">
                  {bookings.filter((b) => b.status === 'upcoming' && b.type === 'zoom').length}
                </p>
                <p className="text-[10px] opacity-70">Zoom予約</p>
              </div>
              <div>
                <p className="font-mont text-2xl font-medium">
                  {bookings.filter((b) => b.status === 'upcoming' && b.type === 'in_person').length}
                </p>
                <p className="text-[10px] opacity-70">対面予約</p>
              </div>
              <div>
                <p className="font-mont text-2xl font-medium">
                  {Math.round(
                    bookings
                      .filter((b) => b.status === 'upcoming')
                      .reduce((sum, b) => sum + b.duration_minutes, 0) / 60
                  )}h
                </p>
                <p className="text-[10px] opacity-70">合計時間</p>
              </div>
            </div>
          </section>

          {/* フィルタ */}
          <section className="mb-6 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <Chip label="全種別" active={filter === 'all'} onClick={() => setFilter('all')} />
              <Chip label="Zoom" active={filter === 'zoom'} onClick={() => setFilter('zoom')} />
              <Chip label="対面" active={filter === 'in_person'} onClick={() => setFilter('in_person')} />
              <Chip
                label="月例会"
                active={filter === 'mindset_meeting'}
                onClick={() => setFilter('mindset_meeting')}
              />
              <Chip
                label="個別フィードバック"
                active={filter === 'individual_feedback'}
                onClick={() => setFilter('individual_feedback')}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Chip
                label="今後"
                active={statusFilter === 'upcoming'}
                onClick={() => setStatusFilter('upcoming')}
              />
              <Chip
                label="完了"
                active={statusFilter === 'completed'}
                onClick={() => setStatusFilter('completed')}
              />
              <Chip label="全て" active={statusFilter === 'all'} onClick={() => setStatusFilter('all')} />
            </div>
          </section>

          {/* 予約一覧 */}
          <section className="overflow-hidden rounded-2xl border border-border bg-card">
            {sorted.length === 0 ? (
              <div className="px-6 py-12 text-center text-xs text-muted-foreground">
                該当する予約はありません
              </div>
            ) : (
              <ul>
                {sorted.map((b, i) => (
                  <li
                    key={b.id}
                    className={cn(
                      'flex flex-wrap items-baseline gap-3 px-5 py-4',
                      i !== sorted.length - 1 && 'border-b border-border'
                    )}
                  >
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.6} aria-hidden />
                    <span className="font-mont text-xs">{formatDateTime(b.scheduled_at)}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {BOOKING_TYPE_LABEL[b.type]}
                    </Badge>
                    <Badge variant={b.plan === 'matsu' ? 'rose' : 'soft'} className="text-[10px]">
                      {PLAN_LABEL[b.plan]}
                    </Badge>
                    <span className="text-sm font-medium flex-1 min-w-[100px]">{b.user_name}</span>
                    <span className="text-[10px] text-muted-foreground">{b.duration_minutes}分</span>
                    {b.notes && (
                      <p className="basis-full text-[10px] text-muted-foreground italic">
                        {b.notes}
                      </p>
                    )}
                    {b.status === 'upcoming' && (
                      <div className="flex gap-2 basis-full mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markCompleted(b.id)}
                          className="gap-1"
                        >
                          <Check className="h-3 w-3" aria-hidden />
                          完了
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markNoShow(b.id)}
                          className="gap-1"
                        >
                          <X className="h-3 w-3" aria-hidden />
                          ノーショー
                        </Button>
                      </div>
                    )}
                    {b.status === 'completed' && (
                      <Badge variant="outline" className="text-[10px] text-success border-success">
                        完了
                      </Badge>
                    )}
                    {b.status === 'no_show' && (
                      <Badge variant="outline" className="text-[10px] text-warn border-warn">
                        ノーショー
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors',
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-border bg-background hover:bg-muted'
      )}
    >
      {label}
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
