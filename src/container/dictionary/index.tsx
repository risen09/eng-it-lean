import React, { useState } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBBtn,
  MDBModalContent,
  MDBModalBody,
  MDBInput,
  MDBTextArea,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import WordItem from './components/WordItem';
import { useParams } from 'react-router-dom';
import { useGetDictionaryQuery, usePostDictionaryMutation, usePutWordMutation } from '../../store/api';
import { Word } from '../../service/words/types';
import { Controller, useForm } from 'react-hook-form';

interface IFormInput {
  word: string;
  translation: string;
  definition: string;
  synonyms: string;
  examples: string;
}

const DictionaryPage = (): React.ReactElement => {
  const { id } = useParams();
  const { data: dictionary, isLoading, error } = useGetDictionaryQuery(parseInt(id));

  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);
  const { register, control, handleSubmit } = useForm();
  const onSubmit = (data: IFormInput) => {
    console.log(data);
    putWord({
      id: 0,
      word: data.word,
      translation: data.translation,
      definition: data.definition,
      synonyms: data.synonyms ? data.synonyms.split(',') : [],
      examples: data.examples ? data.examples.split('\n') : []
    }).then((value) => {
      console.log(value);
      postDictionary({id: parseInt(id), word: value.data}).then(() => {
        setIsCreateModalOpened(false);
        data = {
          word: '',
          definition: '',
          translation: '',
          synonyms: '',
          examples: ''
        };
      });
    });
  };
  const [putWord, { isLoading: isPutting }] = usePutWordMutation();
  const [postDictionary, { isLoading: isPosting }] = usePostDictionaryMutation();

  return (
    <>
      <MDBRow>
        {error && <MDBCol md="12">Что-то пошло не так</MDBCol>}

        {isLoading && <MDBCol md="12">Загрузка...</MDBCol>}

        {dictionary &&
          dictionary.words?.map((word: Word) => (
            <MDBCol xl={4} lg={6} className="mb-4">
              <WordItem key={word.id} word={word} />
            </MDBCol>
          ))}

        <MDBCol xl={4} lg={6} className="mb-4">
          <MDBCard tag="button" aria-label="add word button" onClick={() => setIsCreateModalOpened(true)}>
            <MDBCardBody className="h-70">
              <MDBIcon fas icon="add" color="secondary" size="2xl" />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBModal tabIndex="-1" open={isCreateModalOpened} setOpen={setIsCreateModalOpened}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Добавить термин</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setIsCreateModalOpened(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form aria-label="word-form" onSubmit={handleSubmit(onSubmit)}>
                <MDBInput wrapperClass="my-2" {...register('word', { required: true })} label="Термин" aria-label='term'/>
                <MDBInput wrapperClass="my-2" {...register('translation', { required: true })} label="Перевод" />
                <Controller
                  name="definition"
                  control={control}
                  render={({ field }) => <MDBTextArea wrapperClass="my-2" {...field} label="Определение" />}
                />
                <MDBInput wrapperClass="my-2" {...register('synonyms')} label="Синонимы" />
                <Controller
                  name="examples"
                  control={control}
                  render={({ field }) => <MDBTextArea wrapperClass="my-2" {...field} label="Примеры" />}
                />
                <MDBBtn className="my-2" disabled={isPutting || isPosting} color="primary" type="submit">
                  Добавить
                </MDBBtn>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default DictionaryPage;
