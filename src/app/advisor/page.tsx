'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Loader2, CalendarPlus, Plus, X, MessageCircleHeart, Video, MapPin, Phone } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const TOPICS = [
  'プロフィールの改善',
  'マッチングのコツ',
  'メッセージ・会話の進め方',
  'デートの進め方',
  'イベントの活かし方',
  'その他・気軽な相談',
];

const FORMATS = [
  { value: 'zoom', label: 'オンライン（Zoom）', Icon: Video },
  { value: 'in_person', label: '対面（徳島オフィス）', Icon: MapPin },
  { value: 'phone', label: '電話', Icon: Phone },
] as const;

const TIME_SLOTS = ['午前（10-12時）', '昼（12-15時）', '夕方（15-18時）', '夜（18-21時）'];

type Slot = { date: string; time: string };

export default function AdvisorPage() {
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [detail, setDetail] = useState('');
  const [format, setFormat] = useState<string>('zoom');
  const [slots, setSlots] = useState<Slot[]>([{ date: '', time: '' }]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const updateSlot = (i: number, patch: Partial<Slot>) => {
    setSlots((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  };
  const addSlot = () => {
    if (slots.length < 3) setSlots((prev) => [...prev, { date: '', time: '' }]);
  };
  const removeSlot = (i: number) => {
    setSlots((prev) => prev.filter((_, idx) => idx !== i));
  };

  const validSlots = slots.filter((s) => s.date && s.time);
  const canSubmit = topic && validSlots.length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 1200);
  };

  // 今日以降の日付のみ選択可
  const today = new Date().toISOString().split('T')[0];

  if (done) {
    return (
      <>
        <Header showLogout />
        <main className="min-h-screen bg-background pb-24">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-6 py-16 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success text-success-foreground">
              <Check className="h-7 w-7" strokeWidth={2.5} aria-hidden />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">相談リクエストを送信しました</h1>
            <p className="text-xs leading-relaxed text-muted-foreground max-w-sm">
              アドバイザーが希望日程を確認し、1〜2営業日以内に確定の連絡をします。<br />
              やりとりはトーク画面に届きます。
            </p>
            <div className="mt-2 flex w-full max-w-xs flex-col gap-2">
              <Button fullWidth size="lg" onClick={() => router.push('/messages')}>
                トークを確認する
              </Button>
              <Link href="/mypage">
                <Button fullWidth size="lg" variant="ghost">マイページへ</Button>
              </Link>
            </div>
          </div>
        </main>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-32">
        <div className="mx-auto max-w-xl px-6 py-10">
          <Link
            href="/mypage"
            className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden />マイページ
          </Link>
          <header className="flex flex-col gap-2">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Advisor
            </span>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight">
              アドバイザーに相談
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              恋愛・婚活の専属アドバイザーに、オンラインまたは対面で相談できます。<br />
              希望日程を送ると、アドバイザーが確定の連絡をします。
            </p>
          </header>

          {/* 相談内容 */}
          <section className="mt-8">
            <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              相談したいこと
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {TOPICS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-[11px] transition-colors',
                    topic === t
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-background hover:bg-muted'
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              rows={3}
              placeholder="相談したい内容を具体的に書いておくと、当日がスムーズです（任意）"
              className="mt-3 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </section>

          {/* 相談方法 */}
          <section className="mt-8">
            <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              相談方法
            </h2>
            <div className="flex flex-col gap-2">
              {FORMATS.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormat(value)}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-colors',
                    format === value
                      ? 'border-foreground bg-muted/40'
                      : 'border-border bg-card hover:bg-muted/30'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.8} aria-hidden />
                  <span className="flex-1 text-sm font-medium">{label}</span>
                  <span
                    className={cn(
                      'flex h-4 w-4 items-center justify-center rounded-full border',
                      format === value ? 'border-foreground bg-foreground' : 'border-border'
                    )}
                  >
                    {format === value && <Check className="h-2.5 w-2.5 text-background" strokeWidth={3} aria-hidden />}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* 希望日程 */}
          <section className="mt-8">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                希望日程（最大3つ）
              </h2>
              <span className="text-[10px] text-muted-foreground">第1〜第3希望</span>
            </div>
            <div className="flex flex-col gap-3">
              {slots.map((slot, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-4">
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="text-[11px] font-semibold">第{i + 1}希望</span>
                    {slots.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSlot(i)}
                        className="text-muted-foreground hover:text-foreground"
                        aria-label="削除"
                      >
                        <X className="h-3.5 w-3.5" aria-hidden />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <Label className="text-[10px]">日付</Label>
                      <input
                        type="date"
                        value={slot.date}
                        min={today}
                        onChange={(e) => updateSlot(i, { date: e.target.value })}
                        className="rounded-xl border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-[10px]">時間帯</Label>
                      <div className="flex flex-wrap gap-1.5">
                        {TIME_SLOTS.map((ts) => (
                          <button
                            key={ts}
                            type="button"
                            onClick={() => updateSlot(i, { time: ts })}
                            className={cn(
                              'rounded-full border px-2.5 py-1 text-[10px] transition-colors',
                              slot.time === ts
                                ? 'border-rose bg-rose text-rose-foreground'
                                : 'border-border bg-background hover:bg-muted'
                            )}
                          >
                            {ts}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {slots.length < 3 && (
                <button
                  type="button"
                  onClick={addSlot}
                  className="inline-flex items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-border py-3 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted/30"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden />
                  希望日程を追加
                </button>
              )}
            </div>
          </section>

          {/* 送信 */}
          <div className="mt-10">
            <Button
              fullWidth
              size="lg"
              className="gap-2"
              disabled={!canSubmit || submitting}
              onClick={handleSubmit}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />送信中…
                </>
              ) : (
                <>
                  <CalendarPlus className="h-4 w-4" aria-hidden />
                  相談日程を送る
                </>
              )}
            </Button>
            <p className="mt-3 inline-flex w-full items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
              <MessageCircleHeart className="h-3 w-3" aria-hidden />
              アドバイザーが日程を確認し、トークで確定連絡します
            </p>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
