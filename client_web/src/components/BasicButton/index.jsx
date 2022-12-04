import React from "react";
import "./index.css";

export default function BasicButton({ title, onClick, style, addClass }) {
  return (
    <span
      onClick={onClick}
      className={"basic-button " + addClass}
      style={style}
    >
      {title}
    </span>
  );
}
