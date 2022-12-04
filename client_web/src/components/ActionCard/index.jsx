import React from "react";
import "./index.css";

export default function ActionCard({ action, onClick, params, logo, color }) {
  return (
    <div
      className="action-card-container"
      onClick={onClick}
      style={{
        padding: params ? "4px" : "10px",
        backgroundColor: color,
      }}
    >
      {logo && (
        <img className="action-card-icon" src={action.logo} alt="Logo" />
      )}
      <span className="action-card-title">{action.desc}</span>
      {params && <span className="action-card-details">[{params}]</span>}
    </div>
  );
}
