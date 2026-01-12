import {DashboardLayout} from "@/components/layout/DashboardLayout.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";


import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  Star,
  Home,
  Shield,
  BarChart3,
  Settings
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend 
} from "recharts";


const navItems = [
  { icon: Home, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Shield, label: "Approvals", path: "/admin/approvals" },
  { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const AnalyticsPage = () => {
  const token = localStorage.getItem("token");

  const [period, setPeriod] = useState("6months");

  const [kpis, setKpis] = useState<any>(null);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [servicePerformance, setServicePerformance] = useState<any[]>([]);
  const [userGrowth, setUserGrowth] = useState<any[]>([]);
  const [ratingDistribution, setRatingDistribution] = useState<any[]>([]);
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/admin/analytics/summary", {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then(res => res.json())
        .then(setKpis);
  }, [token]);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/admin/analytics/trends", {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then(res => res.json())
        .then(data => {
          const formatted = data.labels.map((label: string, i: number) => ({
            month: label,
            revenue: data.revenue[i],
            bookings: data.bookings[i],
          }));

          setMonthlyData(formatted);
        });
  }, [token, period]);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/admin/analytics/services", {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then(res => res.json())
        .then(data => {
          setServicePerformance(
              data.map((row: any[]) => ({
                name: row[0],
                bookings: row[1],
              }))
          );
        });
  }, [token]);


  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/admin/analytics/ratings", {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then(res => res.json())
        .then(data => {
          setRatingDistribution(
              data.map((r: any) => ({
                ...r,
                color:
                    r.rating === "5 Stars" ? "hsl(145, 63%, 42%)" :
                        r.rating === "4 Stars" ? "hsl(145, 50%, 55%)" :
                            r.rating === "3 Stars" ? "hsl(45, 93%, 47%)" :
                                r.rating === "2 Stars" ? "hsl(25, 95%, 53%)" :
                                    "hsl(0, 72%, 51%)",
              }))
          );
        });
  }, [token]);


  return (
    <DashboardLayout  role={"admin"} navItems={navItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="page-title">Analytics</h1>
            <p className="text-muted-foreground mt-1">Track platform performance and growth metrics</p>
          </div>
          <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-primary">
                  <TrendingUp className="w-4 h-4" />
                  +23%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">
                  ${kpis?.totalRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Total Revenue</p>

              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-primary">
                  <TrendingUp className="w-4 h-4" />
                  +18%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{kpis?.totalBookings}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Bookings</p>

              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-primary">
                  <TrendingUp className="w-4 h-4" />
                  +32%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{kpis?.totalUsers}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Users</p>

              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-destructive">
                  <TrendingDown className="w-4 h-4" />
                  -0.1
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{kpis?.avgRating}</p>
                <p className="text-sm text-muted-foreground mt-1">Avg Rating</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue & Bookings Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Revenue & Bookings Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(145, 63%, 42%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(145, 63%, 42%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis 
                      yAxisId="left"
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickFormatter={(value) => `$${value / 1000}K`}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(145, 63%, 42%)" 
                      strokeWidth={2}
                      fill="url(#revenueGrad)"
                      name="Revenue ($)"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="bookings" 
                      stroke="hsl(145, 50%, 55%)" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(145, 50%, 55%)" }}
                      name="Bookings"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* User Growth Chart */}
          {/*<Card>*/}
          {/*  <CardHeader>*/}
          {/*    <CardTitle className="text-lg font-semibold">User Growth</CardTitle>*/}
          {/*  </CardHeader>*/}
          {/*  <CardContent>*/}
          {/*    <div className="h-[300px]">*/}
          {/*      <ResponsiveContainer width="100%" height="100%">*/}
          {/*        <LineChart data={userGrowth}>*/}
          {/*          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />*/}
          {/*          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />*/}
          {/*          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />*/}
          {/*          <Tooltip */}
          {/*            contentStyle={{ */}
          {/*              backgroundColor: "hsl(var(--card))", */}
          {/*              border: "1px solid hsl(var(--border))",*/}
          {/*              borderRadius: "8px"*/}
          {/*            }}*/}
          {/*          />*/}
          {/*          <Legend />*/}
          {/*          <Line */}
          {/*            type="monotone" */}
          {/*            dataKey="customers" */}
          {/*            stroke="hsl(145, 63%, 42%)" */}
          {/*            strokeWidth={2}*/}
          {/*            dot={{ fill: "hsl(145, 63%, 42%)" }}*/}
          {/*            name="Customers"*/}
          {/*          />*/}
          {/*          <Line */}
          {/*            type="monotone" */}
          {/*            dataKey="providers" */}
          {/*            stroke="hsl(145, 40%, 70%)" */}
          {/*            strokeWidth={2}*/}
          {/*            dot={{ fill: "hsl(145, 40%, 70%)" }}*/}
          {/*            name="Service Providers"*/}
          {/*          />*/}
          {/*        </LineChart>*/}
          {/*      </ResponsiveContainer>*/}
          {/*    </div>*/}
          {/*  </CardContent>*/}
          {/*</Card>*/}
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Service Performance */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Service Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={servicePerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      width={80}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar 
                      dataKey="bookings" 
                      fill="hsl(145, 63%, 42%)" 
                      radius={[0, 4, 4, 0]}
                      name="Bookings"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Rating Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ratingDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="count"
                    >
                      {ratingDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {ratingDistribution.map((item) => (
                  <div key={item.rating} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-muted-foreground">{item.rating}</span>
                    </div>
                    <span className="font-medium">{item.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
