import React from "react";
import "./index.css";

const Error = () => {
  return (
    <div className="error-container">
      <img className="error-area-icon" src="/logo.svg" alt="AREA Logo" />
      <span className="error-area-text">
        Connection to server impossible, please retry later
      </span>
    </div>
  );
};

export default Error;
