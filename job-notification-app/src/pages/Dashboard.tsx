import React from 'react';
import { Card } from '../components';

export const Dashboard: React.FC = () => {
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
    marginBottom: 'var(--space-24)',
  };

  const emptyStateStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-64) var(--space-40)',
    textAlign: 'center',
  };

  const emptyTextStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-secondary)',
    lineHeight: 'var(--line-height-body)',
    maxWidth: '400px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headlineStyle}>Dashboard</h1>
      <Card>
        <div style={emptyStateStyle}>
          <p style={emptyTextStyle}>
            No jobs yet. In the next step, you will load a realistic dataset.
          </p>
        </div>
      </Card>
    </div>
  );
};
