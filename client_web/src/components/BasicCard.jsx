import React from "react";

const BasicCard = ({ title, color }) => {
  return (
    <div
      className="action-card-container"
      style={{
        backgroundColor: color,
      }}
    >
      <span
        className="action-card-title {
"
      >
        {title}
      </span>
    </div>
  );
};

export default BasicCard;
