import React from "react";
import "./card.css";
import SubCard from "./SubCard";

interface CardProps {
  index?: number;
  focusedIndex?: number;
  width?: string;
  height?: string;
  onClick?: (index:number) => void;
}
const Card: React.FC<CardProps> = ({ index, focusedIndex, height, onClick }) => {
  const getCardClassName = () => {
    if (index === (focusedIndex ?? 0)) return "card focused";
    if (index === (focusedIndex ?? 0) - 1) return "card prev";
    if (index === (focusedIndex ?? 0) + 1) return "card next";
    return "card";
  };

  return (
    <div
      id={`card_${index}`}
      className={getCardClassName()}
      style={{ height }}
      onClick={onClick ? () => onClick(index ?? 0) : undefined}
    >
      <div className="card-inner">
        <SubCard height="100px" width="100%" />
        <div className="mt-5 flex w-full">
          <SubCard height="40px" width="50px" borderRadius="50%" />
          <div className="ml-2 flex flex-col w-full">
            <SubCard height="20px" width="100%" innerPadding="2px" />
            <SubCard
              height="10px"
              width="50%"
              marginTop="10px"
              innerPadding="2px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
