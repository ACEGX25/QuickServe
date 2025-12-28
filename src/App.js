import { useState } from "react";
import Calendar from "./components/Calendar";
import TimeSlots from "./components/TimeSlots";
import "./App.css";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="page">
      <div className="main-card">
        <h2 className="title">Select Date & Time</h2>

        <div className="content">
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <TimeSlots selectedDate={selectedDate} />
        </div>

        <div className="footer">
          <span>
            Selected: {selectedDate ? selectedDate : "None"}
          </span>

          <button className="confirm-btn">
            Continue to Confirmation
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
