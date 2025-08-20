import { mockEmployees, mockAttendanceRecords, getMockStats, type Employee, type AttendanceRecord } from "./mockData";

// Mock service to simulate database operations without any actual database connection
export class MockAttendanceService {
  private employees: Employee[] = [...mockEmployees];
  private attendanceRecords: AttendanceRecord[] = [...mockAttendanceRecords];

  // Get all employees
  async getEmployees(): Promise<Employee[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...this.employees];
  }

  // Get employee by ID
  async getEmployee(id: string): Promise<Employee | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.employees.find(emp => emp.id === id) || null;
  }

  // Get employee by employee_id
  async getEmployeeByEmployeeId(employeeId: string): Promise<Employee | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.employees.find(emp => emp.employee_id === employeeId) || null;
  }

  // Simulate face recognition check-in
  async checkIn(employeeId: string): Promise<{ success: boolean; message: string; employee?: Employee }> {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate face recognition processing time
    
    const employee = await this.getEmployeeByEmployeeId(employeeId);
    if (!employee) {
      return { success: false, message: "Employee not found" };
    }

    const today = new Date().toISOString().split('T')[0];
    const existingRecord = this.attendanceRecords.find(
      record => record.employee_id === employeeId && record.date === today
    );

    if (existingRecord && existingRecord.check_in) {
      return { success: false, message: "Already checked in today", employee };
    }

    const now = new Date().toISOString();
    const checkInTime = new Date();
    const isLate = checkInTime.getHours() > 9 || (checkInTime.getHours() === 9 && checkInTime.getMinutes() > 0);

    if (existingRecord) {
      // Update existing record
      existingRecord.check_in = now;
      existingRecord.status = isLate ? 'late' : 'present';
    } else {
      // Create new record
      this.attendanceRecords.push({
        id: Date.now().toString(),
        employee_id: employeeId,
        check_in: now,
        date: today,
        status: isLate ? 'late' : 'present'
      });
    }

    return { 
      success: true, 
      message: `Check-in successful at ${checkInTime.toLocaleTimeString()}`,
      employee 
    };
  }

  // Simulate check-out
  async checkOut(employeeId: string): Promise<{ success: boolean; message: string; employee?: Employee }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const employee = await this.getEmployeeByEmployeeId(employeeId);
    if (!employee) {
      return { success: false, message: "Employee not found" };
    }

    const today = new Date().toISOString().split('T')[0];
    const existingRecord = this.attendanceRecords.find(
      record => record.employee_id === employeeId && record.date === today
    );

    if (!existingRecord || !existingRecord.check_in) {
      return { success: false, message: "No check-in record found for today", employee };
    }

    if (existingRecord.check_out) {
      return { success: false, message: "Already checked out today", employee };
    }

    const now = new Date().toISOString();
    existingRecord.check_out = now;

    return { 
      success: true, 
      message: `Check-out successful at ${new Date().toLocaleTimeString()}`,
      employee 
    };
  }

  // Get attendance records for a specific employee
  async getEmployeeAttendance(employeeId: string, limit: number = 10): Promise<AttendanceRecord[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.attendanceRecords
      .filter(record => record.employee_id === employeeId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

  // Get today's attendance summary
  async getTodayAttendance(): Promise<AttendanceRecord[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const today = new Date().toISOString().split('T')[0];
    return this.attendanceRecords.filter(record => record.date === today);
  }

  // Get dashboard stats
  async getDashboardStats() {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getMockStats();
  }

  // Add new employee (for testing)
  async addEmployee(employee: Omit<Employee, 'id' | 'created_at'>): Promise<Employee> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    this.employees.push(newEmployee);
    return newEmployee;
  }
}

// Create a singleton instance for the entire app
export const mockAttendanceService = new MockAttendanceService();