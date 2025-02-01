import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import React from 'react';
import { useGetUnitsQuery } from '../../store/api';
import { LinkContainer } from 'react-router-bootstrap';
import { getConfigValue, getNavigationValue } from '@brojs/cli';

const UnitsPage = (): React.ReactElement => {
  const { data: units, isLoading, error } = useGetUnitsQuery();

  return (
    <>
      <div className="container my-2 py-5">
        <MDBTypography tag="h1">Уроки</MDBTypography>
        <MDBRow>
          <MDBCol md="3" className='mb-4'>
            <LinkContainer to={`${getNavigationValue('eng-it-lean.generate-unit')}`}>
              <MDBBtn color="success">Сгенерировать урок по запросу</MDBBtn>
            </LinkContainer>
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
                    <MDBCardTitle>{unit.name}</MDBCardTitle>
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