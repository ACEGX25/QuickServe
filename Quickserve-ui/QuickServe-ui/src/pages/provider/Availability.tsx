import { useState } from "react";
import {ChevronLeft, ChevronRight, Calendar, Home, Settings, Star, Ticket, WrenchIcon, Clock1Icon} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { generateSlotsFromWorkingHours } from "../provider/providerprofile";
import * as timers from "node:timers";
import { motion } from "framer-motion";

/* ================= NAV ================= */

const navItems = [
    { icon: Home, label: "Dashboard", path: "/provider" },
    { icon: Calendar, label: "Bookings", path: "/provider/bookings" },
    { icon: Star, label: "Reviews", path: "/provider/reviews" },
    { icon: Settings, label: "Settings", path: "/providerprofile" },
    { icon: Ticket, label: "Listing", path: "/provider/listings" },
    { icon: WrenchIcon, label: "Services", path: "/provider/services" },
    {icon : Clock1Icon, label: "Availability", path: "/provider/availability"}
];

/* ================= UTILS ================= */

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatTimeRange = (time: string) => {
    const hour = parseInt(time.split(":")[0], 10);
    const start = hour % 12 === 0 ? 12 : hour % 12;
    const endRaw = hour + 1;
    const end = endRaw % 12 === 0 ? 12 : endRaw % 12;
    const startPeriod = hour >= 12 ? "PM" : "AM";
    const endPeriod = endRaw >= 12 ? "PM" : "AM";
    return `${start}:00 ${startPeriod} - ${end}:00 ${endPeriod}`;
};

const toUtcISOString = (date: Date, time: string) => {
    const hour = parseInt(time.split(":")[0], 10);
    const local = new Date(date);
    local.setHours(hour, 0, 0, 0);

    return new Date(
        local.getTime() - local.getTimezoneOffset() * 60000
    ).toISOString();
};

/* ================= COMPONENT ================= */

const Availability = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [currentMonth, setCurrentMonth] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    );
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    /* 🔧 TEMP working hours (same as ProviderProfile) */
    const providerWorkingHours = {
        monday: { start: "09:00", end: "17:00", enabled: true },
        tuesday: { start: "09:00", end: "17:00", enabled: true },
        wednesday: { start: "09:00", end: "17:00", enabled: true },
        thursday: { start: "09:00", end: "17:00", enabled: true },
        friday: { start: "09:00", end: "17:00", enabled: true },
        saturday: { start: "10:00", end: "14:00", enabled: true },
        sunday: { start: "00:00", end: "00:00", enabled: false },
    };

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const prevMonth = () =>
        setCurrentMonth(new Date(year, month - 1, 1));
    const nextMonth = () =>
        setCurrentMonth(new Date(year, month + 1, 1));

    const availableSlots = selectedDate
        ? generateSlotsFromWorkingHours(providerWorkingHours, selectedDate)
        : [];

    /* ================= SAVE AVAILABILITY ================= */

    const handleSaveAvailability = async () => {
        if (!selectedDate || !selectedSlot) return;

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Login required");
            return;
        }

        const payload = {
            startTime: toUtcISOString(selectedDate, selectedSlot),
            endTime: toUtcISOString(
                selectedDate,
                `${parseInt(selectedSlot, 10) + 1}:00`
            ),
        };

        try {
            const res = await fetch("http://localhost:8080/api/calendar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed");

            alert("Availability created successfully");
            setSelectedSlot(null);
        } catch (err) {
            console.error(err);
            alert("Error creating availability");
        }
    };

    /* ================= RENDER ================= */

    return (
        <DashboardLayout role="provider" navItems={navItems}>
            <div className="space-y-6">
                <h1 className="page-title">Create Availability</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* CALENDAR */}
                    <div className="rounded-2xl bg-white p-6 shadow">
                        <div className="flex justify-between mb-4">
                            <h2 className="font-semibold">
                                {currentMonth.toLocaleString("default", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </h2>
                            <div className="flex gap-2">
                                <button onClick={prevMonth}>
                                    <ChevronLeft />
                                </button>
                                <button onClick={nextMonth}>
                                    <ChevronRight />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 text-center mb-2 text-muted-foreground">
                            {DAYS.map((d) => (
                                <div key={d}>{d}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {Array.from({ length: firstDayIndex }).map((_, i) => (
                                <div key={i} />
                            ))}

                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const date = new Date(year, month, i + 1);
                                const isSelected =
                                    selectedDate?.toDateString() === date.toDateString();

                                return (
                                    <motion.button
                                        key={i}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setSelectedDate(date);
                                            setSelectedSlot(null);
                                        }}
                                        className={`rounded-lg py-2 ${
                                            isSelected
                                                ? "bg-primary text-primary-foreground"
                                                : "hover:bg-muted"
                                        }`}
                                    >
                                        {i + 1}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* SLOTS */}
                    <div className="rounded-2xl bg-white p-6 shadow">
                        <h2 className="font-semibold mb-4">Available Time Slots</h2>

                        {availableSlots.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                No slots available for this day.
                            </p>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            {availableSlots.map((slot) => (
                                <motion.button
                                    key={slot.start}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => setSelectedSlot(slot.start)}
                                    className={`rounded-xl border px-4 py-3 text-sm ${
                                        selectedSlot === slot.start
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-muted"
                                    }`}
                                >
                                    {formatTimeRange(slot.start)}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ACTION */}
                <div className="flex justify-end">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        disabled={!selectedDate || !selectedSlot}
                        onClick={handleSaveAvailability}
                        className="rounded-xl bg-primary px-6 py-3 text-primary-foreground font-semibold"
                    >
                        Save Availability
                    </motion.button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Availability;
