import React, { useState } from "react";

export default function TimeSlots({ selectedDate }) {
  const [slots, setSlots] = useState([
    { start: "09:00", end: "10:00", status: "available" },
    { start: "10:00", end: "11:00", status: "full" },
    { start: "11:00", end: "12:00", status: "available" }
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");

  if (!selectedDate) {
    return <div className="slots">Select a date</div>;
  }

  
  const toggleStatus = (index) => {
    const updated = [...slots];
    const current = updated[index].status;

    updated[index].status =
      current === "available"
        ? "full"
        : current === "full"
        ? "blocked"
        : "available";

    setSlots(updated);
  };

  
  const addSlot = () => {
    if (!newStart || !newEnd) return;

    setSlots([
      ...slots,
      { start: newStart, end: newEnd, status: "available" }
    ]);

    setNewStart("");
    setNewEnd("");
    setShowAdd(false);
  };

  
  const blockEntireDay = () => {
    setSlots(slots.map(s => ({ ...s, status: "blocked" })));
  };

  return (
    <div className="slots">
      <h3>Availability Settings</h3>

      <button className="block-day" onClick={blockEntireDay}>
        Block Entire Day
      </button>

      {slots.map((slot, i) => (
        <div
          key={i}
          className={`slot ${slot.status}`}
          onClick={() => toggleStatus(i)}
        >
          {slot.start} - {slot.end} — {slot.status}
        </div>
      ))}

      {!showAdd && (
        <button className="add-slot" onClick={() => setShowAdd(true)}>
          + Add Slot
        </button>
      )}

      {showAdd && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="time"
            value={newStart}
            onChange={(e) => setNewStart(e.target.value)}
          />
          <span style={{ margin: "0 8px" }}>to</span>
          <input
            type="time"
            value={newEnd}
            onChange={(e) => setNewEnd(e.target.value)}
          />
          <button style={{ marginLeft: "10px" }} onClick={addSlot}>
            Add
          </button>
        </div>
      )}
    </div>
  );
}
