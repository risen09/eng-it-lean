import "./index.css";
import React from "react";
import { WordCardStyled, WordCardTitle } from "./index.style";

const WordCard = ({ onClick, word, definition }): React.ReactElement => {
  return (
    <WordCardStyled onClick={onClick}>
      <WordCardTitle>{word}</WordCardTitle>
      <p>{definition}</p>
    </WordCardStyled>
  );
};

export default WordCard;
