import React from 'react';
import { useGetUnitQuery } from '../../store/api';
import remarkGfm from 'remark-gfm';
import { Main } from './index.style';
import MarkdownStyled from '../../components/markdown';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';

const UnitPage = (): React.ReactElement => {
  const { id } = useParams();
  const { data: unit, isLoading, error } = useGetUnitQuery(parseInt(id));

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
      <div className="container my-2 py-5">
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
