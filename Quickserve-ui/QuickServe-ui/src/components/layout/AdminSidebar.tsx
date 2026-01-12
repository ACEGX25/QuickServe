import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  ClipboardCheck, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: ClipboardCheck, label: "Approvals", path: "admin/approvals" },
  { icon: BarChart3, label: "Analytics", path: "admin/analytics" },
  { icon: Settings, label: "Settings", path: "admin/settings" },
];

export const AdminSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg text-foreground">QuickServe</span>
          )}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          <ChevronLeft className={cn(
            "w-5 h-5 text-sidebar-foreground transition-transform duration-300",
            isCollapsed && "rotate-180"
          )} />
        </button>
      </div>

      {/* User Profile */}
      <div className={cn(
        "p-4 border-b border-sidebar-border",
        isCollapsed && "flex justify-center"
      )}>
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
          <Avatar className="h-10 w-10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              HA
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div>
              <p className="font-medium text-sm text-foreground">Hafsa</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "sidebar-item",
                isActive && "sidebar-item-active",
                isCollapsed && "justify-center px-3"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-sidebar-border">
        <button className={cn(
          "sidebar-item w-full text-destructive hover:bg-destructive/10 hover:text-destructive",
          isCollapsed && "justify-center px-3"
        )}>
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};
