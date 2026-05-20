import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import EVTrends from './pages/EVTrends';
import MarketShare from './pages/MarketShare';
import VehicleSearch from './pages/VehicleSearch';
import VehicleTypes from './pages/VehicleTypes';
import TopModels from './pages/TopModels';
import Insights from './pages/Insights';
import AboutPage from './pages/AboutPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import MITLicense from './pages/MITLicense';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="trends" element={<EVTrends />} />
          <Route path="share" element={<MarketShare />} />
          <Route path="compare" element={<VehicleSearch />} />
          <Route path="types" element={<VehicleTypes />} />
          <Route path="models" element={<TopModels />} />
          <Route path="insights" element={<Insights />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/license" element={<MITLicense />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
