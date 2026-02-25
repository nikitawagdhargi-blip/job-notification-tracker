import React from 'react';
import type { Job } from '../data/jobs';
import { Button, Badge } from './index';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onView: (job: Job) => void;
  onSave: (jobId: string) => void;
  onApply: (url: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved,
  onView,
  onSave,
  onApply,
}) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius)',
    padding: 'var(--space-24)',
    transition: 'border-color var(--transition-fast)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-16)',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 'var(--space-16)',
  };

  const titleSectionStyle: React.CSSProperties = {
    flex: 1,
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: '20px',
    fontWeight: 400,
    color: 'var(--color-text-primary)',
    marginBottom: 'var(--space-8)',
    lineHeight: '1.3',
  };

  const companyStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-secondary)',
  };

  const metaRowStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 'var(--space-16)',
    alignItems: 'center',
  };

  const metaItemStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-small)',
    color: 'var(--color-text-secondary)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const skillsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 'var(--space-8)',
  };

  const skillBadgeStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
    backgroundColor: 'var(--color-border-subtle)',
    padding: '4px 10px',
    borderRadius: 'var(--border-radius)',
  };

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 'var(--space-16)',
    borderTop: '1px solid var(--color-border)',
    marginTop: 'auto',
  };

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--space-8)',
  };

  const postedText = job.postedDaysAgo === 0
    ? 'Today'
    : job.postedDaysAgo === 1
    ? '1 day ago'
    : `${job.postedDaysAgo} days ago`;

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
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={titleSectionStyle}>
          <h3 style={titleStyle}>{job.title}</h3>
          <p style={companyStyle}>{job.company}</p>
        </div>
        <Badge variant={getSourceVariant(job.source)}>{job.source}</Badge>
      </div>

      <div style={metaRowStyle}>
        <span style={metaItemStyle}>
          📍 {job.location} • {job.mode}
        </span>
        <span style={metaItemStyle}>
          💼 {job.experience} Yrs
        </span>
        <span style={metaItemStyle}>
          💰 {job.salaryRange}
        </span>
      </div>

      <div style={skillsContainerStyle}>
        {job.skills.slice(0, 4).map((skill, index) => (
          <span key={index} style={skillBadgeStyle}>
            {skill}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span style={skillBadgeStyle}>+{job.skills.length - 4}</span>
        )}
      </div>

      <div style={footerStyle}>
        <span style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>
          {postedText}
        </span>
        <div style={actionsStyle}>
          <Button variant="secondary" size="sm" onClick={() => onView(job)}>
            View
          </Button>
          <Button
            variant={isSaved ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onSave(job.id)}
          >
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <Button variant="primary" size="sm" onClick={() => onApply(job.applyUrl)}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};
