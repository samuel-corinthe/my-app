import React, { useEffect, useRef } from "react";
import "./style.css";

export default function Card({ card, handleChoice, flipped, disabled }) {
  const flipSound = useRef(null);

  useEffect(() => {
    const audio = new Audio("/audio/flip.mp3");
    audio.volume = 0.8;
    audio.muted = false; 
    flipSound.current = audio;
  }, []);

  const handleClick = () => {
    if (!disabled && !flipped) {
      if (flipSound.current) {
        flipSound.current.currentTime = 0;
        flipSound.current.play().catch(() => {});
      }

      handleChoice(card);
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className={`inner ${flipped ? "flipped" : ""}`}>
        <img className="front" src={card.src} alt="carte Pokémon" />
        <img className="back" src="/img/back.png" alt="dos de carte Pokémon" />
      </div>
    </div>
  );
}
