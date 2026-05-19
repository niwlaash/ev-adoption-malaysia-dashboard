import HeroSection from '../components/landing/HeroSection';
import StatsSection from '../components/landing/StatsSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="bg-neutral-950 font-sans text-neutral-50 overflow-x-hidden w-full selection:bg-purple-500/30 selection:text-white">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
