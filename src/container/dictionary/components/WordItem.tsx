import React, { useState } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from 'mdb-react-ui-kit';
import { getNavigationValue } from '@brojs/cli';
import { LinkContainer } from 'react-router-bootstrap';
import { Word } from '../../../service/words/types';

const WordItem = ({ word }: { word: Word }): React.ReactElement => {
  const [centredModal, setCentredModal] = useState(false);
  const toggleOpen = () => setCentredModal(!centredModal);

  return (
    <>
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>{word.word}</MDBCardTitle>
          <MDBModalContent>{word.definition}</MDBModalContent>
          <MDBBtn aria-expanded="false" color="success" onClick={toggleOpen}>
            More
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>

      <MDBModal tabIndex="-1" open={centredModal} setOpen={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{word.word}</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              definition:
              <MDBModalContent>{word.definition}</MDBModalContent>
              synonyms:
              <br />
              {word.synonyms.map((synonym, index) => (
                <div key={index}>{synonym}</div>
              ))}
              <br />
              examples:
              <MDBModalContent>
                {word.examples.map((example, index) => (
                  <i key={index}>{example}</i>
                ))}
              </MDBModalContent>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default WordItem;
