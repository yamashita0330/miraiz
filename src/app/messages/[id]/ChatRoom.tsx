'use client';

import { useEffect, useRef, useState } from 'react';
import { Send, Loader2, ShieldAlert, Calendar, Sparkles, Heart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ChatMessage, UserProfile } from '@/lib/types';
import {
  DEMO_ME,
  DELAY_PURCHASE_ROUNDTRIPS,
  getDelayPurchasePrice,
  type ThreadReviewState,
  type ThreadDateState,
  type ThreadSupportState,
} from '@/lib/demo';
import { MutualReview } from './MutualReview';
import { DateProposalModal, DateProposalCard } from './DateProposal';
import { MatchSupportCard } from './MatchSupport';

interface Props {
  initialMessages: ChatMessage[];
  partner: UserProfile;
  threadId: string;
  initialUnlocked?: boolean;
  initialReviewState?: ThreadReviewState;
  initialDateState: ThreadDateState;
  initialSupportState: ThreadSupportState;
}

// 3往復まで無料 = 自分3通 + 相手3通 = 合計6通
// ⚠️ 本番ではサーバー側で課金状態を判定し、未解放時は7通目以降のメッセージ自体をAPIから返さないこと
const FREE_MESSAGE_LIMIT = 6;
const FREE_MY_MESSAGE_LIMIT = 3;

const DEFAULT_REVIEW_STATE: ThreadReviewState = {
  date_completed: false,
  date_completed_at: null,
  my_review_submitted: false,
  partner_review_submitted: false,
  badges_received_from_partner: [],
};

export function ChatRoom({
  initialMessages,
  partner,
  threadId,
  initialUnlocked = false,
  initialReviewState = DEFAULT_REVIEW_STATE,
  initialDateState,
  initialSupportState,
}: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [otherTyping, setOtherTyping] = useState(false);
  const [unlocked, setUnlocked] = useState(initialUnlocked);
  const [delayPurchases, setDelayPurchases] = useState(initialDateState.delay_purchases);
  const [delayConfirmOpen, setDelayConfirmOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewState, setReviewState] = useState<ThreadReviewState>(initialReviewState);
  const [dateState, setDateState] = useState<ThreadDateState>(initialDateState);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [supportState, setSupportState] = useState<ThreadSupportState>(initialSupportState);
  const [supportDismissed, setSupportDismissed] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // デート確定後はチャット解放
  const dateConfirmed = dateState.proposal?.status === 'confirmed';
  const effectivelyUnlocked = unlocked || dateConfirmed;
  // 自分の性別に応じたメール解放単価
  const delayPrice = getDelayPurchasePrice(DEMO_ME.gender);

  // 自分の送信上限：基本3通＋¥500で1回につき+3往復
  const myMessageQuota = FREE_MY_MESSAGE_LIMIT + delayPurchases * DELAY_PURCHASE_ROUNDTRIPS;
  const totalQuota = FREE_MESSAGE_LIMIT + delayPurchases * DELAY_PURCHASE_ROUNDTRIPS * 2;

  const visibleLimit = effectivelyUnlocked ? messages.length : totalQuota;
  const myMessageCount = messages.filter((m) => m.from_user_id === DEMO_ME.id).length;
  const canSend = effectivelyUnlocked || myMessageCount < myMessageQuota;

  // マッチ失効までの残日数
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(dateState.expires_at).getTime() - Date.now()) / (24 * 60 * 60 * 1000))
  );
  const expiringSoon = daysLeft <= 3 && !dateConfirmed;

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight });
  }, [messages.length, otherTyping]);

  const adjustHeight = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
  };

  const send = async () => {
    const text = draft.trim();
    if (!text || sending || !canSend) return;

    const myMsg: ChatMessage = {
      id: `temp-${Date.now()}`,
      thread_id: threadId,
      from_user_id: DEMO_ME.id,
      text,
      sent_at: new Date().toISOString(),
      read_at: null,
    };
    setMessages((prev) => [...prev, myMsg]);
    setDraft('');
    setSending(true);
    setTimeout(adjustHeight, 0);

    // デモ: 1.5秒後に既読、2.5秒後に相手がタイピング、4秒後に自動返信
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === myMsg.id ? { ...m, read_at: new Date().toISOString() } : m))
      );
    }, 1500);

    setTimeout(() => setOtherTyping(true), 2500);

    setTimeout(() => {
      setOtherTyping(false);
      const reply: ChatMessage = {
        id: `auto-${Date.now()}`,
        thread_id: threadId,
        from_user_id: partner.id,
        text: pickReply(),
        sent_at: new Date().toISOString(),
        read_at: null,
      };
      setMessages((prev) => [...prev, reply]);
      setSending(false);
    }, 4000);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.key === 'Enter' && (e.metaKey || e.ctrlKey)) || (e.key === 'Enter' && !e.shiftKey && false)) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* メッセージ一覧 */}
      <div ref={scrollerRef} className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto flex max-w-xl flex-col gap-4">
          {/* マッチ失効カウントダウン */}
          {!dateConfirmed && (
            <div className={cn(
              'flex items-center gap-2 rounded-2xl border px-4 py-3 text-[11px] leading-relaxed',
              expiringSoon
                ? 'border-warn bg-warn-50 text-warn'
                : 'border-border bg-muted/30 text-muted-foreground'
            )}>
              <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} aria-hidden />
              <span className="flex-1">
                {expiringSoon
                  ? `マッチ失効まで残り ${daysLeft}日 ・ デートが決まらないと自動終了します`
                  : `マッチ残り ${daysLeft}日 ・ 14日以内にデート設定でチャット継続`}
              </span>
            </div>
          )}

          {/* 感情ヒアリングカード（デート確定後・未送信時のみ表示） */}
          {dateConfirmed && !supportState.submitted && !supportDismissed && (
            <MatchSupportCard
              partnerName={partner.name}
              initialState={supportState}
              onSubmit={(s) => setSupportState(s)}
              onDismiss={() => setSupportDismissed(true)}
            />
          )}

          {/* デート提案カード（常時表示） */}
          {!reviewState.date_completed && (
            <DateProposalCard
              state={dateState}
              partnerName={partner.name}
              onTap={() => setDateModalOpen(true)}
            />
          )}

          {/* 相互評価バナー（デート完了後） */}
          {reviewState.date_completed && !reviewState.my_review_submitted && (
            <button
              type="button"
              onClick={() => setReviewOpen(true)}
              className="flex flex-col gap-2 rounded-2xl border-2 border-rose bg-rose-50 px-5 py-4 text-left transition-colors hover:bg-rose-100"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose text-rose-foreground">
                  <Heart className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                </span>
                <p className="text-sm font-semibold">
                  デートはどうでしたか？相互評価を送りましょう
                </p>
              </div>
              <p className="pl-10 text-[11px] leading-relaxed text-muted-foreground">
                {reviewState.partner_review_submitted
                  ? `${partner.name}さんは既に評価を提出済。あなたが提出すると両者の評価が開示されます。`
                  : '良かった点を3〜5個選ぶだけ。両者が提出するまで内容は見えません。'}
              </p>
            </button>
          )}

          {/* 相互評価 結果バナー（両者提出済） */}
          {reviewState.date_completed && reviewState.my_review_submitted && reviewState.partner_review_submitted && (
            <button
              type="button"
              onClick={() => setReviewOpen(true)}
              className="flex items-center gap-3 rounded-2xl border border-success bg-success-50 px-5 py-4 text-left transition-opacity hover:opacity-80"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-success text-success-foreground">
                <Sparkles className="h-4 w-4" strokeWidth={1.8} aria-hidden />
              </span>
              <p className="flex-1 text-xs leading-relaxed">
                <span className="font-semibold">相互評価が開示されました</span><br />
                <span className="text-muted-foreground">タップして {partner.name}さんからの評価を見る</span>
              </p>
            </button>
          )}

          {messages.slice(0, visibleLimit).map((m, i) => {
            const mine = m.from_user_id === DEMO_ME.id;
            const prev = messages[i - 1];
            const showTime = !prev || msToMinutes(m.sent_at) - msToMinutes(prev.sent_at) > 10;
            return (
              <div key={m.id} className="flex flex-col gap-1">
                {showTime && (
                  <div className="my-2 text-center text-[10px] text-muted-foreground">
                    {formatDateTime(m.sent_at)}
                  </div>
                )}
                <div className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'flex max-w-[78%] flex-col gap-1',
                      mine ? 'items-end' : 'items-start'
                    )}
                  >
                    <div
                      className={cn(
                        'whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                        mine
                          ? 'bg-foreground text-background'
                          : 'border border-border bg-card text-foreground'
                      )}
                    >
                      {m.text}
                    </div>
                    {mine && m.read_at && (
                      <span className="text-[10px] text-muted-foreground">既読</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* メッセージ上限到達 → デート提案 or 遅延購入の二択 */}
          {!effectivelyUnlocked && myMessageCount >= myMessageQuota && (
            <div className="mx-auto mt-4 flex w-full max-w-md flex-col gap-3">
              <button
                type="button"
                onClick={() => setDateModalOpen(true)}
                className="flex flex-col gap-2 rounded-2xl border-2 border-rose bg-rose-50 px-6 py-5 text-center transition-colors hover:bg-rose-100"
              >
                <span className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose text-rose-foreground">
                  <Calendar className="h-4 w-4" strokeWidth={2} aria-hidden />
                </span>
                <p className="text-sm font-semibold">会う日を決める</p>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  ここから先はデートの日程調整へ。<br />
                  確定するとチャットが解放されます。
                </p>
                <span className="text-xs font-medium text-rose">候補3つを送る →</span>
              </button>

              <button
                type="button"
                onClick={() => setDelayConfirmOpen(true)}
                className="flex flex-col gap-1 rounded-2xl border border-border bg-card px-5 py-4 text-center transition-colors hover:bg-muted"
              >
                <p className="text-xs font-semibold text-muted-foreground">
                  もう少し話してから決めたい
                </p>
                <p className="text-[10px] leading-relaxed text-muted-foreground">
                  ¥{delayPrice.toLocaleString()} で {DELAY_PURCHASE_ROUNDTRIPS}往復追加
                </p>
              </button>
            </div>
          )}

          {otherTyping && (
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-1 rounded-2xl border border-border bg-card px-4 py-3">
                <Dot delay={0} />
                <Dot delay={150} />
                <Dot delay={300} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 入力欄 */}
      <div className="sticky bottom-12 border-t border-border bg-background/95 backdrop-blur">
        {!canSend ? (
          // メッセージ上限 → 入力欄を二択CTAに置換
          <div className="mx-auto flex w-full max-w-xl items-center gap-2 px-4 py-3">
            <Button
              type="button"
              fullWidth
              onClick={() => setDateModalOpen(true)}
              className="gap-2"
            >
              <Calendar className="h-4 w-4" aria-hidden />
              会う日を決める
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDelayConfirmOpen(true)}
              className="shrink-0 px-3 text-xs"
            >
              ¥{delayPrice}
              <span className="ml-1 text-[10px] text-muted-foreground">+{DELAY_PURCHASE_ROUNDTRIPS}往復</span>
            </Button>
          </div>
        ) : (
          <>
            <div className="mx-auto flex max-w-xl items-end gap-3 px-4 py-3">
              <textarea
                ref={textareaRef}
                value={draft}
                onChange={(e) => { setDraft(e.target.value); adjustHeight(); }}
                onKeyDown={onKeyDown}
                placeholder={`${partner.name}さんにメッセージ`}
                rows={1}
                className="flex-1 resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-relaxed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button
                type="button"
                size="icon"
                onClick={send}
                disabled={!draft.trim() || sending}
                aria-label="送信"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
              </Button>
            </div>
            <p className="mx-auto flex max-w-xl items-center gap-1.5 px-4 pb-3 text-[10px] text-muted-foreground">
              <ShieldAlert className="h-3 w-3" aria-hidden />
              {effectivelyUnlocked
                ? 'デート確定済 ・ 連絡先交換は両者の同意のうえで'
                : `あと ${myMessageQuota - myMessageCount}通 で会う日を決めるフェーズへ`}
            </p>
          </>
        )}
      </div>

      {/* デート提案モーダル */}
      {dateModalOpen && (
        <DateProposalModal
          partnerName={partner.name}
          myUserId={DEMO_ME.id}
          state={dateState}
          onClose={() => setDateModalOpen(false)}
          onConfirm={(newState) => {
            setDateState(newState);
            // デート確定 → チャット解放
            if (newState.proposal?.status === 'confirmed') {
              setUnlocked(true);
            }
            setDateModalOpen(false);
          }}
        />
      )}

      {/* ¥500遅延購入確認モーダル */}
      {delayConfirmOpen && (
        <DelayConfirmModal
          delayPrice={delayPrice}
          onConfirm={() => {
            setDelayPurchases((p) => p + 1);
            setDelayConfirmOpen(false);
          }}
          onCancel={() => setDelayConfirmOpen(false)}
        />
      )}

      {/* 相互評価モーダル */}
      {reviewOpen && (
        <MutualReview
          partnerName={partner.name}
          threadId={threadId}
          initialState={reviewState}
          onClose={() => {
            setReviewOpen(false);
            setReviewState((prev) => ({
              ...prev,
              my_review_submitted: true,
              partner_review_submitted: true,
            }));
          }}
        />
      )}
    </div>
  );
}

function DelayConfirmModal({
  delayPrice,
  onConfirm,
  onCancel,
}: {
  delayPrice: number;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [step, setStep] = useState<'detail' | 'paying' | 'done'>('detail');

  useEffect(() => {
    if (step !== 'paying') return;
    const t = setTimeout(() => setStep('done'), 1200);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 backdrop-blur-sm sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        className="pb-safe w-full max-w-xl rounded-t-3xl border border-border bg-background sm:rounded-3xl"
      >
        {step === 'detail' && (
          <div className="flex flex-col gap-6 px-6 py-8">
            <header className="flex flex-col gap-2 text-center">
              <h2 className="text-base font-semibold tracking-tight">
                もう少し話してから決める
              </h2>
              <p className="text-xs leading-relaxed text-muted-foreground">
                ¥{delayPrice.toLocaleString()} で {DELAY_PURCHASE_ROUNDTRIPS}往復分のメッセージを追加できます。<br />
                それでも会う日を決めない場合、マッチは自動失効します。
              </p>
            </header>

            <div className="flex items-baseline justify-between rounded-lg border border-border bg-card px-5 py-4">
              <span className="text-xs">支払い</span>
              <span className="font-mont text-2xl font-medium tracking-tight">
                ¥{delayPrice.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <Button fullWidth size="lg" onClick={() => setStep('paying')}>
                支払って {DELAY_PURCHASE_ROUNDTRIPS}往復追加
              </Button>
              <Button fullWidth size="lg" variant="ghost" onClick={onCancel}>
                やめる
              </Button>
            </div>
          </div>
        )}

        {step === 'paying' && (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6 py-12 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" aria-hidden />
            <p className="text-sm font-medium">処理中…</p>
          </div>
        )}

        {step === 'done' && (
          <div className="flex flex-col items-center gap-5 px-6 py-12 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success text-success-foreground">
              <Sparkles className="h-5 w-5" aria-hidden />
            </div>
            <h2 className="text-base font-semibold tracking-tight">追加完了</h2>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {DELAY_PURCHASE_ROUNDTRIPS}往復分が追加されました。<br />
              引き続きチャットを続けてください。
            </p>
            <Button size="lg" onClick={onConfirm}>
              続ける
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

function msToMinutes(iso: string): number {
  return Math.floor(new Date(iso).getTime() / 60000);
}

function formatDateTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');
  if (sameDay) return `今日 ${hh}:${mm}`;
  return `${date.getMonth() + 1}/${date.getDate()} ${hh}:${mm}`;
}

const REPLIES = [
  'なるほど〜！もう少し聞かせてください✨',
  'そうなんですね！素敵！',
  'ありがとうございます☺️ こちらも嬉しいです',
  'いいですね！私も興味あります',
  'それすごく分かります！',
];

function pickReply(): string {
  return REPLIES[Math.floor(Math.random() * REPLIES.length)];
}
