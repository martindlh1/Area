import React from "react";
import "./index.css";

const ToggleButton = ({ state, onClick }) => {
  return (
    <div
      className="toggle-button-container"
      style={{ flexDirection: state ? "column-reverse" : "column" }}
      onClick={onClick}
    >
      <div className="toggle-button-square" />
      <span className="toggle-button-state">{state ? "ON" : "OFF"}</span>
    </div>
  );
};

export default ToggleButton;
