import React from "react";
import "./style.css";

export default function Button({ onClick, label }) {
  return (
    <button className="btn" onClick={onClick}>
      {label}
    </button>
  );
}
