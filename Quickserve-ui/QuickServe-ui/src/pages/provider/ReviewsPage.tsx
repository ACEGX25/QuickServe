import { useState } from "react";
import {DashboardLayout} from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/layout/DashboardLayout.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/card.tsx";
import { Badge } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/badge.tsx";
import { Button } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/button.tsx";
import { Avatar, AvatarFallback } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/avatar.tsx";
import { Progress } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/progress.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/select.tsx";
import {
  Star,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
  Filter,
  Home,
  Users,
  Shield,
  BarChart3,
  Settings, Calendar, Ticket, WrenchIcon
} from "lucide-react";

interface Review {
  id: string;
  customerName: string;
  customerInitials: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  replied: boolean;
}

const reviews: Review[] = [
  {
    id: "1",
    customerName: "Sarah Johnson",
    customerInitials: "SJ",
    service: "Professional Plumbing",
    rating: 5,
    comment: "Excellent service! Very professional and completed the work on time. Would definitely recommend to others. The quality of work exceeded my expectations.",
    date: "Jan 10, 2026",
    helpful: 12,
    replied: true,
  },
  {
    id: "2",
    customerName: "Mike Chen",
    customerInitials: "MC",
    service: "Emergency Repairs",
    rating: 4,
    comment: "Good work overall. Arrived on time and fixed the issue quickly. Communication could be slightly better but happy with the result.",
    date: "Jan 8, 2026",
    helpful: 8,
    replied: false,
  },
  {
    id: "3",
    customerName: "Emma Davis",
    customerInitials: "ED",
    service: "Home Cleaning",
    rating: 5,
    comment: "Amazing attention to detail! My house has never looked cleaner. Very thorough and friendly service. Will book again!",
    date: "Jan 6, 2026",
    helpful: 15,
    replied: true,
  },
  {
    id: "4",
    customerName: "James Wilson",
    customerInitials: "JW",
    service: "Electrical Work",
    rating: 3,
    comment: "Decent service but took longer than expected. The work was done well but I had to wait an extra hour.",
    date: "Jan 4, 2026",
    helpful: 3,
    replied: false,
  },
  {
    id: "5",
    customerName: "Lisa Martinez",
    customerInitials: "LM",
    service: "Pipe Installation",
    rating: 5,
    comment: "Fantastic job! Very knowledgeable and explained everything clearly. Fair pricing and great quality work.",
    date: "Jan 2, 2026",
    helpful: 20,
    replied: true,
  },
];

const ratingDistribution = [
  { stars: 5, count: 42, percentage: 65 },
  { stars: 4, count: 18, percentage: 28 },
  { stars: 3, count: 3, percentage: 5 },
  { stars: 2, count: 1, percentage: 1 },
  { stars: 1, count: 1, percentage: 1 },
];
const navItems = [
  { icon: Home, label: "Dashboard", path: "/provider" },
  { icon: Calendar, label: "Bookings", path: "/provider/bookings" },
  { icon: Star, label: "Reviews", path: "/provider/reviews" },
  { icon: Settings, label: "Settings", path: "/providerprofile" },
  {icon : Ticket, label: "Listing", path: "/provider/listings"},
  {icon: WrenchIcon, label: "Services", path:"/provider/services"}
];

const ReviewsPage = () => {
  const [filterService, setFilterService] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const averageRating = 4.8;
  const totalReviews = 65;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? "text-warning fill-warning" 
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout role={"provider"} navItems={navItems}>
      <div className="space-y-6">
        <div>
          <h1 className="page-title">Reviews</h1>
          <p className="text-muted-foreground mt-1">See what your customers are saying about your services.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overall Rating */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-foreground mb-2">{averageRating}</div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(averageRating))}
                </div>
                <p className="text-sm text-muted-foreground">Based on {totalReviews} reviews</p>
                
                <div className="flex items-center justify-center gap-2 mt-4 text-primary">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+0.2 from last month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rating Distribution */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{item.stars}</span>
                    <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                  </div>
                  <Progress value={item.percentage} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {item.count}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          
          <Select value={filterService} onValueChange={setFilterService}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="plumbing">Professional Plumbing</SelectItem>
              <SelectItem value="repairs">Emergency Repairs</SelectItem>
              <SelectItem value="cleaning">Home Cleaning</SelectItem>
              <SelectItem value="electrical">Electrical Work</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {review.customerInitials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-foreground">{review.customerName}</h4>
                          {review.replied && (
                            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                              Replied
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                          <span>{review.service}</span>
                          <span>•</span>
                          <span>{review.date}</span>
                        </div>
                        <div className="mb-3">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{review.comment}</p>
                    
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Helpful ({review.helpful})
                      </Button>
                      
                      {!review.replied && (
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" className="px-8">
            Load More Reviews
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReviewsPage;
