import React from 'react';
import { Card } from '../components';

export const Saved: React.FC = () => {
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

  const emptyTitleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: 'var(--font-size-h3)',
    fontWeight: 400,
    color: 'var(--color-text-primary)',
    marginBottom: 'var(--space-16)',
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
      <h1 style={headlineStyle}>Saved</h1>
      <Card>
        <div style={emptyStateStyle}>
          <h3 style={emptyTitleStyle}>No saved jobs yet</h3>
          <p style={emptyTextStyle}>
            Jobs you save will appear here. Browse the dashboard and save opportunities that match your criteria.
          </p>
        </div>
      </Card>
    </div>
  );
};
