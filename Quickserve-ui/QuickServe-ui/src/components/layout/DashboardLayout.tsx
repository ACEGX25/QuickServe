import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/public/favicon.png";
import {
  Home,
  Search,
  Calendar,
  Star,
  Settings,
  LogOut,
  Menu,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  QuickServeLogo,
  DeerIcon,
  WolfIcon,
  LionIcon,
} from "@/components/icons/AnimalIcons";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  role: "customer" | "provider" | "admin";
  navItems: NavItem[];
}

const roleIcons = {
  customer: DeerIcon,
  provider: WolfIcon,
  admin: LionIcon,
};

const roleLabels = {
  customer: "Customer",
  provider: "Service Provider",
  admin: "Administrator",
};

export const DashboardLayout = ({
  children,
  role,
  navItems,
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const RoleIcon = roleIcons[role];

  const handleLogout = () => navigate("/login");

  return (
    <div className="min-h-screen bg-background">
      {/* MOBILE HEADER */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
          <QuickServeLogo size={32} />
        </div>
        <Bell className="text-muted-foreground" />
      </header>

      {/* OVERLAY */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r z-50",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* COLLAPSE BUTTON */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 bg-white border rounded-full p-1 shadow-md"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>

        {/* LOGO */}
        <div className="flex items-center gap-3 px-4 py-4">
         <motion.div
  initial={{ rotate: -10, opacity: 0 }}
  animate={{ rotate: 0, opacity: 1 }}
  transition={{ duration: 0.4 }}
>
  <img
    src="/favicon.png"
    alt="QuickServe Logo"
    className="h-9 w-9 rounded-full object-cover"
  />
</motion.div>



          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xl font-bold text-green-600"
            >

              QuickServe
            </motion.span>
          )}
        </div>

        {/* USER INFO */}
        <div className="px-4 pb-4 border-b">
          <div className="flex items-center gap-3">
            <RoleIcon size={36} />
            {!collapsed && (
              <div>
                <p className="font-semibold">Hafsa</p>
                <p className="text-sm text-muted-foreground">
                  {roleLabels[role]}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* NAV ITEMS */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05, x: 4 }}
              >
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl transition-colors",
                    active
                      ? "bg-green-500 text-white"
                      : "text-muted-foreground hover:bg-green-50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="mt-auto p-4 border-t space-y-3">
          {role === "customer" && (
            <Link
              to="/customerprofile"
              className="flex items-center gap-3 text-muted-foreground hover:text-green-600"
            >
              <Settings className="h-5 w-5" />
              {!collapsed && <span>Settings</span>}
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-500"
          >
            <LogOut />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>
      {/* SIDEBAR */}

      {/* MAIN CONTENT */}
      <main
        className={cn(
          "transition-all duration-300 ease-in-out",
          collapsed ? "lg:ml-20" : "lg:ml-64",
          "pt-20 lg:pt-6 px-4 lg:px-8"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};
