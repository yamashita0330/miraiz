'use client';

import dynamic from 'next/dynamic';

// react-leaflet は window 依存のため SSR 無効で読み込む
const PartnerMap = dynamic(
  () => import('./PartnerMap').then((m) => m.PartnerMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[280px] items-center justify-center rounded-2xl border border-border bg-muted/30 text-xs text-muted-foreground">
        マップを読み込み中…
      </div>
    ),
  }
);

export function PartnerMapSection() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
          Salon Map
        </h2>
        <span className="text-[10px] text-muted-foreground">徳島市内の加盟店</span>
      </div>
      <PartnerMap />
      <p className="mt-2 text-[10px] text-muted-foreground">
        ピンをタップすると店舗の詳細が見られます
      </p>
    </section>
  );
}
