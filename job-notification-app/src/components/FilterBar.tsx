import React from 'react';

export interface FilterState {
  keyword: string;
  location: string;
  mode: string;
  experience: string;
  source: string;
  sort: string;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const locations = ['All', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai', 'Gurgaon', 'Noida', 'Kolkata', 'Faridabad'];
const modes = ['All', 'Remote', 'Hybrid', 'Onsite'];
const experiences = ['All', 'Fresher', '0-1', '1-3', '3-5'];
const sources = ['All', 'LinkedIn', 'Naukri', 'Indeed'];
const sortOptions = [
  { value: 'latest', label: 'Latest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'salary-high', label: 'Salary: High to Low' },
  { value: 'salary-low', label: 'Salary: Low to High' },
];

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const containerStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius)',
    padding: 'var(--space-24)',
    marginBottom: 'var(--space-24)',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 'var(--space-16)',
    alignItems: 'end',
  };

  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--space-8)',
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
    color: 'var(--color-text-primary)',
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius)',
    padding: '10px var(--space-16)',
    transition: 'border-color var(--transition-fast)',
    width: '100%',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: '36px',
  };

  const handleChange = (field: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Search</label>
          <input
            type="text"
            placeholder="Job title or company..."
            style={inputStyle}
            value={filters.keyword}
            onChange={(e) => handleChange('keyword', e.target.value)}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Location</label>
          <select
            style={selectStyle}
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc === 'All' ? '' : loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Mode</label>
          <select
            style={selectStyle}
            value={filters.mode}
            onChange={(e) => handleChange('mode', e.target.value)}
          >
            {modes.map((mode) => (
              <option key={mode} value={mode === 'All' ? '' : mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Experience</label>
          <select
            style={selectStyle}
            value={filters.experience}
            onChange={(e) => handleChange('experience', e.target.value)}
          >
            {experiences.map((exp) => (
              <option key={exp} value={exp === 'All' ? '' : exp}>
                {exp === 'Fresher' ? 'Fresher' : exp === '0-1' ? '0-1 Years' : exp === '1-3' ? '1-3 Years' : exp === '3-5' ? '3-5 Years' : exp}
              </option>
            ))}
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Source</label>
          <select
            style={selectStyle}
            value={filters.source}
            onChange={(e) => handleChange('source', e.target.value)}
          >
            {sources.map((source) => (
              <option key={source} value={source === 'All' ? '' : source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Sort By</label>
          <select
            style={selectStyle}
            value={filters.sort}
            onChange={(e) => handleChange('sort', e.target.value)}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
