export interface Employee {
  id: string;
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
  role: string;
  avatar_url?: string;
  created_at: string;
}

export interface AttendanceRecord {
  id: string;
  employee_id: string;
  check_in?: string;
  check_out?: string;
  date: string;
  status: 'present' | 'late' | 'absent';
}

export const mockEmployees: Employee[] = [
  {
    id: '1',
    employee_id: 'EMP001',
    full_name: 'John Smith',
    email: 'john.smith@company.com',
    department: 'Engineering',
    role: 'Senior Developer',
    created_at: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    employee_id: 'EMP002',
    full_name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Design',
    role: 'UI/UX Designer',
    created_at: '2024-01-20T08:00:00Z'
  },
  {
    id: '3',
    employee_id: 'EMP003',
    full_name: 'Mike Wilson',
    email: 'mike.wilson@company.com',
    department: 'Engineering',
    role: 'Frontend Developer',
    created_at: '2024-02-01T08:00:00Z'
  },
  {
    id: '4',
    employee_id: 'EMP004',
    full_name: 'Emily Davis',
    email: 'emily.davis@company.com',
    department: 'Marketing',
    role: 'Marketing Manager',
    created_at: '2024-02-10T08:00:00Z'
  },
  {
    id: '5',
    employee_id: 'EMP005',
    full_name: 'David Brown',
    email: 'david.brown@company.com',
    department: 'HR',
    role: 'HR Specialist',
    created_at: '2024-02-15T08:00:00Z'
  }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    employee_id: 'EMP001',
    check_in: '2024-08-20T08:15:00Z',
    check_out: '2024-08-20T17:30:00Z',
    date: '2024-08-20',
    status: 'present'
  },
  {
    id: '2',
    employee_id: 'EMP002',
    check_in: '2024-08-20T08:45:00Z',
    check_out: '2024-08-20T17:15:00Z',
    date: '2024-08-20',
    status: 'late'
  },
  {
    id: '3',
    employee_id: 'EMP003',
    check_in: '2024-08-20T08:00:00Z',
    check_out: '2024-08-20T17:00:00Z',
    date: '2024-08-20',
    status: 'present'
  },
  {
    id: '4',
    employee_id: 'EMP004',
    check_in: '2024-08-20T09:15:00Z',
    date: '2024-08-20',
    status: 'late'
  },
  {
    id: '5',
    employee_id: 'EMP005',
    date: '2024-08-20',
    status: 'absent'
  },
  // Previous day records
  {
    id: '6',
    employee_id: 'EMP001',
    check_in: '2024-08-19T08:00:00Z',
    check_out: '2024-08-19T17:30:00Z',
    date: '2024-08-19',
    status: 'present'
  },
  {
    id: '7',
    employee_id: 'EMP002',
    check_in: '2024-08-19T08:30:00Z',
    check_out: '2024-08-19T17:00:00Z',
    date: '2024-08-19',
    status: 'present'
  },
  {
    id: '8',
    employee_id: 'EMP003',
    check_in: '2024-08-19T08:10:00Z',
    check_out: '2024-08-19T17:15:00Z',
    date: '2024-08-19',
    status: 'present'
  }
];

export const getMockStats = () => {
  const today = new Date().toISOString().split('T')[0];
  const todayRecords = mockAttendanceRecords.filter(record => record.date === today);
  
  const presentCount = todayRecords.filter(record => record.status === 'present').length;
  const lateCount = todayRecords.filter(record => record.status === 'late').length;
  const absentCount = todayRecords.filter(record => record.status === 'absent').length;
  const totalEmployees = mockEmployees.length;
  
  return {
    totalEmployees,
    presentToday: presentCount,
    lateToday: lateCount,
    absentToday: absentCount,
    attendanceRate: Math.round((presentCount / totalEmployees) * 100)
  };
};