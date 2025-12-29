import { useState } from "react";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isBefore,
    isSameDay,
    addMonths,
    subMonths,
} from "date-fns";
import "../components/BookingCalendar.css";

const API_BASE = "http://localhost:8080";

const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
];

// 🔑 SAME function reused
function toUtcISOString(dateObj, timeStr) {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const local = new Date(dateObj);
    local.setHours(hours, minutes, 0, 0);

    return new Date(
        local.getTime() - local.getTimezoneOffset() * 60000
    ).toISOString();
}

export default function ProviderAvailabilityCalendar() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [month, setMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const days = eachDayOfInterval({
        start: startOfMonth(month),
        end: endOfMonth(month),
    });

    const saveAvailability = async () => {
        if (!selectedDate || !selectedSlot) return;

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Login required");
            return;
        }

        const [start, end] = selectedSlot.split(" - ");

        const payload = {
            startTime: toUtcISOString(selectedDate, start),
            endTime: toUtcISOString(selectedDate, end),
        };

        console.log("PROVIDER AVAILABILITY PAYLOAD:", payload);

        try {
            const res = await fetch(`${API_BASE}/api/calendar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed");

            alert("Availability saved");
        } catch (err) {
            console.error(err);
            alert("Error saving availability");
        }
    };

    return (
        <div className="page">
            <div className="header">
                <h1>Set Availability</h1>
                <p>Select date and available time window</p>
            </div>

            <div className="content">
                <div className="card calendar">
                    <div className="calendar-header">
                        <h3>{format(month, "MMMM yyyy")}</h3>
                        <div className="nav-btns">
                            <button onClick={() => setMonth(subMonths(month, 1))}>‹</button>
                            <button onClick={() => setMonth(addMonths(month, 1))}>›</button>
                        </div>
                    </div>

                    <div className="dates">
                        {days.map((day) => {
                            const disabled =
                                isBefore(day, today) && !isSameDay(day, today);

                            return (
                                <button
                                    key={day}
                                    disabled={disabled}
                                    className={`date ${
                                        selectedDate && isSameDay(day, selectedDate)
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setSelectedDate(day);
                                        setSelectedSlot(null);
                                    }}
                                >
                                    {format(day, "d")}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="card slots">
                    <h3>Available Time Slots</h3>

                    <div className="slot-grid">
                        {timeSlots.map((slot) => (
                            <button
                                key={slot}
                                disabled={!selectedDate}
                                className={`slot ${
                                    selectedSlot === slot ? "selected" : ""
                                }`}
                                onClick={() => setSelectedSlot(slot)}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="footer">
                <button
                    className="confirm"
                    disabled={!selectedDate || !selectedSlot}
                    onClick={saveAvailability}
                >
                    Save Availability
                </button>
            </div>
        </div>
    );
}
