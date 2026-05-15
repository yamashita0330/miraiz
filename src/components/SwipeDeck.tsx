'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  X,
  RotateCcw,
  User as UserIcon,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Wallet,
  Ruler,
  MapPin,
  Heart as HeartSmall,
  Baby,
  Home as HomeIcon,
  ChevronDown,
  Lock,
  Check,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { HOPE_TYPE_LABEL } from '@/lib/constants';
import type { UserProfile } from '@/lib/types';
import { compatibility } from '@/lib/compatibility';
import {
  DEMO_ME,
  WANT_CHILDREN_LABEL,
  LIVING_ARRANGEMENT_LABEL,
  MARRIAGE_INTENT_LABEL,
  LIKE_REASONS,
  PASS_REASONS,
  type LikeReason,
  type PassReason,
} from '@/lib/demo';

interface Props {
  members: UserProfile[];
  initialMutualIds?: string[];
  dailyLimit?: number;
  onComplete?: () => void;
}

type Action = 'like' | 'pass';

interface Decision {
  user: UserProfile;
  action: Action;
  reasons: (LikeReason | PassReason)[];
  freeText?: string;
}

// 最後（95%）までスクロール必須
const SCROLL_THRESHOLD = 0.95;

export function SwipeDeck({ members, initialMutualIds = [], dailyLimit, onComplete }: Props) {
  // 1日上限が指定されていれば members を制限
  const limited = dailyLimit ? members.slice(0, dailyLimit) : members;
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState<Decision[]>([]);
  const [matched, setMatched] = useState<UserProfile | null>(null);
  const profileEndRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reachedEnd, setReachedEnd] = useState(false); // 末尾まで到達したか
  const [confirmedRead, setConfirmedRead] = useState(false); // 「最後まで読みました」押下済み
  // 理由選択モーダル
  const [pending, setPending] = useState<Action | null>(null);
  // 決定後のフィードバックオーバーレイ
  const [feedback, setFeedback] = useState<{ action: Action; user: UserProfile } | null>(null);

  const current = limited[index];
  const total = limited.length;

  // 候補が変わったらページトップに戻して進捗・読了状態リセット
  useEffect(() => {
    setScrollProgress(0);
    setReachedEnd(false);
    setConfirmedRead(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [index]);

  useEffect(() => {
    if (!limited[index] && onComplete) onComplete();
  }, [index, limited, onComplete]);

  // ウィンドウスクロールでプロフィール末尾までの読了率を計算
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const calcProgress = () => {
      const end = profileEndRef.current;
      if (!end) return;
      const rect = end.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const distance = rect.top - viewportHeight;
      const totalHeight = document.documentElement.scrollHeight - viewportHeight;
      const scrolled = window.scrollY;
      const ratio = totalHeight > 0 ? Math.min(1, scrolled / totalHeight) : 1;
      // 末尾が画面に入ったら強制100%＋reachedEnd=true
      if (distance <= 0) {
        setScrollProgress(1);
        setReachedEnd(true);
      } else {
        setScrollProgress(ratio);
      }
    };
    calcProgress();
    window.addEventListener('scroll', calcProgress, { passive: true });
    window.addEventListener('resize', calcProgress);
    return () => {
      window.removeEventListener('scroll', calcProgress);
      window.removeEventListener('resize', calcProgress);
    };
  }, [index]);

  // ⚪︎×を押せる条件：「最後まで読みました」ボタンを押下済み
  const canDecide = confirmedRead;

  // ★/✕押下 → モーダルを開く
  const openReason = (action: Action) => {
    if (!current || !canDecide) return;
    setPending(action);
  };

  // モーダル送信 → 履歴に追加 → フィードバック演出 → 次へ
  const submitReason = (
    reasons: (LikeReason | PassReason)[],
    freeText?: string
  ) => {
    if (!current || !pending) return;
    const action = pending;
    const user = current;
    setHistory((prev) => [
      ...prev,
      { user, action, reasons, freeText },
    ]);
    setPending(null);
    // フィードバック演出を表示
    setFeedback({ action, user });
    // 1.5秒後に次の人へ
    setTimeout(() => {
      if (action === 'like' && initialMutualIds.includes(user.id)) {
        setMatched(user);
      }
      setFeedback(null);
      setIndex((i) => i + 1);
    }, 1500);
  };

  const undo = () => {
    if (history.length === 0) return;
    setHistory((prev) => prev.slice(0, -1));
    setIndex((i) => Math.max(0, i - 1));
  };

  if (!current) return null;

  return (
    <>
      {/* プログレス：N/N + 読了状況（Headerの下に貼り付く） */}
      <div className="sticky top-11 z-30 -mx-6 border-b border-border bg-background/95 px-6 py-1.5 backdrop-blur">
        <div className="flex items-baseline justify-between text-xs">
          <span className="font-mont text-muted-foreground">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <ReadProgress canDecide={canDecide} scrollProgress={scrollProgress} />
        </div>
      </div>

      {/* プロフィール本文（ページ全体でスクロール） */}
      <div className="-mx-6 mt-3 overflow-hidden rounded-2xl border border-border bg-card">
        <ProfileFullView profile={current} />
        {/* 末尾検出用の番兵要素 */}
        <div ref={profileEndRef} className="h-px" aria-hidden />
      </div>

      {/* 「最後まで読みました」ボタン（末尾到達後に表示） */}
      {reachedEnd && !confirmedRead && (
        <button
          type="button"
          onClick={() => setConfirmedRead(true)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-foreground bg-foreground px-6 py-4 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
          最後まで読みました
        </button>
      )}

      {/* 確認済み表示 */}
      {confirmedRead && (
        <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl border-2 border-success bg-success-50 px-6 py-3">
          <Check className="h-4 w-4 text-success" strokeWidth={2.5} aria-hidden />
          <p className="text-xs font-medium text-success">
            読了済み・下のボタンで判断してください
          </p>
        </div>
      )}

      {/* スクロール促進メッセージ（末尾未到達時） */}
      {!reachedEnd && (
        <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <Lock className="h-3 w-3" aria-hidden />
          下までスクロールしてください
        </p>
      )}

      {/* アクションボタン（BottomNav上に固定・safe-area対応） */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 backdrop-blur"
        style={{ paddingBottom: 'calc(48px + env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto flex max-w-xl items-center justify-center gap-5 px-6 py-3">
          <ActionButton variant="pass" onClick={() => openReason('pass')} disabled={!canDecide} />
          <button
            type="button"
            onClick={undo}
            disabled={history.length === 0}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
            aria-label="戻す"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
          </button>
          <ActionButton variant="like" onClick={() => openReason('like')} disabled={!canDecide} />
        </div>
      </div>

      {/* 下部固定ボタン分のスペーサー */}
      <div className="h-32" aria-hidden />

      {pending && current && (
        <ReasonModal
          action={pending}
          targetName={current.name}
          onSubmit={submitReason}
          onCancel={() => setPending(null)}
        />
      )}

      {feedback && <ActionFeedback action={feedback.action} user={feedback.user} />}

      {matched && <MatchOverlay user={matched} onClose={() => setMatched(null)} />}
    </>
  );
}

// 決定後の演出オーバーレイ：LIKE/PASSのスタンプ + ハート飛散
function ActionFeedback({ action, user }: { action: Action; user: UserProfile }) {
  const isLike = action === 'like';

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md animate-in fade-in duration-300',
        isLike ? 'bg-rose-50/80' : 'bg-foreground/40'
      )}
      aria-live="polite"
    >
      {/* LIKE: ハート飛散 */}
      {isLike && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="absolute"
              style={{
                left: `${10 + (i * 7) % 80}%`,
                top: '60%',
                animation: `float-heart 1.5s ease-out ${i * 0.05}s forwards`,
              }}
            >
              <Heart
                className={cn(
                  'fill-rose text-rose',
                  i % 3 === 0 ? 'h-6 w-6' : i % 3 === 1 ? 'h-4 w-4' : 'h-5 w-5'
                )}
                aria-hidden
              />
            </span>
          ))}
        </div>
      )}

      {/* 中央の円形コンテンツ */}
      <div className="relative flex flex-col items-center gap-6 px-8 text-center">
        {/* 相手の写真（小さく丸く） */}
        <div className={cn(
          'relative h-24 w-24 overflow-hidden rounded-full border-4 transition-all duration-500',
          isLike ? 'border-rose' : 'border-foreground/30'
        )}>
          {user.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.photo_url} alt="" className={cn(
              'h-full w-full object-cover transition-all duration-500',
              !isLike && 'grayscale'
            )} />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <UserIcon className="h-10 w-10" strokeWidth={1.4} aria-hidden />
            </div>
          )}
        </div>

        {/* スタンプアイコン */}
        <div
          className={cn(
            'inline-flex h-20 w-20 items-center justify-center rounded-full shadow-lg',
            isLike ? 'bg-rose text-rose-foreground' : 'bg-foreground text-background',
            'animate-in zoom-in-75 spin-in-12 duration-500'
          )}
        >
          {isLike ? (
            <Heart className="h-9 w-9 fill-current" strokeWidth={0} aria-hidden />
          ) : (
            <X className="h-9 w-9" strokeWidth={3} aria-hidden />
          )}
        </div>

        {/* メッセージ */}
        <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <p className={cn(
            'text-xs font-mont uppercase tracking-[0.4em]',
            isLike ? 'text-rose' : 'text-background/80'
          )}>
            {isLike ? 'Like Sent' : 'Passed'}
          </p>
          <p className={cn(
            'text-base font-semibold',
            isLike ? 'text-foreground' : 'text-background'
          )}>
            {isLike
              ? `${user.name}さんに「気になる」を送りました`
              : '別の方を表示します'}
          </p>
          {isLike && (
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              両想いになると、トークが解放されます
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ReadProgress({
  canDecide,
  scrollProgress,
}: {
  canDecide: boolean;
  scrollProgress: number;
}) {
  const ratio = Math.min(1, scrollProgress / SCROLL_THRESHOLD);
  return (
    <div className="flex items-center gap-2">
      <span className={cn('text-[10px]', canDecide ? 'text-success' : 'text-muted-foreground')}>
        {canDecide ? '読了' : `${Math.round(scrollProgress * 100)}%`}
      </span>
      <div className="h-1 w-20 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            'h-full transition-all',
            canDecide ? 'bg-success' : 'bg-foreground/40'
          )}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );
}

function ActionButton({
  variant,
  onClick,
  disabled,
}: {
  variant: 'like' | 'pass';
  onClick: () => void;
  disabled: boolean;
}) {
  const isLike = variant === 'like';
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isLike ? '気になる' : 'パス'}
      className={cn(
        'inline-flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all active:scale-95',
        isLike
          ? 'border-rose bg-rose text-rose-foreground hover:opacity-90'
          : 'border-warn bg-background text-warn hover:bg-warn-50',
        disabled && 'opacity-30 grayscale'
      )}
    >
      {isLike ? (
        <Heart className="h-7 w-7" fill="currentColor" strokeWidth={2.4} aria-hidden />
      ) : (
        <X className="h-7 w-7" strokeWidth={2.4} aria-hidden />
      )}
    </button>
  );
}

function ProfileFullView({ profile }: { profile: UserProfile }) {
  const compat = useMemo(() => compatibility(DEMO_ME, profile), [profile]);

  const facts: { Icon: typeof Briefcase; label: string; value: string }[] = [];
  if (profile.occupation) facts.push({ Icon: Briefcase, label: '職業', value: profile.occupation });
  if (profile.education) facts.push({ Icon: GraduationCap, label: '学歴', value: profile.education });
  if (profile.income) facts.push({ Icon: Wallet, label: '年収', value: profile.income });
  if (profile.height) facts.push({ Icon: Ruler, label: '身長', value: `${profile.height} cm` });
  if (profile.hometown) facts.push({ Icon: MapPin, label: '出身', value: profile.hometown });

  const marriageFacts: { Icon: typeof HeartSmall; label: string; value: string }[] = [];
  if (profile.marriage_intent) {
    marriageFacts.push({
      Icon: HeartSmall,
      label: '結婚意欲',
      value: MARRIAGE_INTENT_LABEL[profile.marriage_intent],
    });
  }
  if (profile.want_children) {
    marriageFacts.push({
      Icon: Baby,
      label: '子供',
      value: WANT_CHILDREN_LABEL[profile.want_children],
    });
  }
  if (profile.living_arrangement) {
    marriageFacts.push({
      Icon: HomeIcon,
      label: '同居',
      value: LIVING_ARRANGEMENT_LABEL[profile.living_arrangement],
    });
  }

  return (
    <div className="flex flex-col">
      {/* 写真 */}
      <div className="relative aspect-[4/5] w-full bg-muted">
        {profile.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.photo_url} alt={profile.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <UserIcon className="h-24 w-24" strokeWidth={1.2} aria-hidden />
          </div>
        )}
        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-info bg-info-50 px-3 py-1 backdrop-blur">
          <span className="font-mont text-sm font-medium text-info">{compat.total}</span>
          <span className="text-[9px] text-info">%</span>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-6 py-6">
        {/* 名前 */}
        <header className="flex flex-col gap-2">
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">{profile.name}</h2>
            <span className="font-mont text-base text-muted-foreground">{profile.age}</span>
          </div>
          <p className="text-xs text-muted-foreground">{profile.prefecture}</p>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="roseSoft" className="text-[10px]">
              {HOPE_TYPE_LABEL[profile.hope_type]}
            </Badge>
            {profile.mbti && (
              <Badge variant="infoSoft" className="font-mont text-[10px]">
                {profile.mbti}
              </Badge>
            )}
            <Badge variant="goldSoft" className="gap-1 text-[10px]">
              <ShieldCheck className="h-3 w-3" aria-hidden /> 確認済
            </Badge>
          </div>
        </header>

        {/* 自己紹介 */}
        {profile.bio && (
          <section>
            <h3 className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">About</h3>
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{profile.bio}</p>
          </section>
        )}

        {/* 相性内訳 */}
        {compat.strongPoints.length > 0 && (
          <section className="rounded-xl border border-info-100 bg-info-50 p-4">
            <h3 className="mb-2 text-[10px] uppercase tracking-wider text-info">Strong Points</h3>
            <div className="flex flex-wrap gap-1.5">
              {compat.strongPoints.map((p) => (
                <Badge key={p} variant="infoSoft" className="text-[10px]">◯ {p}</Badge>
              ))}
            </div>
          </section>
        )}

        {/* 個人プロフィール */}
        {facts.length > 0 && (
          <section>
            <h3 className="mb-3 text-[10px] uppercase tracking-wider text-muted-foreground">Profile</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {facts.map(({ Icon, label, value }) => (
                <li key={label} className="flex gap-2">
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" strokeWidth={1.6} aria-hidden />
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[10px] text-muted-foreground">{label}</span>
                    <span className="truncate text-xs">{value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 結婚観 */}
        {marriageFacts.length > 0 && (
          <section>
            <h3 className="mb-3 text-[10px] uppercase tracking-wider text-muted-foreground">Marriage View</h3>
            <ul className="flex flex-col gap-2">
              {marriageFacts.map(({ Icon, label, value }) => (
                <li key={label} className="flex gap-3 rounded-lg border border-border px-3 py-2">
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" strokeWidth={1.6} aria-hidden />
                  <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                    <span className="text-[10px] text-muted-foreground">{label}</span>
                    <span className="text-xs">{value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 趣味 */}
        {profile.hobbies && profile.hobbies.length > 0 && (
          <section>
            <h3 className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Hobbies</h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.hobbies.slice(0, 8).map((h) => (
                <Badge key={h} variant="outline" className="text-[10px]">{h}</Badge>
              ))}
            </div>
          </section>
        )}

        {/* 性格タグ */}
        {profile.personality_tags && profile.personality_tags.length > 0 && (
          <section>
            <h3 className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Personality</h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.personality_tags.map((p) => (
                <Badge key={p} variant="outline" className="text-[10px]">{p}</Badge>
              ))}
            </div>
          </section>
        )}

        {/* 結婚観・自由記述 */}
        {profile.marriage_dream && (
          <section>
            <h3 className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Marriage Vision</h3>
            <p className="whitespace-pre-wrap rounded-xl border border-border bg-muted/30 p-4 text-xs leading-relaxed">
              {profile.marriage_dream}
            </p>
          </section>
        )}

        {/* 末尾の余白＆「読了」マーカー */}
        <div className="flex flex-col items-center gap-2 border-t border-border pt-6 pb-4 text-muted-foreground">
          <ChevronDown className="h-4 w-4" aria-hidden />
          <span className="text-[10px]">最後まで読みました</span>
        </div>
      </div>
    </div>
  );
}

function ReasonModal({
  action,
  targetName,
  onSubmit,
  onCancel,
}: {
  action: Action;
  targetName: string;
  onSubmit: (reasons: (LikeReason | PassReason)[], freeText?: string) => void;
  onCancel: () => void;
}) {
  const isLike = action === 'like';
  const options = isLike ? LIKE_REASONS : PASS_REASONS;
  const [selected, setSelected] = useState<(LikeReason | PassReason)[]>([]);
  const [freeText, setFreeText] = useState('');

  const toggle = (value: LikeReason | PassReason) => {
    setSelected((prev) =>
      (prev as string[]).includes(value as string)
        ? (prev.filter((v) => v !== value) as (LikeReason | PassReason)[])
        : ([...prev, value] as (LikeReason | PassReason)[])
    );
  };

  const submit = () => {
    if (selected.length === 0) return;
    const includesOther = (selected as string[]).includes('other');
    onSubmit(selected, includesOther && freeText.trim() ? freeText.trim() : undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 backdrop-blur-sm sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        className="pb-safe w-full max-w-xl overflow-hidden rounded-t-3xl border border-border bg-background sm:rounded-3xl"
      >
        {/* ヘッダー */}
        <div
          className={cn(
            'flex items-center gap-3 border-b border-border px-6 py-5',
            isLike ? 'bg-rose-50' : 'bg-warn-50'
          )}
        >
          <div
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full',
              isLike ? 'bg-rose text-rose-foreground' : 'border-2 border-warn text-warn'
            )}
          >
            {isLike ? (
              <Heart className="h-5 w-5" fill="currentColor" aria-hidden />
            ) : (
              <X className="h-5 w-5" strokeWidth={2.4} aria-hidden />
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-mont text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {isLike ? 'Why Like?' : 'Why Pass?'}
            </span>
            <p className="text-sm font-semibold">
              {isLike ? `${targetName}さんの` : `${targetName}さんを`}
              {isLike ? 'どこが気になりましたか？' : 'なぜ気にならなかった？'}
            </p>
          </div>
        </div>

        {/* 説明 */}
        <p className="px-6 pt-4 text-[11px] leading-relaxed text-muted-foreground">
          複数選択OK。回答は完全匿名で、AIマッチングの精度向上に使われます。
          {isLike ? ' 相手側にこの内容は通知されません。' : ' 相手側には伝わりません。'}
        </p>

        {/* 選択肢（複数選択） */}
        <div className="max-h-[55dvh] overflow-y-auto px-6 py-4">
          <ul className="flex flex-col gap-2">
            {options.map((opt) => {
              const active = (selected as string[]).includes(opt.value);
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    onClick={() => toggle(opt.value)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors',
                      active
                        ? isLike
                          ? 'border-rose bg-rose-50'
                          : 'border-warn bg-warn-50'
                        : 'border-border bg-card hover:bg-muted'
                    )}
                  >
                    <span
                      className={cn(
                        'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors',
                        active
                          ? isLike
                            ? 'border-rose bg-rose text-rose-foreground'
                            : 'border-warn bg-warn text-warn-foreground'
                          : 'border-border bg-background'
                      )}
                      aria-hidden
                    >
                      {active && <Check className="h-3 w-3" strokeWidth={3} aria-hidden />}
                    </span>
                    <span className="flex-1">{opt.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* その他 自由記述 */}
          {(selected as string[]).includes('other') && (
            <div className="mt-4 flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                自由記述（任意・100字まで）
              </label>
              <textarea
                rows={3}
                maxLength={100}
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                placeholder={isLike ? '例：話し方が好きそう' : '例：もう少し情報が欲しかった'}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <p className="text-[10px] text-muted-foreground">{freeText.length} / 100</p>
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="flex flex-col gap-2 border-t border-border bg-card px-6 py-4">
          <button
            type="button"
            onClick={submit}
            disabled={selected.length === 0}
            className={cn(
              'inline-flex h-12 items-center justify-center rounded-full text-sm font-medium transition-opacity disabled:opacity-30',
              isLike ? 'bg-rose text-rose-foreground' : 'bg-foreground text-background'
            )}
          >
            {selected.length === 0
              ? (isLike ? '理由を選んでください' : '理由を選んでください')
              : isLike
              ? `★ 気になる を確定（${selected.length}件）`
              : `パス を確定（${selected.length}件）`}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-10 items-center justify-center text-xs text-muted-foreground hover:text-foreground"
          >
            キャンセル（プロフィールに戻る）
          </button>
        </div>
      </div>
    </div>
  );
}

function MatchOverlay({ user, onClose }: { user: UserProfile; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 px-6 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border-2 border-rose bg-card p-8 text-center">
        <Heart className="mx-auto h-12 w-12 text-rose" strokeWidth={1.6} fill="currentColor" aria-hidden />
        <p className="mt-4 font-mont text-[10px] uppercase tracking-[0.4em] text-rose">
          It's a Match
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-tight">
          両想いになりました！
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          {user.name}さんもあなたを気になっていました
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={`/messages/new?to=${user.id}`}
            className="rounded-full bg-rose px-6 py-3 text-sm font-medium text-rose-foreground hover:opacity-90"
          >
            メッセージを送る
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            続けて見る
          </button>
        </div>
      </div>
    </div>
  );
}
