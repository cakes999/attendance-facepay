import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Users, Calculator, BarChart3, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "AI Face Recognition",
    description: "Advanced face detection and recognition technology for accurate attendance tracking",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Employee Management",
    description: "Comprehensive employee database with role-based access and department organization",
    color: "text-accent"
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Instant attendance logging with automatic time-in/time-out detection",
    color: "text-success"
  },
  {
    icon: Calculator,
    title: "Payroll Integration",
    description: "Automated salary calculations with overtime, deductions, and benefits management",
    color: "text-warning"
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive reporting with insights on attendance patterns and productivity",
    color: "text-info"
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "Enterprise-grade security with encrypted data and privacy protection",
    color: "text-primary"
  }
];

const FeatureCards = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for Modern HR
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to streamline attendance tracking and payroll management
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;