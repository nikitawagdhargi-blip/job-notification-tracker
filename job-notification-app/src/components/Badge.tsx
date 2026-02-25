import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'accent';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-small)',
    fontWeight: 500,
    padding: '4px 12px',
    borderRadius: 'var(--border-radius)',
    transition: 'all var(--transition-fast)',
  };

  const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
    default: {
      backgroundColor: 'var(--color-border-subtle)',
      color: 'var(--color-text-secondary)',
    },
    success: {
      backgroundColor: 'rgba(90, 125, 90, 0.1)',
      color: 'var(--color-success)',
    },
    warning: {
      backgroundColor: 'rgba(184, 134, 11, 0.1)',
      color: 'var(--color-warning)',
    },
    accent: {
      backgroundColor: 'rgba(139, 0, 0, 0.1)',
      color: 'var(--color-accent)',
    },
  };

  const combinedStyle: React.CSSProperties = {
    ...baseStyle,
    ...variantStyles[variant],
  };

  return (
    <span style={combinedStyle} className={className}>
      {children}
    </span>
  );
};
