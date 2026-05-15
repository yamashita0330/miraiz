'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Star, Clock, Check, X, CalendarCheck, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  DEMO_PHOTO_STUDIOS,
  DEMO_PHOTO_BOOKINGS,
  DEMO_USER_STATE,
  PHOTO_CONSENT_ITEMS,
  PHOTO_CONSENT_VERSION,
  findPhotoStudio,
  type PhotoStudio,
  type PhotoSlot,
} from '@/lib/demo';

type View = 'list' | 'studio' | 'slot' | 'consent' | 'confirm' | 'done';

export default function PhotoBookingPage() {
  const [view, setView] = useState<View>('list');
  const [selectedStudio, setSelectedStudio] = useState<PhotoStudio | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<PhotoSlot | null>(null);
  const [consentChecked, setConsentChecked] = useState<boolean[]>(new Array(PHOTO_CONSENT_ITEMS.length).fill(false));
  const [signature, setSignature] = useState('');
  const [bookings, setBookings] = useState(DEMO_PHOTO_BOOKINGS);

  const plan = DEMO_USER_STATE.plan ?? 'free';
  const price = (s: PhotoStudio) =>
    plan === 'matsu' ? s.price_matsu :
    plan === 'free' ? s.price_normal :
    s.price_member;

  const allChecked = consentChecked.every(Boolean);

  const handleConfirm = () => {
    if (!selectedStudio || !selectedSlot) return;
    const id = `pb-${Date.now()}`;
    setBookings((prev) => [...prev, {
      id,
      user_id: 'demo-me',
      studio_id: selectedStudio.id,
      slot_id: selectedSlot.id,
      slot_at: `${selectedSlot.date}T${selectedSlot.time}:00+09:00`,
      status: 'reserved' as const,
      consent_signed_at: new Date().toISOString(),
      consent_version: PHOTO_CONSENT_VERSION,
      booked_at: new Date().toISOString(),
      amount_paid: price(selectedStudio),
      photos_delivered_at: null,
      photos_count: null,
    }]);
    setView('done');
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          {/* ============== TOP: 一覧 ============== */}
          {view === 'list' && (
            <>
              <Link href="/mypage" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-3 w-3" aria-hidden />マイページ
              </Link>
              <header className="flex flex-col gap-4">
                <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  Pro Photo Booking
                </span>
                <h1 className="text-3xl font-semibold leading-tight tracking-tight">
                  プロカメラマン<br />撮影予約
                </h1>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  あなたの一番素敵な表情を、プロが引き出します。MIRAIZ加盟スタジオで、ヘアメイク込み・婚活ポートレート専門カメラマンが撮影。自然な笑顔で、第一印象をもっと魅力的に。
                </p>
              </header>

              {/* バリュー訴求 */}
              <section className="mt-8 rounded-2xl bg-foreground p-5 text-background">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <ValueBox label="通常料金" value="¥18,000〜" muted />
                  <ValueBox label="MIRAIZ会員" value="¥6,000" rose />
                  <ValueBox label="松会員" value="無料" rose bold />
                </div>
                <p className="mt-3 text-[10px] opacity-70 text-center">
                  ヘアメイク・1時間撮影・データ20カット・編集3枚 込み
                </p>
              </section>

              {/* マイ予約 */}
              {bookings.length > 0 && (
                <section className="mt-8">
                  <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                    My Bookings
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {bookings.map((b) => {
                      const studio = findPhotoStudio(b.studio_id);
                      if (!studio) return null;
                      return (
                        <li key={b.id} className="rounded-2xl border-2 border-rose bg-rose-50/40 p-4">
                          <div className="mb-2 flex items-baseline gap-2">
                            <CalendarCheck className="h-3.5 w-3.5 text-rose" aria-hidden />
                            <Badge variant="rose" className="text-[10px]">
                              {b.status === 'reserved' ? '予約済' :
                               b.status === 'completed' ? '撮影完了' :
                               b.status === 'delivered' ? '納品済' : 'キャンセル'}
                            </Badge>
                            <span className="ml-auto font-mont text-[10px] text-muted-foreground">
                              {formatDateTime(b.slot_at)}
                            </span>
                          </div>
                          <p className="text-sm font-semibold">{studio.name}</p>
                          <p className="text-[11px] text-muted-foreground">{studio.address}</p>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}

              {/* スタジオ一覧 */}
              <section className="mt-8">
                <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                  加盟スタジオ（徳島）
                </h2>
                <ul className="flex flex-col gap-3">
                  {DEMO_PHOTO_STUDIOS.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => {
                          setSelectedStudio(s);
                          setView('studio');
                        }}
                        className="block w-full text-left rounded-2xl border border-border bg-card p-5 transition-all hover:border-foreground/30"
                      >
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-muted text-3xl">
                            {s.sample_emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 mb-1">
                              <h3 className="text-base font-semibold">{s.name}</h3>
                              <span className="inline-flex items-baseline gap-0.5 text-[10px] text-muted-foreground">
                                <Star className="h-2.5 w-2.5 fill-rose text-rose" aria-hidden />
                                {s.rating} ({s.review_count})
                              </span>
                            </div>
                            <p className="flex items-baseline gap-1 text-[11px] text-muted-foreground mb-2">
                              <MapPin className="h-2.5 w-2.5" aria-hidden />
                              {s.area}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {s.features.map((f) => (
                                <span key={f} className="rounded-full bg-muted px-2 py-0.5 text-[9px]">
                                  {f}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span className="font-mont text-lg font-semibold text-rose">
                                ¥{price(s).toLocaleString()}
                              </span>
                              {plan !== 'free' && (
                                <span className="font-mont text-[10px] text-muted-foreground line-through">
                                  ¥{s.price_normal.toLocaleString()}
                                </span>
                              )}
                              <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" aria-hidden />
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 仕組み説明 */}
              <section className="mt-8 rounded-2xl border border-border bg-card p-5">
                <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                  撮影の流れ
                </h2>
                <ol className="flex flex-col gap-2.5 text-[12px] leading-relaxed">
                  {[
                    'スタジオと日時を選ぶ',
                    '撮影同意書にチェック・予約確定',
                    '当日：本人確認書類を持参・ヘアメイク→撮影（約1時間）',
                    '5〜10日後にデータ20カット・編集3枚を受領',
                    'MIRAIZプロフィールに自動アップロード（透かし入り）',
                  ].map((t, i) => (
                    <li key={i} className="flex items-baseline gap-3">
                      <span className="font-mont text-[10px] text-rose w-4 shrink-0">0{i + 1}</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* ガバナンス */}
              <Link href="/legal/photo-consent" className="mt-8 flex items-center justify-between gap-3 rounded-2xl border border-border bg-muted/30 p-5 transition-all hover:border-foreground/30">
                <div className="flex flex-col gap-0.5">
                  <span className="inline-flex items-baseline gap-1.5 text-sm font-medium">
                    <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden />
                    撮影同意書を読む
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    肖像権・5年保管・退会時30日削除など
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
              </Link>
            </>
          )}

          {/* ============== STUDIO DETAIL ============== */}
          {view === 'studio' && selectedStudio && (
            <>
              <button onClick={() => setView('list')} className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-3 w-3" aria-hidden />スタジオ一覧
              </button>
              <header className="flex flex-col gap-3">
                <div className="inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-muted text-5xl">
                  {selectedStudio.sample_emoji}
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">{selectedStudio.name}</h1>
                <p className="flex items-baseline gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" aria-hidden />
                  {selectedStudio.address}
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="inline-flex items-baseline gap-1 text-sm">
                    <Star className="h-3 w-3 fill-rose text-rose" aria-hidden />
                    <span className="font-semibold">{selectedStudio.rating}</span>
                    <span className="text-[10px] text-muted-foreground">({selectedStudio.review_count}件)</span>
                  </span>
                  <span className="font-mont text-base font-semibold text-rose">
                    ¥{price(selectedStudio).toLocaleString()}
                  </span>
                </div>
              </header>

              <section className="mt-6 rounded-2xl border border-border bg-card p-5">
                <p className="mb-2 text-xs font-medium">カメラマン：{selectedStudio.photographer_name}</p>
                <p className="text-[12px] leading-relaxed text-muted-foreground">
                  {selectedStudio.photographer_bio}
                </p>
              </section>

              <section className="mt-4 grid grid-cols-2 gap-2">
                {selectedStudio.features.map((f) => (
                  <div key={f} className="rounded-lg bg-muted/40 px-3 py-2 text-[11px]">
                    <Check className="inline h-3 w-3 text-success mr-1" aria-hidden />
                    {f}
                  </div>
                ))}
              </section>

              <section className="mt-8">
                <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                  空き枠を選ぶ
                </h2>
                <SlotPicker
                  slots={selectedStudio.available_slots}
                  selected={selectedSlot?.id ?? null}
                  onSelect={(s) => setSelectedSlot(s)}
                />
              </section>

              <Button
                fullWidth
                size="lg"
                disabled={!selectedSlot}
                onClick={() => setView('consent')}
                className="mt-8 h-12"
              >
                次へ：撮影同意書
              </Button>
            </>
          )}

          {/* ============== CONSENT ============== */}
          {view === 'consent' && selectedStudio && selectedSlot && (
            <>
              <button onClick={() => setView('studio')} className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-3 w-3" aria-hidden />戻る
              </button>
              <header className="flex flex-col gap-2">
                <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  Consent {PHOTO_CONSENT_VERSION}
                </span>
                <h1 className="text-2xl font-semibold tracking-tight">撮影同意書</h1>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  以下の項目すべてに同意いただいた上で予約が確定します。
                </p>
              </header>

              <section className="mt-6 flex flex-col gap-3">
                {PHOTO_CONSENT_ITEMS.map((item, i) => (
                  <label key={i} className={cn(
                    'flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition-colors',
                    consentChecked[i] ? 'border-success bg-success/5' : 'border-border bg-card hover:bg-muted/30'
                  )}>
                    <input
                      type="checkbox"
                      checked={consentChecked[i]}
                      onChange={(e) => {
                        const newChecked = [...consentChecked];
                        newChecked[i] = e.target.checked;
                        setConsentChecked(newChecked);
                      }}
                      className="mt-0.5 shrink-0"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold mb-1">{item.title}</p>
                      <p className="text-[11px] leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </label>
                ))}
              </section>

              <section className="mt-6">
                <label className="block text-xs font-medium mb-2">電子署名（フルネーム）</label>
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="例：山下 純也"
                  className="w-full rounded-2xl border border-border bg-background py-3 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <p className="mt-1 text-[10px] text-muted-foreground">
                  この署名は撮影同意書に記録され、運営側で5年保管されます。
                </p>
              </section>

              <Button
                fullWidth
                size="lg"
                disabled={!allChecked || signature.trim().length < 2}
                onClick={() => setView('confirm')}
                className="mt-8 h-12"
              >
                同意して次へ
              </Button>
            </>
          )}

          {/* ============== CONFIRM ============== */}
          {view === 'confirm' && selectedStudio && selectedSlot && (
            <>
              <button onClick={() => setView('consent')} className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-3 w-3" aria-hidden />戻る
              </button>
              <h1 className="text-2xl font-semibold tracking-tight mb-6">予約内容の確認</h1>

              <section className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <Row label="スタジオ" value={selectedStudio.name} />
                <Row label="住所" value={selectedStudio.address} />
                <Row label="カメラマン" value={selectedStudio.photographer_name} />
                <Row label="日時" value={`${formatDate(selectedSlot.date)}・${selectedSlot.time}`} highlight />
                <Row label="ヘアメイク" value="含む" />
                <Row label="撮影" value="約60分・20カット" />
                <Row label="納品" value={`撮影後 ${selectedStudio.delivery_days} 日以内`} />
                <Row label="編集" value="3枚（明るさ・色味補正のみ）" />
              </section>

              <section className="mt-4 rounded-2xl border-2 border-foreground bg-foreground p-5 text-background">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm">お支払い</span>
                  <span className="font-mont text-2xl font-semibold">
                    {price(selectedStudio) === 0 ? '無料' : `¥${price(selectedStudio).toLocaleString()}`}
                  </span>
                </div>
                {plan === 'matsu' && (
                  <p className="mt-2 text-[10px] opacity-80">
                    松会員特典：年1回無料（今期残り1回）
                  </p>
                )}
              </section>

              <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground">
                同意書 {PHOTO_CONSENT_VERSION} に電子署名：<strong className="text-foreground">{signature}</strong><br />
                {new Date().toLocaleString('ja-JP')}
              </p>

              <Button fullWidth size="lg" onClick={handleConfirm} className="mt-8 h-12 gap-1.5">
                予約を確定する
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
              </Button>
            </>
          )}

          {/* ============== DONE ============== */}
          {view === 'done' && selectedStudio && selectedSlot && (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
                <Check className="h-8 w-8" strokeWidth={2.4} aria-hidden />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight mb-3">予約完了</h1>
              <p className="text-sm text-muted-foreground mb-2">
                {selectedStudio.name}
              </p>
              <p className="font-mont text-base font-semibold mb-8">
                {formatDate(selectedSlot.date)}・{selectedSlot.time}
              </p>
              <p className="text-[12px] leading-relaxed text-muted-foreground max-w-sm mb-8">
                予約確認メールを送信しました。<br />
                撮影3日前にリマインド通知が届きます。<br />
                当日は本人確認書類をご持参ください。
              </p>
              <Button
                fullWidth
                onClick={() => {
                  setView('list');
                  setSelectedStudio(null);
                  setSelectedSlot(null);
                  setConsentChecked(new Array(PHOTO_CONSENT_ITEMS.length).fill(false));
                  setSignature('');
                }}
                className="h-12"
              >
                予約一覧へ
              </Button>
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function SlotPicker({ slots, selected, onSelect }: { slots: PhotoSlot[]; selected: string | null; onSelect: (s: PhotoSlot) => void }) {
  // 日付ごとにグループ化
  const grouped = useMemo(() => {
    const map = new Map<string, PhotoSlot[]>();
    slots.forEach((s) => {
      const arr = map.get(s.date) ?? [];
      arr.push(s);
      map.set(s.date, arr);
    });
    return Array.from(map.entries());
  }, [slots]);

  return (
    <div className="space-y-3">
      {grouped.map(([date, list]) => (
        <div key={date} className="rounded-2xl border border-border bg-card p-4">
          <p className="mb-2 font-mont text-[11px] text-muted-foreground">
            {formatDate(date)}
          </p>
          <div className="flex flex-wrap gap-2">
            {list.map((s) => {
              const isFull = s.remaining === 0;
              const isSelected = selected === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  disabled={isFull}
                  onClick={() => onSelect(s)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-[12px] transition-colors inline-flex items-baseline gap-1',
                    isSelected ? 'border-foreground bg-foreground text-background' :
                    isFull ? 'border-border bg-muted text-muted-foreground opacity-50 cursor-not-allowed' :
                    'border-border bg-background hover:border-foreground'
                  )}
                >
                  <Clock className="h-2.5 w-2.5" aria-hidden />
                  {s.time}
                  {isFull && <X className="ml-1 h-2.5 w-2.5" aria-hidden />}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ValueBox({ label, value, muted, rose, bold }: { label: string; value: string; muted?: boolean; rose?: boolean; bold?: boolean }) {
  return (
    <div>
      <p className={cn('text-[9px]', muted ? 'opacity-50' : 'opacity-80')}>{label}</p>
      <p className={cn(
        'mt-1 font-mont font-medium',
        bold ? 'text-2xl' : 'text-base',
        rose ? 'text-rose' : '',
        muted && 'line-through opacity-50'
      )}>
        {value}
      </p>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-[12px]">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className={cn('text-right', highlight && 'font-semibold text-rose')}>{value}</span>
    </div>
  );
}

function formatDate(yyyymmdd: string): string {
  const [y, m, d] = yyyymmdd.split('-');
  const date = new Date(`${y}-${m}-${d}T00:00:00+09:00`);
  const weekday = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
  return `${parseInt(m)}/${parseInt(d)}（${weekday}）`;
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('ja-JP', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}
