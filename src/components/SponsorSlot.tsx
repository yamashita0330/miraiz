import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSponsorsFor, type SponsorAd, type SponsorPlacement } from '@/lib/demo';

/**
 * アプリ内 協賛・加盟店プロモ枠。
 * 恋フェスの加盟店モデルと整合する、徳島のデート・婚活関連企業の広告枠。
 */
function SponsorCard({ sponsor }: { sponsor: SponsorAd }) {
  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:bg-muted/40"
    >
      {/* アクセントバー */}
      <span
        className="absolute inset-y-0 left-0 w-1"
        style={{ backgroundColor: sponsor.accent }}
        aria-hidden
      />
      <div className="flex items-center gap-4 py-4 pl-5 pr-4">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[9px] font-semibold tracking-wider text-muted-foreground">
              PR
            </span>
            <span
              className="text-[10px] font-medium tracking-wide"
              style={{ color: sponsor.accent }}
            >
              {sponsor.category}
            </span>
          </div>
          <p className="truncate text-sm font-semibold tracking-tight">{sponsor.name}</p>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
            {sponsor.tagline}
          </p>
        </div>
        <span
          className="inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-[10px] font-semibold text-white transition-transform group-hover:scale-[1.03]"
          style={{ backgroundColor: sponsor.accent }}
        >
          {sponsor.cta}
          <ArrowUpRight className="h-3 w-3" aria-hidden />
        </span>
      </div>
    </a>
  );
}

/**
 * 指定枠の協賛広告を表示。該当広告がなければ何も描画しない。
 * @param max 表示する最大件数（デフォルト1）
 */
export function SponsorSlot({
  placement,
  max = 1,
  className,
}: {
  placement: SponsorPlacement;
  max?: number;
  className?: string;
}) {
  const sponsors = getSponsorsFor(placement).slice(0, max);
  if (sponsors.length === 0) return null;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <p className="text-[10px] tracking-wider text-muted-foreground">
        恋フェス協賛企業より
      </p>
      {sponsors.map((s) => (
        <SponsorCard key={s.id} sponsor={s} />
      ))}
    </div>
  );
}
