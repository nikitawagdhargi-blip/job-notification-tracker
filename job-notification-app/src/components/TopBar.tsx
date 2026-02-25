import React from 'react';
import { Badge } from './Badge';

interface TopBarProps {
  appName?: string;
  currentStep?: number;
  totalSteps?: number;
  status?: 'not-started' | 'in-progress' | 'shipped';
}

export const TopBar: React.FC<TopBarProps> = ({
  appName = 'Job Notification App',
  currentStep = 1,
  totalSteps = 5,
  status = 'in-progress',
}) => {
  const barStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--space-16) var(--space-40)',
    backgroundColor: 'var(--color-white)',
    borderBottom: '1px solid var(--color-border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  };

  const leftSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const appNameStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    letterSpacing: '-0.01em',
  };

  const centerSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-8)',
  };

  const progressTextStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-small)',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
  };

  const rightSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'not-started':
        return <Badge variant="default">Not Started</Badge>;
      case 'in-progress':
        return <Badge variant="warning">In Progress</Badge>;
      case 'shipped':
        return <Badge variant="success">Shipped</Badge>;
      default:
        return <Badge variant="default">Not Started</Badge>;
    }
  };

  return (
    <header style={barStyle}>
      <div style={leftSectionStyle}>
        <span style={appNameStyle}>{appName}</span>
      </div>
      <div style={centerSectionStyle}>
        <span style={progressTextStyle}>
          Step {currentStep} / {totalSteps}
        </span>
      </div>
      <div style={rightSectionStyle}>
        {getStatusBadge()}
      </div>
    </header>
  );
};
