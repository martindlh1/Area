import React from "react";
import AddIcon from "./Add.svg";
import "./index.css";

function HorizontalListButtonAdd() {
  return (
    <div className="horizontal-list-create-btn">
      <img
        className="horizontal-list-create-btn-icon"
        src={AddIcon}
        alt="Add icon"
      />
      <span className="horizontal-list-create-btn-body">Add Actions</span>
    </div>
  );
}

export default function HorizontalList() {
  return <HorizontalListButtonAdd />;
}
