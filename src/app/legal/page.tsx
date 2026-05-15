import Link from 'next/link';
import { Building2, Shield, Lock, FileCheck, Mail, Phone, AlertCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Badge } from '@/components/ui/badge';
import { KOIFES_LEGAL_INFO } from '@/lib/demo';

export default function LegalPage() {
  const i = KOIFES_LEGAL_INFO;

  return (
    <>
      <Header showLogout />
      <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-xl px-6 py-10">
          <header className="flex flex-col gap-4">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Legal & Compliance
            </span>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight">
              運営の法的情報・認証
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              恋フェスは法令を遵守し、安心してご利用いただけるサービスを目指しています。
            </p>
          </header>

          {/* インターネット異性紹介事業届出 */}
          <section className="mt-10 rounded-2xl border-2 border-info bg-info-50 p-6">
            <div className="flex items-baseline gap-2 text-info">
              <FileCheck className="h-4 w-4" strokeWidth={1.8} aria-hidden />
              <p className="text-xs font-medium">インターネット異性紹介事業 届出済</p>
            </div>
            <p className="mt-3 font-mont text-base font-medium tracking-tight">
              {i.internetDatingRegistrationNumber}
            </p>
            <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
              「インターネット異性紹介事業を利用して児童を誘引する行為の規制等に関する法律」に基づき、徳島県公安委員会に届出しています（届出日：{i.registrationDate}）。<br />
              本サービスは20歳以上限定で、年齢確認・本人確認を必須としています。
            </p>
          </section>

          {/* 認証一覧 */}
          <section className="mt-8">
            <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              Certifications
            </h2>
            <ul className="flex flex-col gap-3">
              <CertCard
                Icon={Shield}
                title="プライバシーマーク"
                value={i.privacyMarkNumber}
                description="JIS Q 15001 に準拠した個人情報保護マネジメントシステム。会員様の個人情報・プロフィール・通知表データ・決済情報を厳格に保護します。"
              />
              <CertCard
                Icon={Lock}
                title="ISMS（情報セキュリティ）認証"
                value={i.ismsCertNumber}
                description="ISO/IEC 27001:2022 国際規格に基づくマネジメントシステム。アプリ・データベース・通信を24時間監視。"
              />
            </ul>
          </section>

          {/* 運営会社 */}
          <section className="mt-8">
            <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              Operator
            </h2>
            <dl className="overflow-hidden rounded-2xl border border-border bg-card divide-y divide-border">
              <Row Icon={Building2} label="会社名" value={i.companyName} />
              <Row label="代表者" value={i.ceo} />
              <Row label="所在地" value={i.address} />
            </dl>
          </section>

          {/* 通報・違反対応 */}
          <section className="mt-8 rounded-2xl border border-border bg-muted/30 p-6">
            <div className="flex items-baseline gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} aria-hidden />
              <h2 className="text-xs font-medium">違反通報・お問い合わせ</h2>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              既婚者の利用・なりすまし・営業勧誘などの違反行為を確認した場合は、以下の方法でご連絡ください。24〜72時間以内に運営が確認します。
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {i.reportingMethods.map((m, idx) => {
                const Icon = idx === 1 ? Mail : idx === 2 ? Phone : AlertCircle;
                return (
                  <li key={m} className="flex items-center gap-3 text-xs">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                    <span>{m}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* 関連リンク */}
          <section className="mt-8">
            <h2 className="mb-4 text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
              Related
            </h2>
            <ul className="overflow-hidden rounded-2xl border border-border bg-card divide-y divide-border">
              <LinkRow href="/verify" label="本人確認・各種認証" sub="あなたの認証ステータス" />
              <LinkRow href="/" label="利用規約" sub="サービスご利用にあたって" />
              <LinkRow href="/" label="プライバシーポリシー" sub="個人情報の取り扱い" />
              <LinkRow href="/" label="特定商取引法に基づく表記" sub="販売条件・返品" />
            </ul>
          </section>

          <p className="mt-10 text-[10px] leading-relaxed text-muted-foreground">
            ※ 本ページに記載の認証・届出はVol.5（2026年6月）開催に向けて取得・更新を進めています。<br />
            最新情報は本ページで都度更新いたします。
          </p>
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function CertCard({
  Icon,
  title,
  value,
  description,
}: {
  Icon: typeof Shield;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <li className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} aria-hidden />
        <p className="text-sm font-semibold">{title}</p>
        <Badge variant="goldSoft" className="ml-auto text-[9px]">
          {value.includes('予定') ? '取得予定' : '取得済'}
        </Badge>
      </div>
      <p className="font-mont text-xs">{value}</p>
      <p className="text-[11px] leading-relaxed text-muted-foreground">{description}</p>
    </li>
  );
}

function Row({
  Icon,
  label,
  value,
}: {
  Icon?: typeof Building2;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4 px-5 py-4">
      {Icon && <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" strokeWidth={1.6} aria-hidden />}
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="text-sm">{value}</span>
      </div>
    </div>
  );
}

function LinkRow({ href, label, sub }: { href: string; label: string; sub?: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-muted"
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{label}</span>
        {sub && <span className="text-[10px] text-muted-foreground">{sub}</span>}
      </div>
      <span className="text-muted-foreground" aria-hidden>›</span>
    </Link>
  );
}
