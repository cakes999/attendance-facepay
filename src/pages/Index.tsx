import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import DashboardPreview from "@/components/DashboardPreview";
import TestingDashboard from "@/components/TestingDashboard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeatureCards />
      <DashboardPreview />
      <TestingDashboard />
      <Footer />
    </div>
  );
};

export default Index;
