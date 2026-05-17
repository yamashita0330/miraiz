'use client';

import { useState } from 'react';
import { ArrowLeft, Star, User as UserIcon, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  MID_LIKE_REASONS,
  MID_PASS_REASONS,
  LOOK_TAGS,
  LOOK_FEEDBACK_MAX,
  type MIDEvaluation,
  type MIDLikeReason,
  type MIDPassReason,
  type LookTag,
  type LookFeedback,
} from '@/lib/demo';
import type { UserProfile } from '@/lib/types';

interface Props {
  partner: UserProfile;
  turn: number;
  onSubmit: (evaluation: MIDEvaluation) => void;
  onCancel: () => void;
}

type Step = 'appearance' | 'talkability' | 'contact' | 'keyword';

export function MIDEvaluationForm({ partner, turn, onSubmit, onCancel }: Props) {
  const [step, setStep] = useState<Step>('appearance');

  // STEP 1: 見た目
  const [appearance, setAppearance] = useState<number>(0);
  const [lookAttractive, setLookAttractive] = useState<LookTag[]>([]);
  const [lookImprove, setLookImprove] = useState<LookTag[]>([]);
  const [lookNoFeedback, setLookNoFeedback] = useState<boolean>(false);

  // STEP 2: 話しやすさ
  const [talkability, setTalkability] = useState<number>(0);
  const [comfortable, setComfortable] = useState<boolean | null>(null);
  const [wasListened, setWasListened] = useState<boolean | null>(null);
  const [notJudged, setNotJudged] = useState<boolean | null>(null);

  // STEP 3: 連絡先交換 + 理由（複数選択）
  const [wantContact, setWantContact] = useState<boolean | null>(null);
  const [reasons, setReasons] = useState<(MIDLikeReason | MIDPassReason)[]>([]);

  // STEP 4: 印象キーワード
  const [keyword, setKeyword] = useState<string>('');

  const submit = () => {
    const lookFeedback: LookFeedback | null = lookNoFeedback
      ? null
      : lookAttractive.length > 0 || lookImprove.length > 0
      ? { attractive: lookAttractive, improve: lookImprove }
      : null;

    onSubmit({
      partner_id: partner.id,
      appearance_score: appearance,
      talkability_score: talkability,
      want_contact: wantContact ?? false,
      reasons,
      comfortable: comfortable ?? false,
      was_listened: wasListened ?? false,
      not_judged: notJudged ?? false,
      shared_topics: false,
      look_feedback: lookFeedback,
      impression_keyword: keyword.trim() || null,
      submitted_at: new Date().toISOString(),
    });
  };

  const toggleLookTag = (list: 'attractive' | 'improve', tag: LookTag) => {
    setLookNoFeedback(false); // タグ選択したら「特にない」を外す
    const setter = list === 'attractive' ? setLookAttractive : setLookImprove;
    setter((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : prev.length < LOOK_FEEDBACK_MAX
        ? [...prev, tag]
        : prev
    );
    // 同じタグを反対側で選んでたら外す
    const opposite = list === 'attractive' ? setLookImprove : setLookAttractive;
    const oppositeList = list === 'attractive' ? lookImprove : lookAttractive;
    if (oppositeList.includes(tag)) {
      opposite((prev) => prev.filter((t) => t !== tag));
    }
  };

  const toggleNoFeedback = () => {
    if (!lookNoFeedback) {
      setLookAttractive([]);
      setLookImprove([]);
    }
    setLookNoFeedback((v) => !v);
  };

  // 進行可能判定
  const canNextAppearance =
    appearance > 0 && (lookNoFeedback || lookAttractive.length > 0 || lookImprove.length > 0);
  const canNextTalkability =
    talkability > 0 &&
    comfortable !== null &&
    wasListened !== null &&
    notJudged !== null;
  const canNextContact = wantContact !== null && reasons.length > 0;

  const toggleReason = (r: MIDLikeReason | MIDPassReason) => {
    setReasons((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  };

  const goNext = () => {
    if (step === 'appearance' && canNextAppearance) setStep('talkability');
    else if (step === 'talkability' && canNextTalkability) setStep('contact');
    else if (step === 'contact' && canNextContact) setStep('keyword');
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-12 max-w-xl items-center gap-3 px-4">
          <button
            onClick={onCancel}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="戻る"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </button>
          <div className="flex flex-1 flex-col gap-0.5">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-mont">
              Turn {turn}
            </p>
            <p className="text-sm font-semibold">{partner.name}さんへの評価</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-xl px-6 py-8">
          {/* 相手プロフィール（小） */}
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-border bg-muted/30 px-4 py-3">
            <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full border border-border bg-muted">
              {partner.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={partner.photo_url} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <UserIcon className="h-5 w-5" strokeWidth={1.4} aria-hidden />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold">{partner.name} ・ {partner.age}歳</p>
              <p className="text-[10px] text-muted-foreground">{partner.prefecture}</p>
            </div>
          </div>

          {/* STEP 1: 見た目（スコア + 印象タグ） */}
          {step === 'appearance' && (
            <Section title="1. 見た目の印象">
              <ScoreInput label="見た目（10段階）" value={appearance} onChange={setAppearance} />

              {appearance > 0 && (
                <>
                  {/* 魅力ポイント */}
                  <div className="mb-5 mt-6 border-t border-border pt-5">
                    <p className="mb-2 text-xs font-semibold text-success">
                      ここが魅力的だった<span className="ml-1.5 text-[10px] font-normal text-muted-foreground">最大{LOOK_FEEDBACK_MAX}つ</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {LOOK_TAGS.map((t) => {
                        const on = lookAttractive.includes(t.value);
                        const reachedMax = !on && lookAttractive.length >= LOOK_FEEDBACK_MAX;
                        return (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => toggleLookTag('attractive', t.value)}
                            disabled={reachedMax}
                            className={cn(
                              'rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors',
                              on
                                ? 'border-success bg-success-50 text-success'
                                : 'border-border bg-background hover:bg-muted',
                              reachedMax && 'opacity-30'
                            )}
                          >
                            {t.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 磨きどころ */}
                  <div className="mb-5">
                    <p className="mb-2 text-xs font-semibold text-rose">
                      ここを磨くともっと素敵<span className="ml-1.5 text-[10px] font-normal text-muted-foreground">最大{LOOK_FEEDBACK_MAX}つ</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {LOOK_TAGS.map((t) => {
                        const on = lookImprove.includes(t.value);
                        const reachedMax = !on && lookImprove.length >= LOOK_FEEDBACK_MAX;
                        return (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => toggleLookTag('improve', t.value)}
                            disabled={reachedMax}
                            className={cn(
                              'rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors',
                              on
                                ? 'border-rose bg-rose-50 text-rose'
                                : 'border-border bg-background hover:bg-muted',
                              reachedMax && 'opacity-30'
                            )}
                          >
                            {t.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 特にない */}
                  <button
                    type="button"
                    onClick={toggleNoFeedback}
                    className={cn(
                      'mb-4 flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-xs font-medium transition-colors',
                      lookNoFeedback
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border bg-background hover:bg-muted'
                    )}
                  >
                    {lookNoFeedback && <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />}
                    特にない
                  </button>

                  <p className="mb-4 rounded-lg border border-border bg-muted/30 px-3 py-2 text-[10px] leading-relaxed text-muted-foreground">
                    ※ 「磨きどころ」は相手のプロフィールには表示されず、相手の通知表内で集計値のみ匿名で届きます。
                  </p>
                </>
              )}

              <Button
                fullWidth
                size="lg"
                disabled={!canNextAppearance}
                onClick={goNext}
              >
                次へ
              </Button>
            </Section>
          )}

          {/* STEP 2: 話しやすさ（スコア + 会話振り返り） */}
          {step === 'talkability' && (
            <Section title="2. 話しやすさ">
              <ScoreInput label="話しやすさ（10段階）" value={talkability} onChange={setTalkability} />

              {talkability > 0 && (
                <div className="mt-6 border-t border-border pt-5">
                  <p className="mb-3 text-xs font-medium">会話を振り返って</p>
                  <div className="flex flex-col gap-3">
                    <FeelingQuestion
                      label="居心地が良かった"
                      value={comfortable}
                      onChange={setComfortable}
                    />
                    <FeelingQuestion
                      label="自分の話を聞いてもらえた"
                      value={wasListened}
                      onChange={setWasListened}
                    />
                    <FeelingQuestion
                      label="否定・批判されたと感じなかった"
                      value={notJudged}
                      onChange={setNotJudged}
                    />
                  </div>
                </div>
              )}

              <Button
                fullWidth
                size="lg"
                disabled={!canNextTalkability}
                onClick={goNext}
                className="mt-6"
              >
                次へ
              </Button>
            </Section>
          )}

          {/* STEP 3: 連絡先交換 + 理由（1画面に統合） */}
          {step === 'contact' && (
            <Section title="3. 連絡先を交換したいですか？">
              <div className="flex gap-2">
                <YesNoButton
                  label="はい"
                  selected={wantContact === true}
                  onClick={() => { setWantContact(true); setReasons([]); }}
                />
                <YesNoButton
                  label="いいえ"
                  selected={wantContact === false}
                  onClick={() => { setWantContact(false); setReasons([]); }}
                />
              </div>

              {wantContact !== null && (
                <div className="mt-6 border-t border-border pt-5">
                  <p className="mb-3 text-xs font-medium">
                    {wantContact ? '良かった点' : '理由'}<span className="ml-1.5 text-[10px] font-normal text-muted-foreground">複数選択可</span>
                  </p>
                  <div className="flex flex-col gap-2">
                    {(wantContact ? MID_LIKE_REASONS : MID_PASS_REASONS).map((r) => {
                      const on = reasons.includes(r.value);
                      return (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => toggleReason(r.value)}
                          className={cn(
                            'flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors',
                            on ? 'border-rose bg-rose-50' : 'border-border hover:bg-muted'
                          )}
                        >
                          <span className="text-sm">{r.label}</span>
                          {on && (
                            <Check className="h-4 w-4 text-rose" strokeWidth={2.5} aria-hidden />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <Button
                fullWidth
                size="lg"
                disabled={!canNextContact}
                onClick={goNext}
                className="mt-6"
              >
                次へ
              </Button>
            </Section>
          )}

          {/* STEP 4: 印象キーワード（任意） */}
          {step === 'keyword' && (
            <Section title="4. 印象のキーワード（任意）">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="例：自然体・優しそう・話が上手"
                maxLength={30}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <p className="mt-2 text-[10px] text-muted-foreground">
                {keyword.length}/30 文字
              </p>
              <Button fullWidth size="lg" onClick={submit} className="mt-6 gap-2">
                <Send className="h-4 w-4" aria-hidden />
                評価を送信する
              </Button>
              <Button fullWidth size="lg" variant="ghost" onClick={submit} className="mt-2">
                スキップして送信
              </Button>
            </Section>
          )}
        </div>
      </main>

      {/* 進捗インジケーター */}
      <footer className="border-t border-border bg-background px-6 py-3">
        <div className="mx-auto flex max-w-xl items-center justify-center gap-2">
          {(['appearance', 'talkability', 'contact', 'keyword'] as Step[]).map((s) => (
            <span
              key={s}
              className={cn(
                'h-1.5 w-12 rounded-full transition-colors',
                s === step ? 'bg-rose' : 'bg-muted'
              )}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-6 text-base font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function ScoreInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="mb-3 block text-xs font-medium text-muted-foreground">{label}</label>
      <div className="grid grid-cols-10 gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={cn(
              'flex aspect-square items-center justify-center rounded-lg border text-xs font-medium transition-colors',
              value === n
                ? 'border-rose bg-rose text-rose-foreground'
                : 'border-border hover:bg-muted'
            )}
          >
            {n}
          </button>
        ))}
      </div>
      {value > 0 && (
        <div className="mt-2 flex items-center gap-1">
          {Array.from({ length: value }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-rose text-rose" strokeWidth={0} aria-hidden />
          ))}
          <span className="ml-1 text-[10px] text-muted-foreground">{value}/10</span>
        </div>
      )}
    </div>
  );
}

function YesNoButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-1 rounded-2xl border-2 px-6 py-5 text-base font-semibold transition-colors',
        selected
          ? 'border-rose bg-rose text-rose-foreground'
          : 'border-border hover:bg-muted'
      )}
    >
      {label}
    </button>
  );
}

function FeelingQuestion({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3">
      <span className="text-sm flex-1">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={cn(
            'rounded-lg border px-4 py-1.5 text-xs font-medium transition-colors',
            value === true
              ? 'border-success bg-success text-success-foreground'
              : 'border-border hover:bg-muted'
          )}
        >
          YES
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={cn(
            'rounded-lg border px-4 py-1.5 text-xs font-medium transition-colors',
            value === false
              ? 'border-foreground bg-foreground text-background'
              : 'border-border hover:bg-muted'
          )}
        >
          NO
        </button>
      </div>
    </div>
  );
}
