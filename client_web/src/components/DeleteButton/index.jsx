import React from "react";
import "./index.css";
import DeleteIcon from "./delete.png";

const DeleteButton = ({ onClick }) => {
  return (
    <div className="delete-button-container" onClick={onClick}>
      <img className="delete-button-icon" src={DeleteIcon} alt="Delete" />
    </div>
  );
};

export default DeleteButton;
