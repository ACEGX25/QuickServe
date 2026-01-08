import { MapPin, SlidersHorizontal } from "lucide-react";
import "./SearchResult.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:8080";

export default function SearchResults() {
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [searchParams] = useSearchParams();

    const keyword = searchParams.get("keyword") || "";
    const category = searchParams.get("category") || "";
    const location = searchParams.get("location") || "";

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchResults() {
            setLoading(true);
            const params = new URLSearchParams();

            if (keyword.trim()) params.append("keyword", keyword);
            if (category) params.append("category", category);
            if (location) params.append("location", location);

            try {
                const res = await fetch(
                    `${API_BASE}/api/listings/search?${params.toString()}`
                );
                const data = await res.json();
                setResults(data.content || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchResults();
    }, [keyword, category, location]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="search-page">
            <header className="search-header">
                <div className="relative inline-block ml-20">
                    <h1 className="text-2xl font-bold tracking-wide">QUICKSERVE</h1>
                </div>
            </header>

            <main className="search-content">
                <div className="search-title">
                    <h2>
                        Search results for{" "}
                        <span className="highlight">"{keyword || "All Services"}"</span>
                    </h2>
                    <p>{results.length} services found</p>
                </div>

                {results.length === 0 ? (
                    <div className="empty-state">
                        <h3>No services found</h3>
                    </div>
                ) : (
                    <div className="results-grid">
                        {results.map((service) => (
                            <div key={service.id} className="service-card">
                                <img src="/housecleaning.png" alt={service.title} />

                                <div className="card-body">
                                    <h3>{service.title}</h3>

                                    <div className="location">
                                        <MapPin size={14} />
                                        <span>{service.location}</span>
                                    </div>

                                    <div className="card-footer">
                                        <div>
                                            <small>Starting from</small>
                                            <strong>₹{service.price}</strong>
                                        </div>

                                        <button
                                            className="primary-btn"
                                            onClick={() =>
                                                navigate("/bookingcalendar", {
                                                    state: {
                                                        serviceListingId: service.id
                                                    }
                                                })
                                            }
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
