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
import { Word } from './types';
import { useParams } from 'react-router-dom';
import { useGetDictionaryWordsQuery } from '../../store/api';

const DictionaryPage = (): React.ReactElement => {
  const { id } = useParams();
  const { data: dictionary, isLoading, error } = useGetDictionaryWordsQuery(parseInt(id));

  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);

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
          <MDBCard tag="button" onClick={() => setIsCreateModalOpened(true)}>
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
              <MDBListGroup>
                <MDBListGroupItem noBorders>
                  <MDBInput label="Термин" />
                </MDBListGroupItem>
                <MDBListGroupItem noBorders>
                  <MDBTextArea label="Определение" />
                </MDBListGroupItem>
                <MDBListGroupItem noBorders>
                  <MDBInput label="Синонимы">
                    <div className="form-helper">Введите синонимы через запятую</div>
                  </MDBInput>
                </MDBListGroupItem>
                <MDBListGroupItem noBorders>
                  <MDBTextArea label="Примеры" />
                </MDBListGroupItem>
                <MDBListGroupItem noBorders>
                  <MDBBtn color="primary" onClick={() => setIsCreateModalOpened(false)}>
                    Добавить
                  </MDBBtn>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default DictionaryPage;
