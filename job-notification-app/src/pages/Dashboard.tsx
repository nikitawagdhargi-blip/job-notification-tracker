import React, { useState, useMemo } from 'react';
import { jobs } from '../data/jobs';
import type { Job } from '../data/jobs';
import { JobCard, JobModal, FilterBar, Button, Card } from '../components';
import type { FilterState } from '../components';
import { useSavedJobs } from '../hooks/useSavedJobs';
import { usePreferences } from '../hooks/usePreferences';
import { calculateMatchScore } from '../utils/matchScore';

export const Dashboard: React.FC = () => {
  const { savedJobIds, toggleSaveJob, isJobSaved } = useSavedJobs();
  const { preferences, hasPreferences, isLoaded: preferencesLoaded } = usePreferences();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);
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

  const bannerStyle: React.CSSProperties = {
    backgroundColor: 'rgba(139, 0, 0, 0.05)',
    border: '1px solid var(--color-accent)',
    borderRadius: 'var(--border-radius)',
    padding: 'var(--space-16) var(--space-24)',
    marginBottom: 'var(--space-24)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap' as const,
    gap: 'var(--space-16)',
  };

  const bannerTextStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-primary)',
  };

  const toggleContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-16)',
    flexWrap: 'wrap' as const,
  };

  const toggleLabelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-primary)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-8)',
    cursor: 'pointer',
  };

  const checkboxStyle: React.CSSProperties = {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: 'var(--color-accent)',
  };

  // Calculate match scores for all jobs
  const jobsWithScores = useMemo(() => {
    if (!preferencesLoaded) return [];
    return jobs.map((job) => ({
      job,
      matchResult: calculateMatchScore(job, preferences),
    }));
  }, [preferences, preferencesLoaded]);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let result = jobsWithScores.filter(({ job, matchResult }) => {
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

      // Show only matches filter
      if (showOnlyMatches && matchResult.score < preferences.minMatchScore) {
        return false;
      }

      return true;
    });

    // Sort jobs
    switch (filters.sort) {
      case 'latest':
        result = result.sort((a, b) => a.job.postedDaysAgo - b.job.postedDaysAgo);
        break;
      case 'oldest':
        result = result.sort((a, b) => b.job.postedDaysAgo - a.job.postedDaysAgo);
        break;
      case 'match-score':
        result = result.sort((a, b) => b.matchResult.score - a.matchResult.score);
        break;
      case 'salary-high':
        // Simple sort by extracting first number from salary range
        result = result.sort((a, b) => {
          const getMinSalary = (salary: string) => {
            const match = salary.match(/(\d+)/);
            return match ? parseInt(match[1]) : 0;
          };
          return getMinSalary(b.job.salaryRange) - getMinSalary(a.job.salaryRange);
        });
        break;
      case 'salary-low':
        result = result.sort((a, b) => {
          const getMinSalary = (salary: string) => {
            const match = salary.match(/(\d+)/);
            return match ? parseInt(match[1]) : 0;
          };
          return getMinSalary(a.job.salaryRange) - getMinSalary(b.job.salaryRange);
        });
        break;
    }

    return result;
  }, [filters, jobsWithScores, showOnlyMatches, preferences.minMatchScore]);

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

      {!hasPreferences && preferencesLoaded && (
        <div style={bannerStyle}>
          <span style={bannerTextStyle}>
            Set your preferences to activate intelligent matching.
          </span>
          <Button variant="primary" size="sm" onClick={() => window.location.href = '/settings'}>
            Go to Settings
          </Button>
        </div>
      )}

      {hasPreferences && (
        <div style={bannerStyle}>
          <div style={toggleContainerStyle}>
            <label style={toggleLabelStyle}>
              <input
                type="checkbox"
                checked={showOnlyMatches}
                onChange={(e) => setShowOnlyMatches(e.target.checked)}
                style={checkboxStyle}
              />
              Show only jobs above my threshold ({preferences.minMatchScore}%)
            </label>
          </div>
        </div>
      )}

      <FilterBar filters={filters} onFilterChange={setFilters} />

      <p style={resultsCountStyle}>
        {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
      </p>

      {filteredJobs.length === 0 ? (
        <Card>
          <div style={emptyStateStyle}>
            <p style={emptyTextStyle}>
              {showOnlyMatches
                ? 'No roles match your criteria. Adjust filters or lower threshold.'
                : 'No jobs match your search.'}
            </p>
          </div>
        </Card>
      ) : (
        <div style={gridStyle}>
          {filteredJobs.map(({ job, matchResult }) => (
            <JobCard
              key={job.id}
              job={job}
              matchScore={matchResult.score}
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
