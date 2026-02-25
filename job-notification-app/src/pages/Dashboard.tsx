import React, { useState, useMemo } from 'react';
import { jobs } from '../data/jobs';
import type { Job } from '../data/jobs';
import { JobCard, JobModal, FilterBar } from '../components';
import type { FilterState } from '../components';
import { useSavedJobs } from '../hooks/useSavedJobs';

export const Dashboard: React.FC = () => {
  const { savedJobIds, toggleSaveJob, isJobSaved } = useSavedJobs();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    location: '',
    mode: '',
    experience: '',
    source: '',
    sort: 'latest',
  });

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
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius)',
  };

  const emptyTextStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-secondary)',
    lineHeight: 'var(--line-height-body)',
  };

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let result = jobs.filter((job) => {
      // Keyword filter (title or company)
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(keyword);
        const matchesCompany = job.company.toLowerCase().includes(keyword);
        if (!matchesTitle && !matchesCompany) return false;
      }

      // Location filter
      if (filters.location && job.location !== filters.location) return false;

      // Mode filter
      if (filters.mode && job.mode !== filters.mode) return false;

      // Experience filter
      if (filters.experience && job.experience !== filters.experience) return false;

      // Source filter
      if (filters.source && job.source !== filters.source) return false;

      return true;
    });

    // Sort jobs
    switch (filters.sort) {
      case 'latest':
        result = result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        break;
      case 'oldest':
        result = result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
        break;
      case 'salary-high':
        // Simple sort by extracting first number from salary range
        result = result.sort((a, b) => {
          const getMinSalary = (salary: string) => {
            const match = salary.match(/(\d+)/);
            return match ? parseInt(match[1]) : 0;
          };
          return getMinSalary(b.salaryRange) - getMinSalary(a.salaryRange);
        });
        break;
      case 'salary-low':
        result = result.sort((a, b) => {
          const getMinSalary = (salary: string) => {
            const match = salary.match(/(\d+)/);
            return match ? parseInt(match[1]) : 0;
          };
          return getMinSalary(a.salaryRange) - getMinSalary(b.salaryRange);
        });
        break;
    }

    return result;
  }, [filters]);

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
      <h1 style={headlineStyle}>Dashboard</h1>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      <p style={resultsCountStyle}>
        {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
      </p>

      {filteredJobs.length === 0 ? (
        <div style={emptyStateStyle}>
          <p style={emptyTextStyle}>No jobs match your search.</p>
        </div>
      ) : (
        <div style={gridStyle}>
          {filteredJobs.map((job) => (
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
