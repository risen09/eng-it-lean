'use client';

import React from 'react';
import { useCompletion } from 'ai/react';
import { getConfigValue } from '@brojs/cli';
import {
  MDBBtn,
  MDBCheckbox,
  MDBCol,
  MDBInput,
  MDBInputGroup,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBRow,
  MDBSpinner,
  MDBTypography
} from 'mdb-react-ui-kit';
import MarkdownStyled from '../../components/markdown';
import { usePutUnitMutation } from '../../store/api';
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  headingsPlugin,
  InsertCodeBlock,
  InsertTable,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import Editor from '../../components/editor';
import { useCookies } from 'react-cookie';

export default function GenerateUnitPage() {
  const {
    completion,
    setCompletion,
    isLoading: isGenerating,
    input,
    handleInputChange,
    handleSubmit
  } = useCompletion({
    api: `${getConfigValue('eng-it-lean.api')}/gigachat/new-unit`,
    onError: (error) => {
      console.error('An error occurred:', error);
    },
    onResponse: (response) => {
      console.log('Received HTTP response from server:', response);
    },
    streamProtocol: 'text',
  });

  const inputIsEmpty = input === '';
  const completionIsEmpty = completion === '';
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const toggleOpen = () => setIsModalOpen(!isModalOpen);

  const [cookies] = useCookies(['auth_token'])
  const [putUnit, { isLoading }] = usePutUnitMutation();
  const handleCreate = () => {
    putUnit({
      author: cookies.auth_token,
      name: input,
      content: completion
    }).then(() => {
      setIsModalOpen(false);
      setIsEditorOpen(false);
      setCompletion('');
    });
  };

  const [isEditorOpen, setIsEditorOpen] = React.useState(false);
  const toggleEditor = () => {
    setIsEditorOpen(!isEditorOpen);
    if (isEditorOpen) {
      ref.current?.focus();
      ref.current?.setMarkdown(completion);
    }
  };
  const ref = React.useRef<MDXEditorMethods>(null);

  return (
    <>
      <div className="container my-2 py-5">
      <MDBTypography tag="h2" className="text-muted mb-5 text-center">
          Генерация нового урока
        </MDBTypography>
        <MDBRow tag="form" onSubmit={handleSubmit} className="">
          <MDBCol size={2} />
          <MDBCol size={8}>
            <MDBInputGroup
              textBefore={
                <MDBCheckbox
                  label="Редактировать"
                  disabled={completionIsEmpty}
                  checked={isEditorOpen}
                  onChange={() => toggleEditor()}
                />
              }
            >
              <MDBInput
                value={input}
                name="prompt"
                onChange={handleInputChange}
                id="input"
                label="Введите тему урока"
              />
              <MDBBtn outline type="submit" className="w-25" disabled={inputIsEmpty} color="success">
                Сгенерировать
              </MDBBtn>
            </MDBInputGroup>
          </MDBCol>
          <MDBCol size={2} />
        </MDBRow>
        <MDBRow>
          <MDBCol size={2} />
          <MDBCol size={6}>
            <div className="form-text">Powered by GigaChat</div>
          </MDBCol>
          <MDBCol size={2} />
        </MDBRow>
        {isGenerating ? (
          <MDBSpinner role="status">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        ) : null}
        <MDBRow className="my-4">
          {isEditorOpen && (
            <MDBCol md={6}>
              <Editor
                editorRef={ref}
                markdown={completion}
                onChange={(value) => {
                  setCompletion(value);
                }}
              />
            </MDBCol>
          )}
          <MDBCol md={isEditorOpen ? 6 : 12}>
            <MarkdownStyled>{completion}</MarkdownStyled>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol size={4} />
          <MDBCol size={4} className="text-center">
            <MDBBtn type="button" className='w-75' disabled={completionIsEmpty} color="success" onClick={toggleOpen}>
              Сохранить
            </MDBBtn>
          </MDBCol>
          <MDBCol size={4} />
        </MDBRow>

        <MDBModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Вы уверены?</MDBModalTitle>
                <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
              </MDBModalHeader>

              <MDBModalBody>Добавить новый урок: {input}?</MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={toggleOpen}>
                  Закрыть
                </MDBBtn>
                <MDBBtn color="success" disabled={isLoading} onClick={handleCreate}>
                  Подтвердить
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    </>
  );
}
