import React from "react";
import "./index.css";
import AddIcon from "./Add.svg";

export default function AddButton({ onClick }) {
  return (
    <div className="area-actions-create-btn" onClick={onClick}>
      <img
        className="area-actions-create-btn-icon"
        src={AddIcon}
        alt="Add icon"
      />
      <span className="area-actions-create-btn-body">Add Actions</span>
    </div>
  );
}
