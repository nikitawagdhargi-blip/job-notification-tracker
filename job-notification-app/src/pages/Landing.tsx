import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 73px)', // Subtract nav height
    padding: 'var(--space-40)',
    maxWidth: 'var(--max-text-width)',
    margin: '0 auto',
    width: '100%',
  };

  const headlineStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: '56px',
    fontWeight: 400,
    color: 'var(--color-text-primary)',
    lineHeight: '1.15',
    letterSpacing: '-0.02em',
    marginBottom: 'var(--space-24)',
  };

  const subtextStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: '20px',
    color: 'var(--color-text-secondary)',
    lineHeight: 'var(--line-height-body)',
    marginBottom: 'var(--space-40)',
    maxWidth: '480px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headlineStyle}>Stop Missing The Right Jobs.</h1>
      <p style={subtextStyle}>
        Precision-matched job discovery delivered daily at 9AM.
      </p>
      <Button variant="primary" size="lg" onClick={() => navigate('/settings')}>
        Start Tracking
      </Button>
    </div>
  );
};
