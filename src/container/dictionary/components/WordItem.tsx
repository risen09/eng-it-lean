import React, { useState } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardText,
  MDBCardTitle,
  MDBCollapse,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { getNavigationValue } from '@brojs/cli';
import { LinkContainer } from 'react-router-bootstrap';
import { Word } from '../types';

const WordItem = ({ word }: { word: Word }): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>{word.word}</MDBCardTitle>
        <MDBCardText>{word.definition}</MDBCardText>
        <MDBBtn onClick={toggle}>More</MDBBtn>
        <MDBCollapse open={isOpen} className="py-2">
          <MDBCardText>synonyms</MDBCardText>
          {word.synonyms.map((synonym) => (
            <LinkContainer to={`${getNavigationValue('eng-it-lean.dictionary')}`}>
              <MDBBtn color="link" rippleColor="dark">
                {synonym}
              </MDBBtn>
            </LinkContainer>
          ))}
          <MDBCardText>examples</MDBCardText>
          {word.examples.map((example) => (
            <MDBCardGroup tag="i">
              <MDBCardText>{example}</MDBCardText>
            </MDBCardGroup>
          ))}
        </MDBCollapse>
      </MDBCardBody>
    </MDBCard>
  );
};

export default WordItem;
