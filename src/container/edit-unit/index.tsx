import React from 'react';
import MarkdownStyled from '../../components/markdown';
import { MDBBtn, MDBCol, MDBInput, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MDXEditorMethods } from '@mdxeditor/editor';
import Editor from '../../components/editor';
import { usePostUnitMutation } from '../../store/api';
import { getNavigationsValue } from '@brojs/cli';
import { Unit } from '../../service/unit/types';

const EditUnitPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fromUnit } = location.state;
  const [unit, setUnit] = React.useState<Unit>(fromUnit?.unit);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnit({ ...unit, name: event.target.value });
  };
  const ref = React.useRef<MDXEditorMethods>(null);

  const [postUnit, { isLoading }] = usePostUnitMutation();
  const handleSave = () => {
    postUnit(unit)
      .then(() => {
        navigate(getNavigationsValue('eng-it-lean.unit').replace(':id', unit.id.toString()));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container my-2 py-5">
        <MDBTypography tag="h2" className="text-center text-muted">
          Редактирование урока
        </MDBTypography>
        <MDBRow className="mb-5">
          <MDBCol md={3} />
          <MDBCol md={6}>
            <MDBInput
              value={unit.name}
              onChange={handleInputChange}
              label="Название урока"
              id="formCounter"
              maxLength={50}
              showCounter={true}
            />
          </MDBCol>
          <MDBCol md={3} />
        </MDBRow>
        <MDBRow>
          <MDBCol md={6}>
            <Editor
              editorRef={ref}
              markdown={unit.content}
              onChange={(value) => {
                setUnit({ ...unit, content: value });
              }}
            />
          </MDBCol>
          <MDBCol md={6}>
            <MarkdownStyled>{unit?.content}</MarkdownStyled>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md={4} />
          <MDBCol md={4}>
            <MDBBtn color="success" onClick={handleSave} disabled={isLoading}>
              Сохранить
            </MDBBtn>
          </MDBCol>
          <MDBCol md={4} />
        </MDBRow>
      </div>
    </>
  );
};

export default EditUnitPage;
