import React, { useEffect, useState } from "react";
import "../MyBookings/MyBookings.css"; // reuse same CSS

const API_BASE = "http://localhost:8080";

export default function ProviderBookingRequests() {
    const [filter, setFilter] = useState("All");
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch provider bookings
    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Login required");
                return;
            }

            try {
                const res = await fetch(
                    `${API_BASE}/api/bookings/provider`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) throw new Error("Failed to fetch requests");

                const data = await res.json();
                setBookings(data);
            } catch (err) {
                console.error("FETCH PROVIDER BOOKINGS ERROR:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    // Accept / Decline handler
    const updateStatus = async (id, action) => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(
                `${API_BASE}/api/bookings/${id}/${action}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) throw new Error("Action failed");

            // update UI locally
            setBookings((prev) =>
                prev.map((b) =>
                    b.id === id
                        ? {
                            ...b,
                            status: action === "accept" ? "CONFIRMED" : "CANCELLED",
                        }
                        : b
                )
            );
        } catch (err) {
            console.error(err);
            alert("Failed to update booking");
        }
    };

    // Date formatter (same as MyBookings)
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

    const filteredBookings =
        filter === "All"
            ? bookings
            : bookings.filter(
                (b) => b.status === filter.toUpperCase()
            );

    return (
        <div className="my-bookings-page">
            <div className="header">
                <h1>Booking Requests</h1>
                <p>Manage incoming service requests</p>
            </div>

            {/* Tabs */}
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

            {loading && (
                <p className="state-msg">Loading requests...</p>
            )}

            {!loading && filteredBookings.length === 0 && (
                <p className="state-msg">No requests found.</p>
            )}

            {/* Cards */}
            <div className="bookings-list">
                {filteredBookings.map((b) => {
                    const { date, time } = formatDateTime(b.startTime);

                    return (
                        <div className="booking-card" key={b.id}>
                            <div className="booking-left">
                                <h3>{b.serviceTitle}</h3>
                                <p className="provider">
                                    👤 {b.customerName}
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

                                {b.status === "PENDING" && (
                                    <>
                                        <button
                                            className="details-btn"
                                            onClick={() =>
                                                updateStatus(b.id, "accept")
                                            }
                                        >
                                            Accept
                                        </button>

                                        <button
                                            className="cancel-btn"
                                            onClick={() =>
                                                updateStatus(b.id, "reject")
                                            }
                                        >
                                            Decline
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
