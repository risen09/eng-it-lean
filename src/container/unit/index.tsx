import React from 'react';
import Markdown from 'react-markdown';
import { useGetUnitQuery } from '../../store/api';
import remarkGfm from 'remark-gfm';

const UnitPage = (): React.ReactElement => {
  const { data: unit, isLoading, error } = useGetUnitQuery(0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return <Markdown remarkPlugins={[remarkGfm]}>{unit?.content}</Markdown>;
};

export default UnitPage;
