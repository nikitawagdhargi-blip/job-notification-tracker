import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    fontWeight: 500,
    borderRadius: 'var(--border-radius)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-8)',
    border: '1px solid transparent',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 12px', fontSize: 'var(--font-size-small)' },
    md: { padding: '10px 20px', fontSize: 'var(--font-size-body)' },
    lg: { padding: '14px 28px', fontSize: '18px' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--color-accent)',
      color: 'var(--color-white)',
      borderColor: 'var(--color-accent)',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-primary)',
      borderColor: 'var(--color-border)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-secondary)',
      borderColor: 'transparent',
    },
  };

  const hoverStyles: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: 'var(--color-accent-hover)', borderColor: 'var(--color-accent-hover)' },
    secondary: { backgroundColor: 'var(--color-border-subtle)', borderColor: 'var(--color-border)' },
    ghost: { backgroundColor: 'var(--color-border-subtle)' },
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...(isHovered ? hoverStyles[variant] : {}),
  };

  return (
    <button
      className={className}
      style={combinedStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};
