import { useState, useEffect } from "react";
import { Users, Clock, DollarSign, Download, UserCheck, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockAttendanceService } from "@/lib/mockAttendanceService";
import { useToast } from "@/hooks/use-toast";

interface FacultyStats {
  departmentSize: number;
  presentToday: number;
  attendanceRate: number;
  pendingRequests: number;
}

const FacultyDashboard = () => {
  const [stats, setStats] = useState<FacultyStats>({
    departmentSize: 0,
    presentToday: 0,
    attendanceRate: 0,
    pendingRequests: 0
  });
  const [facultyAttendance, setFacultyAttendance] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadFacultyData();
  }, []);

  const loadFacultyData = async () => {
    const allEmployees = await mockAttendanceService.getEmployees();
    const facultyMembers = allEmployees.filter(emp => emp.role === 'Faculty' || emp.department === 'Computer Science');
    const todayAttendance = await mockAttendanceService.getTodayAttendance();
    
    const facultyPresent = todayAttendance.filter(record => 
      facultyMembers.some(faculty => faculty.employee_id === record.employee_id) && 
      record.status === 'present'
    );

    setStats({
      departmentSize: facultyMembers.length,
      presentToday: facultyPresent.length,
      attendanceRate: facultyMembers.length > 0 ? Math.round((facultyPresent.length / facultyMembers.length) * 100) : 0,
      pendingRequests: 2 // Mock data
    });

    // Mock faculty attendance data
    setFacultyAttendance([
      { name: "Dr. John Smith", status: "present", checkIn: "08:30", department: "Computer Science" },
      { name: "Prof. Mary Johnson", status: "late", checkIn: "09:15", department: "Computer Science" },
      { name: "Dr. Robert Brown", status: "absent", checkIn: null, department: "Computer Science" },
      { name: "Prof. Lisa Davis", status: "present", checkIn: "08:45", department: "Computer Science" },
    ]);
  };

  const handleAction = (action: string) => {
    toast({
      title: `${action} Action`,
      description: `${action} functionality would be implemented here`,
    });
  };

  const statCards = [
    {
      title: "Department Size",
      value: stats.departmentSize,
      icon: Users,
      description: "Faculty members",
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
      title: "Pending Requests",
      value: stats.pendingRequests,
      icon: Calendar,
      description: "Leave requests",
      color: "text-warning"
    },
    {
      title: "Reports Generated",
      value: "12",
      icon: Download,
      description: "This month",
      color: "text-info"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-success text-success-foreground">Present</Badge>;
      case 'late':
        return <Badge variant="outline" className="border-warning text-warning">Late</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Faculty Dashboard</h1>
          <p className="text-muted-foreground">Supervisory control for Computer Science Department</p>
        </div>
        <Button onClick={() => handleAction("Export Department Report")}>
          <Download className="w-4 h-4 mr-2" />
          Export Report
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

      {/* Faculty Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-card-foreground">Faculty Attendance Today</CardTitle>
            <CardDescription>Real-time attendance status of faculty members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {facultyAttendance.map((faculty, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-foreground">
                        {faculty.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{faculty.name}</p>
                      <p className="text-sm text-muted-foreground">{faculty.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {faculty.checkIn && (
                      <p className="text-sm font-medium text-foreground mb-1">{faculty.checkIn}</p>
                    )}
                    {getStatusBadge(faculty.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
            <CardDescription>Department management functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleAction("Generate Weekly Report")}
              >
                <Download className="w-4 h-4 mr-2" />
                Generate Weekly Report
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleAction("Review Leave Requests")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Review Leave Requests ({stats.pendingRequests})
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleAction("Department Payroll Overview")}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Department Payroll Overview
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleAction("Schedule Meeting")}
              >
                <Clock className="w-4 h-4 mr-2" />
                Schedule Faculty Meeting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-card-foreground">Weekly Attendance Overview</CardTitle>
          <CardDescription>Department attendance trends for the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="text-center p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium text-foreground">{day}</p>
                <p className="text-lg font-bold text-primary">
                  {Math.floor(Math.random() * stats.departmentSize) + 1}
                </p>
                <p className="text-xs text-muted-foreground">Present</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyDashboard;