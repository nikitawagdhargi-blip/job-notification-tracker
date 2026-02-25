import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '../components';
import { usePreferences } from '../hooks/usePreferences';
import { jobs } from '../data/jobs';
import type { DailyDigest } from '../utils/digest';
import {
  getTodayDate,
  hasDigestForDate,
  loadDigest,
  generateDigest,
  copyDigestToClipboard,
  createMailtoLink,
} from '../utils/digest';

export const Digest: React.FC = () => {
  const { preferences, hasPreferences, isLoaded } = usePreferences();
  const [digest, setDigest] = useState<DailyDigest | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const today = getTodayDate();

  // Check for existing digest on load
  useEffect(() => {
    if (isLoaded && hasPreferences) {
      const existingDigest = loadDigest(today);
      if (existingDigest) {
        setDigest(existingDigest);
      }
    }
  }, [isLoaded, hasPreferences, today]);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Small delay for UX feedback
    setTimeout(() => {
      const newDigest = generateDigest(jobs, preferences);
      setDigest(newDigest);
      setIsGenerating(false);
    }, 300);
  };

  const handleCopy = async () => {
    if (digest) {
      const success = await copyDigestToClipboard(digest);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleEmailDraft = () => {
    if (digest) {
      const mailtoLink = createMailtoLink(digest);
      window.location.href = mailtoLink;
    }
  };

  const containerStyle: React.CSSProperties = {
    padding: 'var(--space-40)',
    maxWidth: '720px',
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

  const emailContainerStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius)',
    padding: 'var(--space-40)',
    maxWidth: '720px',
    margin: '0 auto',
  };

  const emailHeaderStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: 'var(--space-40)',
    paddingBottom: 'var(--space-24)',
    borderBottom: '1px solid var(--color-border)',
  };

  const emailTitleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: '28px',
    fontWeight: 400,
    color: 'var(--color-text-primary)',
    marginBottom: 'var(--space-8)',
  };

  const emailDateStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-secondary)',
  };

  const jobItemStyle: React.CSSProperties = {
    padding: 'var(--space-24) 0',
    borderBottom: '1px solid var(--color-border-subtle)',
  };

  const jobTitleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: '20px',
    fontWeight: 400,
    color: 'var(--color-text-primary)',
    marginBottom: 'var(--space-8)',
  };

  const jobMetaStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-secondary)',
    marginBottom: 'var(--space-12)',
    lineHeight: '1.6',
  };

  const matchScoreStyle = (score: number): React.CSSProperties => ({
    display: 'inline-block',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 600,
    padding: '4px 12px',
    borderRadius: 'var(--border-radius)',
    marginBottom: 'var(--space-12)',
    backgroundColor:
      score >= 80
        ? 'rgba(90, 125, 90, 0.1)'
        : score >= 60
        ? 'rgba(184, 134, 11, 0.1)'
        : 'var(--color-border-subtle)',
    color:
      score >= 80
        ? 'var(--color-success)'
        : score >= 60
        ? 'var(--color-warning)'
        : 'var(--color-text-secondary)',
  });

  const emailFooterStyle: React.CSSProperties = {
    textAlign: 'center',
    marginTop: 'var(--space-40)',
    paddingTop: 'var(--space-24)',
    borderTop: '1px solid var(--color-border)',
  };

  const footerTextStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-small)',
    color: 'var(--color-text-muted)',
    fontStyle: 'italic',
  };

  const actionsContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--space-16)',
    marginTop: 'var(--space-24)',
    flexWrap: 'wrap' as const,
  };

  const demoNoteStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-small)',
    color: 'var(--color-text-muted)',
    textAlign: 'center',
    marginTop: 'var(--space-24)',
    fontStyle: 'italic',
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
    maxWidth: '420px',
    marginBottom: 'var(--space-24)',
  };

  const generateButtonContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 'var(--space-16)',
    marginBottom: 'var(--space-24)',
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // No preferences state
  if (!isLoaded) {
    return (
      <div style={containerStyle}>
        <h1 style={headlineStyle}>Digest</h1>
        <Card>
          <div style={emptyStateStyle}>
            <p style={emptyTextStyle}>Loading...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!hasPreferences) {
    return (
      <div style={containerStyle}>
        <h1 style={headlineStyle}>Digest</h1>
        <Card>
          <div style={emptyStateStyle}>
            <h3 style={emptyTitleStyle}>Set Preferences First</h3>
            <p style={emptyTextStyle}>
              Set preferences to generate a personalized digest.
            </p>
            <Button
              variant="primary"
              onClick={() => (window.location.href = '/settings')}
            >
              Go to Settings
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // No digest generated yet
  if (!digest) {
    return (
      <div style={containerStyle}>
        <h1 style={headlineStyle}>Digest</h1>
        <div style={generateButtonContainerStyle}>
          <Button
            variant="primary"
            size="lg"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating
              ? 'Generating...'
              : "Generate Today's 9AM Digest (Simulated)"}
          </Button>
          <p style={demoNoteStyle}>
            Demo Mode: Daily 9AM trigger simulated manually.
          </p>
        </div>
      </div>
    );
  }

  // No matches found
  if (digest.jobs.length === 0) {
    return (
      <div style={containerStyle}>
        <h1 style={headlineStyle}>Digest</h1>
        <Card>
          <div style={emptyStateStyle}>
            <h3 style={emptyTitleStyle}>No Matches Today</h3>
            <p style={emptyTextStyle}>
              No matching roles today. Check again tomorrow.
            </p>
            <Button variant="secondary" onClick={handleGenerate}>
              Regenerate Digest
            </Button>
          </div>
        </Card>
        <p style={demoNoteStyle}>
          Demo Mode: Daily 9AM trigger simulated manually.
        </p>
      </div>
    );
  }

  // Render digest
  return (
    <div style={containerStyle}>
      <h1 style={headlineStyle}>Digest</h1>

      <div style={generateButtonContainerStyle}>
        {hasDigestForDate(today) ? (
          <Badge variant="success">Digest Generated for Today</Badge>
        ) : (
          <Button
            variant="primary"
            size="lg"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating
              ? 'Generating...'
              : "Generate Today's 9AM Digest (Simulated)"}
          </Button>
        )}
      </div>

      <div style={emailContainerStyle}>
        <div style={emailHeaderStyle}>
          <h2 style={emailTitleStyle}>Top 10 Jobs For You — 9AM Digest</h2>
          <p style={emailDateStyle}>{formatDate(digest.date)}</p>
        </div>

        {digest.jobs.map((item, index) => (
          <div key={item.job.id} style={jobItemStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)', marginBottom: 'var(--space-8)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '18px',
                  color: 'var(--color-text-muted)',
                  minWidth: '28px',
                }}
              >
                {index + 1}.
              </span>
              <h3 style={{ ...jobTitleStyle, margin: 0, flex: 1 }}>{item.job.title}</h3>
            </div>
            <span style={matchScoreStyle(item.matchScore)}>
              {item.matchScore}% Match
            </span>
            <p style={jobMetaStyle}>
              <strong>{item.job.company}</strong>
              <br />
              📍 {item.job.location} | 💼 {item.job.experience} Yrs
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() =>
                window.open(item.job.applyUrl, '_blank', 'noopener,noreferrer')
              }
            >
              Apply
            </Button>
          </div>
        ))}

        <div style={emailFooterStyle}>
          <p style={footerTextStyle}>
            This digest was generated based on your preferences.
          </p>
        </div>
      </div>

      <div style={actionsContainerStyle}>
        <Button variant="secondary" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy Digest to Clipboard'}
        </Button>
        <Button variant="secondary" onClick={handleEmailDraft}>
          Create Email Draft
        </Button>
      </div>

      <p style={demoNoteStyle}>
        Demo Mode: Daily 9AM trigger simulated manually.
      </p>
    </div>
  );
};
