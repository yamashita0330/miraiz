import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Button as UIButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  loading?: boolean;
}

const VARIANT_MAP = {
  primary: 'default',
  secondary: 'outline',
  ghost: 'ghost',
  gold: 'accent',
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', fullWidth, loading, className, children, ...props }, ref) => (
    <UIButton
      ref={ref}
      variant={VARIANT_MAP[variant]}
      fullWidth={fullWidth ?? false}
      loading={loading}
      className={cn(className)}
      {...props}
    >
      {children}
    </UIButton>
  )
);
Button.displayName = 'Button';
