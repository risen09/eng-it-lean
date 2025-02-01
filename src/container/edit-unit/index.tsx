import React from 'react';
import MarkdownStyled from '../../components/markdown';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { useLocation, useParams } from 'react-router-dom';
import { MDXEditorMethods } from '@mdxeditor/editor';
import Editor from '../../components/editor';

const EditUnitPage = (): React.ReactElement => {
  const location = useLocation();
  const { fromUnit } = location.state
  const unit = fromUnit.unit
  const [ content, setContent ] = React.useState(unit?.content);
  const ref = React.useRef<MDXEditorMethods>(null);

  return (
    <>
      <div className="container my-2 py-5">
        <MDBRow>
          <MDBCol md={6}>
            <Editor
              editorRef={ref}
              markdown={content}
              onChange={(value) => {
                setContent(value);
              }}
            />
          </MDBCol>
          <MDBCol md={6}>
            <MarkdownStyled>{content ? content : unit?.content}</MarkdownStyled>
          </MDBCol>
        </MDBRow>
      </div>
    </>
  );
};

export default EditUnitPage;
