import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import VaultDetail from './pages/VaultDetail.jsx';
import Positions from './pages/Positions.jsx';
import WizardDemo from './pages/WizardDemo.jsx';
import NotFound from './pages/NotFound.jsx';

/**
 * Root layout: persistent navbar/footer with routed page content.
 */
export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vault/:id" element={<VaultDetail />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/wizard-demo" element={<WizardDemo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
