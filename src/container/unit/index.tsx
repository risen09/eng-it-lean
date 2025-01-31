import React from 'react';
import { useGetUnitQuery } from '../../store/api';
import remarkGfm from 'remark-gfm';
import { Main } from './index.style';
import MarkdownStyled from '../../components/markdown';

const UnitPage = (): React.ReactElement => {
  const { data: unit, isLoading, error } = useGetUnitQuery(0);

  return (
    <Main>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
      <MarkdownStyled>{unit?.content}</MarkdownStyled>
    </Main>
  );
};

export default UnitPage;
