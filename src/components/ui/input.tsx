import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-12 w-full rounded-lg border border-input bg-background px-4 py-3 text-base transition-colors',
        'placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[120px] w-full rounded-lg border border-input bg-background px-4 py-3 text-base leading-relaxed transition-colors',
        'placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';
