import React from 'react';
import Row from '../../../../components/row';
import Column from '../../../../components/column';
import { WordDetailsStyled, Title, Definition, Heading, SynonymLink, Block, Example } from './index.style';

const WordDetails = ({ word }): React.ReactElement => {
  const wordSynonyms = word.synonyms.map((synonym) => <SynonymLink to={undefined}>{synonym}</SynonymLink>);
  const wordExamples = word.examples.map((example) => <Example>{example}</Example>);

  return (
    <WordDetailsStyled>
      <Title>{word.word}</Title>
      <Definition>{word.definition}</Definition>
      <Column>
        {wordExamples.length > 0 ? (
          <Row>
            <Heading>synonyms</Heading>
            <Block>{wordSynonyms}</Block>
          </Row>
        ) : (
          <></>
        )}
        <Row>
          <Heading>examples:</Heading>
          <Block direction="column">{wordExamples}</Block>
        </Row>
      </Column>
    </WordDetailsStyled>
  );
};

export default WordDetails;
