import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className = '', style = {} }) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius)',
    padding: 'var(--space-24)',
    transition: 'border-color var(--transition-fast)',
    ...style,
  };

  return (
    <div style={cardStyle} className={className}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, className = '' }) => {
  const headerStyle: React.CSSProperties = {
    marginBottom: 'var(--space-16)',
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: 'var(--font-size-h3)',
    fontWeight: 400,
    color: 'var(--color-text-primary)',
    marginBottom: subtitle ? 'var(--space-8)' : 0,
    lineHeight: 'var(--line-height-heading)',
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-secondary)',
    lineHeight: 'var(--line-height-body)',
  };

  return (
    <div style={headerStyle} className={className}>
      <h3 style={titleStyle}>{title}</h3>
      {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
    </div>
  );
};
