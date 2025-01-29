'use client';

import React from 'react';
import { useChat, useCompletion } from 'ai/react';
import { getConfigValue } from '@brojs/cli';
import { MDBBtn, MDBCol, MDBInput, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import MarkdownStyled from '../../components/markdown';

export default function Page() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    api: `${getConfigValue('eng-it-lean.api')}/gigachat/new-unit`,
    onError: (error) => {
      console.error('An error occurred:', error);
    },
    onResponse: (response) => {
      console.log('Received HTTP response from server:', response);
    }
  });

  return (
    <>
      <MDBTypography tag="h2" variant="h2">Генерация нового урока</MDBTypography>
      <MDBRow tag="form" onSubmit={handleSubmit} className="g-3 align-items-center">
        <MDBCol size={2} />
        <MDBCol size={6}>
          <MDBInput value={input} name="prompt" onChange={handleInputChange} id='input' label="Введите тему урока" />
        </MDBCol>
        <MDBCol size={2}>
          <MDBBtn type='submit'>
            Сгенерировать
          </MDBBtn>
        </MDBCol>
        <MDBCol size={2} />
      </MDBRow>
      <MarkdownStyled>{completion}</MarkdownStyled>
    </>
  );
}
