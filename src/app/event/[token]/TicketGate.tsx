'use client';

import Link from 'next/link';
import { Lock, Calendar, MapPin, Users, ArrowLeft, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Props {
  eventToken: string;
  eventName: string;
  eventDate: string;
  venue: string;
  capacity: number;
  ticketPrice?: number;
  reason?: 'not_purchased' | 'not_started';
}

export function TicketGate({
  eventToken,
  eventName,
  eventDate,
  venue,
  capacity,
  ticketPrice = 6000,
  reason = 'not_purchased',
}: Props) {
  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <Link
            href="/events"
            className="mb-6 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden />
            イベント一覧へ戻る
          </Link>

          {/* ロックアイコン */}
          <div className="flex flex-col items-center gap-4 text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Lock className="h-7 w-7 text-muted-foreground" strokeWidth={1.4} aria-hidden />
            </div>
            <div className="flex flex-col gap-2">
              <Badge variant="soft" className="mx-auto text-[10px]">
                {reason === 'not_purchased' ? 'チケット未購入' : '開催前'}
              </Badge>
              <h1 className="text-xl font-semibold tracking-tight">
                参加者の情報は<br />
                チケットをご購入の方のみ
              </h1>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground max-w-sm">
                {reason === 'not_purchased'
                  ? 'このイベントの参加者プロフィール・会話スケジュール・両想い結果は、参加チケットをご購入の方のみご覧いただけます。'
                  : 'イベント開始時刻になりましたら、参加者情報が表示されます。'}
              </p>
            </div>
          </div>

          {/* イベント概要 */}
          <section className="mb-8 rounded-2xl border border-border bg-card p-5">
            <p className="text-base font-semibold">{eventName}</p>
            <div className="mt-3 flex flex-col gap-1.5 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3 w-3" aria-hidden />
                {formatDateTime(eventDate)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3" aria-hidden />
                {venue}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3 w-3" aria-hidden />
                定員 {capacity}名
              </span>
            </div>
          </section>

          {/* CTA */}
          {reason === 'not_purchased' && (
            <>
              <div className="mb-3 flex items-baseline justify-between rounded-2xl border-2 border-rose bg-rose-50 px-5 py-4">
                <span className="text-xs font-medium">チケット価格</span>
                <span className="font-mont text-2xl font-medium tracking-tight text-rose">
                  ¥{ticketPrice.toLocaleString()}
                </span>
              </div>
              <Link href={`/event/${eventToken}/checkout`}>
                <Button fullWidth size="lg" className="gap-2">
                  チケットを購入する
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Button>
              </Link>
              <Link href={`/event/${eventToken}`} className="mt-2 block">
                <Button fullWidth size="lg" variant="outline">
                  イベント詳細を見る
                </Button>
              </Link>
            </>
          )}

          {/* 注意 */}
          <p className="mt-8 rounded-2xl border border-border bg-muted/30 px-4 py-4 text-[11px] leading-relaxed text-muted-foreground">
            会場での連絡先・LINE・SNS交換は禁止です。気になった相手とは、両想いになった場合のみアプリで繋がれます。アプリ単独利用ではイベント参加者とのマッチングはできません。
          </p>
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
