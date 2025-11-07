import React from "react";
import "./style.css";

export default function SoundToggle({ muted, onToggle }) {
  return (
    <button
      className="music-btn sound-toggle"
      onClick={onToggle}
      aria-pressed={!muted}
      aria-label={muted ? "Activer le son" : "Couper le son"}
    >
      {muted ? (
      
<svg
  width="22"
  height="22"
  viewBox="0 0 24 24"
  fill="none"
  aria-hidden="true"
>
  {/* Cloche */}
  <path
    d="M13 20a2 2 0 1 1-4 0"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round"
  />
  <path
    d="M18 9a6 6 0 1 0-12 0c0 2-0 4-2 6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2c-2-2-2-4-2-6Z"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round"
  />
  <path
    d="M20 6c.8.9 1.3 2 1.3 3.2"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round"
  />

  {/* Barre diagonale pour "OFF" */}
  <line
    x1="4"
    y1="20"
    x2="20"
    y2="4"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round"
  />
</svg>

      ) : (
        /* Bell on */
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M13 20a2 2 0 1 1-4 0"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18 9a6 6 0 1 0-12 0c0 2-0 4-2 6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2c-2-2-2-4-2-6Z"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 6c.8.9 1.3 2 1.3 3.2"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
      <span className="label">{muted ? "Son OFF" : "Son ON"}</span>
    </button>
  );
}
