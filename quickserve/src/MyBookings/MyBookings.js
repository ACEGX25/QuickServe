import React, { useState } from "react";
import "./MyBookings.css";

const bookingsData = [
  {
    id: "BK-2024-001",
    service: "Home Cleaning Service",
    provider: "CleanPro Solutions",
    date: "Jan 25, 2024",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: "BK-2024-002",
    service: "Plumbing Repair",
    provider: "Fix-It Plumbing",
    date: "Jan 22, 2024",
    time: "2:00 PM",
    status: "Pending",
  },
  {
    id: "BK-2024-003",
    service: "AC Maintenance",
    provider: "Cool Comfort HVAC",
    date: "Jan 15, 2024",
    time: "9:00 AM",
    status: "Completed",
  },
];

export default function MyBookings() {
  const [filter, setFilter] = useState("All");

  const filteredBookings =
    filter === "All"
      ? bookingsData
      : bookingsData.filter((b) => b.status === filter);

  return (
    <div className="mybookings-page">
      {/* Header */}
      <div className="mybookings-header">
        <h2>My Bookings</h2>
        <p>Track and manage your service appointments</p>
      </div>

      {/* Filters */}
      <div className="filter-buttons">
        {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map(
          (item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          )
        )}
      </div>

      {/* Booking Cards */}
      <div className="bookings-list">
        {filteredBookings.map((b) => (
          <div className="booking-card" key={b.id}>
            <div className="booking-left">
              <h3>{b.service}</h3>
              <p className="provider">👤 {b.provider}</p>
              <div className="meta">
                <span>📅 {b.date}</span>
                <span>⏰ {b.time}</span>
                <span>🧾 {b.id}</span>
              </div>
            </div>

            <div className="booking-right">
              <span className={`status ${b.status.toLowerCase()}`}>
                {b.status}
              </span>
              <button className="details-btn">View Details</button>
              {b.status !== "Completed" && (
                <button className="cancel-btn">Cancel</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
