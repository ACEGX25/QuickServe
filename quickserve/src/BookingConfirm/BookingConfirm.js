import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "./BookingConfirm.css";

export default function BookingConfirm() {
  const location = useLocation();
  const navigate = useNavigate();

  const { booking } = location.state || {};
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  if (!booking) {
    return <p style={{ padding: 40 }}>Invalid booking</p>;
  }

  const start = new Date(booking.startTime);
  const end = new Date(booking.endTime);

  const handleConfirm = () => {
    setType("success");
    setMessage("🎉 Booking request sent successfully!");

    setTimeout(() => {
      navigate("/mybookings");
    }, 1200);
  };

  const handleCancel = () => {
    setType("cancel");
    setMessage("❌ Booking cancelled");

    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
      <div className="booking-page">
        {/* Header */}
        <div className="booking-header">
        <span className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </span>
          <h2 className="main-title">Confirm Your Booking</h2>
          <p className="subtitle">
            Please review the details before confirming
          </p>
        </div>

        {/* Reservation Info */}
        <div className="reservation-info">
          <span className="dot"></span>
          <span>This slot is temporarily reserved for you</span>
        </div>

        {/* Booking Card */}
        <div className="booking-card">
          <h3 className="service-title">
            Service #{booking.serviceListingId}
          </h3>

          <div className="detail-row">
            <span className="label">Provider</span>
            <span className="value">
            Provider #{booking.providerId}
          </span>
          </div>

          <div className="date-box">
            <span className="label">Date & Time</span>
            <p>{format(start, "EEEE, MMMM d, yyyy")}</p>
            <p>
              {format(start, "hh:mm a")} – {format(end, "hh:mm a")}
            </p>
          </div>

          <div className="detail-row">
            <span className="label">Status</span>
            <span className="value">{booking.status}</span>
          </div>

          <div className="detail-row">
            <span className="label">Location</span>
            <span className="value">
            123 Main Street, Apt 4B (dummy)
          </span>
          </div>

          <div className="detail-row">
            <span className="label">Duration</span>
            <span className="value">2 hours</span>
          </div>

          <hr />

          {/* Price (dummy for now) */}
          <div className="price-section">
            <p className="section-title">Price Breakdown</p>

            <div className="price-row">
              <span>Service price</span>
              <span>$89.99</span>
            </div>

            <div className="price-row">
              <span>Service fee</span>
              <span>$5.00</span>
            </div>

            <div className="price-row">
              <span>Taxes & fees</span>
              <span>$7.20</span>
            </div>

            <div className="price-total">
              <span>Total</span>
              <span>$102.19</span>
            </div>
          </div>

          <div className="action-buttons">
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button className="confirm-btn" onClick={handleConfirm}>
              Confirm Booking
            </button>
          </div>
        </div>

        {message && (
            <div className={`message-popup ${type}`}>
              {message}
            </div>
        )}
      </div>
  );
}
