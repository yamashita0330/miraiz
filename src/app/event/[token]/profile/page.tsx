'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles, Loader2, UserCheck } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  DEMO_ME,
  findDemoEvent,
  HOBBY_SUGGESTIONS,
  EDUCATION_OPTIONS,
  PERSONALITY_SUGGESTIONS,
  WANT_CHILDREN_LABEL,
  MARRIAGE_INTENT_LABEL,
  SMOKING_LABEL,
  DRINKING_LABEL,
  HOLIDAY_TYPE_LABEL,
  WORK_AFTER_MARRIAGE_LABEL,
} from '@/lib/demo';

const FOCUS_OPTIONS = [
  '価値観の一致',
  '会話の相性',
  '第一印象',
  '将来のビジョン',
  '趣味・ライフスタイル',
  '安心感・居心地',
];

const AGE_RANGE_OPTIONS = ['20代前半', '20代後半', '30代前半', '30代後半', '40代以上', 'こだわらない'];
const HEIGHT_OPTIONS = ['〜155cm', '156〜160cm', '161〜165cm', '166〜170cm', '171〜175cm', '176〜180cm', '181cm〜'];
const MARRIAGE_INTENT_VALUES = [1, 2, 3, 4, 5] as const;
const WANT_CHILDREN_VALUES = ['yes', 'maybe', 'no', 'decline'] as const;
const SMOKING_VALUES = ['no', 'sometimes', 'yes'] as const;
const DRINKING_VALUES = ['no', 'sometimes', 'yes'] as const;
const HOLIDAY_VALUES = ['weekend', 'weekday', 'shift', 'irregular'] as const;
const WORK_AFTER_MARRIAGE_VALUES = ['dual', 'full', 'flexible', 'undecided'] as const;

// DEMO_ME.height（数値）を選択肢の範囲ラベルに変換
function heightToRange(h: number | undefined): string {
  if (!h) return '';
  if (h <= 155) return '〜155cm';
  if (h <= 160) return '156〜160cm';
  if (h <= 165) return '161〜165cm';
  if (h <= 170) return '166〜170cm';
  if (h <= 175) return '171〜175cm';
  if (h <= 180) return '176〜180cm';
  return '181cm〜';
}

export default function EventProfilePage() {
  const params = useParams();
  const router = useRouter();
  const token = (params?.token as string) ?? '';
  const event = findDemoEvent(token);

  // マイページのプロフィールが入力済みか
  const hasMypageProfile = Boolean(DEMO_ME.occupation || (DEMO_ME.hobbies && DEMO_ME.hobbies.length > 0));

  // 基本プロフィール（マイページから引き継ぎ）
  const [occupation, setOccupation] = useState(DEMO_ME.occupation ?? '');
  const [heightRange, setHeightRange] = useState(heightToRange(DEMO_ME.height));
  const [education, setEducation] = useState(DEMO_ME.education ?? '');
  const [personalityTags, setPersonalityTags] = useState<string[]>(DEMO_ME.personality_tags ?? []);
  const [hobbies, setHobbies] = useState<string[]>(DEMO_ME.hobbies ?? []);

  // ライフスタイル
  const [smoking, setSmoking] = useState<string>(DEMO_ME.smoking ?? '');
  const [drinking, setDrinking] = useState<string>(DEMO_ME.drinking ?? '');
  const [holidayType, setHolidayType] = useState<string>(DEMO_ME.holiday_type ?? '');
  const [workAfterMarriage, setWorkAfterMarriage] = useState<string>(DEMO_ME.work_after_marriage ?? '');

  // イベント当日用
  const [preferredAge, setPreferredAge] = useState('');
  const [focusPoints, setFocusPoints] = useState<string[]>([]);
  const [marriageIntent, setMarriageIntent] = useState<number>(DEMO_ME.marriage_intent ?? 0);
  const [wantChildren, setWantChildren] = useState<string>(DEMO_ME.want_children ?? '');

  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const toggleHobby = (h: string) => {
    setHobbies((prev) => (prev.includes(h) ? prev.filter((x) => x !== h) : prev.length < 6 ? [...prev, h] : prev));
  };
  const toggleFocus = (f: string) => {
    setFocusPoints((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : prev.length < 3 ? [...prev, f] : prev));
  };
  const togglePersonality = (p: string) => {
    setPersonalityTags((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : prev.length < 5 ? [...prev, p] : prev));
  };

  // 必須：職業・趣味・結婚意欲・子供の希望
  const canSave = Boolean(occupation.trim() && hobbies.length > 0 && marriageIntent > 0 && wantChildren);

  const handleSave = () => {
    if (!canSave) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setDone(true);
    }, 1200);
  };

  if (!event) {
    return (
      <>
        <Header showLogout />
        <main className="min-h-screen bg-background pb-24">
          <div className="mx-auto max-w-xl px-6 py-10 text-center text-sm text-muted-foreground">
            イベントが見つかりません
          </div>
        </main>
        <BottomNav />
      </>
    );
  }

  if (done) {
    return (
      <>
        <Header showLogout />
        <main className="min-h-screen bg-background pb-24">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-6 py-16 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success text-success-foreground">
              <Check className="h-7 w-7" strokeWidth={2.5} aria-hidden />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">イベント用プロフィールを保存しました</h1>
            <p className="text-xs leading-relaxed text-muted-foreground max-w-sm">
              {event.name} 当日のグループトークと席順マッチングに使用されます。<br />
              開催前であればいつでも編集できます。
            </p>
            <div className="mt-2 flex w-full max-w-xs flex-col gap-2">
              <Button fullWidth size="lg" onClick={() => router.push(`/event/${token}`)}>
                イベント詳細へ
              </Button>
              <Link href="/events">
                <Button fullWidth size="lg" variant="ghost">イベント一覧へ</Button>
              </Link>
            </div>
          </div>
        </main>
        <BottomNav />
      </>
    );
  }

  // 選択チップ群を描画する共通コンポーネント
  const ChipGroup = ({
    options,
    selected,
    onSelect,
    accent = false,
  }: {
    options: { value: string; label: string }[];
    selected: string | string[];
    onSelect: (value: string) => void;
    accent?: boolean;
  }) => {
    const isOn = (v: string) => (Array.isArray(selected) ? selected.includes(v) : selected === v);
    return (
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onSelect(o.value)}
            className={cn(
              'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[11px] transition-colors',
              isOn(o.value)
                ? accent
                  ? 'border-rose bg-rose text-rose-foreground'
                  : 'border-foreground bg-foreground text-background'
                : 'border-border bg-background hover:bg-muted'
            )}
          >
            {Array.isArray(selected) && isOn(o.value) && <Check className="h-2.5 w-2.5" aria-hidden />}
            {o.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-32">
        <div className="mx-auto max-w-xl px-6 py-10">
          <Link
            href={`/event/${token}`}
            className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden />イベント詳細
          </Link>
          <header className="flex flex-col gap-2">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Event Profile
            </span>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight">
              イベント用プロフィール
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {event.name} 当日の席順マッチングとグループトークに使われます。タップで選ぶだけで完成します。
            </p>
          </header>

          {/* マイページ引き継ぎバナー */}
          {hasMypageProfile && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-success/40 bg-success/5 p-4">
              <UserCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={1.8} aria-hidden />
              <div>
                <p className="text-[12px] font-semibold text-success">
                  マイページの情報を引き継ぎました
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                  職業・趣味・ライフスタイルをマイページから自動入力済みです。必要に応じて編集してください。
                </p>
              </div>
            </div>
          )}

          {/* ===== 基本プロフィール ===== */}
          <section className="mt-8">
            <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              Basic
            </h2>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <Label>職業<span className="ml-1 text-rose">*</span></Label>
                <Input
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="例：広告代理店勤務"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>身長</Label>
                <ChipGroup
                  options={HEIGHT_OPTIONS.map((h) => ({ value: h, label: h }))}
                  selected={heightRange}
                  onSelect={(v) => setHeightRange((prev) => (prev === v ? '' : v))}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>学歴</Label>
                <ChipGroup
                  options={EDUCATION_OPTIONS.map((e) => ({ value: e, label: e }))}
                  selected={education}
                  onSelect={(v) => setEducation((prev) => (prev === v ? '' : v))}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>性格タグ（最大5つ）</Label>
                <div className="flex flex-wrap gap-1.5">
                  {PERSONALITY_SUGGESTIONS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePersonality(p)}
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[11px] transition-colors',
                        personalityTags.includes(p)
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border bg-background hover:bg-muted'
                      )}
                    >
                      {personalityTags.includes(p) && <Check className="h-2.5 w-2.5" aria-hidden />}
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>趣味（最大6つ）<span className="ml-1 text-rose">*</span></Label>
                <div className="flex flex-wrap gap-1.5">
                  {HOBBY_SUGGESTIONS.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => toggleHobby(h)}
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[11px] transition-colors',
                        hobbies.includes(h)
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border bg-background hover:bg-muted'
                      )}
                    >
                      {hobbies.includes(h) && <Check className="h-2.5 w-2.5" aria-hidden />}
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ===== ライフスタイル ===== */}
          <section className="mt-10">
            <h2 className="mb-1 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              Lifestyle
            </h2>
            <p className="mb-4 text-[11px] text-muted-foreground">
              生活リズムや価値観が近い相手とマッチしやすくなります。
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <Label>お酒</Label>
                <ChipGroup
                  options={DRINKING_VALUES.map((v) => ({ value: v, label: DRINKING_LABEL[v] }))}
                  selected={drinking}
                  onSelect={(v) => setDrinking((prev) => (prev === v ? '' : v))}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>タバコ</Label>
                <ChipGroup
                  options={SMOKING_VALUES.map((v) => ({ value: v, label: SMOKING_LABEL[v] }))}
                  selected={smoking}
                  onSelect={(v) => setSmoking((prev) => (prev === v ? '' : v))}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>休日</Label>
                <ChipGroup
                  options={HOLIDAY_VALUES.map((v) => ({ value: v, label: HOLIDAY_TYPE_LABEL[v] }))}
                  selected={holidayType}
                  onSelect={(v) => setHolidayType((prev) => (prev === v ? '' : v))}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>結婚後の働き方</Label>
                <ChipGroup
                  options={WORK_AFTER_MARRIAGE_VALUES.map((v) => ({ value: v, label: WORK_AFTER_MARRIAGE_LABEL[v] }))}
                  selected={workAfterMarriage}
                  onSelect={(v) => setWorkAfterMarriage((prev) => (prev === v ? '' : v))}
                />
              </div>
            </div>
          </section>

          {/* ===== 結婚観 ===== */}
          <section className="mt-10">
            <h2 className="mb-1 text-xs font-mont uppercase tracking-[0.3em] text-rose">
              Marriage
            </h2>
            <p className="mb-4 text-[11px] text-muted-foreground">
              真剣度のすり合わせに使う大切な項目です。
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <Label>結婚への意欲<span className="ml-1 text-rose">*</span></Label>
                <ChipGroup
                  options={MARRIAGE_INTENT_VALUES.map((v) => ({ value: String(v), label: MARRIAGE_INTENT_LABEL[v] }))}
                  selected={String(marriageIntent)}
                  onSelect={(v) => setMarriageIntent(Number(v))}
                  accent
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>子供の希望<span className="ml-1 text-rose">*</span></Label>
                <ChipGroup
                  options={WANT_CHILDREN_VALUES.map((v) => ({ value: v, label: WANT_CHILDREN_LABEL[v] }))}
                  selected={wantChildren}
                  onSelect={(v) => setWantChildren(v)}
                  accent
                />
              </div>
            </div>
          </section>

          {/* ===== イベント当日用 ===== */}
          <section className="mt-10">
            <h2 className="mb-1 text-xs font-mont uppercase tracking-[0.3em] text-rose">
              For the Event
            </h2>
            <p className="mb-4 text-[11px] text-muted-foreground">
              当日のマッチング精度を高める項目です。
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <Label>希望する相手の年齢層</Label>
                <ChipGroup
                  options={AGE_RANGE_OPTIONS.map((a) => ({ value: a, label: a }))}
                  selected={preferredAge}
                  onSelect={(v) => setPreferredAge((prev) => (prev === v ? '' : v))}
                  accent
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>当日重視したいこと（最大3つ）</Label>
                <ChipGroup
                  options={FOCUS_OPTIONS.map((f) => ({ value: f, label: f }))}
                  selected={focusPoints}
                  onSelect={toggleFocus}
                  accent
                />
              </div>
            </div>
          </section>

          {/* 保存 */}
          <div className="mt-10">
            <Button
              fullWidth
              size="lg"
              className="gap-2"
              disabled={!canSave || saving}
              onClick={handleSave}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />保存中…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" aria-hidden />イベント用プロフィールを保存
                </>
              )}
            </Button>
            {!canSave && (
              <p className="mt-3 text-center text-[10px] text-rose">
                職業・趣味・結婚への意欲・子供の希望は必須です
              </p>
            )}
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              開催前であればいつでも編集できます
            </p>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
