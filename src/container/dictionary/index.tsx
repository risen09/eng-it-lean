import './index.css';
import React, { useState, useEffect } from 'react';
import { Word } from './types';
import WordCard from './components/word-card';
import WordDetails from './components/word-details';
import { useParams } from 'react-router-dom';
import { getConfigValue } from '@brojs/cli';
import { useGetDictionaryWordsQuery } from '../../store/api';

const DictionaryPage = (): React.ReactElement => {
  const { id } = useParams();
  const { data: dictionary, isLoading, error } = useGetDictionaryWordsQuery(parseInt(id));
  const [wordId, setWordId] = useState(-1);

  return (
    <div className="main">
      {error && <div>Произошла ошибка</div>}
      {isLoading && <div>Loading...</div>}
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
          {dictionary?.words?.map((word) => (
            <WordCard onClick={() => setWordId(word.id)} key={word.id} word={word.word} definition={word.definition} />
          ))}
        </div>
        {wordId > -1 ? <WordDetails word={dictionary?.words[wordId]} /> : <></>}
      </div>
    </div>
  );
};

export default DictionaryPage;
