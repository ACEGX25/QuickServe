import {useEffect, useState} from "react";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  BarChart3,
  Settings,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Star,
  Eye,
  MoreVertical,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageTransition, FadeInSection } from "@/components/layout/PageTransition";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Shield, label: "Approvals", path: "/admin/approvals" },
  { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const COLORS = [
  "#34d399",
  "#60a5fa",
  "#fbbf24",
  "#f87171",
  "#a78bfa",
];





const AdminDashboard = () => {

  const [stats, setStats] = useState<any[]>([]);
  const token = localStorage.getItem("token");


  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/admin/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then(res => res.json())
        .then(data => {
          setStats([
            {
              label: "Total Users",
              value: data.totalUsers,
              icon: Users,
              trend: "up",
              change: "+",
            },
            {
              label: "Active Bookings",
              value: data.activeBookings,
              icon: Calendar,
              trend: "up",
              change: "+",
            },
            {
              label: "Revenue",
              value: `$${data.revenue}`,
              icon: DollarSign,
              trend: "up",
              change: "+",
            },
            {
              label: "Avg Rating",
              value: data.avgRating,
              icon: Star,
              trend: "down",
              change: "-",
            },
          ]);
        });
  }, [token]);


  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/admin/analytics/trends", {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then(res => res.json())
        .then(data => {
          const formatted = data.labels.map((label, i) => ({
            name: label,
            value: data.revenue[i],
          }));
          setRevenueData(formatted);
        });
  }, [token]);


  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/admin/analytics/services", {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then(res => res.json())
        .then(data => {
          setCategoryData(
              data.map((row: any) => ({
                name: row[0],
                value: row[1],
              }))
          );
        });
  }, [token]);


  const [pendingApprovals, setPendingApprovals] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/admin/approvals", {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then(res => res.json())
        .then(setPendingApprovals);
  }, [token]);


  const [topServices, setTopServices] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/admin/analytics/services", {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then(res => res.json())
        .then(data => {
          setTopServices(
              data.map((row: any) => ({
                name: row[0],
                bookings: row[1],
                revenue: "-", // optional later
              }))
          );
        });
  }, [token]);


  const total = categoryData.reduce((sum, c) => sum + c.value, 0);
  return (
    <DashboardLayout role="admin" navItems={navItems}>
      <PageTransition>
        <div className="space-y-8">
          {/* Stats Grid */}
          <FadeInSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className={cn("p-2 rounded-xl", stat.bgColor)}>
                        <stat.icon className={cn("h-5 w-5", stat.color)} />
                      </div>
                      <span
                        className={cn(
                          "text-xs font-medium flex items-center gap-1",
                          stat.trend === "up" ? "text-primary" : "text-destructive"
                        )}
                      >
                        {stat.trend === "up" ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-2xl font-display font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </FadeInSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Revenue Chart */}
            <FadeInSection delay={0.1} className="lg:col-span-2">
              <GlassCard className="h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-bold text-foreground">
                    Revenue Overview
                  </h2>
                  <Button variant="outline" size="sm">
                    Last 6 Months
                  </Button>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="hsl(152 69% 40%)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="hsl(152 69% 40%)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickFormatter={(value) => `$${value / 1000}K`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "0.75rem",
                        }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(152 69% 40%)"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </FadeInSection>

            {/* Category Distribution */}
            <FadeInSection delay={0.2}>
              <GlassCard className="h-full">
                <h2 className="text-xl font-display font-bold text-foreground mb-6">
                  Service Categories
                </h2>

                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2">
                  {categoryData.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-muted-foreground">{category.name}</span>
                      </div>

                      <span className="font-medium text-foreground">{Math.round((category.value / total) * 100)}%</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeInSection>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Pending Approvals */}
            <FadeInSection delay={0.3}>
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-bold text-foreground">
                    Pending Approvals
                  </h2>
                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-600">
                    {pendingApprovals.length} pending
                  </Badge>
                </div>

                <div className="space-y-4">
                  {pendingApprovals.map((approval) => (
                    <motion.div
                      key={approval.id}
                      className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-primary font-semibold">
                              {approval.providerEmail
                                  ?.charAt(0)
                                  .toUpperCase()}

                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{approval.title}</h3>
                            <p className="text-sm text-muted-foreground">{approval.category}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {approval.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-9 w-9 text-primary hover:bg-primary/10"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-9 w-9 text-destructive hover:bg-destructive/10"
                          >
                            <XCircle className="h-5 w-5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-9 w-9">
                            <Eye className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <AnimatedButton variant="outline" className="w-full mt-4">
                  View All Requests
                </AnimatedButton>
              </GlassCard>
            </FadeInSection>

            {/* Top Services */}
            <FadeInSection delay={0.4}>
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-bold text-foreground">
                    Top Services
                  </h2>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>By Bookings</DropdownMenuItem>
                      <DropdownMenuItem>By Revenue</DropdownMenuItem>
                      <DropdownMenuItem>By Rating</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-4">
                  {topServices.map((service, index) => (
                    <div
                      key={service.name}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm",
                            index === 0
                              ? "bg-amber-500/20 text-amber-600"
                              : index === 1
                              ? "bg-muted text-muted-foreground"
                              : index === 2
                              ? "bg-orange-500/20 text-orange-600"
                              : "bg-secondary text-muted-foreground"
                          )}
                        >
                          #{index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {service.bookings} bookings
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-primary">{service.revenue}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </FadeInSection>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default AdminDashboard;
