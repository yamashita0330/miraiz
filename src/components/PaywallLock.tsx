'use client';

import { Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

interface Props {
  title: string;
  description?: string;
  price?: number;
  priceLabel?: string;
  ctaLabel?: string;
  onUnlock?: () => void;
  href?: string;
  badge?: string;
  children: React.ReactNode;
  /** プレビューを少し長く見せるか（true=blur軽め） */
  soft?: boolean;
}

export function PaywallLock({
  title,
  description,
  price = 1980,
  priceLabel = '／回',
  ctaLabel,
  onUnlock,
  href,
  badge = 'Locked',
  children,
  soft = false,
}: Props) {
  const cta = ctaLabel ?? `¥${price.toLocaleString()} で受け取る`;

  return (
    <div className="relative isolate overflow-hidden rounded-2xl border border-border bg-card">
      {/* ぼかしたコンテンツ */}
      <div
        className={
          soft
            ? 'pointer-events-none select-none blur-[3px] opacity-90'
            : 'pointer-events-none select-none blur-md opacity-80'
        }
        aria-hidden="true"
      >
        {children}
      </div>

      {/* オーバーレイ */}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background via-background/85 to-background/0">
        <div className="flex w-full flex-col gap-4 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground bg-foreground px-3 py-1 text-[10px] font-medium tracking-wider text-background">
              <Lock className="h-3 w-3" aria-hidden />
              {badge}
            </span>
            <span className="font-mont text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              通知表購入で見られます
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold leading-snug tracking-tight">
              {title}
            </h3>
            {description && (
              <p className="text-xs leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-mont text-3xl font-medium tracking-tight">
              ¥{price.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">{priceLabel}</span>
          </div>

          {onUnlock ? (
            <Button fullWidth size="lg" onClick={onUnlock} className="gap-2">
              <Sparkles className="h-4 w-4" aria-hidden />
              {cta}
            </Button>
          ) : href ? (
            <Link href={href}>
              <Button fullWidth size="lg" className="gap-2">
                <Sparkles className="h-4 w-4" aria-hidden />
                {cta}
              </Button>
            </Link>
          ) : null}

          <p className="text-[10px] leading-relaxed text-muted-foreground">
            購入後、参加された全イベントの通知表を1回購入で閲覧できます。
          </p>
        </div>
      </div>
    </div>
  );
}
