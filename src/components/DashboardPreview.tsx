import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import dashboardImage from "@/assets/dashboard-preview.jpg";
import { TrendingUp, Users, Clock, DollarSign } from "lucide-react";
import { getMockStats } from "@/lib/mockData";

const DashboardPreview = () => {
  const { toast } = useToast();
  const mockStats = getMockStats();

  const stats = [
    {
      icon: Users,
      label: "Total Employees",
      value: mockStats.totalEmployees.toString(),
      change: "+2 this month",
      color: "text-primary"
    },
    {
      icon: Clock,
      label: "Present Today",
      value: mockStats.presentToday.toString(),
      change: `${mockStats.attendanceRate}% rate`,
      color: "text-success"
    },
    {
      icon: TrendingUp,
      label: "Late Today",
      value: mockStats.lateToday.toString(),
      change: "tracking",
      color: "text-warning"
    },
    {
      icon: DollarSign,
      label: "Absent Today",
      value: mockStats.absentToday.toString(),
      change: "monitoring",
      color: "text-destructive"
    }
  ];

  const handleExploreDashboard = () => {
    toast({
      title: "Mock Data Active",
      description: "Currently showing test data for faster development. Real employee attendance tracking is ready to implement.",
    });
  };

  return (
    <section id="dashboard-preview" className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comprehensive Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get real-time insights into attendance patterns, payroll data, and team productivity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <CardDescription className="text-sm font-medium">
                  {stat.label}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-success font-medium">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="relative">
          <Card className="overflow-hidden border-0 shadow-2xl">
            <div className="aspect-video relative">
              <img 
                src={dashboardImage} 
                alt="Dashboard interface preview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Real-time Analytics</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Monitor attendance patterns, track employee performance, and generate detailed payroll reports
                  </p>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={handleExploreDashboard}
                  >
                    Explore Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;