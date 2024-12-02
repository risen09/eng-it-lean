import './index.css';
import React from 'react';
import { Word } from './types';
import WordCard from './components/word-card';
import WordDetails from './components/word-details';
import { vocabulary } from './vocabulary';

const VocabularyPage = (): React.ReactElement => {
  const wordCards = vocabulary.map((word) => <WordCard id={word.id} word={word.word} definition={word.definition} />);

  return (
    <div className="main">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '20px'
        }}
      >
        <div
          style={{
            flexDirection: 'column'
          }}
        >
          {wordCards}
        </div>
				<WordDetails wordId={1} />
      </div>
    </div>
  );
};

export default VocabularyPage;
