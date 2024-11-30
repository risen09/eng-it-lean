import './index.css';
import React from 'react';

const WordCard = ({id, word, definition}): React.ReactElement => {
  return (
    <div key={id} className="word-card">
      <h3>{word}</h3>
      <p>{definition}</p>
    </div>
  );
};

export default WordCard;
