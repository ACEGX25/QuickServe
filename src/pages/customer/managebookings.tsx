import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Clock, MapPin, ArrowLeft } from "lucide-react";

const bookings = [
  {
    id: "1",
    service: "Home Cleaning",
    date: "Dec 25, 2024",
    time: "10:00 AM",
    status: "Confirmed",
    price: "₹1200",
    location: "123 Main Street, NY",
    duration: "3 Hours",
  },
  {
    id: "2",
    service: "Plumbing Repair",
    date: "Dec 28, 2024",
    time: "2:00 PM",
    status: "Pending",
    price: "₹800",
    location: "22 Park Lane, NY",
    duration: "1.5 Hours",
  },
];

function MyBookings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 p-10">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-green-700"
      >
        My Bookings
      </motion.h1>
      <p className="text-green-600 mt-1">Track and manage your service appointments</p>

      <div className="mt-8 space-y-4">
        {bookings.map((b) => (
          <motion.div
            key={b.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/booking/${b.id}`)}
            className="cursor-pointer bg-white rounded-2xl shadow-md border border-green-100 p-6 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold text-green-800">{b.service}</h2>
              <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                <Clock size={14} /> {b.date} • {b.time}
              </p>
            </div>

            <span
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                b.status === "Confirmed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {b.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = bookings.find((b) => b.id === id);

  if (!booking) return null;

  return (
    <div className="min-h-screen bg-green-50 p-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-green-700 font-medium mb-6"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl border border-green-100 p-8 max-w-2xl"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-green-800">{booking.service}</h2>
          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full">
            {booking.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <InfoCard label="Date" value={booking.date} />
          <InfoCard label="Time & Duration" value={`${booking.time} • ${booking.duration}`} />
          <InfoCard label="Location" value={booking.location} icon={<MapPin size={16} />} />
          <InfoCard label="Total Price" value={booking.price} />
        </div>

        {/* PROGRESS */}
        <div className="mt-10">
          <div className="flex justify-between text-sm text-green-700">
            <span>Requested</span>
            <span>Confirmed</span>
            <span>Completed</span>
          </div>
          <div className="relative mt-3 h-2 bg-green-100 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "66%" }}
              className="absolute h-2 bg-green-500 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}


const ManageBookings = () => {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-2xl font-bold text-green-700">
        Manage Bookings
      </h1>
    </div>
  );
};

export default ManageBookings;


function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode; // ✅ OPTIONAL
}): JSX.Element {
  return (
    <div className="bg-green-50 rounded-xl p-4">
      <p className="text-xs text-green-600 mb-1">{label}</p>
      <p className="text-sm font-medium text-green-800 flex items-center gap-2">
        {icon && icon}
        {value}
      </p>
    </div>
  );
}


