import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/pages/DashboardLayout";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  currentUser: User;
  onUserSwitch: (user: User) => void;
}

export function DashboardHeader({ currentUser, onUserSwitch }: DashboardHeaderProps) {
  const navigate = useNavigate();

  const demoUsers: User[] = [
    { id: 'admin-1', name: 'System Administrator', role: 'admin', employeeId: 'ADMIN001' },
    { id: 'faculty-1', name: 'Dr. Jane Smith', role: 'faculty', department: 'Computer Science', employeeId: 'FAC001' },
    { id: 'employee-1', name: 'John Doe', role: 'employee', department: 'IT Support', employeeId: 'EMP001' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-card-foreground">
          {currentUser.role === 'admin' && 'Admin Dashboard'}
          {currentUser.role === 'faculty' && 'Faculty Dashboard'}
          {currentUser.role === 'employee' && 'Employee Dashboard'}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 px-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-sm font-medium">{currentUser.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover">
            <DropdownMenuLabel>
              <div>
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
                <p className="text-xs text-muted-foreground">{currentUser.employeeId}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
              Switch User (Demo)
            </DropdownMenuLabel>
            {demoUsers.map((user) => (
              <DropdownMenuItem 
                key={user.id}
                onClick={() => onUserSwitch(user)}
                className={currentUser.id === user.id ? "bg-accent" : ""}
              >
                <div className="flex flex-col">
                  <span className="text-sm">{user.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                </div>
              </DropdownMenuItem>
            ))}
            
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}