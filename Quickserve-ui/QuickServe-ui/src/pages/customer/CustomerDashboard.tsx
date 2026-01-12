import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Search,
    MapPin,
    Filter,
    Star,
    Clock,
    DollarSign,
    Heart,
    Calendar,
    Home,
    Briefcase,
    Car,
    Scissors,
    Wrench,
    Zap,
} from "lucide-react";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Badge } from "@/components/ui/badge";
import { PageTransition, FadeInSection } from "@/components/layout/PageTransition";
import { cn } from "@/lib/utils";

const navItems = [
    { icon: Home, label: "Dashboard", path: "/customer" },
    { icon: Search, label: "Browse Services", path: "/customer/browse" },
    { icon: Calendar, label: "My Bookings", path: "/booking/confirm/:id" },
    { icon: Star, label: "Reviews", path: "/ReviewComponents" },
];

const categories = [
    { id: "all", label: "All Services", icon: Zap },
    { id: "home", label: "Home Services", icon: Home },
    { id: "auto", label: "Auto Services", icon: Car },
    { id: "beauty", label: "Beauty & Wellness", icon: Scissors },
    { id: "repair", label: "Repairs", icon: Wrench },
    { id: "professional", label: "Professional", icon: Briefcase },
];

const CustomerDashboard = () => {
    const navigate = useNavigate();

    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        async function fetchListings() {
            try {
                const res = await fetch("http://localhost:8080/api/listings/search");
                const data = await res.json();
                setServices(data.content || []);
            } catch (err) {
                console.error("Failed to load listings", err);
            } finally {
                setLoading(false);
            }
        }
        fetchListings();
    }, []);

    const filteredServices = services.filter((service) => {
        const title = service.title?.toLowerCase() || "";
        return title.includes(searchQuery.toLowerCase());
    });

    const toggleFavorite = (id: number) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        );
    };

    return (
    <DashboardLayout role="customer" navItems={navItems}>
      <PageTransition>
        <div className="space-y-8">
          {/* Hero Section */}
          <FadeInSection>
            <div className="relative rounded-3xl bg-gradient-to-r from-primary via-emerald-light to-accent p-8 lg:p-12 overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/30 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-mint/40 blur-3xl" />
              </div>
              <div className="relative z-10">
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-2">
                  Find Your Perfect Service
                </h1>
                <p className="text-primary-foreground/80 text-lg mb-6">
                  Discover trusted local professionals near you
                </p>

                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 bg-card/95 border-0 text-foreground placeholder:text-muted-foreground rounded-xl text-base"
                    />
                  </div>
                  <div className="relative sm:w-48">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Location"
                      className="pl-12 h-14 bg-card/95 border-0 text-foreground placeholder:text-muted-foreground rounded-xl"
                    />
                  </div>
                  <AnimatedButton className="h-14 px-8 bg-forest hover:bg-forest/90 text-primary-foreground rounded-xl">
                    <Filter className="h-5 w-5 mr-2" />
                    Filter
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Categories */}
          <FadeInSection delay={0.1}>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-300",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <category.icon className="h-5 w-5" />
                  {category.label}
                </motion.button>
              ))}
            </div>
          </FadeInSection>

          {/* Services Grid */}
          <FadeInSection delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <GlassCard variant="glow" className="p-0 overflow-hidden group">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                      <button
                        onClick={() => toggleFavorite(service.id)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
                      >
                        <Heart
                          className={cn(
                            "h-5 w-5 transition-colors",
                            favorites.includes(service.id)
                              ? "fill-destructive text-destructive"
                              : "text-muted-foreground"
                          )}
                        />
                      </button>
                      <Badge
                        className={cn(
                          "absolute bottom-4 left-4",
                          service.available
                            ? "bg-primary/90 hover:bg-primary"
                            : "bg-muted-foreground/90"
                        )}
                      >
                        {service.available ? "Available Now" : "Fully Booked"}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-display font-semibold text-lg text-foreground">
                            {service.name}
                          </h3>
                          <p className="text-muted-foreground text-sm">{service.provider}</p>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-semibold">{service.rating}</span>
                          <span className="text-muted-foreground text-sm">
                            ({service.reviews})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {service.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          30-60 min
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-5 w-5 text-primary" />
                          <span className="text-xl font-bold text-foreground">
                            {service.price}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            /{service.priceUnit}
                          </span>
                        </div>

                          <AnimatedButton
                              glowOnHover
                              onClick={() =>
                                  navigate("/bookingcalendar", {
                                      state: { serviceListingId: service.id },
                                  })
                              }
                          >
                              Book Now
                          </AnimatedButton>

                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </FadeInSection>

          {filteredServices.length === 0 && (
            <FadeInSection>
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No services found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </FadeInSection>
          )}
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
