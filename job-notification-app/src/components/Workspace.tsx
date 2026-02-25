import React from 'react';

interface WorkspaceProps {
  primaryContent: React.ReactNode;
  secondaryContent: React.ReactNode;
}

export const Workspace: React.FC<WorkspaceProps> = ({
  primaryContent,
  secondaryContent,
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flex: 1,
    minHeight: 0,
    padding: '0 var(--space-40) var(--space-40)',
    gap: 'var(--space-40)',
  };

  const primaryStyle: React.CSSProperties = {
    flex: '0 0 70%',
    minWidth: 0,
  };

  const secondaryStyle: React.CSSProperties = {
    flex: '0 0 30%',
    minWidth: 0,
  };

  return (
    <div style={containerStyle}>
      <main style={primaryStyle}>{primaryContent}</main>
      <aside style={secondaryStyle}>{secondaryContent}</aside>
    </div>
  );
};
