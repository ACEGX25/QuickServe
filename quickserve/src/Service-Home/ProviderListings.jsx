import React, { useState, useEffect } from "react";
import "./ProviderListings.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function ProviderListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    async function fetchListings() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:8080/api/provider/listings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch listings");

        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  async function handleDelete(listingId) {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/provider/listings/${listingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      setListings((prev) => prev.filter((l) => l.id !== listingId));
    } catch (err) {
      alert("Delete failed. Try again.");
    }
  }

  return (
    <div className="provider-listings-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            {/* Logo */}
                    <div className="relative inline-block">
                        <div className="absolute -top-3 left-6 flex gap-1">
                            {[1, 2, 3, 4].map((i) => (
                                <span
                                    key={i}
                                    className="w-4 h-1 bg-blue-500 rotate-[-25deg] rounded"
                                />
                            ))}
                        </div>

                        <h1 className="text-2xl font-bold tracking-wide">QUICKSERVE</h1>
                        <span className="absolute left-2 -bottom-2 w-[110px] h-[6px] border-b-2 border-black rounded-full"></span>
                    </div>

            <div className="nav-links">
              <span
                  className="active"
                  onClick={() => navigate("/provider/homepage")}
              >
    My Listings
  </span>

              <span
                  onClick={() => navigate("/pending")}
              >
    Bookings
  </span>

              <span
                  onClick={() => navigate("/availability")}
              >
    Create Availability
  </span>
            </div>
          </div>

          {/* PROFILE ICON */}
          <div className="profile-wrapper">
            <div
                className="profile-icon"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <FaUserCircle/>
            </div>

            {showProfileMenu && (
              <div className="profile-dropdown">
                <div
                  className="profile-item"
                  onClick={() => navigate("/provider/profile")}
                >
                  Update Profile
                </div>
                <div
                  className="profile-item"
                  onClick={() => navigate("/provider/homepage")}
                >
                  My Listings
                </div>
                <div
                  className="profile-item"
                  onClick={() => navigate("/provider/bookings")}
                >
                  Bookings
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* WELCOME */}
      <section className="welcome-section">
        <h2>Welcome 👋</h2>
        <p>
          Serve local customers, manage services, and grow bookings — all in one
          place.
        </p>
      </section>

      {/* CONTENT */}
      <main className="content smooth-page">
        <div className="page-header">
          <div>
            <h1>My Listings</h1>
            <p>Manage and update your services.</p>
          </div>

          <button
            className="primary-btn"
            onClick={() => navigate("/provider/create")}
          >
            + Create New Listing
          </button>
        </div>

        {loading && <p className="loading-text">Loading listings...</p>}

        {!loading && listings.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">+</div>
            <h2>No listings yet</h2>
            <p>Create your first service listing.</p>
            <button
              className="primary-btn"
              onClick={() => navigate("/provider/create")}
            >
              + Create Listing
            </button>
          </div>
        )}

        {!loading && listings.length > 0 && (
          <div className="listings-grid">
            {listings.map((listing, index) => (
              <div
                key={listing.id}
                className="listing-card"
                style={{ "--i": index }}
              >
                <h3>{listing.title}</h3>
                <span className="listing-category">
                  {listing.category}
                </span>
                <p className="listing-price">₹{listing.price}</p>

                <div className="card-actions">
                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/provider/edit/${listing.id}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(listing.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
