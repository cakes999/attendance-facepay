import { 
  Users, 
  Clock, 
  DollarSign, 
  FileText, 
  Settings, 
  BarChart3,
  UserCheck,
  Download,
  Calendar,
  Building
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { User } from "@/pages/DashboardLayout";

interface DashboardSidebarProps {
  currentUser: User;
}

export function DashboardSidebar({ currentUser }: DashboardSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();

  const getNavItems = () => {
    const baseItems = [
      { 
        title: "Overview", 
        url: `/dashboard/${currentUser.role}`, 
        icon: BarChart3 
      }
    ];

    switch (currentUser.role) {
      case 'admin':
        return [
          ...baseItems,
          { title: "Employee Management", url: "/dashboard/admin/employees", icon: Users },
          { title: "Attendance Monitoring", url: "/dashboard/admin/attendance", icon: Clock },
          { title: "Payroll Management", url: "/dashboard/admin/payroll", icon: DollarSign },
          { title: "Reports", url: "/dashboard/admin/reports", icon: FileText },
          { title: "System Settings", url: "/dashboard/admin/settings", icon: Settings },
        ];
      
      case 'faculty':
        return [
          ...baseItems,
          { title: "Faculty Attendance", url: "/dashboard/faculty/attendance", icon: UserCheck },
          { title: "Department Payroll", url: "/dashboard/faculty/payroll", icon: DollarSign },
          { title: "Reports", url: "/dashboard/faculty/reports", icon: Download },
          { title: "Leave Requests", url: "/dashboard/faculty/requests", icon: Calendar },
        ];
      
      case 'employee':
        return [
          ...baseItems,
          { title: "My Attendance", url: "/dashboard/employee/attendance", icon: Clock },
          { title: "My Payroll", url: "/dashboard/employee/payroll", icon: DollarSign },
          { title: "Payslips", url: "/dashboard/employee/payslips", icon: FileText },
          { title: "Requests", url: "/dashboard/employee/requests", icon: Calendar },
        ];
      
      default:
        return baseItems;
    }
  };

  const navItems = getNavItems();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"}>
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-sidebar-foreground">AttendPay</h2>
                <p className="text-xs text-sidebar-foreground/60 capitalize">{currentUser.role} Portal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === `/dashboard/${currentUser.role}`}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}