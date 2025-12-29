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
            // optional: keep this fetch if you want to validate / log
            const res = await fetch(
                `http://localhost:8080/api/listings/search?query=${encodeURIComponent(query)}`
            );
            const data = await res.json();
            console.log("SEARCH RESPONSE:", data);

            // ✅ navigate to search result page
            navigate(`/search-results?keyword=${encodeURIComponent(query)}`);
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
            <section className="relative overflow-hidden pt-32 pb-12 text-center">

                {/* Decorative graphics (UNCHANGED) */}
                <img
                    src="/graphic1.png"
                    alt=""
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 w-[420px]"
                />
                <img
                    src="/graphic.png"
                    alt=""
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[420px]"
                />

                <div className="relative z-10">
                    <h2 className="text-5xl font-bold mb-10">
                        Book trusted help <br /> for home tasks !
                    </h2>

                    {/* SEARCH */}
                    <div className="max-w-2xl mx-auto flex items-center border rounded-full shadow bg-white overflow-hidden">
                        <input
                            className="flex-1 px-6 py-4 outline-none"
                            placeholder="What do you need help with?"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 px-8 py-4 text-white
                                       transition-all duration-300
                                       hover:bg-blue-600 active:scale-95"
                        >
                            <Search />
                        </button>
                    </div>

                    <Categories />

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

            {/* ===== Assembly Showcase ===== */}
            <section className="max-w-4xl mx-auto mt-16 px-6">
                <div className="relative bg-blue-200 rounded-[32px] h-[420px] flex items-center justify-center">

                    <div className="absolute left-14 bg-white w-[320px] p-8 rounded-2xl shadow-lg z-20">
                        <h3 className="text-2xl font-semibold mb-4">Assembly</h3>

                        <p className="text-sm text-gray-600 leading-relaxed">
                            Assemble or disassemble furniture items by unboxing,
                            building, and any cleanup.
                        </p>

                        <p className="mt-4 text-sm text-gray-600">
                            <span className="font-medium text-black">Now Trending:</span><br />
                            Curved sofas, computer desks, and sustainable materials.
                        </p>
                    </div>

                    <div className="w-[560px] h-[320px] rounded-2xl overflow-hidden">
                        <img
                            src="/man.png"
                            alt="Assembly"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* ================= STATS ================= */}
            <section className="bg-blue-100 py-10 mt-12">
                <div className="max-w-6xl mx-auto grid grid-cols-5 text-center">
                    <Stat title="Furniture Assemblies" value={3.4} suffix="M+" />
                    <Stat title="Moving Tasks" value={1.5} suffix="M+" />
                    <Stat title="Service Rating" value={4.8} suffix="★" />
                    <Stat title="Customers Globally" value={12} suffix="M+" />
                    <Stat title="Partners" value={45} suffix="K+" />
                </div>
            </section>

            {/* ================= SERVICES ================= */}
            <Section
                title="Most Booked Services"
                services={[
                    { name: "Professional Home Cleaning", image: "housecleaning.png" },
                    { name: "Home Repair & Installation", image: "home.jpg" },
                    { name: "Salon For Women", image: "salon.png" },
                ]}
            />

            <Section
                title="Salon For Women"
                services={[
                    { name: "Roll-on Waxing (Full Arms)", image: "Rolling.png" },
                    { name: "Crystal Rose Pedicure", image: "Crystal Rose.jpg" },
                    { name: "Mani-Pedi Delight", image: "mani.jpg" },
                ]}
            />

            <Section
                title="Home Repair & Installation"
                services={[
                    { name: "AC Cleaning & Services", image: "AC.jpg" },
                    { name: "Pipe Repair & Maintenance", image: "pipe.png" },
                    { name: "House Moving Services", image: "housemoving.png" },
                ]}
            />
        </div>
    );
}

/* ================= COMPONENTS ================= */

function Categories() {
    const [active, setActive] = useState(null);

    return (
        <div className="flex justify-center gap-12 mt-14 text-sm">
            {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = active === cat.name;

                return (
                    <div
                        key={cat.name}
                        onClick={() => setActive(cat.name)}
                        className={`flex flex-col items-center gap-2 cursor-pointer
                                    transition-all duration-300
                                    ${isActive ? "text-blue-500 scale-110" : "text-gray-800"}`}
                    >
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center
                                        ${isActive ? "border-2 border-blue-500" : "border border-gray-300"}`}
                        >
                            <Icon size={22} />
                        </div>
                        <span className="text-xs">{cat.name}</span>
                    </div>
                );
            })}
        </div>
    );
}

function Stat({ title, value, suffix }) {
    return (
        <div>
            <h3 className="text-xl font-bold">
                <CountUp end={value} decimals={1} /> {suffix}
            </h3>
            <p className="text-sm">{title}</p>
        </div>
    );
}

function Section({ title, services }) {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-semibold mb-6">{title}</h2>

            <div className="grid md:grid-cols-3 gap-6">
                {services.map((s, i) => (
                    <Card key={i} name={s.name} image={s.image} />
                ))}
            </div>
        </div>
    );
}

function Card({ name, image }) {
    return (
        <div
            className="bg-white rounded-xl shadow overflow-hidden
                       transition-all duration-300
                       hover:-translate-y-2 hover:shadow-xl"
        >
            <img
                src={`/${image}`}
                className="h-48 w-full object-cover"
                alt={name}
            />

            <div className="p-4">
                <h3 className="font-semibold">{name}</h3>
                <p className="text-yellow-500">★ 4.8 (120)</p>

                <button
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded
                               transition-all duration-300
                               hover:bg-blue-700 hover:scale-[1.03]
                               active:scale-95"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}
