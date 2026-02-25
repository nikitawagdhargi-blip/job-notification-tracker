import React from 'react';
import { Card } from '../components';

export const Proof: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    padding: 'var(--space-40)',
    maxWidth: 'var(--max-text-width)',
  };

  const headlineStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: 'var(--font-size-h1)',
    fontWeight: 400,
    color: 'var(--color-text-primary)',
    lineHeight: 'var(--line-height-heading)',
    letterSpacing: '-0.02em',
    marginBottom: 'var(--space-16)',
  };

  const subtextStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-secondary)',
    lineHeight: 'var(--line-height-body)',
    marginBottom: 'var(--space-24)',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headlineStyle}>Proof</h1>
      <p style={subtextStyle}>
        Artifact collection and verification workspace.
      </p>
      <Card>
        <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
          This area will contain proof of work artifacts and documentation.
        </p>
      </Card>
    </div>
  );
};
