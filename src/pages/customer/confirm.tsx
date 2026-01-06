import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, User, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ConfirmBooking = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8"
      >
        <h1 className="text-2xl font-bold mb-2">Confirm Your Booking</h1>
        <p className="text-gray-500 mb-6">
          Please review the details before confirming
        </p>

        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex items-center gap-3">
            <User className="text-green-600" />
            Dustin (Provider)
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-green-600" />
            Monday, Jan 23 · 2:00 – 4:00 PM
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="text-green-600" />
            123 Main Street, Hawkins
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-green-600" />
            Duration: 2 hours
          </div>
        </div>

        <div className="border-t mt-6 pt-4 text-sm">
          <div className="flex justify-between">
            <span>Service price</span>
            <span>$30</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Taxes & fees</span>
            <span>$5</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2 text-green-700">
            <span>Total</span>
            <span>$65</span>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="w-full border border-gray-300 rounded-xl py-3"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              setShowSuccess(true);
              setTimeout(() => {
                navigate("/booking/confirm/:id");
              }, 2500);
            }}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white rounded-xl py-3 font-semibold"
          >
            Confirm Booking
          </button>
        </div>
      </motion.div>

      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 40 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-green-50 border border-green-200 rounded-3xl px-8 py-6 shadow-2xl text-center max-w-sm"
            >
              <CheckCircle className="h-14 w-14 text-green-600 mx-auto mb-3" />

              <h2 className="text-xl font-bold text-green-800">
                Booking Confirmed 🎉
              </h2>

              <p className="text-green-700 mt-2">
                Your service has been successfully booked.
              </p>

              <p className="text-sm text-green-500 mt-3">
                Redirecting to your bookings…
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConfirmBooking;
