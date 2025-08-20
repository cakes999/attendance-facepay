import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { mockAttendanceService } from "@/lib/mockAttendanceService";
import { type Employee, type AttendanceRecord } from "@/lib/mockData";
import { Camera, Clock, CheckCircle, XCircle, Users, LogOut } from "lucide-react";

const TestingDashboard = () => {
  const { toast } = useToast();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    // Load data from mock service
    const loadData = async () => {
      const [employeesData, attendanceData] = await Promise.all([
        mockAttendanceService.getEmployees(),
        mockAttendanceService.getTodayAttendance()
      ]);
      setEmployees(employeesData);
      setAttendanceRecords(attendanceData);
    };
    loadData();
  }, []);

  const simulateFaceRecognition = async (employee: Employee) => {
    setIsScanning(true);
    setSelectedEmployee(employee);
    
    const result = await mockAttendanceService.checkIn(employee.employee_id);
    setIsScanning(false);
    
    if (result.success) {
      toast({
        title: "Face Recognition Success!",
        description: result.message,
      });
      // Refresh attendance data
      const updatedAttendance = await mockAttendanceService.getTodayAttendance();
      setAttendanceRecords(updatedAttendance);
    } else {
      toast({
        title: "Check-in Failed",
        description: result.message,
        variant: "destructive"
      });
    }
  };

  const handleCheckOut = async (employee: Employee) => {
    const result = await mockAttendanceService.checkOut(employee.employee_id);
    
    if (result.success) {
      toast({
        title: "Check-out Success!",
        description: result.message,
      });
      // Refresh attendance data
      const updatedAttendance = await mockAttendanceService.getTodayAttendance();
      setAttendanceRecords(updatedAttendance);
    } else {
      toast({
        title: "Check-out Failed",
        description: result.message,
        variant: "destructive"
      });
    }
  };

  const getTodayAttendance = (employeeId: string) => {
    return attendanceRecords.find(record => record.employee_id === employeeId);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Testing Dashboard</h2>
          <p className="text-xl text-muted-foreground">
            Test face recognition and attendance tracking with mock data
          </p>
        </div>

        {/* Face Recognition Simulator */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Face Recognition Simulator
            </CardTitle>
            <CardDescription>
              Click on any employee to simulate face recognition check-in
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isScanning ? (
              <div className="text-center py-8">
                <div className="animate-pulse">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <p className="text-lg">Scanning face for {selectedEmployee?.full_name}...</p>
                  <div className="w-48 h-2 bg-muted rounded-full mx-auto mt-4 overflow-hidden">
                    <div className="h-full bg-primary animate-pulse"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {employees.map((employee) => {
                  const attendance = getTodayAttendance(employee.employee_id);
                  return (
                    <Card 
                      key={employee.id} 
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => simulateFaceRecognition(employee)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{employee.full_name}</h3>
                            <p className="text-sm text-muted-foreground">{employee.department}</p>
                            <div className="mt-2 flex gap-2">
                              {attendance ? (
                                <>
                                  <Badge 
                                    variant={attendance.status === 'present' ? 'default' : 
                                            attendance.status === 'late' ? 'secondary' : 'destructive'}
                                  >
                                    {attendance.status}
                                  </Badge>
                                  {attendance.check_in && !attendance.check_out && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCheckOut(employee);
                                      }}
                                      className="h-6 px-2"
                                    >
                                      <LogOut className="w-3 h-3 mr-1" />
                                      Check Out
                                    </Button>
                                  )}
                                </>
                              ) : (
                                <Badge variant="outline">Not checked in</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Attendance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Today's Attendance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employees.map((employee) => {
                const attendance = getTodayAttendance(employee.employee_id);
                return (
                  <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{employee.full_name}</p>
                        <p className="text-sm text-muted-foreground">{employee.employee_id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {attendance ? (
                        <>
                          <div className="text-right">
                            {attendance.check_in && (
                              <p className="text-sm">
                                In: {new Date(attendance.check_in).toLocaleTimeString()}
                              </p>
                            )}
                            {attendance.check_out && (
                              <p className="text-sm">
                                Out: {new Date(attendance.check_out).toLocaleTimeString()}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {attendance.status === 'present' ? (
                              <CheckCircle className="w-5 h-5 text-success" />
                            ) : attendance.status === 'late' ? (
                              <Clock className="w-5 h-5 text-warning" />
                            ) : (
                              <XCircle className="w-5 h-5 text-destructive" />
                            )}
                            <Badge 
                              variant={attendance.status === 'present' ? 'default' : 
                                      attendance.status === 'late' ? 'secondary' : 'destructive'}
                            >
                              {attendance.status}
                            </Badge>
                          </div>
                        </>
                      ) : (
                        <Badge variant="outline">Not checked in</Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TestingDashboard;