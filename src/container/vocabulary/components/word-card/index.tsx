import './index.css';
import React from 'react';
import { WordCardStyled, WordCardTitle } from './index.style';

const WordCard = ({ id, word, definition }): React.ReactElement => {
  return (
    <WordCardStyled>
      <WordCardTitle>{word}</WordCardTitle>
      <p>{definition}</p>
    </WordCardStyled>
  );
};

export default WordCard;
