import React from "react";
import "./card.css";

interface CardProps {
  index?: number;
  focusedIndex?: number;
}
const Card: React.FC<CardProps> = ({ index, focusedIndex }) => {
  const getCardClassName = () => {
    if (index === (focusedIndex ?? 0)) return "card focused";
    if (index === (focusedIndex ?? 0) - 1) return "card prev";
    if (index === (focusedIndex ?? 0) + 1) return "card next";
    return "card";
  };

  return (
    <div id={`card_${index}`} className={getCardClassName()}>
      {index}
      <h1>Card</h1>
    </div>
  );
};

export default Card;
