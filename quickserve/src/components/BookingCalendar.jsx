import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isBefore,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookingCalendar.css";
const API_BASE = "http://localhost:8080";


const timeSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
];

function toUtcISOString(dateObj, timeStr) {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  // Create local date-time
  const localDate = new Date(dateObj);
  localDate.setHours(hours, minutes, 0, 0);

  // Convert to UTC explicitly
  const utcDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
  );

  return utcDate.toISOString(); // ✅ ends with Z

}

export default function BookingCalendar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceListingId } = location.state || {};

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  if (!serviceListingId) {
    return <p>Invalid booking request</p>;
  }

  const days = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month),
  });

  const handleConfirm = async () => {
    if (!selectedDate || !selectedSlot) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to continue");
      return;
    }

    const [start, end] = selectedSlot.split(" - ");

    const payload = {
      serviceListingId,
      startTime: toUtcISOString(selectedDate, start),
      endTime: toUtcISOString(selectedDate, end),
    };



    console.log("BOOKING PAYLOAD:", payload);
    console.log("JWT TOKEN:", token);

    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ JWT HERE
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Booking failed");
      }

      const data = await res.json();
      console.log("BOOKING SUCCESS:", data);

      navigate("/confirm", {
        state: { booking: data },
      });

    } catch (err) {
      console.error("BOOKING ERROR:", err);
      alert("Failed to book slot. Please try again.");
    }
  };


  return (
      <div className="page">
        <div className="header">
          <h1>Select Date & Time</h1>
          <p>Choose an available slot for your appointment</p>
        </div>

        <div className="content">
          <div className="card calendar">
            <div className="calendar-header">
              <h3>{format(month, "MMMM yyyy")}</h3>
              <div className="nav-btns">
                <button onClick={() => setMonth(subMonths(month, 1))}>‹</button>
                <button onClick={() => setMonth(addMonths(month, 1))}>›</button>
              </div>
            </div>

            <div className="dates">
              {days.map((day) => {
                const disabled =
                    isBefore(day, today) && !isSameDay(day, today);

                return (
                    <button
                        key={day}
                        disabled={disabled}
                        className={`date ${
                            selectedDate && isSameDay(day, selectedDate)
                                ? "active"
                                : ""
                        }`}
                        onClick={() => {
                          setSelectedDate(day);
                          setSelectedSlot(null);
                        }}
                    >
                      {format(day, "d")}
                    </button>
                );
              })}
            </div>
          </div>

          <div className="card slots">
            <h3>Available Time Slots</h3>

            <div className="slot-grid">
              {timeSlots.map((slot) => (
                  <button
                      key={slot}
                      disabled={!selectedDate}
                      className={`slot ${
                          selectedSlot === slot ? "selected" : ""
                      }`}
                      onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </button>
              ))}
            </div>
          </div>
        </div>

        <div className="footer">
          <button
              className="confirm"
              disabled={!selectedDate || !selectedSlot}
              onClick={handleConfirm}
          >
            Continue To Confirmation
          </button>
        </div>
      </div>
  );
}
