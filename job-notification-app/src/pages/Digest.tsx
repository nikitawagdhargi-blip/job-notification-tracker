import React from 'react';
import { Card, Badge } from '../components';

export const Digest: React.FC = () => {
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
    maxWidth: '420px',
    marginBottom: 'var(--space-24)',
  };

  const featureListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-16)',
    alignItems: 'center',
  };

  const featureItemStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-small)',
    color: 'var(--color-text-muted)',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headlineStyle}>Digest</h1>
      <Card>
        <div style={emptyStateStyle}>
          <h3 style={emptyTitleStyle}>Daily Summary</h3>
          <p style={emptyTextStyle}>
            Your personalized job digest will be delivered here every morning at 9AM, featuring new matches based on your preferences.
          </p>
          <div style={featureListStyle}>
            <Badge variant="default">Coming Soon</Badge>
            <span style={featureItemStyle}>Daily at 9:00 AM</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
