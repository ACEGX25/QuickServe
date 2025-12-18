import React, { useState, useEffect } from "react";
import "./ProviderListings.css";
import { useNavigate } from "react-router-dom";

export default function ProviderListings() {
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchListings() {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:8080/api/provider/listings", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

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

        if (!window.confirm("Are you sure you want to delete this listing?")) {
            return;
        }

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

            if (!res.ok) {
                throw new Error("Failed to delete listing");
            }

            // Remove from UI only AFTER backend success
            setListings((prev) => prev.filter((l) => l.id !== listingId));
        } catch (err) {
            console.error(err);
            alert("Delete failed. Please try again.");
        }
    }


    return (
        <div className="provider-listings-page">
            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-container">
                    <div className="nav-left">
                        <span className="logo">Quickserve</span>
                        <div className="nav-links">
                            <span>Home</span>
                            <span className="active">My Listings</span>
                            <span>Bookings</span>
                        </div>
                    </div>
                    <button className="profile-btn">Profile</button>
                </div>
            </nav>

            {/* Main */}
            <main className="content">
                {/* Header */}
                <div className="page-header">
                    <div>
                        <h1>My Listings</h1>
                        <p>Manage and update the services you offer.</p>
                    </div>
                    <button
                        className="primary-btn"
                        onClick={() => navigate("/provider/create")}
                    >
                        + Create New Listing
                    </button>
                </div>

                {/* Loading */}
                {loading && <p>Loading listings...</p>}

                {/* Empty State */}
                {!loading && listings.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">+</div>
                        <h2>You haven't created any listings yet.</h2>
                        <p>
                            Start offering your services to customers by creating your first
                            listing.
                        </p>
                        <button
                            className="primary-btn"
                            onClick={() => navigate("/provider/create")}
                        >
                            + Create Your First Listing
                        </button>
                    </div>
                )}

                {/* Listings */}
                {!loading && listings.length > 0 && (
                    <div className="listings-grid">
                        {listings.map((listing) => (
                            <div key={listing.id} className="listing-card">
                                <div className="listing-info">
                                    <h3 className="listing-title">{listing.title}</h3>
                                    <span className="listing-category">
                        {listing.category}
                    </span>
                                    <p className="listing-price">₹{listing.price}</p>
                                </div>

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
