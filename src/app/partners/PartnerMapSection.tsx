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
      <div className="mt-2 flex items-baseline gap-3 text-[10px] text-muted-foreground">
        <span className="inline-flex items-baseline gap-1">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: '#e11d48' }}
            aria-hidden
          />
          自社運営サロン
        </span>
        <span className="inline-flex items-baseline gap-1">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: '#0d0d0d' }}
            aria-hidden
          />
          提携加盟店
        </span>
      </div>
    </section>
  );
}
