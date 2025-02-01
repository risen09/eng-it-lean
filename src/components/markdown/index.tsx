import { MDBTable, MDBTableBody, MDBTableHead, MDBTypography } from 'mdb-react-ui-kit';
import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const MarkdownStyled = ({ children }: { children: string }): React.ReactElement => {
  return (
    <Markdown
      className="mb-3"
      remarkPlugins={[remarkGfm]}
      components={{
        h1(props) {
          const { node, ...rest } = props;
          return <MDBTypography variant="h3" className='text-center' {...rest} />;
        },
        h2(props) {
          const { node, ...rest } = props;
          return <MDBTypography variant="h4" {...rest} />;
        },
        h3(props) {
          const { node, ...rest } = props;
          return <MDBTypography variant="h5" {...rest} />;
        },
        h4(props) {
          const { node, ...rest } = props;
          return <MDBTypography variant="h6" {...rest} />;
        },
        h5(props) {
          const { node, ...rest } = props;
          return <MDBTypography variant="h6" {...rest} />;
        },
        h6(props) {
          const { node, ...rest } = props;
          return <MDBTypography variant="h6" {...rest} />;
        },
        p(props) {
          return <MDBTypography {...props} />;
        },
        strong(props) {
          return <MDBTypography tag="strong" {...props} />;
        },
        blockquote(props) {
          const { node, ...rest } = props;
          return <MDBTypography blockquote {...rest} />;
        },
        table(props) {
          return <MDBTable {...props} />;
        },
        thead(props) {
          return <MDBTableHead {...props} />;
        },
        tbody(props) {
          return <MDBTableBody {...props} />;
        },
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        }
      }}
    >
      {children}
    </Markdown>
  );
};

export default MarkdownStyled;
