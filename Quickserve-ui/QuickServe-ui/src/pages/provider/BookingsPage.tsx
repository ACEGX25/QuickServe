import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock, Clock1Icon,
  Home,
  Settings,
  Star,
  Ticket,
  WrenchIcon,
} from "lucide-react";

/* ================= TYPES ================= */

type BookingStatusFilter = "all" | "pending" | "confirmed" | "completed" | "cancelled";

type BackendBookingStatus =
    | "PENDING"
    | "CONFIRMED"
    | "COMPLETED"
    | "CANCELLED";

interface ProviderBooking {
  id: number;
  serviceTitle: string;
  customerName: string;
  startTime: string; // ISO datetime
  status: BackendBookingStatus;
}

/* ================= UTILS ================= */

const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
};

const getStatusBadge = (status: BackendBookingStatus) => {
  const styles: Record<BackendBookingStatus, string> = {
    PENDING: "bg-warning/10 text-warning border-warning/30",
    CONFIRMED: "bg-primary/10 text-primary border-primary/30",
    COMPLETED: "bg-foreground/90 text-background",
    CANCELLED: "bg-destructive/10 text-destructive border-destructive/30",
  };

  return (
      <Badge variant="outline" className={styles[status]}>
        {status}
      </Badge>
  );
};

const API_BASE =import.meta.env.VITE_API_BASE_URL;

/* ================= COMPONENT ================= */

const BookingsPage = () => {
  const [bookings, setBookings] = useState<ProviderBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<BookingStatusFilter>("all");

  /* ---------- FETCH PROVIDER BOOKINGS ---------- */
  useEffect(() => {
    const fetchProviderBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        setLoading(true);
        const res = await fetch(
            `${API_BASE}/bookings/provider`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );

        if (!res.ok) throw new Error("Failed to fetch provider bookings");

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("PROVIDER BOOKINGS ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProviderBookings();
  }, []);

  /* ---------- ACCEPT / REJECT ---------- */
  const updateStatus = async (id: number, action: "accept" | "reject") => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(
          `${API_BASE}/bookings/${id}/${action}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      if (!res.ok) throw new Error("Failed to update booking");

      setBookings((prev) =>
          prev.map((b) =>
              b.id === id
                  ? {
                    ...b,
                    status: action === "accept" ? "CONFIRMED" : "CANCELLED",
                  }
                  : b
          )
      );
    } catch (err) {
      console.error("UPDATE STATUS ERROR:", err);
    }
  };

  const markCompleted = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(
          `${API_BASE}/bookings/${id}/completed`,
          {
            method: "PATCH", // or POST if backend expects POST
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      if (!res.ok) throw new Error("Failed to mark completed");

      setBookings((prev) =>
          prev.map((b) =>
              b.id === id ? { ...b, status: "COMPLETED" } : b
          )
      );
    } catch (err) {
      console.error("MARK COMPLETED ERROR:", err);
    }
  };


  /* ---------- FILTER ---------- */
  const filteredBookings =
      activeFilter === "all"
          ? bookings
          : bookings.filter(
              (b) => b.status === activeFilter.toUpperCase()
          );

  /* ---------- NAV ---------- */
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/provider" },
    { icon: Calendar, label: "Bookings", path: "/provider/bookings" },
    { icon: Star, label: "Reviews", path: "/provider/reviews" },
    { icon: Settings, label: "Settings", path: "/providerprofile" },
    { icon: Ticket, label: "Listing", path: "/provider/listings" },
    { icon: WrenchIcon, label: "Services", path: "/provider/services" },
    {icon : Clock1Icon, label: "Availability", path: "/provider/availability"}
  ];

  return (
      <DashboardLayout role="provider" navItems={navItems}>
        <div className="space-y-6">
          <h1 className="page-title">Your Requests</h1>

          {/* FILTER TABS */}
          <div className="flex gap-2 flex-wrap">
            {["all", "pending", "confirmed", "completed", "cancelled"].map(
                (f) => (
                    <Button
                        key={f}
                        size="sm"
                        variant={activeFilter === f ? "default" : "outline"}
                        onClick={() => setActiveFilter(f as BookingStatusFilter)}
                    >
                      {f.toUpperCase()}
                    </Button>
                )
            )}
          </div>

          {/* CONTENT */}
          {loading && <p>Loading bookings...</p>}

          {!loading && filteredBookings.length === 0 && (
              <p className="text-muted-foreground">
                No bookings found.
              </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookings.map((booking) => {
              const { date, time } = formatDateTime(booking.startTime);

              return (
                  <Card key={booking.id}>
                    <CardContent className="p-5 space-y-3">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">
                          {booking.serviceTitle}
                        </h3>
                        {getStatusBadge(booking.status)}
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {booking.customerName}
                      </p>

                      <div className="text-sm text-muted-foreground">
                        📅 {date} • ⏰ {time}
                      </div>



                      {booking.status === "PENDING" && (
                          <div className="flex gap-2 pt-2">
                            <Button
                                size="sm"
                                className="bg-primary"
                                onClick={() =>
                                    updateStatus(booking.id, "accept")
                                }
                            >
                              Accept
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="text-destructive"
                                onClick={() =>
                                    updateStatus(booking.id, "reject")
                                }
                            >
                              Decline
                            </Button>

                          </div>

                      )}
                      {booking.status === "CONFIRMED" && (
                          <div className="pt-2">
                            <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700 w-full"
                                onClick={() => markCompleted(booking.id)}
                            >
                              Mark as Completed
                            </Button>
                          </div>
                      )}

                    </CardContent>
                  </Card>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
  );
};

export default BookingsPage;
