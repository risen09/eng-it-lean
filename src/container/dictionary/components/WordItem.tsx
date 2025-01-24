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
        <MDBBtn aria-expanded="false" onClick={toggle}>More</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default WordItem;
