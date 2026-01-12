import {DashboardLayout} from "@/components/layout/DashboardLayout.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  Home,
  Users,
  Shield,
  BarChart3,
  Settings
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";



const getStatusVariant = (status: string) => {
  switch (status) {
    case "Active":
      return "default";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "outline";
    default:
      return "secondary";
  }
};

const navItems = [
  { icon: Home, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Shield, label: "Approvals", path: "/admin/approvals" },
  { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const UsersPage = () => {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then(res => res.json())
        .then(setUsers);
  }, [token]);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/admin/users/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
        .then(res => res.json())
        .then(setStats);
  }, [token]);



  return (
    <DashboardLayout role={"admin"} navItems={navItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="page-title">Users</h1>
            <p className="text-muted-foreground mt-1">Manage all registered users and service providers</p>
          </div>
          <Button>
            Add New User
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold text-primary">
                {stats?.totalUsers}
              </p>

            </CardContent>
          </Card>
          <Card>
          <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Service Providers</p>
            <p className="text-2xl font-bold">
              {stats?.serviceProviders}
            </p>

          </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Customers</p>
              <p className="text-2xl font-bold">
                {stats?.customers}
              </p>

            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="provider">Service Provider</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {user.name
                                ?.split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === "Service Provider" ? "default" : "secondary"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{user.joinDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{user.bookings}</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Suspend User</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
