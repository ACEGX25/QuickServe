import React, { useState, useEffect } from "react";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export default function Calendar({ selectedDate, setSelectedDate }) {
  const [month, setMonth] = useState(11); 
  const [year, setYear] = useState(2025);
  const [dayStatus, setDayStatus] = useState({});

  
  useEffect(() => {
    setSelectedDate(null);
  }, [month, year, setSelectedDate]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const applyStatus = (status) => {
    if (!selectedDate) return;
    const key = `${year}-${month}-${selectedDate}`;
    setDayStatus({ ...dayStatus, [key]: status });
  };

  return (
    <div className="calendar">
      
      <div className="calendar-header">
        <select value={month} onChange={(e) => setMonth(+e.target.value)}>
          {months.map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>

        <select value={year} onChange={(e) => setYear(+e.target.value)}>
          {[2024, 2025, 2026, 2027].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      
      <div className="grid weekdays">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      
      <div className="grid">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`e-${i}`}></div>
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const key = `${year}-${month}-${day}`;
          const status = dayStatus[key];

          return (
            <div
              key={day}
              className={`day
                ${status === "available" ? "available" : ""}
                ${status === "full" ? "full" : ""}
                ${status === "blocked" ? "blocked" : ""}
                ${selectedDate === `${months[month]} ${day}, ${year}` ? "selected" : ""}
              `}
              onClick={() =>
                setSelectedDate(`${months[month]} ${day}, ${year}`)
              }
            >
              {day}
            </div>
          );
        })}
      </div>


      <div className="legend">
        <div className="day available" onClick={() => applyStatus("available")}>
          Available
        </div>
        <div className="day full" onClick={() => applyStatus("full")}>
          Fully Booked
        </div>
        <div className="day blocked" onClick={() => applyStatus("blocked")}>
          Blocked
        </div>
      </div>
    </div>
  );
}
