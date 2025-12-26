import React from "react";


export default function Card({ children }) {
  return (
    <div className="card-wrapper">
      <div className="card">
        {children}
      </div>
    </div>
  );
}