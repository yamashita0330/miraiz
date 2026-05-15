'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Loader2, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { DateProposal as DateProposalType, DateCandidate, ThreadDateState } from '@/lib/demo';

interface Props {
  partnerName: string;
  myUserId: string;
  state: ThreadDateState;
  onClose: () => void;
  onConfirm: (state: ThreadDateState) => void;
}

const PRESET_LOCATIONS = [
  'スターバックス 徳島藍住店',
  '徳島駅 クレメントプラザ',
  'ゆめタウン徳島 1F',
  'BISTRO 麗 徳島本店',
  'カフェ La Brisa',
  'その他（自分で入力）',
];

const PRESET_HOURS = ['11:00', '12:00', '13:00', '17:00', '18:00', '19:00', '20:00'];

function formatDate(iso: string): string {
  const d = new Date(iso);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const wd = ['日', '月', '火', '水', '木', '金', '土'][d.getDay()];
  return `${month}/${day}(${wd})`;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const hh = d.getHours().toString().padStart(2, '0');
  const mm = d.getMinutes().toString().padStart(2, '0');
  return `${hh}:${mm}`;
}

function nextDays(n: number): string[] {
  const out: string[] = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = 1; i <= n; i++) {
    const d = new Date(base.getTime() + i * 24 * 60 * 60 * 1000);
    out.push(d.toISOString());
  }
  return out;
}

export function DateProposalModal({ partnerName, myUserId, state, onClose, onConfirm }: Props) {
  // Determine the initial step from state
  const initialStep: 'view' | 'compose' | 'sending' | 'sent' =
    state.proposal === null ? 'compose' :
    state.proposal.status === 'awaiting_me' ? 'view' :
    state.proposal.status === 'awaiting_partner' ? 'sent' :
    state.proposal.status === 'confirmed' ? 'view' :
    'compose';

  const [step, setStep] = useState<'view' | 'compose' | 'sending' | 'sent'>(initialStep);
  const [drafts, setDrafts] = useState<DateCandidate[]>([
    { datetime: '', location: '' },
    { datetime: '', location: '' },
    { datetime: '', location: '' },
  ]);

  const days = nextDays(14);

  const updateDraft = (idx: number, patch: Partial<DateCandidate>) => {
    setDrafts((prev) => prev.map((d, i) => (i === idx ? { ...d, ...patch } : d)));
  };

  const allFilled = drafts.every((d) => d.datetime && d.location);

  const submitProposal = () => {
    if (!allFilled) return;
    setStep('sending');
    setTimeout(() => {
      const newProposal: DateProposalType = {
        proposed_by: myUserId,
        candidates: drafts,
        partner_picks: [],
        confirmed_index: null,
        status: 'awaiting_partner',
      };
      setStep('sent');
      // 3秒後に相手が返答するデモ
      setTimeout(() => {
        const partnerPicks = [0]; // 相手が候補1番を承諾
        const confirmedProposal: DateProposalType = {
          ...newProposal,
          partner_picks: partnerPicks,
          confirmed_index: 0,
          status: 'confirmed',
        };
        onConfirm({
          ...state,
          proposal: confirmedProposal,
        });
      }, 3000);
    }, 1200);
  };

  const acceptPartnerProposal = (idx: number) => {
    if (!state.proposal) return;
    setStep('sending');
    setTimeout(() => {
      onConfirm({
        ...state,
        proposal: {
          ...state.proposal!,
          partner_picks: [idx],
          confirmed_index: idx,
          status: 'confirmed',
        },
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 backdrop-blur-sm sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        className="pb-safe max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-border bg-background sm:rounded-3xl"
      >
        {/* COMPOSE: 自分が候補3つを送信 */}
        {step === 'compose' && (
          <div className="flex flex-col gap-6 px-6 py-8">
            <header className="flex flex-col gap-2 text-center">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose">
                <Calendar className="h-5 w-5" strokeWidth={1.8} aria-hidden />
              </div>
              <h2 className="text-lg font-semibold tracking-tight">
                {partnerName}さんに会う日を提案
              </h2>
              <p className="text-xs leading-relaxed text-muted-foreground">
                候補日を <span className="font-medium text-foreground">3つ</span> 送ります。<br />
                相手がチェックした最初の候補で確定します。
              </p>
            </header>

            <div className="flex flex-col gap-4">
              {drafts.map((d, idx) => (
                <div key={idx} className="rounded-2xl border border-border p-4">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    候補 {idx + 1}
                  </p>
                  <div className="flex flex-col gap-3">
                    {/* 日付選択 */}
                    <div>
                      <label className="text-[10px] font-medium text-muted-foreground">日付</label>
                      <div className="mt-1.5 flex gap-1.5 overflow-x-auto pb-1">
                        {days.slice(0, 10).map((day) => {
                          const isSelected = d.datetime.startsWith(day.split('T')[0]);
                          return (
                            <button
                              key={day}
                              type="button"
                              onClick={() => {
                                const time = d.datetime.includes('T') ? d.datetime.split('T')[1] : '19:00:00';
                                updateDraft(idx, { datetime: `${day.split('T')[0]}T${time.startsWith('1') || time.startsWith('0') ? time : '19:00:00'}` });
                              }}
                              className={cn(
                                'shrink-0 rounded-lg border px-3 py-2 text-[11px] font-medium transition-colors',
                                isSelected
                                  ? 'border-rose bg-rose text-rose-foreground'
                                  : 'border-border hover:bg-muted'
                              )}
                            >
                              {formatDate(day)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {/* 時間選択 */}
                    <div>
                      <label className="text-[10px] font-medium text-muted-foreground">時間</label>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {PRESET_HOURS.map((hh) => {
                          const datePart = d.datetime.split('T')[0] || '';
                          const isSelected = d.datetime.includes(`T${hh}:00`);
                          return (
                            <button
                              key={hh}
                              type="button"
                              disabled={!datePart}
                              onClick={() => updateDraft(idx, { datetime: `${datePart}T${hh}:00` })}
                              className={cn(
                                'rounded-lg border px-3 py-1.5 text-[11px] font-medium transition-colors',
                                isSelected
                                  ? 'border-rose bg-rose text-rose-foreground'
                                  : 'border-border hover:bg-muted',
                                !datePart && 'opacity-30'
                              )}
                            >
                              {hh}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {/* 場所選択 */}
                    <div>
                      <label className="text-[10px] font-medium text-muted-foreground">場所</label>
                      <select
                        value={PRESET_LOCATIONS.includes(d.location) ? d.location : (d.location ? 'その他（自分で入力）' : '')}
                        onChange={(e) => {
                          if (e.target.value === 'その他（自分で入力）') {
                            updateDraft(idx, { location: '' });
                          } else {
                            updateDraft(idx, { location: e.target.value });
                          }
                        }}
                        className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs"
                      >
                        <option value="">選んでください</option>
                        {PRESET_LOCATIONS.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                      {(d.location === '' || !PRESET_LOCATIONS.includes(d.location)) && (
                        <input
                          type="text"
                          value={!PRESET_LOCATIONS.includes(d.location) ? d.location : ''}
                          onChange={(e) => updateDraft(idx, { location: e.target.value })}
                          placeholder="場所を入力（例：眉山ロープウェイ）"
                          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <Button fullWidth size="lg" disabled={!allFilled} onClick={submitProposal}>
                3つの候補を送る
              </Button>
              <Button fullWidth size="lg" variant="ghost" onClick={onClose}>
                キャンセル
              </Button>
            </div>
          </div>
        )}

        {/* VIEW: 相手の提案を見る or 確定済 */}
        {step === 'view' && state.proposal && (
          <div className="flex flex-col gap-6 px-6 py-8">
            <header className="flex flex-col gap-2 text-center">
              <div className={cn(
                'mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full',
                state.proposal.status === 'confirmed'
                  ? 'bg-success text-success-foreground'
                  : 'bg-rose-50 text-rose'
              )}>
                {state.proposal.status === 'confirmed'
                  ? <Sparkles className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  : <Calendar className="h-5 w-5" strokeWidth={1.8} aria-hidden />}
              </div>
              <h2 className="text-lg font-semibold tracking-tight">
                {state.proposal.status === 'confirmed'
                  ? 'デートが確定しました'
                  : `${partnerName}さんからの候補`}
              </h2>
              {state.proposal.status === 'awaiting_me' && (
                <p className="text-xs leading-relaxed text-muted-foreground">
                  会える日を1つ選んでください。最初に選んだ候補で確定します。
                </p>
              )}
            </header>

            <ul className="flex flex-col gap-2">
              {state.proposal.candidates.map((c, idx) => {
                const isConfirmed = state.proposal!.confirmed_index === idx;
                return (
                  <li key={idx}>
                    <button
                      type="button"
                      disabled={state.proposal!.status === 'confirmed'}
                      onClick={() => acceptPartnerProposal(idx)}
                      className={cn(
                        'flex w-full flex-col gap-2 rounded-2xl border p-4 text-left transition-colors',
                        isConfirmed
                          ? 'border-success bg-success-50'
                          : 'border-border hover:border-rose hover:bg-rose-50'
                      )}
                    >
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm font-semibold">
                          {formatDate(c.datetime)} {formatTime(c.datetime)}
                        </span>
                        {isConfirmed && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-success">
                            <Check className="h-3 w-3" aria-hidden />
                            確定
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" strokeWidth={1.6} aria-hidden />
                        {c.location}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <Button fullWidth size="lg" variant={state.proposal.status === 'confirmed' ? 'default' : 'ghost'} onClick={onClose}>
              閉じる
            </Button>
          </div>
        )}

        {/* SENDING */}
        {step === 'sending' && (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-6 py-12 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" aria-hidden />
            <p className="text-sm font-medium">送信中…</p>
          </div>
        )}

        {/* SENT: 自分の提案送信完了 → 相手の返答待ち */}
        {step === 'sent' && (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-5 px-6 py-12 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose">
              <Calendar className="h-5 w-5" strokeWidth={1.8} aria-hidden />
            </div>
            <h2 className="text-base font-semibold">候補を送りました</h2>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {partnerName}さんが選ぶのを待っています。<br />
              選ばれた瞬間に確定し、お知らせが届きます。<br />
              （デモ：3秒後に相手も返答します）
            </p>
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-hidden />
          </div>
        )}
      </div>
    </div>
  );
}

// ===== チャット上部に常設するカード =====

export function DateProposalCard({
  state,
  partnerName,
  onTap,
}: {
  state: ThreadDateState;
  partnerName: string;
  onTap: () => void;
}) {
  const expiryDate = new Date(state.expires_at);
  const daysLeft = Math.ceil((expiryDate.getTime() - Date.now()) / (24 * 60 * 60 * 1000));

  // 確定済
  if (state.proposal?.status === 'confirmed' && state.proposal.confirmed_index !== null) {
    const c = state.proposal.candidates[state.proposal.confirmed_index];
    return (
      <button
        type="button"
        onClick={onTap}
        className="flex items-center gap-3 rounded-2xl border-2 border-success bg-success-50 px-5 py-4 text-left transition-opacity hover:opacity-80"
      >
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground">
          <Check className="h-4 w-4" strokeWidth={2.2} aria-hidden />
        </span>
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="text-xs font-semibold">
            {formatDate(c.datetime)} {formatTime(c.datetime)}・{c.location}
          </p>
          <p className="text-[10px] text-muted-foreground">デート確定済 — 詳細を見る</p>
        </div>
      </button>
    );
  }

  // 相手から提案あり（自分の返答待ち）
  if (state.proposal?.status === 'awaiting_me') {
    return (
      <button
        type="button"
        onClick={onTap}
        className="flex items-center gap-3 rounded-2xl border-2 border-rose bg-rose-50 px-5 py-4 text-left transition-colors hover:bg-rose-100"
      >
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose text-rose-foreground">
          <Calendar className="h-4 w-4" strokeWidth={2} aria-hidden />
        </span>
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="text-sm font-semibold">{partnerName}さんからデートの提案</p>
          <p className="text-[10px] text-muted-foreground">候補3つから1つ選んで確定 →</p>
        </div>
      </button>
    );
  }

  // 自分が提案中（相手の返答待ち）
  if (state.proposal?.status === 'awaiting_partner') {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/30 px-5 py-4">
        <Loader2 className="h-5 w-5 shrink-0 animate-spin text-muted-foreground" aria-hidden />
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="text-xs font-medium">提案中：{partnerName}さんの返答を待っています</p>
          <p className="text-[10px] text-muted-foreground">マッチ残り {daysLeft}日</p>
        </div>
      </div>
    );
  }

  // 未提案
  return (
    <button
      type="button"
      onClick={onTap}
      className="flex flex-col gap-2 rounded-2xl border-2 border-rose bg-rose-50 px-5 py-4 text-left transition-colors hover:bg-rose-100"
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose text-rose-foreground">
          <Calendar className="h-4 w-4" strokeWidth={2} aria-hidden />
        </span>
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="text-sm font-semibold">会う日を決める</p>
          <p className="text-[10px] text-muted-foreground">
            候補3つを送ると相手が選びます ・ マッチ残り {daysLeft}日
          </p>
        </div>
      </div>
    </button>
  );
}
