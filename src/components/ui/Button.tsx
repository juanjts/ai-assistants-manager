'use client';

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = `
    px-4
    py-2.5
    rounded-lg
    font-medium
    text-sm
    transition-all
    duration-200
    disabled:opacity-50
    disabled:cursor-not-allowed
    flex
    items-center
    justify-center
    gap-2
    cursor-pointer
    ${fullWidth ? 'w-full' : ''}
  `;

  const variants = {
    primary: 'bg-[var(--color-primary)] text-white dark:text-[var(--color-dark-deep)] hover:scale-102 active:bg-blue-800',
    secondary: 'bg-[var(--color-warning)]/80 text-white hover:scale-102 active:bg-gray-400',
    danger: 'bg-[var(--color-danger)] text-white hover:scale-102 active:bg-red-800',
    ghost: 'bg-transparent text-gray-700 dark:text-white hover:scale-102 hover:bg-[var(--color-secondary)] hover:text-white active:bg-gray-200',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}