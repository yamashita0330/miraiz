import { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide',
  {
    variants: {
      variant: {
        default: 'border border-border bg-muted text-foreground',
        outline: 'border border-border text-foreground',
        accent: 'bg-foreground text-background',
        soft: 'bg-muted text-muted-foreground',
        rose: 'bg-rose text-rose-foreground',
        roseSoft: 'bg-rose-50 text-rose border border-rose-100',
        gold: 'bg-brandGold text-brandGold-foreground',
        goldSoft: 'bg-brandGold-50 text-brandGold border border-brandGold-100',
        info: 'bg-info text-info-foreground',
        infoSoft: 'bg-info-50 text-info border border-info-100',
        success: 'bg-success text-success-foreground',
        successSoft: 'bg-success-50 text-success border border-success-100',
        warn: 'bg-warn text-warn-foreground',
        warnSoft: 'bg-warn-50 text-warn border border-warn-100',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
