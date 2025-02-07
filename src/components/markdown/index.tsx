import { MDBTable, MDBTableBody, MDBTableHead, MDBTypography } from 'mdb-react-ui-kit';
import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import PropTypes from 'prop-types';

const MarkdownStyled = ({ children }: { children: string }): React.ReactElement => {
  return (
    <Markdown
      className="mb-3"
      remarkPlugins={[remarkGfm]}
      components={{
        h1(props) {
          const { ...rest } = props;
          return <MDBTypography tag="h3" variant="h3" className="text-center" {...rest} />;
        },
        h2(props) {
          const { ...rest } = props;
          return <MDBTypography tag="h4" variant="h4" {...rest} />;
        },
        h3(props) {
          const { ...rest } = props;
          return <MDBTypography tag="h5" variant="h5" {...rest} />;
        },
        h4(props) {
          const { ...rest } = props;
          return <MDBTypography tag="h6" variant="h6" {...rest} />;
        },
        h5(props) {
          const { ...rest } = props;
          return <MDBTypography tag="h6" variant="h6" {...rest} />;
        },
        h6(props) {
          const { ...rest } = props;
          return <MDBTypography tag="h6" variant="h6" {...rest} />;
        },
        p(props) {
          return <MDBTypography {...props} />;
        },
        strong(props) {
          return <MDBTypography tag="strong" {...props} />;
        },
        blockquote(props) {
          const { ...rest } = props;
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
          const { children, className, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter {...rest} PreTag="div" language={match[1]}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
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

MarkdownStyled.propTypes = {
  className: PropTypes.string
};

export default MarkdownStyled;
