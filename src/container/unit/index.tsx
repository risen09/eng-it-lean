import React from 'react';
import { useGetUnitQuery } from '../../store/api';
import remarkGfm from 'remark-gfm';
import { Main } from './index.style';
import MarkdownStyled from '../../components/markdown';
import { MDBBtn, MDBCol, MDBIcon, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { getFeatures, getNavigationsValue } from '@brojs/cli';
import { LinkContainer } from 'react-router-bootstrap';

const UnitPage = (): React.ReactElement => {
  const { id } = useParams();
  const { data: unit, isLoading, error } = useGetUnitQuery(parseInt(id));
  const canEdit = getFeatures('eng-it-lean')?.['unit.edit'];

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
      <div className="container my-2 py-5">
        <MDBRow>
          <MDBCol md={2} />
          <MDBCol className="text-center" md={8}>
            <MDBTypography variant="h1">{unit?.name}</MDBTypography>
          </MDBCol>
          <MDBCol className="text-center" md={2}>
            { canEdit && (<LinkContainer
              to={`${getNavigationsValue('eng-it-lean.edit-unit')}`}
              state={{
                fromUnit: {
                  unit: !isLoading && unit !== null ? unit : undefined
                }
              }}
            >
              <MDBBtn color="white">
                <MDBIcon icon="edit" />
              </MDBBtn>
            </LinkContainer>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MarkdownStyled>{unit?.content}</MarkdownStyled>
          </MDBCol>
        </MDBRow>
      </div>
    </>
  );
};

export default UnitPage;
