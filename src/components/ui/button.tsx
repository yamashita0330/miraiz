import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-border bg-background hover:bg-muted',
        ghost: 'hover:bg-muted',
        accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
        rose: 'bg-rose text-rose-foreground hover:bg-rose/90',
        gold: 'bg-brandGold text-brandGold-foreground hover:bg-brandGold/90',
        info: 'bg-info text-info-foreground hover:bg-info/90',
        success: 'bg-success text-success-foreground hover:bg-success/90',
        soft: 'bg-muted text-foreground hover:bg-muted/70',
        link: 'text-foreground underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-6 py-3 text-sm',
        sm: 'h-10 px-4 py-2 text-sm',
        lg: 'h-14 px-8 py-4 text-base',
        icon: 'h-11 w-11',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, loading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  )
);
Button.displayName = 'Button';

export { buttonVariants };
