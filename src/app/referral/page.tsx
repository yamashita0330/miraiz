'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Share2, Copy, Check, Gift, FileText, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  DEMO_REFERRAL_PARTNERS,
  DEMO_REFERRAL_RECORDS,
  REFERRAL_PARTNER_AGREEMENT_ITEMS,
  REFERRAL_PARTNER_AGREEMENT_VERSION,
  REFERRAL_REWARD_TABLE,
  REFERRAL_MONTHLY_CAP,
} from '@/lib/demo';

type View = 'landing' | 'register' | 'agreement' | 'dashboard';

export default function ReferralPage() {
  // デモ：本人はすでにパートナー登録済（rp-001）
  const existingPartner = DEMO_REFERRAL_PARTNERS[0];
  const [view, setView] = useState<View>(existingPartner ? 'dashboard' : 'landing');
  const [agreementChecked, setAgreementChecked] = useState<boolean[]>(new Array(REFERRAL_PARTNER_AGREEMENT_ITEMS.length).fill(false));
  const [signature, setSignature] = useState('');
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '', note: '' });
  const [linkCopied, setLinkCopied] = useState(false);

  const allChecked = agreementChecked.every(Boolean);

  const copyLink = () => {
    if (existingPartner) {
      navigator.clipboard.writeText(existingPartner.referral_link);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          {/* =============== LANDING（未登録時） =============== */}
          {view === 'landing' && (
            <>
              <Link href="/mypage" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-3 w-3" aria-hidden />マイページ
              </Link>

              <header className="flex flex-col gap-4">
                <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  MIRAIZ Beauty Partner
                </span>
                <h1 className="text-3xl font-semibold leading-tight tracking-tight">
                  友達を紹介して、<br />
                  美容無料券を受け取る
                </h1>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  あなたの紹介で誰かが MIRAIZ に入会したら、徳島の加盟美容店で使える美容無料券をお送りします。<br />
                  美容師・友人・家族など、どなたでもパートナー登録できます。
                </p>
              </header>

              {/* 報酬テーブル */}
              <section className="mt-8 rounded-2xl border-2 border-foreground bg-foreground p-6 text-background">
                <h2 className="mb-4 font-mont text-[10px] uppercase tracking-[0.3em] opacity-70">
                  Reward
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-baseline justify-between">
                    <span className="text-sm">梅プラン入会</span>
                    <span className="font-mont text-xl font-semibold">¥5,000</span>
                  </li>
                  <li className="flex items-baseline justify-between border-t border-background/20 pt-3">
                    <span className="text-sm">竹プラン入会</span>
                    <span className="font-mont text-xl font-semibold">¥10,000</span>
                  </li>
                  <li className="flex items-baseline justify-between border-t border-background/20 pt-3">
                    <span className="text-sm">松プラン入会</span>
                    <span className="font-mont text-xl font-semibold text-rose">¥40,000 <span className="text-[10px] opacity-70">（美容¥30,000＋現金¥10,000）</span></span>
                  </li>
                </ul>
                <p className="mt-4 border-t border-background/20 pt-3 text-[10px] opacity-70">
                  業務委託の対価としてお支払いします（雑所得・税務申告対象）
                </p>
              </section>

              {/* 仕組み */}
              <section className="mt-8">
                <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                  仕組み（5ステップ）
                </h2>
                <ol className="flex flex-col gap-3">
                  {[
                    { title: 'パートナー登録', body: 'お名前・連絡先を入力・業務委託契約に同意（オンライン電子署名）' },
                    { title: '紹介リンクを共有', body: '専用URLを友人・常連客・SNSフォロワーへ送る' },
                    { title: '紹介された方が入会・課金', body: '14日のクーリングオフ期間が経過するまで待機' },
                    { title: '美容モニター業務を遂行', body: '加盟美容店で施術→体験記事を執筆（300文字＋写真2枚）' },
                    { title: '美容券受領', body: '記事承認後、美容券をメール送付（梅¥5,000・竹¥10,000・松¥40,000）' },
                  ].map((s, i) => (
                    <li key={i} className="flex items-baseline gap-3 rounded-2xl border border-border bg-card p-4">
                      <span className="font-mont text-[11px] text-rose w-6 shrink-0">0{i + 1}</span>
                      <div>
                        <p className="text-sm font-semibold mb-0.5">{s.title}</p>
                        <p className="text-[11px] leading-relaxed text-muted-foreground">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* ルール */}
              <section className="mt-8 rounded-2xl border border-border bg-muted/30 p-5">
                <h2 className="mb-3 flex items-baseline gap-1.5 text-xs font-semibold">
                  <AlertCircle className="h-3.5 w-3.5 text-warn" aria-hidden />
                  ルール
                </h2>
                <ul className="space-y-2 text-[11px] leading-relaxed">
                  <li className="flex items-baseline gap-2">
                    <span className="text-rose">•</span>
                    <span>紹介された方が梅以上に課金完了してから報酬発行</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="text-rose">•</span>
                    <span>1ヶ月以内に解約された場合は報酬無効</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="text-rose">•</span>
                    <span>1ヶ月の紹介成立は最大{REFERRAL_MONTHLY_CAP}名まで</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="text-rose">•</span>
                    <span>美容モニター記事を執筆する必要があります（300文字＋写真2枚）</span>
                  </li>
                </ul>
              </section>

              <Button
                fullWidth
                size="lg"
                onClick={() => setView('register')}
                className="mt-8 h-12 gap-1.5"
              >
                パートナー登録を始める
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Button>
            </>
          )}

          {/* =============== REGISTER =============== */}
          {view === 'register' && (
            <>
              <button onClick={() => setView('landing')} className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-3 w-3" aria-hidden />戻る
              </button>
              <header className="flex flex-col gap-2">
                <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Step 1 / 2</span>
                <h1 className="text-2xl font-semibold tracking-tight">パートナー登録</h1>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  業務委託契約の準備として、基本情報を入力してください。
                </p>
              </header>

              <section className="mt-8 flex flex-col gap-4">
                <Field label="お名前">
                  <input
                    type="text"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    placeholder="例：山田 花子"
                    className="w-full rounded-xl border border-border bg-background py-3 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </Field>
                <Field label="メールアドレス">
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    placeholder="hanako@example.com"
                    className="w-full rounded-xl border border-border bg-background py-3 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </Field>
                <Field label="電話番号">
                  <input
                    type="tel"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    placeholder="08011112222"
                    className="w-full rounded-xl border border-border bg-background py-3 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </Field>
                <Field label="自己紹介・職業など（任意）">
                  <textarea
                    rows={3}
                    value={registerForm.note}
                    onChange={(e) => setRegisterForm({ ...registerForm, note: e.target.value })}
                    placeholder="例：徳島市内で美容師をしています。お客様に紹介したいです。"
                    className="w-full rounded-xl border border-border bg-background py-3 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </Field>
              </section>

              <Button
                fullWidth
                size="lg"
                disabled={!registerForm.name || !registerForm.email || !registerForm.phone}
                onClick={() => setView('agreement')}
                className="mt-8 h-12"
              >
                次へ：業務委託契約
              </Button>
            </>
          )}

          {/* =============== AGREEMENT =============== */}
          {view === 'agreement' && (
            <>
              <button onClick={() => setView('register')} className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-3 w-3" aria-hidden />戻る
              </button>
              <header className="flex flex-col gap-2">
                <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  Step 2 / 2 · Agreement {REFERRAL_PARTNER_AGREEMENT_VERSION}
                </span>
                <h1 className="text-2xl font-semibold tracking-tight">業務委託契約</h1>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  以下8項目すべてに同意の上、電子署名をお願いします。
                </p>
              </header>

              <section className="mt-6 flex flex-col gap-3">
                {REFERRAL_PARTNER_AGREEMENT_ITEMS.map((item, i) => (
                  <label key={i} className={cn(
                    'flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition-colors',
                    agreementChecked[i] ? 'border-success bg-success/5' : 'border-border bg-card hover:bg-muted/30'
                  )}>
                    <input
                      type="checkbox"
                      checked={agreementChecked[i]}
                      onChange={(e) => {
                        const newChecked = [...agreementChecked];
                        newChecked[i] = e.target.checked;
                        setAgreementChecked(newChecked);
                      }}
                      className="mt-0.5 shrink-0"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold mb-1">第{String(i + 1).padStart(2, '0')}条 {item.title}</p>
                      <p className="text-[11px] leading-relaxed text-muted-foreground">{item.body}</p>
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
                  placeholder="例：山田 花子"
                  className="w-full rounded-2xl border border-border bg-background py-3 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <p className="mt-1 text-[10px] text-muted-foreground">
                  電子署名は業務委託契約書に記録され、5年間保管されます。
                </p>
              </section>

              <Button
                fullWidth
                size="lg"
                disabled={!allChecked || signature.trim().length < 2}
                onClick={() => setView('dashboard')}
                className="mt-8 h-12"
              >
                同意して登録完了
              </Button>
            </>
          )}

          {/* =============== DASHBOARD（登録済） =============== */}
          {view === 'dashboard' && existingPartner && (
            <>
              <Link href="/mypage" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-3 w-3" aria-hidden />マイページ
              </Link>

              <header className="flex flex-col gap-2">
                <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  Beauty Partner
                </span>
                <h1 className="text-3xl font-semibold leading-tight tracking-tight">紹介ダッシュボード</h1>
                <p className="text-xs text-muted-foreground">
                  あなたの紹介リンクと実績を管理できます。
                </p>
              </header>

              {/* KPI */}
              <section className="mt-8 grid grid-cols-3 gap-3">
                <KpiBox label="累計紹介" value={`${existingPartner.total_referrals}名`} />
                <KpiBox label="今月の紹介" value={`${existingPartner.this_month_referrals}/${REFERRAL_MONTHLY_CAP}`} />
                <KpiBox label="累計報酬" value={`¥${existingPartner.total_earned.toLocaleString()}`} highlight />
              </section>

              {/* 紹介リンク */}
              <section className="mt-6 rounded-2xl border-2 border-foreground bg-foreground p-6 text-background">
                <p className="mb-2 font-mont text-[10px] uppercase tracking-[0.3em] opacity-70">
                  Your Referral Link
                </p>
                <p className="break-all font-mont text-sm mb-3">{existingPartner.referral_link}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="soft"
                    onClick={copyLink}
                    className="flex-1 gap-1.5"
                  >
                    {linkCopied ? (
                      <><Check className="h-3 w-3" aria-hidden />コピー済</>
                    ) : (
                      <><Copy className="h-3 w-3" aria-hidden />コピー</>
                    )}
                  </Button>
                  <Button size="sm" variant="soft" className="flex-1 gap-1.5">
                    <Share2 className="h-3 w-3" aria-hidden />共有
                  </Button>
                </div>
              </section>

              {/* 紹介履歴 */}
              <section className="mt-8">
                <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                  紹介履歴
                </h2>
                <ul className="flex flex-col gap-2">
                  {DEMO_REFERRAL_RECORDS.map((r) => {
                    const reward = REFERRAL_REWARD_TABLE[r.referred_plan];
                    return (
                      <li key={r.id} className={cn(
                        'rounded-2xl border p-4',
                        r.status === 'completed' ? 'border-success/40 bg-success/5' :
                        r.status === 'invalid' ? 'border-warn/40 bg-warn-50' :
                        'border-border bg-card'
                      )}>
                        <div className="flex flex-wrap items-baseline gap-2 mb-2">
                          <span className="text-sm font-semibold">{r.referred_user_name}</span>
                          <Badge variant="outline" className="text-[10px]">{r.referred_plan === 'ume' ? '梅' : r.referred_plan === 'take' ? '竹' : '松'}</Badge>
                          <Badge variant="outline" className={cn('text-[10px]',
                            r.status === 'completed' ? 'text-success border-success' :
                            r.status === 'invalid' ? 'text-warn border-warn' : ''
                          )}>
                            {r.status === 'pending_cooling_off' ? 'クーリングオフ期間中' :
                             r.status === 'pending_article' ? '記事執筆待ち' :
                             r.status === 'pending_review' ? '記事審査中' :
                             r.status === 'completed' ? '完了' : '無効'}
                          </Badge>
                          <span className="ml-auto font-mont text-[10px] text-muted-foreground">
                            ¥{r.reward_amount.toLocaleString()}（美容¥{reward.beauty.toLocaleString()}{reward.cash > 0 && `＋現金¥${reward.cash.toLocaleString()}`}）
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-mont">
                          紹介日：{formatDate(r.referred_at)}
                          {r.status === 'pending_cooling_off' && ` ・ ${formatDate(r.cooling_off_clears_at)}以降に業務開始`}
                          {r.status === 'pending_article' && ' ・ 美容店予約＋記事執筆をお願いします'}
                          {r.reward_paid_at && ` ・ 支払完了：${formatDate(r.reward_paid_at)}`}
                        </p>
                        {r.status === 'pending_article' && (
                          <div className="mt-3 flex gap-2">
                            <Link href="/photo-booking" className="text-[11px] text-rose hover:underline">
                              美容店を予約 →
                            </Link>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>

              {/* 推奨アクション */}
              <section className="mt-8 rounded-2xl border-2 border-rose bg-rose-50/30 p-5">
                <h2 className="mb-2 flex items-baseline gap-1.5 text-sm font-semibold">
                  <Sparkles className="h-3.5 w-3.5 text-rose" aria-hidden />
                  紹介のヒント
                </h2>
                <ul className="space-y-1.5 text-[11px] leading-relaxed text-muted-foreground">
                  <li>• 「徳島で本気の婚活始まった」と一言添えて</li>
                  <li>• 美容師さんは常連客に・友人は同世代へ</li>
                  <li>• 男性なら経済的な余裕がある方・女性なら永年無料を伝える</li>
                  <li>• 12タイプ恋愛診断（無料）から始めてもらうと敷居が低い</li>
                </ul>
              </section>

              {/* 関連リンク */}
              <section className="mt-8 flex flex-col gap-2">
                <Link href="/legal/photo-consent" className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-muted/30">
                  <div className="flex items-baseline gap-2">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                    <span className="text-[12px]">業務委託契約書を読む</span>
                  </div>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" aria-hidden />
                </Link>
                <Link href="/photo-booking" className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-muted/30">
                  <div className="flex items-baseline gap-2">
                    <Gift className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                    <span className="text-[12px]">加盟美容店を見る</span>
                  </div>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" aria-hidden />
                </Link>
                <Link href="/legal" className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-muted/30">
                  <div className="flex items-baseline gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                    <span className="text-[12px]">税務上の取扱いについて</span>
                  </div>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" aria-hidden />
                </Link>
              </section>
            </>
          )}
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function KpiBox({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={cn('rounded-2xl border p-3 text-center', highlight ? 'border-rose bg-rose-50' : 'border-border bg-card')}>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className={cn('mt-1 font-mont text-lg font-semibold', highlight && 'text-rose')}>{value}</p>
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit' });
}
