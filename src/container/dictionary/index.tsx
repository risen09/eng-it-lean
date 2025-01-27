import React, { useState } from 'react';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import WordItem from './components/WordItem';
import { Word } from './types';
import { useParams } from 'react-router-dom';
import { useGetDictionaryWordsQuery } from '../../store/api';

const DictionaryPage = (): React.ReactElement => {
  const { id } = useParams();
  const { data: dictionary, isLoading, error } = useGetDictionaryWordsQuery(parseInt(id));

  return (
    <MDBRow>
      {error && <MDBCol md="12">Что-то пошло не так</MDBCol>}

      {isLoading && <MDBCol md="12">Загрузка...</MDBCol>}

      {dictionary &&
        dictionary.words?.map((word: Word) => (
          <MDBCol xl={4} lg={6} className="mb-4">
            <WordItem key={word.id} word={word} />
          </MDBCol>
        ))}
    </MDBRow>
  );
};

export default DictionaryPage;
