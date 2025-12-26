import React, { useState } from "react";
import "./App.css";

function App() {

  const [filter, setFilter] = useState("All");

  const [bookings, setBookings] = useState([
    { id: "BK-1001", customer: "Ravi Kumar", service: "Home Cleaning", date: "Jan 15, 2025", time: "10:00 AM", status: "Pending" },
    { id: "BK-1002", customer: "Anjali Sharma", service: "Plumbing Repair", date: "Jan 16, 2025", time: "2:00 PM", status: "Pending" },
    { id: "BK-1003", customer: "Suresh Reddy", service: "Electrical Work", date: "Jan 14, 2025", time: "9:00 AM", status: "Confirmed" },
    { id: "BK-1004", customer: "Priya Verma", service: "Lawn Mowing", date: "Jan 12, 2025", time: "3:00 PM", status: "Completed" },
    { id: "BK-1005", customer: "Amit Patel", service: "House Painting", date: "Jan 10, 2025", time: "11:00 AM", status: "Cancelled" }
  ]);

  const updateStatus = (id, status) => {
    setBookings(bookings.map(b =>
      b.id === id ? { ...b, status } : b
    ));
  };

  const filtered =
    filter === "All" ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="container">
      <h2>Booking Requests</h2>
      <p className="subtitle">Manage incoming and ongoing bookings</p>

      <div className="tabs">
        {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map(tab => (
          <button
            key={tab}
            className={filter === tab ? "active" : ""}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.customer}</td>
              <td>{b.service}</td>
              <td>{b.date}<br />{b.time}</td>
              <td>
                <span className={`status ${b.status.toLowerCase()}`}>
                  {b.status}
                </span>
              </td>
              <td>
                {b.status === "Pending" && (
                  <>
                    <button className="action-btn accept" onClick={() => updateStatus(b.id, "Confirmed")}>Accept</button>
                    <button className="action-btn reject" onClick={() => updateStatus(b.id, "Cancelled")}>Reject</button>
                  </>
                )}
                {b.status === "Confirmed" && (
                  <button className="action-btn complete" onClick={() => updateStatus(b.id, "Completed")}>Mark as Completed</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
