import React, { useState } from "react";
import "./CreateListing.css";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        location: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:8080/api/provider/listings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: form.title,
                    description: form.description,
                    category: form.category,
                    price: Number(form.price),
                    location: form.location,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data?.message || "Failed to create listing");
            }

            navigate("/provider/homepage");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="create-listing-page">
            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-container">
                    <div className="nav-left">
                        <h1 className="logo">Quickserve</h1>
                        <div className="nav-links">
                            <span onClick={() => navigate("/")}>Home</span>
                            <span onClick={() => navigate("/provider/homepage")}>My Listings</span>
                            <span className="active">Create Listing</span>
                        </div>
                    </div>
                    <button className="profile-btn">Profile</button>
                </div>
            </nav>

            {/* Main */}
            <main className="form-container">
                <div className="page-header">
                    <h1>Create New Listing</h1>
                    <p>Add details about the service you want to offer.</p>
                </div>

                {error && <p className="error-text">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Service Details */}
                    <section className="card">
                        <h2>Service Details</h2>

                        <div className="form-group">
                            <label>Service Name</label>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g., Professional House Cleaning"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Service Category</label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="CLEANING">Cleaning</option>
                                <option value="PLUMBING">Plumbing</option>
                                <option value="ELECTRICAL">Electrical</option>
                                <option value="GARDENING">Gardening</option>
                                <option value="PAINTING">Painting</option>
                                <option value="MOVING">Moving & Delivery</option>
                                <option value="HANDYMAN">Handyman</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Describe your service in detail"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <input
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="e.g., Bangalore"
                                required
                            />
                        </div>
                    </section>

                    {/* Pricing */}
                    <section className="card">
                        <h2>Pricing</h2>

                        <div className="form-group inline">
                            <label>Starting Price</label>
                            <div className="price-input">
                                <span>₹</span>
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="actions">
                        <button
                            type="button"
                            className="ghost-btn"
                            onClick={() => navigate("/provider/homepage")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={loading}
                        >
                            {loading ? "Publishing..." : "Publish Listing"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
