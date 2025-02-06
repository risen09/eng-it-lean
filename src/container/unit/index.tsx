import React from 'react';
import { useGetUnitQuery } from '../../store/api';
import remarkGfm from 'remark-gfm';
import { Main } from './index.style';
import MarkdownStyled from '../../components/markdown';
import { MDBBtn, MDBCol, MDBIcon, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { getFeatures, getNavigationsValue } from '@brojs/cli';
import { LinkContainer } from 'react-router-bootstrap';
import { useCookies } from 'react-cookie';

const UnitPage = (): React.ReactElement => {
  const { id } = useParams();
  const { data: unit, isLoading, error } = useGetUnitQuery(parseInt(id));
  const [cookies] = useCookies(['auth_token']);
  const canEdit = getFeatures('eng-it-lean')?.['unit.edit'] && cookies.auth_token && unit?.author?.public_id == cookies.auth_token;

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
      <div className="container my-2 py-5">
        <MDBRow>
          <MDBCol md={2} />
          <MDBCol className="text-center" md={8}>
            <MDBTypography tag="h1" variant="h1">
              {unit?.name}
            </MDBTypography>
          </MDBCol>
          <MDBCol className="text-center" md={2}>
            {canEdit && (
              <LinkContainer
                to={`${getNavigationsValue('eng-it-lean.edit-unit')}`}
                state={{
                  fromUnit: {
                    unit: !isLoading && unit !== null ? unit : undefined
                  }
                }}
              >
                <MDBBtn color="white">
                  <MDBIcon tag="span" icon="edit" />
                </MDBBtn>
              </LinkContainer>
            )}
          </MDBCol>
        </MDBRow>
        { unit?.author && (
        <MDBTypography tag="p" className="text-center text-muted mb-5 fs-6">
          Автор: {unit?.author?.nickname}
        </MDBTypography> )}
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
