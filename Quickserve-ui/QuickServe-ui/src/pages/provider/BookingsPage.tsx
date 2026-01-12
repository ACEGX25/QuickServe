import { useState } from "react";
import {DashboardLayout} from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/layout/DashboardLayout.tsx";
import { Card, CardContent } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/card.tsx";
import { Button } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/button.tsx";
import { Badge } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/badge.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/dialog.tsx";
import {
  X,
  MessageSquare,
  MapPin,
  CreditCard,
  Calendar,
  Clock,
  DollarSign,
  Home,
  Users,
  Shield,
  BarChart3, Settings, Star, Ticket, WrenchIcon
} from "lucide-react";

type BookingStatus = "all" | "pending" | "confirmed" | "completed" | "cancelled";

interface Booking {
  id: string;
  service: string;
  customer: string;
  date: string;
  time: string;
  price: number;
  status: BookingStatus;
  location: string;
  paymentMethod?: string;
  paymentDate?: string;
  transactionId?: string;
}

const bookings: Booking[] = [
  { id: "1", service: "Home Cleaning", customer: "Malhaar Patil", date: "4th Jan", time: "11:30 AM - 12:30 PM", price: 1200, status: "cancelled", location: "ABC Colony, Shivajinagar, Pune" },
  { id: "2", service: "Home Cleaning", customer: "Malhaar Patil", date: "4th Jan", time: "9:30 AM - 12:30 PM", price: 1200, status: "pending", location: "DEF Tower, Viman Nagar, Pune" },
  { id: "3", service: "Home Cleaning", customer: "Malhaar Patil", date: "4th Jan", time: "11:30 AM - 12:30 PM", price: 1200, status: "pending", location: "GHI Apartments, Koregaon Park, Pune" },
  { id: "4", service: "Home Cleaning", customer: "Malhaar Patil", date: "4th Jan", time: "11:30 AM - 12:30 PM", price: 1200, status: "confirmed", location: "JKL Society, Hinjewadi, Pune" },
  { id: "5", service: "Home Cleaning", customer: "Malhaar Patil", date: "4th Jan", time: "11:30 AM - 12:30 PM", price: 1200, status: "completed", location: "MNO Residency, Baner, Pune", paymentMethod: "UPI", paymentDate: "4th Jan, 1:00 PM", transactionId: "TXN123456789" },
  { id: "6", service: "Home Cleaning", customer: "Malhaar Patil", date: "4th Jan", time: "12:30 PM", price: 1200, status: "cancelled", location: "PQR Heights, Wakad, Pune" },
];

const statusFilters: { label: string; value: BookingStatus }[] = [
  { label: "All Requests", value: "all" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Pending", value: "pending" },
  { label: "Cancelled", value: "cancelled" },
];

const getStatusBadge = (status: BookingStatus) => {
  const styles: Record<BookingStatus, string> = {
    all: "",
    pending: "bg-warning/10 text-warning border-warning/30",
    confirmed: "bg-primary/10 text-primary border-primary/30",
    completed: "bg-foreground/90 text-background",
    cancelled: "bg-destructive/10 text-destructive border-destructive/30",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const BookingsPage = () => {
  const [activeFilter, setActiveFilter] = useState<BookingStatus>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredBookings = bookings.filter(
    (booking) => activeFilter === "all" || booking.status === activeFilter
  );

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setDialogOpen(true);
  };

  const getActionButton = (booking: Booking) => {
    switch (booking.status) {
      case "pending":
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
              Cancel
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Accept
            </Button>
          </div>
        );
      case "confirmed":
        return (
          <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => handleViewDetails(booking)}>
            View Details
          </Button>
        );
      case "completed":
        return (
          <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => handleViewDetails(booking)}>
            View Payment
          </Button>
        );
      case "cancelled":
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
              Cancel
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Accept
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/provider" },
    { icon: Calendar, label: "Bookings", path: "/provider/bookings" },
    { icon: Star, label: "Reviews", path: "/provider/reviews" },
    { icon: Settings, label: "Settings", path: "/providerprofile" },
    {icon : Ticket, label: "Listing", path: "/provider/listings"},
    {icon: WrenchIcon, label: "Services", path:"/provider/services"}
  ];

  return (
    <DashboardLayout role={"provider"} navItems={navItems}>
      <div className="space-y-6">
        <div>
          <h1 className="page-title">Your Requests</h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {statusFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.value)}
              className={activeFilter === filter.value ? "bg-foreground text-background hover:bg-foreground/90" : ""}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{booking.service}</h3>
                  {getStatusBadge(booking.status)}
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-muted-foreground">{booking.customer}</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.date} • {booking.time}
                  </p>
                  <p className="text-sm font-medium">Price - ₹{booking.price}</p>
                </div>

                {getActionButton(booking)}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No bookings found for this filter.</p>
          </div>
        )}
      </div>

      {/* Booking Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">{selectedBooking?.service}</DialogTitle>
            </div>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4">
              {getStatusBadge(selectedBooking.status)}

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date -</p>
                    <p className="font-medium">{selectedBooking.date} {selectedBooking.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Price -</p>
                    <p className="font-medium">₹{selectedBooking.price}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Customer -</p>
                    <p className="font-medium">{selectedBooking.customer}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location -</p>
                    <p className="font-medium">{selectedBooking.location}</p>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      Open Maps
                    </Button>
                  </div>
                </div>

                {/* Payment Details for Completed Bookings */}
                {selectedBooking.status === "completed" && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Payment Details
                    </h4>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Payment Method</span>
                        <span className="font-medium">{selectedBooking.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Payment Date</span>
                        <span className="font-medium">{selectedBooking.paymentDate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Transaction ID</span>
                        <span className="font-medium font-mono text-xs">{selectedBooking.transactionId}</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t">
                        <span className="font-medium">Total Received</span>
                        <span className="font-semibold text-primary">₹{selectedBooking.price}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default BookingsPage;
