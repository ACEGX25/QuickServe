import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { PageTransition } from "@/components/layout/PageTransition";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  CreditCard,
  Phone,
  MessageSquare,
  Star,
  CheckCircle2,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type BookingDetail = {
  id: number;
  serviceTitle: string;
  providerId: number;
  providerName: string;
  status: "CONFIRMED" | "PENDING" | "COMPLETED" | "CANCELLED";
  startTime: string;
  endTime: string;
  price: number;
  durationHours: number;
  reviewed: boolean;
};






const statusStyles = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  CONFIRMED: "bg-emerald-100 text-emerald-700 border-emerald-200",
  COMPLETED: "bg-blue-100 text-blue-700 border-blue-200",
  CANCELLED: "bg-gray-100 text-gray-700 border-gray-200",
} as const;


const progressSteps = ["Requested", "Confirmed", "Completed"];

const BookingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const progressIndexMap: Record<BookingDetail["status"], number> = {
    PENDING: 0,
    CONFIRMED: 1,
    COMPLETED: 2,
    CANCELLED: 0,
  };



  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(
            `http://localhost:8080/api/bookings/my/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
        );

        if (!res.ok) throw new Error("Failed to fetch booking");

        const data = await res.json();
        setBooking(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);




  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-mint-50 flex items-center justify-center">
        <p className="text-muted-foreground">Booking not found</p>
      </div>
    );
  }

  const currentStep = progressIndexMap[booking.status];


  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading booking...</p>
        </div>
    );
  }

  if (!booking) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Booking not found</p>
        </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-mint-50 p-4 md:p-8">
      <PageTransition className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 -ml-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>

        {/* Main Booking Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="mb-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-emerald-800">
                {booking.serviceTitle}
              </h1>
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-medium border capitalize ${
                  statusStyles[booking.status]
                }`}
              >
                {booking.status}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100"
              >
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Date</span>
                </div>
                <p className="text-foreground font-semibold">{new Date(booking.startTime).toLocaleDateString()}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100"
              >
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Time & Duration</span>
                </div>
                <p className="text-foreground font-semibold">
                  {new Date(booking.startTime).toLocaleTimeString()} • {booking.durationHours} hour(s)
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100"
              >
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">Location</span>
                </div>
                {/*<p className="text-foreground font-semibold flex items-center gap-2">*/}
                {/*  <MapPin className="w-4 h-4 text-muted-foreground" />*/}
                {/*  {booking.location}*/}
                {/*</p>*/}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100"
              >
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm font-medium">Total Price</span>
                </div>
                <p className="text-foreground font-semibold text-xl">
                  ₹{booking.price}
                </p>
              </motion.div>
            </div>

            {/* Progress Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-2">
                {progressSteps.map((step, index) => (
                  <span
                    key={step}
                    className={`text-sm font-medium ${
                      index <= currentStep
                        ? "text-emerald-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step}
                  </span>
                ))}
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentStep + 1) / progressSteps.length) * 100}%`,
                  }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                />
              </div>
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* Provider Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard className="mb-6">
            <h3 className="text-lg font-semibold text-emerald-800 mb-4">
              Service Provider
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">
                  {booking.providerName}
                </p>
                {/*<div className="flex items-center gap-1 text-amber-500">*/}
                {/*  <Star className="w-4 h-4 fill-current" />*/}
                {/*  <span className="text-sm font-medium">*/}
                {/*    {booking.providerRating}*/}
                {/*  </span>*/}
                {/*</div>*/}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          <Button
            variant="outline"
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Provider
          </Button>
          <Button
            variant="outline"
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Message
          </Button>
        </motion.div>

        {booking.status === "COMPLETED" && !booking.reviewed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-4"
          >
            <Button
  onClick={() => navigate(`/booking/${booking.id}/review`)}
  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
>
  <Star className="w-4 h-4 mr-2" />
  Rate & Review
</Button>

          </motion.div>
        )}

        {booking.status === "PENDING" && !booking.reviewed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-4"
          >
            <Button
              variant="outline"
              className="w-full border-red-200 text-red-600 hover:bg-red-50"
            >
              Cancel Booking
            </Button>
          </motion.div>
        )}
      </PageTransition>
    </div>
  );
};

export default BookingDetails;
