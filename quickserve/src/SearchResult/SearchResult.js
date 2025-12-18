import { MapPin, SlidersHorizontal } from "lucide-react";
import "./SearchResult.css";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:8080";

export default function SearchResults() {
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
                setResults(data);
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
            {/* Header */}
            <header className="search-header">
                <h1 className="logo">Quickserve</h1>
                <div className="header-actions">
                    <button className="ghost-btn">Sign In</button>
                    <button className="primary-btn">Sign Up</button>
                </div>
            </header>

            {/* Main */}
            <main className="search-content">
                <div className="search-title">
                    <h2>
                        Search results for{" "}
                        <span className="highlight">"{keyword || "All Services"}"</span>
                    </h2>

                    <p>{results.length} services found</p>
                </div>

                {/* Filters (visual only) */}
                <div className="filters">
                <button className="outline-btn">
                        <SlidersHorizontal size={16} />
                        Filters
                    </button>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Category</option>
                    </select>

                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Sort by</option>
                    </select>
                </div>

                {/* Results */}
                {results.length === 0 ? (
                    <div className="empty-state">
                        <h3>No services found</h3>
                        <p>
                            Try changing your search, location, or filters to find available
                            services.
                        </p>
                    </div>
                ) : (
                    <div className="results-grid">
                        {results.map((service) => (
                            <div key={service.id} className="service-card">
                                <img src="/housecleaning.png" alt={service.title}/>

                                <div className="card-body">
                                    <h3>{service.title}</h3>

                                    <div className="location">
                                        <MapPin size={14}/>
                                        <span>{service.location}</span>
                                    </div>

                                    <div className="card-footer">
                                        <div>
                                            <small>Starting from</small>
                                            <strong>₹{service.price}</strong>
                                        </div>
                                        <button className="primary-btn">Book Now</button>
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
