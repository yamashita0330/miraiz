import { MapPin, ExternalLink } from 'lucide-react';
import { DEMO_PARTNERS, PARTNER_COORDS, PARTNER_CATEGORY_LABEL } from '@/lib/demo';

// 座標を持つ加盟店のみ（オンライン店舗を除く）
const MAPPED_PARTNERS = DEMO_PARTNERS
  .map((p) => ({ partner: p, coord: PARTNER_COORDS[p.id] }))
  .filter((x): x is { partner: typeof x.partner; coord: { lat: number; lng: number } } => x.coord != null);

// 徳島市中心
const MAP_CENTER = '34.0715,134.5510';

export function PartnerMapSection() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xs font-mont uppercase tracking-[0.3em] text-muted-foreground">
          Salon Map
        </h2>
        <span className="text-[10px] text-muted-foreground">徳島市内の加盟店</span>
      </div>

      {/* Google マップ（徳島市中心・APIキー不要のembed） */}
      <div className="overflow-hidden rounded-2xl border border-border">
        <iframe
          title="加盟店マップ"
          src={`https://maps.google.com/maps?q=${MAP_CENTER}&z=14&output=embed`}
          width="100%"
          height="260"
          style={{ border: 0, display: 'block' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

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
      <p className="mt-2 text-[10px] text-muted-foreground">
        店舗をタップするとGoogleマップで位置が開きます
      </p>
    </section>
  );
}
