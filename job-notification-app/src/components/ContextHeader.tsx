import React from 'react';

interface ContextHeaderProps {
  headline: string;
  subtext?: string;
}

export const ContextHeader: React.FC<ContextHeaderProps> = ({
  headline,
  subtext,
}) => {
  const containerStyle: React.CSSProperties = {
    padding: 'var(--space-40) var(--space-40) var(--space-24)',
    maxWidth: 'var(--max-text-width)',
  };

  const headlineStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: 'var(--font-size-h1)',
    fontWeight: 400,
    color: 'var(--color-text-primary)',
    lineHeight: 'var(--line-height-heading)',
    letterSpacing: '-0.02em',
    marginBottom: subtext ? 'var(--space-16)' : 0,
  };

  const subtextStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-secondary)',
    lineHeight: 'var(--line-height-body)',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headlineStyle}>{headline}</h1>
      {subtext && <p style={subtextStyle}>{subtext}</p>}
    </div>
  );
};
