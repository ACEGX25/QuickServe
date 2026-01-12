import {DashboardLayout} from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/layout/DashboardLayout.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/card.tsx";
import { Badge } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/badge.tsx";
import { Button } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/button.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/tabs.tsx";
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  RefreshCw,
  Home,
  Users,
  Shield,
  BarChart3, Settings, Calendar, Star, Ticket, WrenchIcon
} from "lucide-react";

type ListingStatus = "approved" | "pending" | "rejected" | "under_review";

interface ServiceListing {
  id: string;
  name: string;
  category: string;
  submittedDate: string;
  status: ListingStatus;
  reviewDate?: string;
  reason?: string;
  price: number;
}

const listings: ServiceListing[] = [
  {
    id: "1",
    name: "Professional Plumbing",
    category: "Plumbing",
    submittedDate: "Jan 2, 2026",
    status: "approved",
    reviewDate: "Jan 3, 2026",
    price: 1500,
  },
  {
    id: "2",
    name: "Emergency Repairs",
    category: "Repairs",
    submittedDate: "Jan 3, 2026",
    status: "approved",
    reviewDate: "Jan 4, 2026",
    price: 2000,
  },
  {
    id: "3",
    name: "Home Cleaning",
    category: "Cleaning",
    submittedDate: "Jan 5, 2026",
    status: "pending",
    price: 1200,
  },
  {
    id: "4",
    name: "Electrical Work",
    category: "Electrical",
    submittedDate: "Jan 6, 2026",
    status: "under_review",
    price: 1800,
  },
  {
    id: "5",
    name: "AC Installation",
    category: "AC Repair",
    submittedDate: "Jan 4, 2026",
    status: "rejected",
    reviewDate: "Jan 5, 2026",
    reason: "Service description needs more details. Please update and resubmit.",
    price: 2500,
  },
];

const getStatusConfig = (status: ListingStatus) => {
  const configs = {
    approved: {
      label: "Approved",
      icon: CheckCircle,
      className: "bg-primary/10 text-primary border-primary/30",
      iconColor: "text-primary",
    },
    pending: {
      label: "Pending",
      icon: Clock,
      className: "bg-warning/10 text-warning border-warning/30",
      iconColor: "text-warning",
    },
    rejected: {
      label: "Rejected",
      icon: XCircle,
      className: "bg-destructive/10 text-destructive border-destructive/30",
      iconColor: "text-destructive",
    },
    under_review: {
      label: "Under Review",
      icon: AlertCircle,
      className: "bg-blue-500/10 text-blue-600 border-blue-500/30",
      iconColor: "text-blue-500",
    },
  };
  return configs[status];
};

const navItems = [
  { icon: Home, label: "Dashboard", path: "/provider" },
  { icon: Calendar, label: "Bookings", path: "/provider/bookings" },
  { icon: Star, label: "Reviews", path: "/provider/reviews" },
  { icon: Settings, label: "Settings", path: "/providerprofile" },
  {icon : Ticket, label: "Listing", path: "/provider/listings"},
  {icon: WrenchIcon, label: "Services", path:"/provider/services"}
];

const ListingStatusPage = () => {
  const approvedCount = listings.filter(l => l.status === "approved").length;
  const pendingCount = listings.filter(l => l.status === "pending" || l.status === "under_review").length;
  const rejectedCount = listings.filter(l => l.status === "rejected").length;

  return (
    <DashboardLayout role={'provider'} navItems={navItems}>
      <div className="space-y-6">
        <div>
          <h1 className="page-title">Listing Status</h1>
          <p className="text-muted-foreground mt-1">Track the approval status of your service listings.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{approvedCount}</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-warning/20">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/20">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{rejectedCount}</p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Listings Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Listings</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <div className="space-y-4">
              {listings.filter(l => l.status === "approved").map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="space-y-4">
              {listings.filter(l => l.status === "pending" || l.status === "under_review").map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            <div className="space-y-4">
              {listings.filter(l => l.status === "rejected").map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

const ListingCard = ({ listing }: { listing: ServiceListing }) => {
  const statusConfig = getStatusConfig(listing.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusConfig.className}`}>
              <StatusIcon className={`w-5 h-5 ${statusConfig.iconColor}`} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground">{listing.name}</h3>
                <Badge variant="outline" className={statusConfig.className}>
                  {statusConfig.label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {listing.category} • ₹{listing.price}
              </p>
              <p className="text-xs text-muted-foreground">
                Submitted on {listing.submittedDate}
                {listing.reviewDate && ` • Reviewed on ${listing.reviewDate}`}
              </p>
              
              {listing.status === "rejected" && listing.reason && (
                <div className="mt-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive font-medium">Rejection Reason:</p>
                  <p className="text-sm text-muted-foreground mt-1">{listing.reason}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {listing.status === "rejected" && (
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <RefreshCw className="w-4 h-4 mr-2" />
                Resubmit
              </Button>
            )}
            {listing.status === "pending" && (
              <Button size="sm" variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
            <Button size="sm" variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingStatusPage;
