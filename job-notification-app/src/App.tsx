import {
  TopBar,
  ContextHeader,
  Workspace,
  ProofFooter,
  Card,
  CardHeader,
  Button,
  Badge,
} from './components';
import { DesignSystemShowcase } from './components/DesignSystemShowcase';

function App() {
  const appContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--color-background)',
  };

  const secondaryPanelContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
      <Card>
        <CardHeader title="Design System" subtitle="Premium SaaS Foundation" />
        <p style={{ color: 'var(--color-text-secondary)', margin: 0, marginBottom: 'var(--space-16)' }}>
          A calm, intentional design system for serious B2C products.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
            <Badge variant="success">4 Colors</Badge>
            <span style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>Max</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
            <Badge variant="success">5 Spacing</Badge>
            <span style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>Values</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
            <Badge variant="success">150-200ms</Badge>
            <span style={{ fontSize: 'var(--font-size-small)', color: 'var(--color-text-muted)' }}>Transitions</span>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Guidelines" />
        <ul style={{ 
          color: 'var(--color-text-secondary)', 
          margin: 0, 
          paddingLeft: 'var(--space-24)',
          fontSize: 'var(--font-size-small)',
          lineHeight: '1.8',
        }}>
          <li>No gradients</li>
          <li>No glassmorphism</li>
          <li>No neon colors</li>
          <li>No animation noise</li>
          <li>Generous whitespace</li>
          <li>Clear hierarchy</li>
        </ul>
      </Card>

      <Button variant="primary" style={{ width: '100%' }}>
        View Documentation
      </Button>
    </div>
  );

  return (
    <div style={appContainerStyle}>
      <TopBar currentStep={1} totalSteps={1} status="shipped" />
      <ContextHeader
        headline="Design System Foundation"
        subtext="A premium SaaS design system built for the Job Notification App. Calm, intentional, and coherent."
      />
      <Workspace
        primaryContent={<DesignSystemShowcase />}
        secondaryContent={secondaryPanelContent}
      />
      <ProofFooter
        items={[
          { label: 'UI Built', checked: true },
          { label: 'Logic Working', checked: true },
          { label: 'Test Passed', checked: true },
          { label: 'Deployed', checked: true },
        ]}
      />
    </div>
  );
}

export default App
