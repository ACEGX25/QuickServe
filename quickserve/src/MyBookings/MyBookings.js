import React, { useEffect, useState } from "react";
import "./MyBookings.css";

const API_BASE = "http://localhost:8080";

export default function MyBookings() {
  const [filter, setFilter] = useState("All");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login to view your bookings");
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/bookings/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch bookings");

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("FETCH BOOKINGS ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Date formatter
  const formatDateTime = (iso) => {
    const d = new Date(iso);
    return {
      date: d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      time: d.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };
  };

  // Filter bookings
  const filteredBookings =
      filter === "All"
          ? bookings
          : bookings.filter(
              (b) => b.status === filter.toUpperCase()
          );

  return (
      <div className="my-bookings-page">
        <div className="header">
          <h1>My Bookings</h1>
          <p>Track and manage your service appointments</p>
        </div>

        {/* Status Tabs */}
        <div className="tabs">
          {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map(
              (tab) => (
                  <button
                      key={tab}
                      className={filter === tab ? "active" : ""}
                      onClick={() => setFilter(tab)}
                  >
                    {tab}
                  </button>
              )
          )}
        </div>

        {/* Loading / Empty */}
        {loading && <p className="state-msg">Loading your bookings...</p>}

        {!loading && filteredBookings.length === 0 && (
            <p className="state-msg">No bookings found.</p>
        )}

        {/* Booking Cards */}
        <div className="bookings-list">
          {filteredBookings.map((b) => {
            const { date, time } = formatDateTime(b.startTime);

            return (
                <div className="booking-card" key={b.id}>
                  <div className="booking-left">
                    <h3>{b.serviceTitle}</h3>
                    <p className="provider">
                      👤 {b.providerName}
                    </p>

                    <div className="meta">
                      <span>📅 {date}</span>
                      <span>⏰ {time}</span>
                      <span>🧾 BK-{b.id}</span>
                    </div>
                  </div>

                  <div className="booking-right">
                <span
                    className={`status ${b.status.toLowerCase()}`}
                >
                  {b.status}
                </span>

                    <button className="details-btn">
                      View Details
                    </button>

                    {b.status === "PENDING" && (
                        <button className="cancel-btn">
                          Cancel
                        </button>
                    )}
                  </div>
                </div>
            );
          })}
        </div>
      </div>
  );
}
