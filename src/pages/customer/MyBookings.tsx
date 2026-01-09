import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/layout/PageTransition";
import { GlassCard } from "@/components/ui/GlassCard";
import { Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const bookings = [
  {
    id: "1",
    serviceName: "Home Cleaning",
    date: "Dec 25, 2024",
    time: "10:00 AM",
    duration: "3 Hours",
    location: "123 Main Street, NY",
    price: 1200,
    status: "confirmed" as const,
  },
  {
    id: "2",
    serviceName: "Plumbing Repair",
    date: "Dec 28, 2024",
    time: "2:00 PM",
    duration: "2 Hours",
    location: "456 Oak Avenue, NY",
    price: 800,
    status: "pending" as const,
  },
  {
    id: "3",
    serviceName: "Electrical Work",
    date: "Dec 30, 2024",
    time: "11:00 AM",
    duration: "4 Hours",
    location: "789 Pine Road, NY",
    price: 1500,
    status: "completed" as const,
  },
];

const statusStyles = {
  confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  completed: "bg-blue-100 text-blue-700 border-blue-200",
};

const MyBookings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-mint-50 p-4 md:p-8">
      <PageTransition className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 -ml-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800">
            My Bookings
          </h1>
          <p className="text-emerald-600 mt-2">
            Track and manage your service appointments
          </p>
        </motion.div>

        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard
                className="cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => navigate(`/booking/${booking.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-emerald-800">
                      {booking.serviceName}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {booking.date} • {booking.time}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border capitalize ${
                      statusStyles[booking.status]
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {bookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold text-emerald-800 mb-2">
              No bookings yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Start by booking a service from our catalog
            </p>
            <Button
              onClick={() => navigate("/customer")}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600"
            >
              Browse Services
            </Button>
          </motion.div>
        )}
      </PageTransition>
    </div>
  );
};

export default MyBookings;
