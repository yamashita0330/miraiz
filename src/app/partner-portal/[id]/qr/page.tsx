'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  findDemoPartner,
  partnerQrToken,
  partnerVisitsSummary,
} from '@/lib/demo';
import { notFound } from 'next/navigation';

export default function PartnerQRPage({ params }: { params: { id: string } }) {
  const partner = findDemoPartner(params.id);
  if (!partner) notFound();

  const token = partnerQrToken(partner.id);
  const summary = partnerVisitsSummary(partner.id);
  const qrRef = useRef<SVGSVGElement>(null);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const scanUrl = origin ? `${origin}/scan?t=${encodeURIComponent(token)}` : '';

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const svg = qrRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `koifes-qr-${partner.id}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pb-12 print:bg-white">
        <div className="mx-auto max-w-xl px-6 py-10">
          <div className="print:hidden">
            <Link
              href={`/partner-portal/${partner.id}`}
              className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              ダッシュボード
            </Link>
          </div>

          <header className="mt-8 flex flex-col gap-2">
            <span className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Visit QR Code
            </span>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight">
              来店QRコード
            </h1>
            <p className="text-xs leading-relaxed text-muted-foreground">
              店舗のレジ・受付に印刷して掲示してください。
              恋フェス会員様が来店時にスキャンすると、自動で会員価格＋通知表スコアアップが反映されます。
            </p>
          </header>

          {/* 印刷推奨ポスター */}
          <section className="mt-10 rounded-3xl border-2 border-foreground bg-card p-8 print:border-0 print:p-2">
            <div className="text-center">
              <p className="font-mont text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                MIRAIZ Member
              </p>
              <p className="mt-2 text-2xl font-semibold leading-tight tracking-tight">
                会員様限定特典
              </p>
              <p className="mt-1 text-sm text-foreground">{partner.name}</p>
            </div>

            <div className="my-8 flex justify-center">
              <div className="rounded-2xl border border-border bg-white p-6">
                <QRCodeSVG
                  ref={qrRef}
                  value={scanUrl || token}
                  size={240}
                  level="M"
                  includeMargin={false}
                />
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm font-semibold leading-relaxed">
                {partner.member_offer}
              </p>
              <p className="mt-3 text-[11px] text-muted-foreground">
                来店時に会員専用アプリでこのQRを読み取り
              </p>
              <p className="font-mont text-[10px] tracking-widest text-muted-foreground">
                {token}
              </p>
            </div>
          </section>

          {/* 印刷・ダウンロード */}
          <div className="mt-6 flex gap-3 print:hidden">
            <Button fullWidth size="lg" onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" aria-hidden />
              印刷する
            </Button>
            <Button fullWidth size="lg" variant="outline" onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" aria-hidden />
              SVGダウンロード
            </Button>
          </div>

          {/* 今月の集客実績 */}
          <section className="mt-12 print:hidden">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
                This Month
              </h2>
              <Badge variant="outline" className="text-[9px]">
                {new Date().toISOString().slice(0, 7)}
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card p-6">
              <Stat label="来店数" value={summary.visitCount} unit="件" />
              <Stat label="売上" value={summary.grossRevenue.toLocaleString()} unit="円" />
              <Stat
                label="送客手数料"
                value={summary.commissionTotal.toLocaleString()}
                unit="円"
                negative
              />
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
              ※ 4ヶ月目以降の手数料です。最初の3ヶ月は無料。<br />
              ※ 月末締め・翌月15日に売上から自動相殺で精算されます。
            </p>
          </section>

          <section className="mt-10 rounded-2xl border border-border bg-muted/30 p-6 print:hidden">
            <p className="text-xs font-medium">運用方法</p>
            <ol className="mt-3 flex flex-col gap-3 text-[11px] leading-relaxed text-muted-foreground">
              <li>1. このページを印刷してレジ横に掲示</li>
              <li>2. 来店時のお会計直前に「QRをかざしますか？」と一言</li>
              <li>3. 顧客がアプリでスキャン → 会員価格自動適用</li>
              <li>4. 月末締め・翌月15日に手数料が売上から相殺で精算</li>
            </ol>
          </section>
        </div>
      </main>
    </>
  );
}

function Stat({
  label,
  value,
  unit,
  negative = false,
}: {
  label: string;
  value: string | number;
  unit: string;
  negative?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span className={`font-mont text-2xl font-medium tracking-tight ${negative ? 'text-foreground' : ''}`}>
          {negative ? '-' : ''}{value}
        </span>
        <span className="text-[10px] text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}
