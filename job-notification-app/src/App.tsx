import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components';
import {
  Dashboard,
  Saved,
  Digest,
  Settings,
  Proof,
  NotFound,
} from './pages';

function App() {
  const appContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--color-background)',
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
  };

  return (
    <BrowserRouter>
      <div style={appContainerStyle}>
        <Navigation />
        <main style={mainStyle}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/digest" element={<Digest />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/proof" element={<Proof />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App
