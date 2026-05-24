import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600',
        className
      )}
      {...props}
    />
  );
}
