import "./EditListing.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080";

export default function EditListing() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchListing() {
            const token = localStorage.getItem("token");

            try {
                const res = await fetch(
                    `${API_BASE}/api/provider/listings/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) throw new Error("Failed to fetch listing");

                const data = await res.json();
                setForm({
                    title: data.title || "",
                    description: data.description || "",
                    price: data.price || "",
                    category: data.category || "",
                });
            } catch (err) {
                console.error(err);
                alert("Unable to load listing");
                navigate("/provider/homepage");
            } finally {
                setLoading(false);
            }
        }

        fetchListing();
    }, [id, navigate]);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(
                `${API_BASE}/api/provider/listings/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(form),
                }
            );

            if (!res.ok) throw new Error("Update failed");

            navigate("/provider/homepage");
        } catch (err) {
            console.error(err);
            alert("Failed to update listing");
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className="edit-listing-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="nav-container">
                    <h1 className="logo">Quickserve</h1>
                    <div className="nav-actions">
                        <button
                            className="ghost-btn"
                            onClick={() => navigate("/provider/homepage")}
                        >
                            My Listings
                        </button>
                        <button className="ghost-btn">Profile</button>
                    </div>
                </div>
            </nav>

            {/* Main */}
            <main className="content">
                <div className="card">
                    <header className="card-header">
                        <h1>Edit Listing</h1>
                        <p>Update your service details.</p>
                    </header>

                    <form onSubmit={handleSubmit}>
                        <section className="section">
                            <h3>Service Details</h3>

                            <div className="form-group">
                                <label>Service Name</label>
                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select category</option>
                                    <option>Plumbing</option>
                                    <option>Electrical</option>
                                    <option>Cleaning</option>
                                    <option>Gardening</option>
                                    <option>Moving</option>
                                    <option>Painting</option>
                                    <option>Carpentry</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </section>

                        <section className="section">
                            <h3>Pricing</h3>

                            <div className="form-group">
                                <label>Price per Hour</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </section>

                        <footer className="actions">
                            <div>
                                <button type="submit" className="primary-btn">
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    className="outline-btn"
                                    onClick={() => navigate("/provider/homepage")}
                                >
                                    Cancel
                                </button>
                            </div>
                        </footer>
                    </form>
                </div>
            </main>
        </div>
    );
}
