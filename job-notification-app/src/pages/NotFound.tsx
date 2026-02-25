import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components';

export const NotFound: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
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
      <h1 style={headlineStyle}>Page Not Found</h1>
      <p style={subtextStyle}>The page you are looking for does not exist.</p>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="primary">Go to Dashboard</Button>
      </Link>
    </div>
  );
};
