import React from 'react';
import {
  Button,
  Input,
  Card,
  CardHeader,
  Badge,
} from './index';

export const DesignSystemShowcase: React.FC = () => {
  const sectionStyle: React.CSSProperties = {
    marginBottom: 'var(--space-40)',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontSize: 'var(--font-size-h2)',
    fontWeight: 400,
    color: 'var(--color-text-primary)',
    marginBottom: 'var(--space-24)',
  };

  const componentGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-16)',
    marginBottom: 'var(--space-24)',
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--space-16)',
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const colorSwatchStyle = (color: string, textColor: string = 'var(--color-text-primary)'): React.CSSProperties => ({
    width: '120px',
    height: '80px',
    backgroundColor: color,
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-small)',
    color: textColor,
  });

  return (
    <div>
      {/* Color System */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Color System</h2>
        <div style={rowStyle}>
          <div style={colorSwatchStyle('var(--color-background)')}>Background</div>
          <div style={colorSwatchStyle('var(--color-text-primary)', 'var(--color-white)')}>Primary Text</div>
          <div style={colorSwatchStyle('var(--color-accent)', 'var(--color-white)')}>Accent</div>
          <div style={colorSwatchStyle('var(--color-success)', 'var(--color-white)')}>Success</div>
          <div style={colorSwatchStyle('var(--color-warning)', 'var(--color-white)')}>Warning</div>
        </div>
      </section>

      {/* Typography */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Typography</h2>
        <div style={componentGroupStyle}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--font-size-h1)', fontWeight: 400, margin: 0 }}>
            Heading 1 (Serif)
          </h1>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--font-size-h2)', fontWeight: 400, margin: 0 }}>
            Heading 2 (Serif)
          </h2>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--font-size-h3)', fontWeight: 400, margin: 0 }}>
            Heading 3 (Serif)
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-body)', lineHeight: 'var(--line-height-body)', margin: 0 }}>
            Body text in sans-serif. Line height is 1.7 for comfortable reading.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-small)', color: 'var(--color-text-secondary)', margin: 0 }}>
            Small text for labels and secondary information.
          </p>
        </div>
      </section>

      {/* Buttons */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Buttons</h2>
        <div style={componentGroupStyle}>
          <div style={rowStyle}>
            <Button variant="primary" size="sm">Primary Small</Button>
            <Button variant="primary" size="md">Primary Medium</Button>
            <Button variant="primary" size="lg">Primary Large</Button>
          </div>
          <div style={rowStyle}>
            <Button variant="secondary" size="sm">Secondary Small</Button>
            <Button variant="secondary" size="md">Secondary Medium</Button>
            <Button variant="secondary" size="lg">Secondary Large</Button>
          </div>
          <div style={rowStyle}>
            <Button variant="ghost" size="sm">Ghost Small</Button>
            <Button variant="ghost" size="md">Ghost Medium</Button>
            <Button variant="ghost" size="lg">Ghost Large</Button>
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Inputs</h2>
        <div style={componentGroupStyle}>
          <Input label="Email Address" placeholder="Enter your email" />
          <Input label="With Helper" placeholder="Enter value" helperText="This is a helpful hint" />
          <Input label="With Error" placeholder="Enter value" error="This field is required" />
        </div>
      </section>

      {/* Badges */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Badges</h2>
        <div style={rowStyle}>
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="accent">Accent</Badge>
        </div>
      </section>

      {/* Cards */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Cards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-24)' }}>
          <Card>
            <CardHeader title="Simple Card" subtitle="With header and subtitle" />
            <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
              Card content goes here. Cards have subtle borders and no heavy shadows.
            </p>
          </Card>
          <Card>
            <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
              A card without a header. Clean and minimal.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};
