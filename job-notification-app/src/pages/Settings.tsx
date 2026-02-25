import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Badge } from '../components';
import { usePreferences } from '../hooks/usePreferences';

const locations = ['Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai', 'Gurgaon', 'Noida', 'Kolkata', 'Faridabad'];
const modes = ['Remote', 'Hybrid', 'Onsite'];
const experienceLevels = [
  { value: 'Fresher', label: 'Fresher' },
  { value: '0-1', label: '0-1 Years' },
  { value: '1-3', label: '1-3 Years' },
  { value: '3-5', label: '3-5 Years' },
];

export const Settings: React.FC = () => {
  const { preferences, savePreferences, isLoaded } = usePreferences();
  const [formData, setFormData] = useState(preferences);
  const [showSaved, setShowSaved] = useState(false);

  // Update form when preferences load
  useEffect(() => {
    if (isLoaded) {
      setFormData(preferences);
    }
  }, [isLoaded, preferences]);

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

  const checkboxGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 'var(--space-16)',
  };

  const checkboxOptionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-8)',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-primary)',
    cursor: 'pointer',
    padding: 'var(--space-8) var(--space-16)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius)',
    transition: 'all var(--transition-fast)',
  };

  const checkboxOptionSelectedStyle: React.CSSProperties = {
    ...checkboxOptionStyle,
    backgroundColor: 'rgba(139, 0, 0, 0.05)',
    borderColor: 'var(--color-accent)',
  };

  const selectStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: 'var(--color-text-primary)',
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius)',
    padding: '10px var(--space-16)',
    width: '100%',
    cursor: 'pointer',
  };

  const sliderContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--space-8)',
  };

  const sliderStyle: React.CSSProperties = {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    background: 'var(--color-border)',
    outline: 'none',
    cursor: 'pointer',
  };

  const sliderValueStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    fontWeight: 600,
    color: 'var(--color-accent)',
  };

  const buttonContainerStyle: React.CSSProperties = {
    marginTop: 'var(--space-16)',
    paddingTop: 'var(--space-24)',
    borderTop: '1px solid var(--color-border)',
    display: 'flex',
    gap: 'var(--space-16)',
    alignItems: 'center',
  };

  const handleLocationToggle = (location: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredLocations: prev.preferredLocations.includes(location)
        ? prev.preferredLocations.filter((l) => l !== location)
        : [...prev.preferredLocations, location],
    }));
  };

  const handleModeToggle = (mode: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredMode: prev.preferredMode.includes(mode)
        ? prev.preferredMode.filter((m) => m !== mode)
        : [...prev.preferredMode, mode],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePreferences(formData);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  if (!isLoaded) {
    return <div style={containerStyle}>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={headlineStyle}>Settings</h1>
      <p style={subtextStyle}>
        Configure your job preferences. These settings will be used to match you with relevant opportunities.
      </p>

      <Card>
        <form style={formStyle} onSubmit={handleSubmit}>
          {/* Role Keywords */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Role Keywords</h3>
            <Input
              label="Job Titles"
              placeholder="e.g., SDE, Frontend, Backend, Data Analyst"
              helperText="Enter keywords separated by commas"
              value={formData.roleKeywords}
              onChange={(e) => setFormData({ ...formData, roleKeywords: e.target.value })}
            />
          </div>

          {/* Preferred Locations */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Preferred Locations</h3>
            <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-12)' }}>
              Select one or more locations
            </p>
            <div style={checkboxGroupStyle}>
              {locations.map((location) => (
                <label
                  key={location}
                  style={
                    formData.preferredLocations.includes(location)
                      ? checkboxOptionSelectedStyle
                      : checkboxOptionStyle
                  }
                >
                  <input
                    type="checkbox"
                    checked={formData.preferredLocations.includes(location)}
                    onChange={() => handleLocationToggle(location)}
                    style={{ cursor: 'pointer' }}
                  />
                  {location}
                </label>
              ))}
            </div>
          </div>

          {/* Preferred Mode */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Preferred Work Mode</h3>
            <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-12)' }}>
              Select one or more work modes
            </p>
            <div style={checkboxGroupStyle}>
              {modes.map((mode) => (
                <label
                  key={mode}
                  style={
                    formData.preferredMode.includes(mode)
                      ? checkboxOptionSelectedStyle
                      : checkboxOptionStyle
                  }
                >
                  <input
                    type="checkbox"
                    checked={formData.preferredMode.includes(mode)}
                    onChange={() => handleModeToggle(mode)}
                    style={{ cursor: 'pointer' }}
                  />
                  {mode}
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Experience Level</h3>
            <select
              style={selectStyle}
              value={formData.experienceLevel}
              onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
            >
              <option value="">Select experience level</option>
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Skills */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Skills</h3>
            <Input
              label="Your Skills"
              placeholder="e.g., React, Python, Java, SQL"
              helperText="Enter skills separated by commas"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />
          </div>

          {/* Min Match Score */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Minimum Match Score</h3>
            <div style={sliderContainerStyle}>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.minMatchScore}
                onChange={(e) => setFormData({ ...formData, minMatchScore: parseInt(e.target.value) })}
                style={sliderStyle}
              />
              <span style={sliderValueStyle}>{formData.minMatchScore}%</span>
              <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>
                Jobs below this score will be filtered out when "Show only matches" is enabled
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div style={buttonContainerStyle}>
            <Button variant="primary" type="submit">
              Save Preferences
            </Button>
            {showSaved && <Badge variant="success">Saved!</Badge>}
          </div>
        </form>
      </Card>
    </div>
  );
};
