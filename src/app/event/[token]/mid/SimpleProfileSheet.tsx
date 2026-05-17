'use client';

import { X, User as UserIcon, MapPin, Briefcase, Ruler, Check, Sparkles, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DEMO_ME,
  MARRIAGE_INTENT_LABEL,
  WANT_CHILDREN_LABEL,
  WEDDING_STYLE_LABEL,
  WORK_AFTER_MARRIAGE_LABEL,
  WEEKEND_STYLE_LABEL,
  SMOKING_LABEL,
  DRINKING_LABEL,
  HOLIDAY_TYPE_LABEL,
  type EventConversation,
} from '@/lib/demo';
import { HOPE_TYPE_LABEL } from '@/lib/constants';
import type { UserProfile } from '@/lib/types';

interface Props {
  partner: UserProfile;
  conversation: EventConversation;
  onClose: () => void;
  onEvaluate: () => void;
}

// ふたつの値が一致しているか
const eq = <T,>(a: T | undefined | null, b: T | undefined | null): boolean =>
  a !== undefined && a !== null && b !== undefined && b !== null && a === b;

// 配列の共通要素
const intersection = (a: string[] | undefined, b: string[] | undefined): string[] => {
  if (!a || !b) return [];
  return a.filter((x) => b.includes(x));
};

export function SimpleProfileSheet({ partner, conversation, onClose, onEvaluate }: Props) {
  const isCompleted = conversation.status === 'completed';

  // 自分（DEMO_ME）と相手の共通点を計算
  const me = DEMO_ME;
  const matches = {
    prefecture: eq(me.prefecture, partner.prefecture),
    hometown: eq(me.hometown, partner.hometown),
    education: eq(me.education, partner.education),
    blood_type: eq(me.blood_type, partner.blood_type),
    hope_type: eq(me.hope_type, partner.hope_type),
    marriage_intent: eq(me.marriage_intent, partner.marriage_intent),
    want_children: eq(me.want_children, partner.want_children),
    wedding_style: eq(me.wedding_style, partner.wedding_style),
    work_after_marriage: eq(me.work_after_marriage, partner.work_after_marriage),
    weekend_style: eq(me.weekend_style, partner.weekend_style),
    holiday_type: eq(me.holiday_type, partner.holiday_type),
    smoking: eq(me.smoking, partner.smoking),
    drinking: eq(me.drinking, partner.drinking),
    mbti: eq(me.mbti, partner.mbti),
  };
  const sharedHobbies = intersection(me.hobbies, partner.hobbies);
  const sharedPersonality = intersection(me.personality_tags, partner.personality_tags);
  const totalCommonCount =
    Object.values(matches).filter(Boolean).length + sharedHobbies.length + sharedPersonality.length;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 backdrop-blur-sm sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        className="pb-safe max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-border bg-background sm:rounded-3xl"
      >
        {/* ヘッダー */}
        <div className="sticky top-0 z-10 flex items-baseline justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur">
          <div className="flex flex-col gap-0.5">
            <span className="font-mont text-[10px] uppercase tracking-wider text-muted-foreground">
              Turn {conversation.turn}
            </span>
            <p className="text-sm font-semibold">{partner.name}さんのプロフィール</p>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="閉じる"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="px-6 py-9">
          {/* 写真 */}
          <div className="mb-10 flex items-center gap-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
              {partner.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={partner.photo_url} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <UserIcon className="h-8 w-8" strokeWidth={1.4} aria-hidden />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1 min-w-0">
              <p className="text-base font-semibold">{partner.name}</p>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
                <span>{partner.age}歳</span>
                <span>・</span>
                <span className="inline-flex items-center gap-0.5">
                  <MapPin className="h-3 w-3" aria-hidden />
                  {partner.prefecture}
                </span>
              </div>
              <Badge
                variant={matches.hope_type ? 'rose' : 'soft'}
                className="mt-1 w-fit text-[10px]"
              >
                {HOPE_TYPE_LABEL[partner.hope_type]}
                {matches.hope_type && <span className="ml-1">・共通</span>}
              </Badge>
            </div>
          </div>

          {/* 共通点サマリー */}
          {totalCommonCount > 0 && (
            <div className="mb-10 flex items-center gap-3 rounded-2xl border-2 border-rose bg-rose-50 px-5 py-4">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose text-rose-foreground">
                <Sparkles className="h-4 w-4" strokeWidth={1.8} aria-hidden />
              </span>
              <div className="flex flex-1 flex-col gap-0.5">
                <p className="text-sm font-normal text-muted-foreground/60">
                  共通点 <span className="font-mont">{totalCommonCount}</span>個
                </p>
                <p className="text-[10px] text-muted-foreground/50">
                  ローズ色で表示された項目があなたとの共通点です
                </p>
              </div>
            </div>
          )}

          {/* 一言自己紹介 */}
          {partner.bio && (
            <div className="mb-10 rounded-2xl border border-border bg-muted/30 px-5 py-4">
              <p className="mb-1.5 text-[12px] font-semibold text-muted-foreground">
                一言
              </p>
              <p className="text-sm leading-relaxed">{partner.bio}</p>
            </div>
          )}

          {/* 基本情報グリッド */}
          <SectionLabel>基本情報</SectionLabel>
          <div className="mb-10 grid grid-cols-2 gap-3">
            {partner.occupation && (
              <InfoCell Icon={Briefcase} label="職業" value={partner.occupation} />
            )}
            {partner.education && (
              <InfoCell Icon={Briefcase} label="学歴" value={partner.education} match={matches.education} />
            )}
            {partner.height && (
              <InfoCell Icon={Ruler} label="身長" value={`${partner.height}cm`} />
            )}
            {partner.income && (
              <InfoCell Icon={Briefcase} label="年収" value={partner.income} />
            )}
            {partner.hometown && (
              <InfoCell Icon={MapPin} label="出身地" value={partner.hometown} match={matches.hometown} />
            )}
            {partner.blood_type && (
              <InfoCell
                Icon={UserIcon}
                label="血液型"
                value={`${partner.blood_type}型`}
                match={matches.blood_type}
              />
            )}
          </div>

          {/* 人物像 */}
          {(partner.mbti || partner.personality_tags?.length || partner.holiday_type) && (
            <>
              <SectionLabel>
                人物像
                {sharedPersonality.length > 0 && (
                  <span className="ml-2 text-rose">・パーソナリティ共通{sharedPersonality.length}個</span>
                )}
              </SectionLabel>
              <div className="mb-10 flex flex-col gap-3">
                {partner.mbti && (
                  <InfoRow label="MBTI" value={partner.mbti} match={matches.mbti} />
                )}
                {partner.holiday_type && (
                  <InfoRow
                    label="休日タイプ"
                    value={HOLIDAY_TYPE_LABEL[partner.holiday_type]}
                    match={matches.holiday_type}
                  />
                )}
                {partner.personality_tags && partner.personality_tags.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-[12px] font-medium text-muted-foreground">パーソナリティ</p>
                    <div className="flex flex-wrap gap-1.5">
                      {partner.personality_tags.slice(0, 6).map((tag) => {
                        const isShared = sharedPersonality.includes(tag);
                        return (
                          <Badge
                            key={tag}
                            variant={isShared ? 'rose' : 'soft'}
                            className="text-[11px]"
                          >
                            {tag}
                            {isShared && <span className="ml-1">・共通</span>}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ライフスタイル */}
          {(partner.smoking || partner.drinking || partner.weekend_style) && (
            <>
              <SectionLabel>ライフスタイル</SectionLabel>
              <div className="mb-10 grid grid-cols-2 gap-3">
                {partner.smoking && (
                  <InfoCell
                    Icon={UserIcon}
                    label="喫煙"
                    value={SMOKING_LABEL[partner.smoking]}
                    match={matches.smoking}
                  />
                )}
                {partner.drinking && (
                  <InfoCell
                    Icon={UserIcon}
                    label="飲酒"
                    value={DRINKING_LABEL[partner.drinking]}
                    match={matches.drinking}
                  />
                )}
                {partner.weekend_style && (
                  <InfoCell
                    Icon={UserIcon}
                    label="休日の過ごし方"
                    value={WEEKEND_STYLE_LABEL[partner.weekend_style]}
                    match={matches.weekend_style}
                    wide
                  />
                )}
              </div>
            </>
          )}

          {/* 結婚観 */}
          {(partner.marriage_intent || partner.want_children || partner.wedding_style || partner.work_after_marriage) && (
            <>
              <SectionLabel>結婚観</SectionLabel>
              <div className="mb-10 flex flex-col gap-3">
                {partner.marriage_intent && (
                  <InfoRow
                    label="将来の温度感"
                    value={MARRIAGE_INTENT_LABEL[partner.marriage_intent]}
                    highlight={!matches.marriage_intent}
                    match={matches.marriage_intent}
                  />
                )}
                {partner.want_children && (
                  <InfoRow
                    label="子ども希望"
                    value={WANT_CHILDREN_LABEL[partner.want_children]}
                    match={matches.want_children}
                  />
                )}
                {partner.wedding_style && (
                  <InfoRow
                    label="結婚式希望"
                    value={WEDDING_STYLE_LABEL[partner.wedding_style]}
                    match={matches.wedding_style}
                  />
                )}
                {partner.work_after_marriage && (
                  <InfoRow
                    label="結婚後の働き方"
                    value={WORK_AFTER_MARRIAGE_LABEL[partner.work_after_marriage]}
                    match={matches.work_after_marriage}
                  />
                )}
              </div>
            </>
          )}

          {/* 趣味 */}
          {partner.hobbies && partner.hobbies.length > 0 && (
            <>
              <SectionLabel>
                趣味
                {sharedHobbies.length > 0 && (
                  <span className="ml-2 text-rose">・共通{sharedHobbies.length}個</span>
                )}
              </SectionLabel>
              <div className="mb-10 flex flex-wrap gap-1.5">
                {partner.hobbies.slice(0, 12).map((hobby) => {
                  const isShared = sharedHobbies.includes(hobby);
                  return (
                    <Badge
                      key={hobby}
                      variant={isShared ? 'rose' : 'outline'}
                      className="text-[11px]"
                    >
                      {hobby}
                      {isShared && <span className="ml-1">・共通</span>}
                    </Badge>
                  );
                })}
              </div>
            </>
          )}

          {/* 自由記述（理想の結婚生活・譲れない条件） */}
          {(partner.marriage_dream || partner.must_have) && (
            <>
              <SectionLabel>本人の言葉</SectionLabel>
              <div className="mb-10 flex flex-col gap-3">
                {partner.marriage_dream && (
                  <FreeNote label="理想の結婚生活" text={partner.marriage_dream} />
                )}
                {partner.must_have && (
                  <FreeNote label="譲れない条件" text={partner.must_have} />
                )}
              </div>
            </>
          )}

          {/* 評価済みなら自分の評価サマリー */}
          {isCompleted && conversation.evaluation && (
            <div className="mb-10 rounded-2xl border border-success bg-success-50 px-5 py-5">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-success">
                Your Evaluation
              </p>
              <div className="flex items-baseline gap-3 text-xs">
                <span>見た目 <strong className="font-mont">{conversation.evaluation.appearance_score}</strong>/10</span>
                <span>話しやすさ <strong className="font-mont">{conversation.evaluation.talkability_score}</strong>/10</span>
              </div>
              <p className="mt-2 text-xs">
                {conversation.evaluation.want_contact ? (
                  <span className="inline-flex items-center gap-1 text-rose font-medium">
                    <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                    連絡先を交換したい
                  </span>
                ) : (
                  <span className="text-muted-foreground">連絡先交換は希望せず</span>
                )}
              </p>
              {conversation.evaluation.impression_keyword && (
                <p className="mt-2 text-[11px] text-muted-foreground italic">
                  「{conversation.evaluation.impression_keyword}」
                </p>
              )}
            </div>
          )}

          {/* 注意書き */}
          <p className="mb-4 rounded-lg border border-border bg-muted/30 px-3 py-2 text-[10px] leading-relaxed text-muted-foreground">
            ※ 会場での連絡先交換は禁止です。両想いの場合は当日終了後にアプリで繋がれます。
          </p>

          {/* CTA：いつでも評価可能 */}
          {!isCompleted ? (
            <Button fullWidth size="lg" onClick={onEvaluate} className="gap-2">
              <Check className="h-4 w-4" aria-hidden />
              この相手を評価する
            </Button>
          ) : (
            <Button fullWidth size="lg" variant="outline" onClick={onEvaluate} className="gap-2">
              評価を見直す
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoCell({
  Icon,
  label,
  value,
  wide,
  match,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  wide?: boolean;
  match?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border px-3 py-2.5',
        match ? 'border-rose bg-rose-50' : 'border-border bg-card',
        wide && 'col-span-2'
      )}
    >
      {match && (
        <span className="absolute right-2 top-2 inline-flex items-center gap-0.5 rounded-full bg-rose px-1.5 py-0.5 text-[8px] font-medium text-rose-foreground">
          <Sparkles className="h-2 w-2" aria-hidden />
          共通
        </span>
      )}
      <div className={cn('flex items-baseline gap-1', match ? 'text-rose' : 'text-muted-foreground')}>
        <Icon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
        <span className="text-[12px] tracking-wide">{label}</span>
      </div>
      <p className={cn('mt-1 text-sm font-semibold', match && 'text-rose')}>{value}</p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-sm font-semibold tracking-tight text-foreground">
      {children}
    </p>
  );
}

function InfoRow({
  label,
  value,
  highlight,
  match,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  match?: boolean;
}) {
  const accent = highlight || match;
  return (
    <div
      className={cn(
        'flex items-baseline justify-between rounded-lg border px-3 py-2',
        accent ? 'border-rose bg-rose-50' : 'border-border bg-card'
      )}
    >
      <span className={cn('text-[12px]', accent ? 'text-rose' : 'text-muted-foreground')}>
        {label}
      </span>
      <span className={cn('text-sm font-semibold flex items-center gap-1', accent && 'text-rose')}>
        {value}
        {match && (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-rose px-1.5 py-0.5 text-[8px] font-medium text-rose-foreground">
            <Sparkles className="h-2 w-2" aria-hidden />
            共通
          </span>
        )}
      </span>
    </div>
  );
}

function FreeNote({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/30 px-5 py-4">
      <p className="mb-1.5 text-[12px] font-semibold text-muted-foreground">
        {label}
      </p>
      <p className="text-sm leading-relaxed">{text}</p>
    </div>
  );
}
