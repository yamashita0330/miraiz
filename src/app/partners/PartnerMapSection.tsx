'use client';

import dynamic from 'next/dynamic';
import { MapPin, ExternalLink } from 'lucide-react';
import { DEMO_PARTNERS, PARTNER_COORDS, PARTNER_CATEGORY_LABEL } from '@/lib/demo';

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

const MAPPED_PARTNERS = DEMO_PARTNERS
  .map((p) => ({ partner: p, coord: PARTNER_COORDS[p.id] }))
  .filter((x): x is { partner: typeof x.partner; coord: { lat: number; lng: number } } => x.coord != null);

export function PartnerMapSection() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
          Salon Map
        </h2>
        <span className="text-[10px] text-muted-foreground">徳島市内の加盟店</span>
      </div>

      {/* ピン付きマップ */}
      <PartnerMap />
      <p className="mt-2 text-[10px] text-muted-foreground">
        ピンをタップすると店舗の詳細が見られます
      </p>

      {/* 各店舗の位置リンク（タップでGoogleマップが開く） */}
      <ul className="mt-3 flex flex-col gap-2">
        {MAPPED_PARTNERS.map(({ partner }) => (
          <li key={partner.id}>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${partner.name} ${partner.address}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 transition-colors hover:border-foreground/30 hover:bg-muted/30"
            >
              <MapPin className="h-4 w-4 shrink-0 text-rose" strokeWidth={1.8} aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {PARTNER_CATEGORY_LABEL[partner.category]}
                </p>
                <p className="truncate text-sm font-medium">{partner.name}</p>
                <p className="truncate text-[11px] text-muted-foreground">{partner.address}</p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
