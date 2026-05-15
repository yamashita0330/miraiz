'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Loader2, Calendar, Clock, MessageSquare } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Step = 'form' | 'sending' | 'done';

const TOPICS = [
  '婚活が初めてで何から始めるべきか分からない',
  '結果が出ず原因が分からない',
  '通知表のスコアを上げたい',
  '半年〜1年以内に結婚を決めたい',
  'プロフィールの見直しをしたい',
  'その他',
] as const;

const TIMES = [
  '平日の昼（10-15時）',
  '平日の夕方（17-19時）',
  '平日の夜（20-22時）',
  '土日の昼',
  '土日の夜',
] as const;

export default function ConsultPage() {
  const [step, setStep] = useState<Step>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState<typeof TOPICS[number] | ''>('');
  const [time, setTime] = useState<typeof TIMES[number] | ''>('');
  const [memo, setMemo] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !topic || !time) return;
    setStep('sending');
    setTimeout(() => setStep('done'), 1500);
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          {step !== 'done' && (
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              プラン一覧
            </Link>
          )}

          {step === 'form' && (
            <>
              <header className="mt-6 flex flex-col gap-3">
                <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  Free Consultation
                </span>
                <h1 className="text-2xl font-semibold leading-tight tracking-tight">
                  Zoom 30分の<br />無料相談
                </h1>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  代表 山下 拓海が直接お話しします。<br />
                  あなたの現状をお伺いしたうえで、最適な進め方をご提案します。
                </p>
              </header>

              <section className="mt-8 rounded-2xl border border-border bg-muted/30 p-5">
                <p className="text-xs font-medium">相談の流れ</p>
                <ol className="mt-3 flex flex-col gap-2 text-[11px] leading-relaxed text-muted-foreground">
                  <li>1. お申込み（このフォーム）</li>
                  <li>2. 24時間以内に山下からLINE/メールで日程候補をご連絡</li>
                  <li>3. Zoom 30分（カメラOFF可）</li>
                  <li>4. プラン提案 or 別案内（押し売りなし）</li>
                </ol>
              </section>

              <form onSubmit={submit} className="mt-10 flex flex-col gap-6">
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
                  <Label htmlFor="phone">連絡先（LINE名 / 電話番号）</Label>
                  <Input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="任意（後ほどLINE連絡先を共有します）"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Label>相談したい内容</Label>
                  <div className="flex flex-col gap-2">
                    {TOPICS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(t)}
                        className={cn(
                          'rounded-lg border px-4 py-3 text-left text-xs transition-colors',
                          topic === t
                            ? 'border-foreground bg-foreground/[0.03]'
                            : 'border-border hover:bg-muted'
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Label>希望の時間帯</Label>
                  <div className="flex flex-col gap-2">
                    {TIMES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={cn(
                          'rounded-lg border px-4 py-3 text-left text-xs transition-colors',
                          time === t
                            ? 'border-foreground bg-foreground/[0.03]'
                            : 'border-border hover:bg-muted'
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="memo">事前に伝えたいこと（任意）</Label>
                  <Textarea
                    id="memo"
                    rows={4}
                    maxLength={300}
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="現状の悩み・聞きたいこと"
                  />
                </div>

                <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-[10px] leading-relaxed text-muted-foreground">
                  押し売りは一切ありません。プラン提案後、その場で「検討します」とお伝えいただいて結構です。
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  disabled={!name || !topic || !time}
                  className="gap-2"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden />
                  無料相談を申し込む
                </Button>
              </form>
            </>
          )}

          {step === 'sending' && (
            <div className="mt-32 flex flex-col items-center gap-4 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" aria-hidden />
              <p className="text-sm font-medium">送信中…</p>
            </div>
          )}

          {step === 'done' && (
            <div className="mt-12 flex flex-col gap-10">
              <header className="flex flex-col items-center gap-3 text-center">
                <CheckCircle2 className="h-10 w-10" strokeWidth={1.4} aria-hidden />
                <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  Submitted
                </span>
                <h1 className="text-2xl font-semibold leading-tight tracking-tight">
                  お申込みを受け付けました
                </h1>
                <p className="text-xs text-muted-foreground">
                  受付番号 <span className="font-mont">CN-{Math.floor(Math.random() * 100000).toString().padStart(5, '0')}</span>
                </p>
              </header>

              <section className="rounded-2xl border border-border bg-card p-6">
                <p className="text-sm font-semibold">送信内容</p>
                <dl className="mt-4 flex flex-col divide-y divide-border">
                  <Row label="お名前" value={name} />
                  {phone && <Row label="連絡先" value={phone} />}
                  <Row label="相談内容" value={topic} />
                  <Row label="希望時間帯" value={time} />
                  {memo && <Row label="事前メモ" value={memo} />}
                </dl>
              </section>

              <section className="rounded-2xl border border-border bg-muted/30 p-6">
                <p className="text-xs font-medium">この後の流れ</p>
                <ol className="mt-3 flex flex-col gap-3 text-xs leading-relaxed text-muted-foreground">
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                    <span>24時間以内に山下からLINE/メールで日程候補のご連絡</span>
                  </li>
                  <li className="flex gap-3">
                    <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                    <span>日程確定後、ZoomリンクをLINEで送付</span>
                  </li>
                  <li className="flex gap-3">
                    <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                    <span>当日30分・カメラOFF可。最初の5分で目的を確認します</span>
                  </li>
                </ol>
              </section>

              <div className="flex flex-col gap-3">
                <Link href="/home">
                  <Button fullWidth variant="outline" size="lg">
                    ホームに戻る
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 py-3">
      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="text-sm">{value}</dd>
    </div>
  );
}
