import React from "react";
import "./style.css";

export default function SelectLevel({ cardCount, onLevelChange }) {
  return (
    <div className="select-level">
      <select id="level" onChange={onLevelChange} value={cardCount}>
        <option value="4">Facile (4 paires)</option>
        <option value="6">Normal (6 paires)</option>
        <option value="8">Difficile (8 paires)</option>
      </select>
    </div>
  );
}
