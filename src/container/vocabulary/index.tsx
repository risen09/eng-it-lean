import './index.css';
import React from 'react';
import WordCard from './components/word-card';

const vocabulary = [
	{
		id: 1,
		word: "Tech",
		definition: "short for technical, relating to the knowledge, machines, or methods used in science and industry. Tech is a whole industry, which includes IT"
	},
	{
		id: 2,
		word: "career path",
		definition: "the series of jobs or roles that constitute a person's career, especially one in a particular field"
	},
]

const VocabularyPage = (): React.ReactElement => {
	const wordCards = vocabulary.map(word => 
		<WordCard
			id={word.id}
			word={word.word}
			definition={word.definition}
		/>
	);

  return (
    <div className="main">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
					padding: '20px',
        }}
      >
				{wordCards}
      </div>
    </div>
  );
};

export default VocabularyPage;
