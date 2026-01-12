import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const formatTimeRange = (time: string) => {
  const hour = parseInt(time.split(":")[0]);
  const start = hour % 12 === 0 ? 12 : hour % 12;
  const endRaw = hour + 1;
  const end = endRaw % 12 === 0 ? 12 : endRaw % 12;
  const startPeriod = hour >= 12 ? "PM" : "AM";
  const endPeriod = endRaw >= 12 ? "PM" : "AM";
  return `${start}:00 ${startPeriod} - ${end}:00 ${endPeriod}`;
};

const BookingDateTime = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () =>
    setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () =>
    setCurrentMonth(new Date(year, month + 1, 1));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 cursor-pointer">
          ← Back to Service Details
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          Select Date & Time
        </h1>
        <p className="text-gray-600">
          Choose an available slot for your appointment
        </p>
      </div>

      {/* Main Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">
              {currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={prevMonth}
                className="rounded-lg border p-2 hover:bg-gray-100"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextMonth}
                className="rounded-lg border p-2 hover:bg-gray-100"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-2">
            {DAYS.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const date = new Date(year, month, i + 1);
              const isSelected =
                selectedDate?.toDateString() === date.toDateString();

              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedSlot(null);
                  }}
                  className={`rounded-xl py-2 text-sm font-medium ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                      : "hover:bg-emerald-500/10 text-gray-700"
                  }`}
                >
                  {i + 1}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Slots */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="font-semibold text-lg mb-1">
            Available Time Slots
          </h2>
          <p className="text-gray-500 mb-4">
            {selectedDate?.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedSlot === slot;

              return (
                <motion.button
                  key={slot}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    isSelected
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/30"
                      : "hover:border-emerald-500 hover:bg-emerald-500/10"
                  }`}
                >
                  {formatTimeRange(slot)}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-between">
        <p className="text-gray-700">
          Selected:{" "}
          <span className="font-semibold">
            {selectedDate?.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </p>

        {/* CONTINUE BUTTON */}
        <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  disabled={!selectedSlot}
  onClick={() => navigate("/confirm")}
  className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg"
>
  Continue Booking
</motion.button>

      </div>
    </div>
  );
};

export default BookingDateTime;
