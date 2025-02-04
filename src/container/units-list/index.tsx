import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import React from 'react';
import { useGetUnitsQuery } from '../../store/api';
import { LinkContainer } from 'react-router-bootstrap';
import { getConfigValue, getNavigationsValue, getNavigationValue } from '@brojs/cli';
import { Link } from 'react-router-dom';
import mainKurs from './images/bannerblock1.jpg';

const UnitsPage = (): React.ReactElement => {
  const { data: units, isLoading, error } = useGetUnitsQuery();

  return (
    <>
      <div className="container my-2 py-5">
        <MDBTypography tag="h2" className="text-muted text-center">
          Уроки
        </MDBTypography>
        <MDBRow className="align-items-center mb-5">
          <MDBCol md="5" className="pe-md-5 border-end ms-5">
            <MDBTypography tag="h2" className="fw-bold mb-5">
              Начать обучение
            </MDBTypography>
            <MDBTypography tag="p" className="text-muted mb-5 fs-6">
              Изучайте английский с нами. С нуля! <br />
              Практики, словари, видеоуроки и многое другое <br />
              Встроенный помощник
            </MDBTypography>
            <MDBBtn tag={Link} to={getNavigationsValue('eng-it-lean.generate-unit')} color="success">
              Сгенерировать урок
            </MDBBtn>
          </MDBCol>
          <MDBCol md="6" className="text-center">
            <img src={mainKurs} alt="Learning Illustration" className="img-fluid rounded" width="75%" height="75%" />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          {error && <MDBCol md="12">Что-то пошло не так</MDBCol>}

          {isLoading && <MDBCol md="12">Загрузка...</MDBCol>}

          {units &&
            units.map((unit) => (
              <MDBCol xl={4} lg={6} className="mb-4">
                <MDBCard key={unit.id}>
                  <MDBCardBody>
                    <MDBCardTitle className="text-muted ">{unit.name}</MDBCardTitle>
                    <LinkContainer to={`${getNavigationValue('eng-it-lean.unit').replace(':id', unit.id.toString())}`}>
                      <MDBBtn color="success">Изучить</MDBBtn>
                    </LinkContainer>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
        </MDBRow>
      </div>
    </>
  );
};

export default UnitsPage;
