import React from 'react';
import { Card, Input, Button } from '../components';

export const Settings: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    padding: 'var(--space-40)',
    maxWidth: '720px',
  };

  const headlineStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: 'var(--font-size-h1)',
    fontWeight: 400,
    color: 'var(--color-text-primary)',
    lineHeight: 'var(--line-height-heading)',
    letterSpacing: '-0.02em',
    marginBottom: 'var(--space-16)',
  };

  const subtextStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-secondary)',
    lineHeight: 'var(--line-height-body)',
    marginBottom: 'var(--space-40)',
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-24)',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: 'var(--space-16)',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: 'var(--font-size-h3)',
    fontWeight: 400,
    color: 'var(--color-text-primary)',
    marginBottom: 'var(--space-16)',
  };

  const radioGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-16)',
  };

  const radioOptionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-8)',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-primary)',
    cursor: 'pointer',
  };

  const buttonContainerStyle: React.CSSProperties = {
    marginTop: 'var(--space-16)',
    paddingTop: 'var(--space-24)',
    borderTop: '1px solid var(--color-border)',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headlineStyle}>Settings</h1>
      <p style={subtextStyle}>
        Configure your job preferences. These settings will be used to match you with relevant opportunities.
      </p>

      <Card>
        <form style={formStyle} onSubmit={(e) => e.preventDefault()}>
          {/* Role Keywords */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Role Keywords</h3>
            <Input
              label="Job Titles"
              placeholder="e.g., Product Manager, UX Designer, Software Engineer"
              helperText="Enter keywords separated by commas"
            />
          </div>

          {/* Preferred Locations */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Preferred Locations</h3>
            <Input
              label="Cities or Regions"
              placeholder="e.g., San Francisco, Remote, New York"
              helperText="Enter locations separated by commas"
            />
          </div>

          {/* Work Mode */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Work Mode</h3>
            <div style={radioGroupStyle}>
              <label style={radioOptionStyle}>
                <input type="radio" name="workMode" value="remote" />
                Remote
              </label>
              <label style={radioOptionStyle}>
                <input type="radio" name="workMode" value="hybrid" />
                Hybrid
              </label>
              <label style={radioOptionStyle}>
                <input type="radio" name="workMode" value="onsite" />
                Onsite
              </label>
            </div>
          </div>

          {/* Experience Level */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Experience Level</h3>
            <div style={radioGroupStyle}>
              <label style={radioOptionStyle}>
                <input type="radio" name="experience" value="entry" />
                Entry Level (0-2 years)
              </label>
              <label style={radioOptionStyle}>
                <input type="radio" name="experience" value="mid" />
                Mid Level (3-5 years)
              </label>
              <label style={radioOptionStyle}>
                <input type="radio" name="experience" value="senior" />
                Senior Level (6+ years)
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div style={buttonContainerStyle}>
            <Button variant="primary" type="submit">
              Save Preferences
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
