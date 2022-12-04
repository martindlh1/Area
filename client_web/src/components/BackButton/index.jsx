import React from "react";
import "./index.css";
import BackIcon from "./BackIcon.svg";
import { Link } from "react-router-dom";

export default function BackButton({ to }) {
  return (
    <Link to={to ? to : -1}>
      <img className="back-btn" src={BackIcon} alt="Back" />
    </Link>
  );
}
