import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  Star,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle, Ticket, WrenchIcon,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageTransition, FadeInSection } from "@/components/layout/PageTransition";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/provider" },
  { icon: Calendar, label: "Bookings", path: "/provider/bookings" },
  { icon: Star, label: "Reviews", path: "/provider/reviews" },
  { icon: Settings, label: "Settings", path: "/providerprofile" },
  {icon : Ticket, label: "Listing", path: "/provider/listings"},
  {icon: WrenchIcon, label: "Services", path:"/provider/services"}
];

const services = [
  {
    id: 1,
    name: "Professional Plumbing",
    price: 75,
    priceUnit: "hour",
    bookings: 24,
    rating: 4.9,
    status: "active",
  },
  {
    id: 2,
    name: "Emergency Repairs",
    price: 120,
    priceUnit: "service",
    bookings: 18,
    rating: 4.8,
    status: "active",
  },
  {
    id: 3,
    name: "Pipe Installation",
    price: 200,
    priceUnit: "job",
    bookings: 12,
    rating: 4.7,
    status: "draft",
  },
];

const upcomingBookings = [
  {
    id: 1,
    customer: "Sarah Johnson",
    service: "Professional Plumbing",
    date: "Today",
    time: "2:00 PM",
    status: "confirmed",
  },
  {
    id: 2,
    customer: "Mike Chen",
    service: "Emergency Repairs",
    date: "Tomorrow",
    time: "10:00 AM",
    status: "pending",
  },
  {
    id: 3,
    customer: "Emma Davis",
    service: "Pipe Installation",
    date: "Jan 5",
    time: "3:30 PM",
    status: "confirmed",
  },
];

const stats = [
  {
    label: "Total Bookings",
    value: "54",
    change: "+12%",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Revenue",
    value: "$4,230",
    change: "+8%",
    icon: DollarSign,
    color: "text-emerald-light",
    bgColor: "bg-emerald-light/10",
  },
  {
    label: "Customers",
    value: "38",
    change: "+15%",
    icon: Users,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "Rating",
    value: "4.8",
    change: "+0.2",
    icon: Star,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
];

const statusIcons = {
  confirmed: CheckCircle,
  pending: AlertCircle,
  cancelled: XCircle,
};

const statusColors = {
  confirmed: "text-primary bg-primary/10",
  pending: "text-amber-500 bg-amber-500/10",
  cancelled: "text-destructive bg-destructive/10",
};

const ProviderDashboard = () => {
  const profileCompletion = 75;

  return (
    <DashboardLayout role="provider" navItems={navItems}>
      <PageTransition>
        <div className="space-y-8">
          {/* Profile Completion Banner */}
          {profileCompletion < 100 && (
            <FadeInSection>
              <GlassCard className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                      Complete Your Profile
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      A complete profile helps you attract more customers
                    </p>
                    <div className="flex items-center gap-4">
                      <Progress value={profileCompletion} className="flex-1 h-2" />
                      <span className="text-sm font-medium text-primary">
                        {profileCompletion}%
                      </span>
                    </div>
                  </div>
                  <AnimatedButton className="bg-primary hover:bg-primary/90">
                    Complete Profile
                  </AnimatedButton>
                </div>
              </GlassCard>
            </FadeInSection>
          )}

          {/* Stats Grid */}
          <FadeInSection delay={0.1}>
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
                      <span className="text-xs font-medium text-primary flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
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

          <div className="grid lg:grid-cols-2 gap-8">
            {/* My Services */}
            <FadeInSection delay={0.2}>
              <GlassCard className="h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-bold text-foreground">
                    My Services
                  </h2>
                  <AnimatedButton size="sm" className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </AnimatedButton>
                </div>

                <div className="space-y-4">
                  {services.map((service) => (
                    <motion.div
                      key={service.id}
                      className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">
                              {service.name}
                            </h3>
                            <Badge
                              variant={service.status === "active" ? "default" : "secondary"}
                              className={
                                service.status === "active"
                                  ? "bg-primary/20 text-primary"
                                  : ""
                              }
                            >
                              {service.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {service.price}/{service.priceUnit}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {service.bookings} bookings
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                              {service.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </FadeInSection>

            {/* Upcoming Bookings */}
            <FadeInSection delay={0.3}>
              <GlassCard className="h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-bold text-foreground">
                    Upcoming Bookings
                  </h2>
                  <Button variant="ghost" className="text-primary">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {upcomingBookings.map((booking) => {
                    const StatusIcon = statusIcons[booking.status as keyof typeof statusIcons];
                    return (
                      <motion.div
                        key={booking.id}
                        className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-primary font-semibold">
                                {booking.customer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {booking.customer}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {booking.service}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 justify-end mb-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-foreground">
                                {booking.date}, {booking.time}
                              </span>
                            </div>
                            <div
                              className={cn(
                                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                                statusColors[booking.status as keyof typeof statusColors]
                              )}
                            >
                              <StatusIcon className="h-3 w-3" />
                              {booking.status}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </GlassCard>
            </FadeInSection>
          </div>

          {/* Booking Calendar Preview */}
          <FadeInSection delay={0.4}>
            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold text-foreground">
                  This Week's Schedule
                </h2>
                <Button variant="ghost" className="text-primary">
                  Manage Calendar
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                  <div key={day} className="text-center">
                    <p className="text-sm font-medium text-muted-foreground mb-2">{day}</p>
                    <div
                      className={cn(
                        "aspect-square rounded-xl flex flex-col items-center justify-center transition-colors",
                        index === 0
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50 hover:bg-secondary"
                      )}
                    >
                      <span className="text-lg font-bold">{index + 1}</span>
                      {index < 3 && (
                        <span className="text-xs opacity-80">
                          {Math.floor(Math.random() * 4) + 1} slots
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeInSection>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default ProviderDashboard;
