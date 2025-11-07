import React, { useState, useEffect, useRef } from "react";
import Title from "./components/Title";
import Button from "./components/Button";
import Card from "./components/Card";
import SelectLevel from "./components/SelectLevel";
import MusicPlayer from "./components/MusicPlayer";
import SoundToggle from "./components/SoundToggle";

import "./App.css";

const cardImages = [
  { src: "/img/brazegali.png", matched: false },
  { src: "/img/jungko.png", matched: false },
  { src: "/img/lagron.png", matched: false },
  { src: "/img/simiabraz.png", matched: false },
  { src: "/img/pingoleon.png", matched: false },
  { src: "/img/torterra.png", matched: false },
  { src: "/img/latias.png", matched: false },
  { src: "/img/rayquaza.png", matched: false },
];

export default function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [victory, setVictory] = useState(false);
  const [cardCount, setCardCount] = useState(8);
  const [isMuted, setIsMuted] = useState(false);
  const [musicOn, setMusicOn] = useState(false); 

  const battleMusicRef = useRef(null);
  const victoryMusicRef = useRef(null);

  const shuffleCards = (count = cardCount) => {
    const selectedCards = cardImages.slice(0, count);
    const shuffledCards = [...selectedCards, ...selectedCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setVictory(false);

    if (battleMusicRef.current) {
      battleMusicRef.current.currentTime = 0;
      battleMusicRef.current.play();
    }
    if (victoryMusicRef.current) {
      victoryMusicRef.current.pause();
      victoryMusicRef.current.currentTime = 0;
    }
  };

  const handleChoice = (card) => {
    if (!disabled) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 800);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (cards.length && cards.every((card) => card.matched)) {
      setVictory(true);

      if (battleMusicRef.current) {
        battleMusicRef.current.pause();
      }

      if (victoryMusicRef.current) {
        victoryMusicRef.current.currentTime = 0;
        victoryMusicRef.current.play();
      }
    }
  }, [cards]);

  useEffect(() => {
    shuffleCards(cardCount);
  }, []);

  const handleLevelChange = (e) => {
    const newCount = parseInt(e.target.value);
    setCardCount(newCount);
    shuffleCards(newCount);
  };

return (
  <div className="App">
    <Title text="Memory Pokémon" />

    <audio ref={battleMusicRef} src="/audio/battle_4g.mp3" loop />
    <audio ref={victoryMusicRef} src="/audio/victory.mp3" />

    <div className="music-controls">
      <SoundToggle
        muted={isMuted}
        onToggle={() => {
          const newMute = !isMuted;
          setIsMuted(newMute);

          if (battleMusicRef.current)
            battleMusicRef.current.muted = newMute;
          if (victoryMusicRef.current)
            victoryMusicRef.current.muted = newMute;

          
          if (!newMute && battleMusicRef.current.paused) {
            battleMusicRef.current
              .play()
              .catch(() =>
                console.log("Lecture audio bloquée jusqu’à interaction utilisateur.")
              );
          }
        }}
      />
    </div>

    <SelectLevel cardCount={cardCount} onLevelChange={handleLevelChange} />
    <Button onClick={() => shuffleCards(cardCount)} label=" Rejouer" />

    <p>Nombre de tours : {turns}</p>

    {victory && <p className="victory">Bravo, vous avez gagné ! </p>}

    <div className={`card-grid ${victory ? "victory-mode" : ""}`}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={
            card === choiceOne ||
            card === choiceTwo ||
            card.matched
          }
          disabled={disabled}
        />
      ))}
    </div>

    {victory && <div className="fireworks"></div>}
  </div>
);

}
