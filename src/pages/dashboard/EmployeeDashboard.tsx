import { useState, useEffect } from "react";
import { Clock, DollarSign, Calendar, Download, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockAttendanceService } from "@/lib/mockAttendanceService";
import { useToast } from "@/hooks/use-toast";

interface EmployeeStats {
  daysPresent: number;
  totalDays: number;
  lateCount: number;
  overtime: string;
  currentSalary: number;
}

const EmployeeDashboard = () => {
  const [stats, setStats] = useState<EmployeeStats>({
    daysPresent: 0,
    totalDays: 0,
    lateCount: 0,
    overtime: "0h",
    currentSalary: 0
  });
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadEmployeeData();
  }, []);

  const loadEmployeeData = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const allLogs = await mockAttendanceService.getAttendanceByEmployee('EMP001'); // Mock employee ID
    
    // Calculate stats for current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyLogs = allLogs.filter(log => {
      const logDate = new Date(log.date);
      return logDate.getMonth() === currentMonth && logDate.getFullYear() === currentYear;
    });

    const presentDays = monthlyLogs.filter(log => log.status === 'present').length;
    const lateDays = monthlyLogs.filter(log => 
      log.check_in && new Date(log.check_in).getHours() > 9
    ).length;

    setStats({
      daysPresent: presentDays,
      totalDays: monthlyLogs.length,
      lateCount: lateDays,
      overtime: "12h 30m",
      currentSalary: 45000
    });

    // Recent attendance history
    setAttendanceHistory(allLogs.slice(0, 7));
  };

  const handleAction = (action: string) => {
    toast({
      title: `${action} Request`,
      description: `${action} request has been submitted for approval`,
    });
  };

  const getAttendanceIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'absent':
        return <XCircle className="w-5 h-5 text-destructive" />;
      case 'late':
        return <AlertCircle className="w-5 h-5 text-warning" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const statCards = [
    {
      title: "Days Present",
      value: `${stats.daysPresent}/${stats.totalDays}`,
      icon: CheckCircle,
      description: "This month",
      color: "text-success"
    },
    {
      title: "Late Arrivals",
      value: stats.lateCount,
      icon: AlertCircle,
      description: "This month",
      color: "text-warning"
    },
    {
      title: "Overtime",
      value: stats.overtime,
      icon: Clock,
      description: "This month",
      color: "text-info"
    },
    {
      title: "Monthly Salary",
      value: `₱${stats.currentSalary.toLocaleString()}`,
      icon: DollarSign,
      description: "Gross amount",
      color: "text-primary"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Dashboard</h1>
          <p className="text-muted-foreground">Your personal attendance and payroll portal</p>
        </div>
        <Button onClick={() => handleAction("Download Payslip")}>
          <Download className="w-4 h-4 mr-2" />
          Download Payslip
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

      {/* Attendance History & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-card-foreground">Recent Attendance</CardTitle>
            <CardDescription>Your attendance record for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceHistory.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getAttendanceIcon(record.status)}
                    <div>
                      <p className="font-medium text-foreground">
                        {new Date(record.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">{record.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {record.checkIn && (
                      <p className="text-sm font-medium text-foreground">
                        In: {new Date(record.checkIn).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    )}
                    {record.checkOut && (
                      <p className="text-sm text-muted-foreground">
                        Out: {new Date(record.checkOut).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
            <CardDescription>Request forms and downloads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleAction("Leave Request")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Submit Leave Request
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleAction("Attendance Correction")}
              >
                <Clock className="w-4 h-4 mr-2" />
                Request Attendance Correction
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleAction("Overtime Request")}
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Submit Overtime Request
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleAction("Download Certificate")}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Employment Certificate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-card-foreground">Current Month Payroll Summary</CardTitle>
          <CardDescription>Breakdown of your salary computation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-success/10 border border-success/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Basic Salary</p>
              <p className="text-xl font-bold text-success">₱38,000</p>
            </div>
            <div className="text-center p-4 bg-info/10 border border-info/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Overtime Pay</p>
              <p className="text-xl font-bold text-info">₱5,250</p>
            </div>
            <div className="text-center p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Deductions</p>
              <p className="text-xl font-bold text-warning">₱3,250</p>
            </div>
            <div className="text-center p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Net Pay</p>
              <p className="text-xl font-bold text-primary">₱40,000</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDashboard;