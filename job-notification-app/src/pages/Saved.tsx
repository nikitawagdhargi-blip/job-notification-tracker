import React, { useState, useMemo } from 'react';
import { jobs } from '../data/jobs';
import type { Job } from '../data/jobs';
import { JobCard, JobModal } from '../components';
import { useSavedJobs } from '../hooks/useSavedJobs';
import { Card } from '../components';

export const Saved: React.FC = () => {
  const { savedJobIds, toggleSaveJob, isJobSaved } = useSavedJobs();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerStyle: React.CSSProperties = {
    padding: 'var(--space-40)',
    maxWidth: '1200px',
    margin: '0 auto',
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

  const resultsCountStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-small)',
    color: 'var(--color-text-muted)',
    marginBottom: 'var(--space-16)',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    gap: 'var(--space-24)',
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

  // Get saved jobs from the jobs dataset
  const savedJobs = useMemo(() => {
    return jobs.filter((job) => savedJobIds.includes(job.id));
  }, [savedJobIds]);

  const handleView = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleSave = (jobId: string) => {
    toggleSaveJob(jobId);
  };

  const handleApply = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div style={containerStyle}>
      <h1 style={headlineStyle}>Saved</h1>

      {savedJobs.length === 0 ? (
        <Card>
          <div style={emptyStateStyle}>
            <h3 style={emptyTitleStyle}>No saved jobs yet</h3>
            <p style={emptyTextStyle}>
              Jobs you save will appear here. Browse the dashboard and save opportunities that match your criteria.
            </p>
          </div>
        </Card>
      ) : (
        <>
          <p style={resultsCountStyle}>
            {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
          </p>
          <div style={gridStyle}>
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={isJobSaved(job.id)}
                onView={handleView}
                onSave={handleSave}
                onApply={handleApply}
              />
            ))}
          </div>
        </>
      )}

      <JobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        onApply={handleApply}
        isSaved={selectedJob ? isJobSaved(selectedJob.id) : false}
      />
    </div>
  );
};
