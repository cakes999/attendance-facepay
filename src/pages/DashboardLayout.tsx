import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { mockAttendanceService } from "@/lib/mockAttendanceService";

export type UserRole = 'admin' | 'faculty' | 'employee';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  department?: string;
  employeeId: string;
}

const DashboardLayout = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Simulate user authentication - in real app this would come from Supabase
    const initializeUser = () => {
      // Get user from localStorage or default to admin for demo
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      } else {
        // Default to admin user for demo
        const defaultUser: User = {
          id: 'admin-1',
          name: 'System Administrator',
          role: 'admin',
          employeeId: 'ADMIN001'
        };
        setCurrentUser(defaultUser);
        localStorage.setItem('currentUser', JSON.stringify(defaultUser));
      }
      setIsLoading(false);
    };

    initializeUser();
  }, []);

  useEffect(() => {
    // Redirect to appropriate dashboard based on role
    if (currentUser && location.pathname === '/dashboard') {
      navigate(`/dashboard/${currentUser.role}`, { replace: true });
    }
  }, [currentUser, location.pathname, navigate]);

  const handleUserSwitch = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate(`/dashboard/${user.role}`, { replace: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar currentUser={currentUser} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader 
            currentUser={currentUser} 
            onUserSwitch={handleUserSwitch}
          />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;