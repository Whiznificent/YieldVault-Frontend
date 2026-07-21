/**
 * Reusable button with primary/secondary/ghost variants.
 */

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, variant = 'primary', disabled = false, loading = false, onClick, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`btn btn-${variant}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? 'Processing…' : children}
    </button>
  );
});

export default Button;
