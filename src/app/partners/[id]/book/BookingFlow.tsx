'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Clock, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Partner, PartnerMenu } from '@/lib/demo';
import { getBookedSlots } from '@/lib/demo';

type Step = 'menu' | 'date' | 'time' | 'confirm' | 'sending' | 'done';

interface Props {
  partner: Partner;
}

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

export function BookingFlow({ partner }: Props) {
  const [step, setStep] = useState<Step>('menu');
  const [menu, setMenu] = useState<PartnerMenu | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [memo, setMemo] = useState('');
  const [bookingId, setBookingId] = useState<string | null>(null);

  // 30日先までの日付候補
  const dateCandidates = useMemo(() => {
    const today = new Date();
    const list: { date: string; weekday: number; available: boolean; label: string; isToday: boolean }[] = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const wd = d.getDay();
      const slotDef = partner.weekly_slots?.find((s) => s.weekday === wd);
      const dateStr = d.toISOString().slice(0, 10);
      list.push({
        date: dateStr,
        weekday: wd,
        available: !!slotDef && slotDef.times.length > 0,
        label: `${d.getMonth() + 1}/${d.getDate()}`,
        isToday: i === 0,
      });
    }
    return list;
  }, [partner.weekly_slots]);

  // 選択した日の時間枠
  const timeSlots = useMemo(() => {
    if (!date) return [];
    const wd = new Date(date).getDay();
    const slotDef = partner.weekly_slots?.find((s) => s.weekday === wd);
    if (!slotDef) return [];
    const booked = getBookedSlots(partner.id);
    return slotDef.times.map((t) => ({
      time: t,
      booked: booked.some((b) => b.date === date && b.time === t),
    }));
  }, [date, partner]);

  const submit = () => {
    setStep('sending');
    setTimeout(() => {
      setBookingId('bk-' + Math.floor(Math.random() * 100000).toString().padStart(5, '0').toUpperCase());
      setStep('done');
    }, 1500);
  };

  const back = () => {
    if (step === 'date') return setStep('menu');
    if (step === 'time') return setStep('date');
    if (step === 'confirm') return setStep('time');
  };

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-xl px-6 py-8">
        {/* ヘッダー */}
        <header className="flex items-center gap-3">
          <Link
            href={`/partners/${partner.id}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="店舗詳細に戻る"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </Link>
          <div className="flex flex-1 flex-col gap-0.5 min-w-0">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Booking
            </span>
            <p className="truncate text-sm font-semibold">{partner.name}</p>
          </div>
        </header>

        {/* プログレス */}
        <ProgressBar step={step} />

        {/* メニュー選択 */}
        {step === 'menu' && (
          <Section title="01" subtitle="メニューを選ぶ">
            {!partner.menus || partner.menus.length === 0 ? (
              <Empty text="このお店はオンライン予約に対応していません" />
            ) : (
              <ul className="flex flex-col gap-3">
                {partner.menus.map((m) => {
                  const selected = menu?.id === m.id;
                  return (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => { setMenu(m); setStep('date'); }}
                        className={cn(
                          'flex w-full flex-col gap-2 rounded-2xl border p-5 text-left transition-all',
                          selected
                            ? 'border-foreground bg-foreground/[0.03]'
                            : 'border-border bg-card hover:border-foreground/30'
                        )}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="text-sm font-semibold">{m.name}</p>
                          <span className="font-mont text-xs text-muted-foreground">{m.duration_min}分</span>
                        </div>
                        {m.description && (
                          <p className="text-[11px] leading-relaxed text-muted-foreground">{m.description}</p>
                        )}
                        <div className="flex items-baseline gap-2 pt-1">
                          <span className="font-mont text-base font-medium">¥{m.member_price.toLocaleString()}</span>
                          {m.regular_price > m.member_price && (
                            <span className="font-mont text-[10px] text-muted-foreground line-through">
                              ¥{m.regular_price.toLocaleString()}
                            </span>
                          )}
                          <Badge variant="roseSoft" className="ml-auto text-[9px]">会員価格</Badge>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </Section>
        )}

        {/* 日付選択 */}
        {step === 'date' && (
          <Section title="02" subtitle="日にちを選ぶ" onBack={back}>
            <div className="grid grid-cols-4 gap-2">
              {dateCandidates.map((d) => (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => {
                    if (!d.available) return;
                    setDate(d.date);
                    setStep('time');
                  }}
                  disabled={!d.available}
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-lg border py-3 text-xs transition-colors',
                    !d.available
                      ? 'border-border bg-muted/30 text-muted-foreground/50 line-through'
                      : date === d.date
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-card hover:border-foreground/40'
                  )}
                >
                  <span className="text-[10px]">
                    {d.isToday ? '今日' : WEEKDAYS[d.weekday]}
                  </span>
                  <span className="font-mont text-sm font-medium">{d.label}</span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-[10px] text-muted-foreground">
              定休日（{partner.closed}）はグレーアウトしています
            </p>
          </Section>
        )}

        {/* 時間選択 */}
        {step === 'time' && date && (
          <Section title="03" subtitle="時間を選ぶ" onBack={back}>
            {timeSlots.length === 0 ? (
              <Empty text="この日は予約枠がありません" />
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((s) => (
                  <button
                    key={s.time}
                    type="button"
                    onClick={() => {
                      if (s.booked) return;
                      setTime(s.time);
                      setStep('confirm');
                    }}
                    disabled={s.booked}
                    className={cn(
                      'flex h-12 items-center justify-center rounded-lg border font-mont text-sm transition-colors',
                      s.booked
                        ? 'border-border bg-muted/30 text-muted-foreground/50 line-through'
                        : time === s.time
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border bg-card hover:border-foreground/40'
                    )}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
            )}
            <p className="mt-4 text-[10px] text-muted-foreground">
              ×印は予約済みです。リアルタイムで更新されます。
            </p>
          </Section>
        )}

        {/* 確認 */}
        {step === 'confirm' && menu && date && time && (
          <Section title="04" subtitle="内容を確認" onBack={back}>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{menu.name}</span>
                <Badge variant="outline" className="ml-auto text-[9px]">{menu.duration_min}分</Badge>
              </div>

              <dl className="mt-6 flex flex-col divide-y divide-border">
                <Row Icon={MapPin} label="店舗" value={partner.name} sub={partner.address} />
                <Row Icon={Calendar} label="日にち" value={formatDateJa(date)} />
                <Row Icon={Clock} label="時間" value={`${time} 〜 ${addMinutes(time, menu.duration_min)}`} />
              </dl>

              <div className="mt-6 flex items-baseline justify-between border-t border-border pt-4">
                <span className="text-xs text-muted-foreground">お支払い予定</span>
                <span className="font-mont text-2xl font-medium tracking-tight">
                  ¥{menu.member_price.toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">
                ※ お支払いは来店時。会員証提示で会員価格適用。
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">お名前</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例：山下 拓海"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="memo">店舗への要望（任意）</Label>
                <Textarea
                  id="memo"
                  rows={3}
                  maxLength={200}
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="例：肌質：敏感肌・初めての利用"
                />
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-border bg-muted/30 px-4 py-3 text-[10px] leading-relaxed text-muted-foreground">
              ご予約はリクエスト送信後、店舗の承認後に確定します（通常24時間以内）。
              キャンセルは予約日の24時間前まで無料です。
            </div>

            <Button
              fullWidth
              size="lg"
              className="mt-6"
              disabled={!name.trim()}
              onClick={submit}
            >
              予約をリクエストする
            </Button>
          </Section>
        )}

        {step === 'sending' && (
          <div className="mt-20 flex flex-col items-center gap-4 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" aria-hidden />
            <p className="text-sm font-medium">送信中…</p>
          </div>
        )}

        {step === 'done' && menu && date && time && (
          <div className="mt-20 flex flex-col gap-10">
            <header className="flex flex-col items-center gap-3 text-center">
              <CheckCircle2 className="h-10 w-10" strokeWidth={1.4} aria-hidden />
              <p className="text-base font-medium">予約をリクエストしました</p>
              <p className="text-xs text-muted-foreground">
                予約番号 <span className="font-mont">{bookingId}</span>
              </p>
            </header>

            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-semibold">{menu.name}</p>
              <dl className="mt-4 flex flex-col divide-y divide-border">
                <Row Icon={MapPin} label="店舗" value={partner.name} sub={partner.address} />
                <Row Icon={Calendar} label="日にち" value={formatDateJa(date)} />
                <Row Icon={Clock} label="時間" value={`${time} 〜 ${addMinutes(time, menu.duration_min)}`} />
              </dl>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              店舗の承認後、ご登録のメールアドレス／プッシュ通知でお知らせします。<br />
              通常24時間以内に確定します。
            </p>

            <div className="flex flex-col gap-3">
              <Link href="/mypage">
                <Button fullWidth variant="outline" size="lg">
                  マイページへ
                </Button>
              </Link>
              <Link href="/partners">
                <Button fullWidth variant="ghost" size="lg">
                  他の加盟店を見る
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Section({
  title,
  subtitle,
  onBack,
  children,
}: {
  title: string;
  subtitle: string;
  onBack?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="戻る"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </button>
        )}
        <div className="flex items-baseline gap-3">
          <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            {title}
          </span>
          <h2 className="text-lg font-semibold tracking-tight">{subtitle}</h2>
        </div>
      </div>
      {children}
    </div>
  );
}

function ProgressBar({ step }: { step: Step }) {
  const order: Step[] = ['menu', 'date', 'time', 'confirm'];
  const isFinal = step === 'sending' || step === 'done';
  const idx = isFinal ? 4 : order.indexOf(step);
  const total = 4;
  const pct = isFinal ? 100 : ((idx + 1) / total) * 100;

  return (
    <div className="mt-6">
      <div className="flex items-baseline justify-between text-[10px] text-muted-foreground">
        <span className="font-mont">
          STEP {isFinal ? '完了' : `${idx + 1} / ${total}`}
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-foreground transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-12 text-center">
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function Row({
  Icon,
  label,
  value,
  sub,
}: {
  Icon: typeof Calendar;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex gap-4 py-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.6} aria-hidden />
      <div className="flex flex-col gap-0.5 min-w-0">
        <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</dt>
        <dd className="text-sm">{value}</dd>
        {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}

function formatDateJa(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${WEEKDAYS[d.getDay()]}）`;
}

function addMinutes(time: string, min: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + min;
  return `${String(Math.floor(total / 60) % 24).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}
