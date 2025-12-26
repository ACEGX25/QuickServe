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
import { useNavigate } from "react-router-dom";
import "./BookingCalendar.css";

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

export default function BookingCalendar() {
  const navigate = useNavigate();
  const today = new Date();

  const [month, setMonth] = useState(new Date(2025, 11));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const days = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month),
  });

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setSelectedSlot(null);
  };

  return (
    <div className="page">
      <div className="header">
        <div className="back-btn" onClick={() => navigate("/service-details")}>
          ← Back to Service Details
        </div>
        <h1>Select Date & Time</h1>
        <p>Choose an available slot for your appointment</p>
      </div>

      <div className="content">
        {/* CALENDAR */}
        <div className="card calendar">
          <div className="calendar-header">
            <h3>{format(month, "MMMM yyyy")}</h3>
            <div className="nav-btns">
              <button onClick={() => setMonth(subMonths(month, 1))}>‹</button>
              <button onClick={() => setMonth(addMonths(month, 1))}>›</button>
            </div>
          </div>

          <div className="weekdays">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <span key={day}>{day}</span>
            ))}
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
                  } ${disabled ? "disabled" : ""}`}
                  onClick={() => handleDateClick(day)}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>

        {/* TIME SLOTS */}
        <div className="card slots">
          <h3>Available Time Slots</h3>

          <p className="slot-date">
            {selectedDate
              ? format(selectedDate, "EEEE, MMMM d, yyyy")
              : "Please select a date"}
          </p>

          <div className="slot-grid">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                disabled={!selectedDate}
                className={`slot ${
                  selectedSlot === index ? "selected" : ""
                }`}
                onClick={() => setSelectedSlot(index)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="footer">
        <span>
          Selected:{" "}
          {selectedDate
            ? format(selectedDate, "EEEE, MMMM d, yyyy")
            : "None"}
        </span>

        <button
          className={`confirm ${
            selectedDate && selectedSlot !== null ? "active" : ""
          }`}
          disabled={!selectedDate || selectedSlot === null}
        >
          Continue To Confirmation
        </button>
      </div>
    </div>
  );
}
