'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Sparkles, MessageCircle, Heart, User as UserIcon } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DEMO_MUTUAL_MATCHES, findDemoEvent, findDemoMember, hasEventTicket } from '@/lib/demo';
import { TicketGate } from '../TicketGate';

export default function EventResultPage() {
  const params = useParams<{ token: string }>();
  const event = findDemoEvent(params.token);
  const [hasTicket, setHasTicket] = useState(false);

  useEffect(() => {
    setHasTicket(hasEventTicket(params.token));
  }, [params.token]);

  if (!hasTicket) {
    return (
      <TicketGate
        eventToken={params.token}
        eventName={event?.name ?? '恋フェス'}
        eventDate={event?.date ?? new Date().toISOString()}
        venue={event?.venue ?? '徳島'}
        capacity={event?.capacity ?? 70}
        ticketPrice={event?.ticket_price ?? 6000}
      />
    );
  }

  const matches = DEMO_MUTUAL_MATCHES.map((id) => findDemoMember(id)).filter(Boolean);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-xl items-center gap-3 px-4">
          <Link
            href={`/event/${params.token}/mid`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="戻る"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </Link>
          <p className="text-sm font-semibold">両想い発表</p>
        </div>
      </header>

      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          {/* ヒーロー */}
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose">
              <Sparkles className="h-7 w-7" strokeWidth={1.6} aria-hidden />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              両想いの発表
            </h1>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground max-w-sm">
              恋フェスVol.5・第二部にご参加ありがとうございました。<br />
              あなたとお互いに「連絡先を交換したい」と評価した方を発表します。
            </p>
          </div>

          {matches.length > 0 ? (
            <>
              <div className="mb-6 flex items-baseline justify-between">
                <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                  Mutual Matches
                </h2>
                <Badge variant="rose" className="text-[10px]">
                  {matches.length}人
                </Badge>
              </div>

              <ul className="flex flex-col gap-3">
                {matches.map((p) => p && (
                  <li key={p.id}>
                    <div className="flex items-center gap-4 rounded-2xl border-2 border-rose bg-rose-50 px-5 py-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                        {p.photo_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.photo_url} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <UserIcon className="h-6 w-6" strokeWidth={1.4} aria-hidden />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-semibold">{p.name}</p>
                          <span className="text-[10px] text-muted-foreground">{p.age}歳</span>
                        </div>
                        <p className="truncate text-[10px] text-muted-foreground">{p.prefecture}</p>
                        <div className="mt-1 flex gap-1.5">
                          <Link
                            href={`/profile/${p.id}`}
                            className="text-[11px] font-medium text-rose underline"
                          >
                            プロフィール
                          </Link>
                          <span className="text-[10px] text-muted-foreground">・</span>
                          <Link
                            href={`/messages/thread-${p.id}`}
                            className="text-[11px] font-medium text-rose underline"
                          >
                            トーク開始
                          </Link>
                        </div>
                      </div>
                      <Heart className="h-5 w-5 shrink-0 fill-rose text-rose" aria-hidden />
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link href="/messages">
                  <Button fullWidth size="lg" className="gap-2">
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    トーク一覧へ
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-muted/30 px-6 py-12 text-center">
              <p className="text-sm font-medium">両想いはいませんでした</p>
              <p className="text-[11px] leading-relaxed text-muted-foreground max-w-sm">
                明朝10時に「あなたの恋の通知表」が届きます。<br />
                ご自身のスコアと改善ポイントが分かります。<br />
                次回イベントでまたお会いできますように。
              </p>
            </div>
          )}

          {/* 翌朝通知表の予告 */}
          <section className="mt-12 rounded-2xl border border-border bg-card px-5 py-5">
            <div className="flex items-baseline gap-2">
              <span className="font-mont text-[10px] uppercase tracking-wider text-muted-foreground">
                明日 10:00
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold">あなたの恋の通知表が届きます</p>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              7名との会話から算出された、あなたの居心地・話しやすさスコア・改善ポイントをLINEでお届けします。
            </p>
            <Link
              href="/tsuchihyo"
              className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-rose"
            >
              通知表サンプルを見る →
            </Link>
          </section>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
