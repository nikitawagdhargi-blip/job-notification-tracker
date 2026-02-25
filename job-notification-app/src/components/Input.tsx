import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-8)',
    width: '100%',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-small)',
    fontWeight: 500,
    color: 'var(--color-text-primary)',
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    lineHeight: 'var(--line-height-body)',
    color: 'var(--color-text-primary)',
    backgroundColor: 'var(--color-white)',
    border: `1px solid ${error ? 'var(--color-accent)' : 'var(--color-border)'}`,
    borderRadius: 'var(--border-radius)',
    padding: 'var(--space-8) var(--space-16)',
    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
    width: '100%',
  };

  const helperStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-small)',
    color: error ? 'var(--color-accent)' : 'var(--color-text-muted)',
    marginTop: '4px',
  };

  return (
    <div style={containerStyle} className={className}>
      {label && <label style={labelStyle}>{label}</label>}
      <input style={inputStyle} {...props} />
      {(error || helperText) && (
        <span style={helperStyle}>{error || helperText}</span>
      )}
    </div>
  );
};
