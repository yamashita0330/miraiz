import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, User as UserIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { BottomNav } from '@/components/BottomNav';
import { Badge } from '@/components/ui/badge';
import { ChatRoom } from './ChatRoom';
import {
  DEMO_MODE,
  DEMO_ME,
  findDemoThread,
  findDemoMember,
  DEMO_MESSAGES,
  DEMO_THREAD_REVIEW_STATE,
  DEMO_THREAD_DATE_STATE,
  DEMO_THREAD_SUPPORT_STATE,
} from '@/lib/demo';

export const dynamic = 'force-dynamic';

export default async function ChatThreadPage({ params }: { params: { id: string } }) {
  if (!DEMO_MODE) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');
  }

  const thread = findDemoThread(params.id);
  if (!thread) notFound();

  const partnerId = thread.participants.find((id) => id !== DEMO_ME.id);
  if (!partnerId) notFound();
  const partner = findDemoMember(partnerId);
  if (!partner) notFound();

  const messages = DEMO_MESSAGES[thread.id] ?? [];
  const reviewState = DEMO_THREAD_REVIEW_STATE[thread.id];
  const dateState = DEMO_THREAD_DATE_STATE[thread.id];
  const supportState = DEMO_THREAD_SUPPORT_STATE[thread.id];

  return (
    <>
      {/* 専用ヘッダー（相手プロフィール） */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-12 max-w-xl items-center gap-2 px-3">
          <Link
            href="/messages"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="戻る"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <Link
            href={`/profile/${partner.id}`}
            className="flex flex-1 items-center gap-2 transition-opacity hover:opacity-70"
          >
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
              {partner.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={partner.photo_url} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <UserIcon className="h-4 w-4" strokeWidth={1.4} aria-hidden />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-0.5 min-w-0">
              <p className="truncate text-sm font-semibold">{partner.name}</p>
              <p className="text-[10px] text-muted-foreground">プロフィールを見る →</p>
            </div>
            {(() => {
              const daysLeft = Math.max(
                0,
                Math.ceil((new Date(dateState.expires_at).getTime() - Date.now()) / (24 * 60 * 60 * 1000))
              );
              const dateConfirmed = dateState.proposal?.status === 'confirmed';
              if (dateConfirmed) {
                return <Badge variant="goldSoft" className="text-[10px]">デート確定</Badge>;
              }
              return (
                <Badge variant={daysLeft <= 3 ? 'rose' : 'soft'} className="text-[10px]">
                  残{daysLeft}日
                </Badge>
              );
            })()}
          </Link>
        </div>
      </header>

      <main className="flex h-[calc(100vh-2.75rem-3rem)] min-h-0 flex-col bg-background">
        <ChatRoom
          initialMessages={messages}
          partner={partner}
          threadId={thread.id}
          initialUnlocked={thread.unlocked}
          initialReviewState={reviewState}
          initialDateState={dateState}
          initialSupportState={supportState}
        />
      </main>

      <BottomNav />
    </>
  );
}
