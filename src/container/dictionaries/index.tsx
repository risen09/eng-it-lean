import { getNavigationsValue } from '@brojs/cli';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBRipple,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBTypography
} from 'mdb-react-ui-kit';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetDictionariesQuery } from '../../store/api';

const DictionariesPage = (): React.ReactElement => {
  const { data: dictionaries, isLoading, error } = useGetDictionariesQuery(undefined);

  return (
    <div className="container my-2 py-5">
      <MDBTypography tag="h2" className="text-center mb-4">
        Словари
      </MDBTypography>
      <MDBRow className="g-2 justify-content-center">
        {error && <MDBCol md="12">Что-то пошло не так</MDBCol>}

        {isLoading && <MDBCol md="12">Загрузка...</MDBCol>}
        {dictionaries
          ?.map((dictionary) => (
            <MDBCol md="4">
              <MDBCard style={{ width: '18rem' }} className="rounded-4 shadow-sm">
                <MDBRipple rippleColor="light" rippleTag="div" className="bg-image hover-overlay">
                  <MDBCardImage
                    src={require('./images/' + dictionary.imageFilename)}
                    fluid
                    alt="..."
                    className="rounded-top"
                  />
                  <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </MDBRipple>
                <MDBCardBody>
                  <MDBCardTitle className="fw-bold fs-5">Словари</MDBCardTitle>
                  <MDBCardText className="text-muted">{dictionary.description}</MDBCardText>
                  <MDBBtn
                    tag={Link}
                    to={getNavigationsValue('eng-it-lean.dictionary').replace(':id', dictionary.id.toString())}
                    color="success"
                    className="btn-sm mt-2"
                  >
                    Подробнее
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))
          .slice(0, 5)}
      </MDBRow>
    </div>
  );
};

export default DictionariesPage;
