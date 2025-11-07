import React, { useRef, useState } from "react";
import "./style.css";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player">
      <audio ref={audioRef} loop>
        <source src="/audio/battle_4g.mp3" type="audio/mpeg" />
      </audio>
      <button onClick={toggleMusic} className="music-btn">
        {isPlaying ? "On" : "Off"}
      </button>
    </div>
  );
}
