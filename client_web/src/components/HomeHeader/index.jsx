import React from "react";
import "./index.css";

export default function TabTitle({ title }) {
  return (
    <div className="title-container">
      <span className="title-text">{title}</span>
      <hr className="title-line" size="4" color="#4461F2" />
    </div>
  );
}
