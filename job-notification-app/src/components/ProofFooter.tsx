import React from 'react';

interface ChecklistItem {
  label: string;
  checked: boolean;
}

interface ProofFooterProps {
  items?: ChecklistItem[];
}

const defaultItems: ChecklistItem[] = [
  { label: 'UI Built', checked: false },
  { label: 'Logic Working', checked: false },
  { label: 'Test Passed', checked: false },
  { label: 'Deployed', checked: false },
];

export const ProofFooter: React.FC<ProofFooterProps> = ({
  items = defaultItems,
}) => {
  const footerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-40)',
    padding: 'var(--space-24) var(--space-40)',
    backgroundColor: 'var(--color-white)',
    borderTop: '1px solid var(--color-border)',
    marginTop: 'auto',
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-8)',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-small)',
    color: 'var(--color-text-secondary)',
  };

  const checkboxStyle = (checked: boolean): React.CSSProperties => ({
    width: '16px',
    height: '16px',
    border: `1.5px solid ${checked ? 'var(--color-success)' : 'var(--color-border)'}`,
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: checked ? 'var(--color-success)' : 'transparent',
    transition: 'all var(--transition-fast)',
  });

  const checkmarkStyle: React.CSSProperties = {
    color: 'var(--color-white)',
    fontSize: '11px',
    fontWeight: 700,
  };

  return (
    <footer style={footerStyle}>
      {items.map((item, index) => (
        <div key={index} style={itemStyle}>
          <span style={checkboxStyle(item.checked)}>
            {item.checked && <span style={checkmarkStyle}>✓</span>}
          </span>
          <span style={{ 
            color: item.checked ? 'var(--color-success)' : 'var(--color-text-secondary)',
            textDecoration: item.checked ? 'line-through' : 'none',
            transition: 'all var(--transition-fast)',
          }}>
            {item.label}
          </span>
        </div>
      ))}
    </footer>
  );
};
