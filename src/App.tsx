import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PortalDashboard from './pages/PortalDashboard';
import AboutPage from './pages/AboutPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import MITLicense from './pages/MITLicense';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Civic Open Data Portal */}
        <Route path="/" element={<PortalDashboard />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        
        {/* Secondary / Legal Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/license" element={<MITLicense />} />
        <Route path="/contact" element={<Contact />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
