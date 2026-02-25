import React from 'react';
import type { Job } from '../data/jobs';
import { Button, Badge } from './index';

interface JobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (jobId: string) => void;
  onApply: (url: string) => void;
  isSaved: boolean;
}

export const JobModal: React.FC<JobModalProps> = ({
  job,
  isOpen,
  onClose,
  onSave,
  onApply,
  isSaved,
}) => {
  if (!isOpen || !job) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 'var(--space-24)',
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-white)',
    borderRadius: 'var(--border-radius)',
    maxWidth: '640px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
  };

  const headerStyle: React.CSSProperties = {
    padding: 'var(--space-24)',
    borderBottom: '1px solid var(--color-border)',
  };

  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'var(--space-16)',
    right: 'var(--space-16)',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: 'var(--color-text-secondary)',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--border-radius)',
    transition: 'background-color var(--transition-fast)',
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: '28px',
    fontWeight: 400,
    color: 'var(--color-text-primary)',
    marginBottom: 'var(--space-8)',
    lineHeight: '1.3',
    paddingRight: 'var(--space-40)',
  };

  const companyStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-secondary)',
  };

  const contentStyle: React.CSSProperties = {
    padding: 'var(--space-24)',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: 'var(--space-24)',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-small)',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: 'var(--space-8)',
  };

  const metaGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 'var(--space-16)',
  };

  const metaItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  };

  const metaLabelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-small)',
    color: 'var(--color-text-muted)',
  };

  const metaValueStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-primary)',
  };

  const descriptionStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-secondary)',
    lineHeight: 'var(--line-height-body)',
  };

  const skillsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 'var(--space-8)',
  };

  const skillBadgeStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-small)',
    color: 'var(--color-text-secondary)',
    backgroundColor: 'var(--color-border-subtle)',
    padding: '6px 12px',
    borderRadius: 'var(--border-radius)',
  };

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--space-16)',
    padding: 'var(--space-24)',
    borderTop: '1px solid var(--color-border)',
    justifyContent: 'flex-end',
  };

  const getSourceVariant = (source: string): 'default' | 'success' | 'warning' | 'accent' => {
    switch (source) {
      case 'LinkedIn':
        return 'accent';
      case 'Naukri':
        return 'warning';
      case 'Indeed':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button
          style={closeButtonStyle}
          onClick={onClose}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = 'var(--color-border-subtle)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
        >
          ×
        </button>

        <div style={headerStyle}>
          <h2 style={titleStyle}>{job.title}</h2>
          <p style={companyStyle}>
            {job.company} <Badge variant={getSourceVariant(job.source)}>{job.source}</Badge>
          </p>
        </div>

        <div style={contentStyle}>
          <div style={sectionStyle}>
            <p style={sectionTitleStyle}>Details</p>
            <div style={metaGridStyle}>
              <div style={metaItemStyle}>
                <span style={metaLabelStyle}>Location</span>
                <span style={metaValueStyle}>{job.location}</span>
              </div>
              <div style={metaItemStyle}>
                <span style={metaLabelStyle}>Mode</span>
                <span style={metaValueStyle}>{job.mode}</span>
              </div>
              <div style={metaItemStyle}>
                <span style={metaLabelStyle}>Experience</span>
                <span style={metaValueStyle}>{job.experience} Years</span>
              </div>
              <div style={metaItemStyle}>
                <span style={metaLabelStyle}>Salary</span>
                <span style={metaValueStyle}>{job.salaryRange}</span>
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <p style={sectionTitleStyle}>Description</p>
            <p style={descriptionStyle}>{job.description}</p>
          </div>

          <div style={sectionStyle}>
            <p style={sectionTitleStyle}>Required Skills</p>
            <div style={skillsContainerStyle}>
              {job.skills.map((skill, index) => (
                <span key={index} style={skillBadgeStyle}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={footerStyle}>
          <Button variant={isSaved ? 'primary' : 'secondary'} onClick={() => onSave(job.id)}>
            {isSaved ? 'Saved' : 'Save Job'}
          </Button>
          <Button variant="primary" onClick={() => onApply(job.applyUrl)}>
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};
