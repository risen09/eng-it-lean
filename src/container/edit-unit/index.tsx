import React from 'react';
import MarkdownStyled from '../../components/markdown';
import { MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MDXEditorMethods } from '@mdxeditor/editor';
import Editor from '../../components/editor';
import { usePostUnitMutation } from '../../store/api';
import { getNavigationsValue } from '@brojs/cli';

const EditUnitPage = (): React.ReactElement => {
  const location = useLocation();
  const { fromUnit } = location.state
  const unit = fromUnit.unit
  const [ content, setContent ] = React.useState(unit?.content);
  const ref = React.useRef<MDXEditorMethods>(null);

  const [ postUnit, { isLoading } ] = usePostUnitMutation();
  const handleSave = () => {
    postUnit({
      content: content,
      ...unit
    }).then(() => {
    }).catch((error) => {
      console.log(error);
    });
  }

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
        <MDBRow>
          <MDBCol md={4}/>
          <MDBCol md={4}>
            <MDBBtn color='success' onClick={handleSave} disabled={isLoading}>
              Сохранить
              </MDBBtn>
          </MDBCol>
          <MDBCol md={4}/>
        </MDBRow>
      </div>
    </>
  );
};

export default EditUnitPage;
