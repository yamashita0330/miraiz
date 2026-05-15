import Link from 'next/link';
import { ArrowLeft, ShieldCheck, FileText, Lock, Trash2, EyeOff, AlertTriangle, Calendar } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { PHOTO_CONSENT_ITEMS, PHOTO_CONSENT_VERSION } from '@/lib/demo';

const ICONS = [FileText, ShieldCheck, Lock, Trash2, EyeOff, AlertTriangle, Calendar, ShieldCheck];

export default function PhotoConsentPage() {
  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <Link href="/photo-booking" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" aria-hidden />撮影予約に戻る
          </Link>

          <header className="flex flex-col gap-4">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Photo Consent Form · {PHOTO_CONSENT_VERSION}
            </span>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight">
              プロフィール写真<br />撮影同意書
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              本同意書は、MIRAIZ加盟スタジオでのプロカメラマンによる撮影サービスをご利用いただく際の取扱いを定めるものです。<br />
              撮影サービスお申込時に8項目すべてへ同意（電子チェック＋電子署名）が必要です。
            </p>
          </header>

          <section className="mt-10 flex flex-col gap-3">
            {PHOTO_CONSENT_ITEMS.map((item, i) => {
              const Icon = ICONS[i] ?? FileText;
              return (
                <article key={i} className="rounded-2xl border border-border bg-card p-5">
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="font-mont text-[10px] text-muted-foreground">
                      第{String(i + 1).padStart(2, '0')}条
                    </span>
                    <Icon className="h-3.5 w-3.5 text-foreground" strokeWidth={1.6} aria-hidden />
                    <h2 className="text-base font-semibold">{item.title}</h2>
                  </div>
                  <p className="text-[12px] leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </section>

          {/* 補足情報 */}
          <section className="mt-10 rounded-2xl border-2 border-foreground bg-foreground p-6 text-background">
            <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] opacity-70">
              データ取扱責任
            </h2>
            <dl className="space-y-3 text-[12px]">
              <div>
                <dt className="opacity-70 mb-0.5">事業者</dt>
                <dd>株式会社FUSHIME（徳島県徳島市）</dd>
              </div>
              <div>
                <dt className="opacity-70 mb-0.5">個人情報取扱責任者</dt>
                <dd>代表取締役 山下 純也</dd>
              </div>
              <div>
                <dt className="opacity-70 mb-0.5">画像データ保管場所</dt>
                <dd>暗号化されたクラウドストレージ（AES-256）</dd>
              </div>
              <div>
                <dt className="opacity-70 mb-0.5">保管期間</dt>
                <dd>本人確認書類と同等の取扱い・5年間</dd>
              </div>
              <div>
                <dt className="opacity-70 mb-0.5">退会時の削除</dt>
                <dd>退会日から30日以内に運営側で完全削除（バックアップを含む）</dd>
              </div>
            </dl>
          </section>

          {/* 関連リンク */}
          <section className="mt-8 rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-3 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              関連書類
            </h2>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/legal/privacy" className="flex items-baseline justify-between text-[12px] hover:underline">
                  <span>プライバシーポリシー</span>
                  <span className="text-muted-foreground">→</span>
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="flex items-baseline justify-between text-[12px] hover:underline">
                  <span>利用規約</span>
                  <span className="text-muted-foreground">→</span>
                </Link>
              </li>
              <li>
                <Link href="/legal/tokutei" className="flex items-baseline justify-between text-[12px] hover:underline">
                  <span>特定商取引法に基づく表示</span>
                  <span className="text-muted-foreground">→</span>
                </Link>
              </li>
            </ul>
          </section>

          <p className="mt-8 text-[10px] text-center text-muted-foreground">
            最終更新：2026年5月12日 · 本書 v{PHOTO_CONSENT_VERSION}
          </p>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
