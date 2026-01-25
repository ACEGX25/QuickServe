import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { generateSlotsFromWorkingHours } from "../provider/providerprofile";


const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const API_BASE =import.meta.env.VITE_API_BASE_URL;

const formatTimeRange = (time: string) => {
  const hour = parseInt(time.split(":")[0]);
  const start = hour % 12 === 0 ? 12 : hour % 12;
  const endRaw = hour + 1;
  const end = endRaw % 12 === 0 ? 12 : endRaw % 12;
  const startPeriod = hour >= 12 ? "PM" : "AM";
  const endPeriod = endRaw >= 12 ? "PM" : "AM";
  return `${start}:00 ${startPeriod} - ${end}:00 ${endPeriod}`;
};

const toUtcISOString = (date: Date, time: string) => {
  const hour = parseInt(time.split(":")[0]);
  const local = new Date(date);
  local.setHours(hour, 0, 0, 0);

  return new Date(
      local.getTime() - local.getTimezoneOffset() * 60000
  ).toISOString();
};

const BookingDateTime = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceListingId } = location.state || {};

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
      new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const providerWorkingHours = {
    monday: { start: "09:00", end: "17:00", enabled: true },
    tuesday: { start: "09:00", end: "17:00", enabled: true },
    wednesday: { start: "09:00", end: "17:00", enabled: true },
    thursday: { start: "09:00", end: "17:00", enabled: true },
    friday: { start: "09:00", end: "17:00", enabled: true },
    saturday: { start: "10:00", end: "14:00", enabled: true },
    sunday: { start: "00:00", end: "00:00", enabled: false },
  };


  if (!serviceListingId) {
    return <p className="p-6">Invalid booking request</p>;
  }

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () =>
      setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () =>
      setCurrentMonth(new Date(year, month + 1, 1));

  // ✅ THIS is where backend call belongs
  const handleContinue = async () => {
    if (!selectedDate || !selectedSlot) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to continue");
      return;
    }

    const payload = {
      serviceListingId,
      startTime: toUtcISOString(selectedDate, selectedSlot),
      endTime: toUtcISOString(
          selectedDate,
          `${parseInt(selectedSlot) + 1}:00`
      ),
    };

    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Booking failed");
      }

      const booking = await res.json();

      navigate("/confirm", {
        state: { booking },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to book slot");
    }
  };

  const availableSlots = selectedDate
      ? generateSlotsFromWorkingHours(providerWorkingHours, selectedDate)
      : [];


  return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Select Date & Time</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">
                {currentMonth.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <div className="flex gap-2">
                <button onClick={prevMonth}><ChevronLeft /></button>
                <button onClick={nextMonth}><ChevronRight /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 text-center mb-2">
              {DAYS.map((d) => <div key={d}>{d}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <div key={i} />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const date = new Date(year, month, i + 1);
                const isSelected =
                    selectedDate?.toDateString() === date.toDateString();

                return (
                    <motion.button
                        key={i}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedSlot(null);
                        }}
                        className={isSelected ? "bg-emerald-600 text-white" : ""}
                    >
                      {i + 1}
                    </motion.button>
                );
              })}
            </div>
          </div>

          {/* Slots */}
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="font-semibold mb-4">Available Time Slots</h2>

            <div className="grid grid-cols-2 gap-4">
              {availableSlots.map((slot) => (
                  <motion.button
                      key={slot.start}
                      onClick={() => setSelectedSlot(slot.start)}
                      className={
                        selectedSlot === slot.start
                            ? "bg-emerald-600 text-white"
                            : ""
                      }
                  >
                    {formatTimeRange(slot.start)}
                  </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <motion.button
              disabled={!selectedSlot}
              onClick={handleContinue}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl"
          >
            Continue Booking
          </motion.button>
        </div>
      </div>
  );
};

export default BookingDateTime;
