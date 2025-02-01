'use client';

import React from 'react';
import { useCompletion } from 'ai/react';
import { getConfigValue } from '@brojs/cli';
import {
  MDBBtn,
  MDBCol,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBRow,
  MDBSpinner,
  MDBTypography
} from 'mdb-react-ui-kit';
import MarkdownStyled from '../../components/markdown';
import { usePutUnitMutation } from '../../store/api';
import { isPlainObject } from '@reduxjs/toolkit';

export default function GenerateUnitPage() {
  const {
    completion,
    isLoading: isGenerating,
    input,
    handleInputChange,
    handleSubmit
  } = useCompletion({
    api: `${getConfigValue('eng-it-lean.api')}/gigachat/new-unit`,
    onError: (error) => {
      console.error('An error occurred:', error);
    },
    onResponse: (response) => {
      console.log('Received HTTP response from server:', response);
    },
    streamProtocol: 'text'
  });

  const inputIsEmpty = input === '';
  const completionIsEmpty = completion === '';
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const toggleOpen = () => setIsModalOpen(!isModalOpen);

  const [putUnit, { isLoading }] = usePutUnitMutation();
  const handleCreate = () => {
    putUnit({
      name: input,
      content: completion
    }).then(() => {
      setIsModalOpen(false);
    });
  };

  return (
    <>
      <div className="container my-2 py-5">
        <MDBTypography tag="h2" variant="h2">
          Генерация нового урока
        </MDBTypography>
        <MDBRow tag="form" onSubmit={handleSubmit} className="g-3 align-items-center">
          <MDBCol size={2} />
          <MDBCol size={6}>
            <MDBInput value={input} name="prompt" onChange={handleInputChange} id="input" label="Введите тему урока" />
          </MDBCol>
          <MDBCol size={2}>
            <MDBBtn type="submit" disabled={inputIsEmpty} color="success">
              Сгенерировать
            </MDBBtn>
          </MDBCol>
          <MDBCol size={2} />
        </MDBRow>
        {isGenerating ? (
          <MDBSpinner role="status">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        ) : null}
        <MDBRow>
          <MDBCol>
            <MarkdownStyled>{completion}</MarkdownStyled>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol size={2} />
          <MDBCol size={8} className="text-center">
            <MDBBtn type="button" disabled={completionIsEmpty} color="success" onClick={toggleOpen}>
              Добавить
            </MDBBtn>
          </MDBCol>
          <MDBCol size={2} />
        </MDBRow>

        <MDBModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Вы уверены?</MDBModalTitle>
                <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
              </MDBModalHeader>

              <MDBModalBody>Добавить новый урок: {input}?</MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleOpen}>
                  Закрыть
                </MDBBtn>
                <MDBBtn color="success" disabled={isLoading} onClick={handleCreate}>
                  Подтвердить
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
        </div>
      </>
      );
      }
