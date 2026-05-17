'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Clock, Check, ChevronRight, ArrowLeft, User as UserIcon, Sparkles, Search, X, CheckCircle2 } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  DEMO_EVENT_CONVERSATIONS,
  findDemoEvent,
  hasEventTicket,
  findDemoMember,
  type EventConversation,
  type MIDEvaluation,
} from '@/lib/demo';
import { MIDEvaluationForm } from './MIDEvaluationForm';
import { SimpleProfileSheet } from './SimpleProfileSheet';
import { TicketGate } from '../TicketGate';

export default function MIDHubPage() {
  const params = useParams<{ token: string }>();
  const event = findDemoEvent(params.token);
  const [hasTicket, setHasTicket] = useState(false);
  const [conversations, setConversations] = useState<EventConversation[]>(DEMO_EVENT_CONVERSATIONS);
  const [activeTurn, setActiveTurn] = useState<number | null>(null);
  const [profileTurn, setProfileTurn] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  // 検索フィルタリング：名前・職業・出身地・趣味・bio・印象キーワード・パーソナリティタグ
  const filteredConversations = (() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter((c) => {
      const partner = findDemoMember(c.partner_id);
      if (!partner) return false;
      const haystack = [
        partner.name,
        partner.occupation,
        partner.hometown,
        partner.bio,
        partner.education,
        partner.mbti,
        ...(partner.hobbies ?? []),
        ...(partner.personality_tags ?? []),
        c.evaluation?.impression_keyword ?? '',
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  })();

  useEffect(() => {
    setHasTicket(hasEventTicket(params.token));
  }, [params.token]);

  // チケット未購入 → ゲート表示
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

  const completed = conversations.filter((c) => c.status === 'completed').length;
  const total = conversations.length;
  const inProgress = conversations.find((c) => c.status === 'in_progress');
  const allDone = completed === total;

  const handleSubmitEvaluation = (evaluation: MIDEvaluation, turn: number) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.turn === turn) {
          return { ...c, status: 'completed', evaluation };
        }
        if (c.turn === turn + 1 && c.status === 'upcoming') {
          return { ...c, status: 'in_progress' };
        }
        return c;
      })
    );
    setActiveTurn(null);
    setSubmittedNotice(true);
    setTimeout(() => setSubmittedNotice(false), 2800);
  };

  if (activeTurn !== null) {
    const conv = conversations.find((c) => c.turn === activeTurn);
    if (!conv) return null;
    const partner = findDemoMember(conv.partner_id);
    if (!partner) return null;

    return (
      <MIDEvaluationForm
        partner={partner}
        turn={activeTurn}
        onSubmit={(evaluation) => handleSubmitEvaluation(evaluation, activeTurn)}
        onCancel={() => setActiveTurn(null)}
      />
    );
  }

  return (
    <>
      {/* 評価送信トースト（画面中央） */}
      {submittedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 px-6">
          <div className="flex flex-col items-center gap-3 rounded-3xl bg-background px-10 py-8 shadow-xl">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-success text-success-foreground">
              <CheckCircle2 className="h-7 w-7" strokeWidth={2.2} aria-hidden />
            </div>
            <span className="text-base font-semibold">評価を送信しました</span>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-xl items-center gap-3 px-4">
          <Link
            href={`/event/${params.token}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="戻る"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </Link>
          <div className="flex flex-1 flex-col gap-0.5">
            <p className="text-sm font-semibold">恋フェス Vol.5・第二部</p>
            <p className="text-[10px] text-muted-foreground">2026-06-13（土）14:00-17:00</p>
          </div>
          <Badge variant="rose" className="text-[10px]">
            {completed}/{total} 完了
          </Badge>
        </div>
      </header>

      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-8">
          {/* 進捗バー */}
          <div className="mb-6 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-sm font-semibold tracking-wide">
                会話の進捗
              </span>
              <span className="font-mont text-xl font-semibold">
                {completed}<span className="text-sm text-muted-foreground">/{total}</span>
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-rose transition-all duration-500"
                style={{ width: `${(completed / total) * 100}%` }}
              />
            </div>
          </div>

          {/* 全完了時：両想い発表へ */}
          {allDone && (
            <Link
              href={`/event/${params.token}/result`}
              className="mb-6 flex items-center gap-3 rounded-2xl border-2 border-rose bg-rose-50 px-5 py-5 text-left transition-colors hover:bg-rose-100"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose text-rose-foreground">
                <Sparkles className="h-5 w-5" aria-hidden />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold">全会話 完了</p>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  両想いの結果を見る →
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-rose" aria-hidden />
            </Link>
          )}

          {/* 会話タイマー（進行中の相手） */}
          {inProgress && !allDone && (
            <button
              type="button"
              onClick={() => setProfileTurn(inProgress.turn)}
              className="mb-6 flex w-full items-center gap-4 rounded-2xl border-2 border-rose bg-rose-50 px-5 py-5 text-left transition-colors hover:bg-rose-100"
            >
              <PartnerAvatar partnerId={inProgress.partner_id} large />
              <div className="flex-1">
                <p className="text-[10px] tracking-wider text-rose font-medium">
                  会話中 ・ {inProgress.turn}人目
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {findDemoMember(inProgress.partner_id)?.name}さんとの会話
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  会話終了後、すぐに評価を入力してください（30秒）
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-rose" aria-hidden />
            </button>
          )}

          {/* キーワード検索 */}
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="名前・職業・趣味・出身地などで検索"
              className="w-full rounded-2xl border border-border bg-background py-2.5 pl-10 pr-10 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
                aria-label="検索をクリア"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            )}
          </div>

          {/* 検索結果カウント */}
          {searchQuery && (
            <p className="mb-3 text-[11px] text-muted-foreground">
              {filteredConversations.length === 0
                ? `「${searchQuery}」に一致する参加者は見つかりませんでした`
                : `${filteredConversations.length}件 一致（全${conversations.length}人中）`}
            </p>
          )}

          {/* スケジュール一覧 */}
          <section>
            <h2 className="mb-4 text-xs tracking-[0.15em] text-muted-foreground">
              会話スケジュール
            </h2>
            <ul className="flex flex-col gap-2">
              {filteredConversations.map((conv) => (
                <ConversationRow
                  key={conv.turn}
                  conversation={conv}
                  onTap={() => {
                    setProfileTurn(conv.turn);
                  }}
                />
              ))}
            </ul>
          </section>

          {/* 注意書き */}
          <p className="mt-8 rounded-2xl border border-border bg-muted/30 px-4 py-4 text-[11px] leading-relaxed text-muted-foreground">
            会場での連絡先・LINE・SNS交換は禁止です。気になった相手とは会場終了後にアプリで両想いになった場合のみ繋がれます。
          </p>
        </div>
      </main>

      {/* 簡易プロフィールシート */}
      {profileTurn !== null && (() => {
        const conv = conversations.find((c) => c.turn === profileTurn);
        if (!conv) return null;
        const partner = findDemoMember(conv.partner_id);
        if (!partner) return null;
        return (
          <SimpleProfileSheet
            partner={partner}
            conversation={conv}
            onClose={() => setProfileTurn(null)}
            onEvaluate={() => {
              setProfileTurn(null);
              setActiveTurn(conv.turn);
            }}
          />
        );
      })()}

      <BottomNav />
    </>
  );
}

function ConversationRow({
  conversation,
  onTap,
}: {
  conversation: EventConversation;
  onTap: () => void;
}) {
  const partner = findDemoMember(conversation.partner_id);
  if (!partner) return null;

  const isCompleted = conversation.status === 'completed';
  const isInProgress = conversation.status === 'in_progress';
  const isUpcoming = conversation.status === 'upcoming';

  return (
    <li>
      <button
        type="button"
        onClick={onTap}
        className={cn(
          'flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors',
          isCompleted && 'border-success bg-success-50 hover:bg-success-50/80',
          isInProgress && 'border-rose bg-rose-50 hover:bg-rose-100',
          isUpcoming && 'border-border bg-card hover:bg-muted'
        )}
      >
        <span className="font-mont text-[10px] font-medium text-muted-foreground w-6">
          {String(conversation.turn).padStart(2, '0')}
        </span>
        <PartnerAvatar partnerId={conversation.partner_id} />
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium">{partner.name}</p>
          <p className="text-[10px] text-muted-foreground">
            {formatTime(conversation.scheduled_start)} ・ {conversation.duration_minutes}分
          </p>
        </div>
        {isCompleted && (
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success text-success-foreground">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          </span>
        )}
        {isInProgress && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-rose">
            <Clock className="h-3 w-3" aria-hidden />
            進行中
          </span>
        )}
      </button>
    </li>
  );
}

function PartnerAvatar({ partnerId, large }: { partnerId: string; large?: boolean }) {
  const partner = findDemoMember(partnerId);
  const size = large ? 'h-[88px] w-[88px]' : 'h-12 w-12';
  return (
    <div className={cn('relative shrink-0 overflow-hidden rounded-full border border-border bg-muted', size)}>
      {partner?.photo_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={partner.photo_url} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          <UserIcon className={cn('h-5 w-5')} strokeWidth={1.4} aria-hidden />
        </div>
      )}
    </div>
  );
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const hh = d.getHours().toString().padStart(2, '0');
  const mm = d.getMinutes().toString().padStart(2, '0');
  return `${hh}:${mm}`;
}
