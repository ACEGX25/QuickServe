import React, { useRef } from "react";
import CountUp from "react-countup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Wrench,
    Flower,
    Truck,
    SprayCan,
    Trees,
    Hammer,
    PaintRoller,
    Flame,
    MapPin,
    ShoppingCart,
    User,
    Search,
} from "lucide-react";

/* ================= DATA ================= */

const categories = [
    { name: "Assembly", icon: Wrench },
    { name: "Spa", icon: Flower },
    { name: "Moving", icon: Truck },
    { name: "Cleaning", icon: SprayCan },
    { name: "Outdoor Help", icon: Trees },
    { name: "Home Repairs", icon: Hammer },
    { name: "Painting", icon: PaintRoller },
    { name: "Trending", icon: Flame },
];



/* ================= MAIN PAGE ================= */

export default function Home() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    async function handleSearch() {
        if (!query.trim()) return;

        try {
            const res = await fetch(
                `http://localhost:8080/api/listings/search?query=${encodeURIComponent(query)}`
            );
            const data = await res.json();
            console.log("SEARCH RESPONSE:", data); // 👈 THIS IS STEP 1
        } catch (err) {
            console.error("Search failed", err);
        }
    }
    return (
        <div className="min-h-screen bg-white text-black">

            {/* ================= HEADER ================= */}
            <header className="border-b bg-white">
                <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

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

                    {/* Nav */}
                    <div className="flex items-center gap-6">
                        <span className="font-medium cursor-pointer">Explore Partners</span>
                        <span className="font-medium cursor-pointer">Services</span>

                        {/* Location */}
                        <div className="flex items-center gap-2 border px-3 py-1.5 rounded-md text-sm">
                            <MapPin size={16} className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="Manhattan St. New York"
                                className="outline-none bg-transparent text-sm w-[180px]"
                            />
                        </div>

                        <ShoppingCart className="cursor-pointer" />
                        <User className="cursor-pointer" />
                    </div>
                </div>
            </header>

            {/* ================= HERO ================= */}
            <section className="relative overflow-hidden py-32">

                <div className="relative z-10 text-center">
                    <h2 className="text-5xl font-bold leading-tight mb-10">
                        Book trusted help <br/> for home tasks !
                    </h2>

                    {/* Search */}
                    <div
                        className="max-w-2xl mx-auto flex items-center border rounded-full shadow bg-white overflow-hidden">
                        <input
                            className="flex-1 px-6 py-4 outline-none text-gray-600"
                            placeholder="What do you need help with?"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && query.trim()) {
                                    navigate(`/search-results?q=${encodeURIComponent(query)}`);
                                }
                            }}
                        />
                        <button
                            className="bg-blue-500 px-8 py-4 text-white"
                            onClick={() => {
                                if (query.trim()) {
                                    navigate(`/search-results?q=${encodeURIComponent(query)}`);
                                }
                            }}
                        >
                            <Search/>
                        </button>
                    </div>


                    {/* ✅ Categories Component */}
                    <Categories/>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {["IKEA Assembly", "Furniture Assembly", "Bookshelf Assembly"].map(
                            (tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-2 border rounded-full text-sm"
                                >
                  {tag}
                </span>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* ================= STATS ================= */}
            <section className="bg-blue-100 py-10">
                <div className="max-w-6xl mx-auto grid grid-cols-5 text-center">
                    <Stat title="Furniture Assemblies" value={3.4} suffix="M+"/>
                    <Stat title="Moving Tasks" value={1.5} suffix="M+"/>
                    <Stat title="Service Rating" value={4.8} suffix="★"/>
                    <Stat title="Customers Globally" value={12} suffix="M+"/>
                    <Stat title="Partners" value={45} suffix="K+"/>
                </div>
            </section>

            <Section title="Most Booked Services" />
            <Section title="Salon For Women" />
            <Section title="Home Repair & Installation" />
        </div>
    );
}

/* ================= COMPONENTS ================= */

function Categories() {
    return (
        <div className="flex flex-wrap justify-center gap-12 mt-14 text-sm">
            {categories.map((cat, i) => {
                const Icon = cat.icon;

                return (
                    <div
                        key={i}
                        className={`flex flex-col items-center gap-2 cursor-pointer ${
                            cat.name === "Assembly" ? "text-blue-500" : "text-gray-800"
                        }`}
                    >
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                cat.name === "Assembly"
                                    ? "border-2 border-blue-500"
                                    : "border border-gray-300"
                            }`}
                        >
                            <Icon size={22} strokeWidth={1.5} />
                        </div>

                        <span className="text-xs">{cat.name}</span>
                    </div>
                );
            })}
        </div>
    );
}

function Stat({ title, value, suffix }) {
    const decimals = Number.isInteger(value) ? 0 : 1;

    return (
        <div>
            <h3 className="text-xl font-bold">
                <CountUp end={value} decimals={decimals} /> {suffix}
            </h3>
            <p className="text-sm">{title}</p>
        </div>
    );
}


function Section({ title }) {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-semibold mb-6">{title}</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i} />
                ))}
            </div>
        </div>
    );
}

function Card() {
    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">
            <img
                src="/housecleaning.png"
                className="h-48 w-full object-cover"
                alt=""
            />
            <div className="p-4">
                <h3 className="font-semibold">Professional Home Cleaning</h3>
                <p className="text-yellow-500">
                    ★ <CountUp end={4.8} decimals={1} /> (120)
                </p>
                <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded">
                    View Details
                </button>
            </div>
        </div>
    );
}
