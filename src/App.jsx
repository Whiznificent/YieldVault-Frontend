import { Routes, Route } from 'react-router-dom';
import { DEFAULT_LANG } from './constants/i18n';
import useDocumentLang from './hooks/useDocumentLang';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import VaultDetail from './pages/VaultDetail';
import Positions from './pages/Positions';
import NotFound from './pages/NotFound';

/**
 * Root layout: persistent navbar/footer with routed page content.
 */
export default function App() {
  useDocumentLang(DEFAULT_LANG);
  return (
    // Explicit lang keeps the app subtree correctly tagged even when it is
    // mounted inside a host page that declares a different language.
    <div className="app" lang={DEFAULT_LANG}>
      <Navbar />
      <main className="app-main">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vault/:id" element={<VaultDetail />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
