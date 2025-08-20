import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-face-recognition.jpg";

const HeroSection = () => {
  const { toast } = useToast();

  const handleGetStarted = () => {
    toast({
      title: "Ready to Begin!",
      description: "Your system is connected. Set up authentication and employee registration to start tracking attendance.",
    });
  };

  const handleViewDemo = () => {
    toast({
      title: "Demo Mode",
      description: "Scroll down to explore the dashboard preview and system features.",
    });
    // Smooth scroll to dashboard preview
    document.getElementById('dashboard-preview')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Face recognition technology in modern office" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Face Recognition
          <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Attendance System
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Automate attendance tracking with AI-powered face recognition and integrated payroll management
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="hero" 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
            onClick={handleViewDemo}
          >
            View Demo
          </Button>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-accent/30 rounded-full animate-bounce"></div>
      <div className="absolute top-1/3 right-8 w-12 h-12 bg-primary/20 rounded-full animate-ping"></div>
    </section>
  );
};

export default HeroSection;