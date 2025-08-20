import { useState, useEffect } from "react";
import { Users, Clock, DollarSign, TrendingUp, UserCheck, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockAttendanceService } from "@/lib/mockAttendanceService";
import { useToast } from "@/hooks/use-toast";

interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  totalPayroll: number;
  attendanceRate: number;
  lateArrivals: number;
  pendingRequests: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    presentToday: 0,
    totalPayroll: 0,
    attendanceRate: 0,
    lateArrivals: 0,
    pendingRequests: 0
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const employees = await mockAttendanceService.getEmployees();
    const todayAttendance = await mockAttendanceService.getTodayAttendance();
    const recentLogs = await mockAttendanceService.getRecentAttendanceLogs();

    const presentCount = todayAttendance.filter(record => record.status === 'present').length;
    const lateCount = todayAttendance.filter(record => 
      record.check_in && new Date(record.check_in).getHours() > 9
    ).length;

    setStats({
      totalEmployees: employees.length,
      presentToday: presentCount,
      totalPayroll: employees.length * 45000, // Average salary
      attendanceRate: employees.length > 0 ? Math.round((presentCount / employees.length) * 100) : 0,
      lateArrivals: lateCount,
      pendingRequests: 3 // Mock data
    });

    setRecentActivities(recentLogs.slice(0, 5));
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} Action`,
      description: `${action} functionality would be implemented here`,
    });
  };

  const statCards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      icon: Users,
      description: "Active employees",
      color: "text-primary"
    },
    {
      title: "Present Today",
      value: stats.presentToday,
      icon: UserCheck,
      description: `${stats.attendanceRate}% attendance rate`,
      color: "text-success"
    },
    {
      title: "Total Payroll",
      value: `₱${stats.totalPayroll.toLocaleString()}`,
      icon: DollarSign,
      description: "Monthly payroll",
      color: "text-info"
    },
    {
      title: "Late Arrivals",
      value: stats.lateArrivals,
      icon: AlertTriangle,
      description: "Today",
      color: "text-warning"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Centralized control over employees, attendance, and payroll</p>
        </div>
        <Button onClick={() => handleQuickAction("System Backup")}>
          System Backup
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
          <CardDescription>Frequently used administrative functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => handleQuickAction("Add Employee")}
            >
              <Users className="w-6 h-6" />
              <span className="text-sm">Add Employee</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => handleQuickAction("View Attendance")}
            >
              <Clock className="w-6 h-6" />
              <span className="text-sm">View Attendance</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => handleQuickAction("Generate Payroll")}
            >
              <DollarSign className="w-6 h-6" />
              <span className="text-sm">Generate Payroll</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => handleQuickAction("Export Report")}
            >
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">Export Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-card-foreground">Recent Attendance Logs</CardTitle>
            <CardDescription>Latest employee check-ins and check-outs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{activity.employeeName}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.type === 'check-in' ? 'Checked In' : 'Checked Out'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                    <Badge variant={activity.type === 'check-in' ? 'default' : 'secondary'}>
                      {activity.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-card-foreground">System Status</CardTitle>
            <CardDescription>Current system health and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm font-medium text-foreground">Face Recognition System</span>
                </div>
                <Badge variant="default" className="bg-success text-success-foreground">Online</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm font-medium text-foreground">Database Connection</span>
                </div>
                <Badge variant="default" className="bg-success text-success-foreground">Connected</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <span className="text-sm font-medium text-foreground">Pending Backups</span>
                </div>
                <Badge variant="outline" className="border-warning text-warning">3 Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;