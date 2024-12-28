import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Table, TableHead, TableCell, List, NumberedList } from './index.style';

const MarkdownStyled = ({ children } : { children: string }): React.ReactElement => {
  return (
      <Markdown remarkPlugins={[remarkGfm]} components={{
				table(props) {
					return <Table {...props} />;
				},
				th(props) {
					return <TableHead {...props} />;
				},
				td(props) {
					return <TableCell {...props} />;
				},
				ul(props) {
					return <List {...props} />;
				},
				ol(props) {
					return <NumberedList {...props} />;
				},
				}}>
        {children}
      </Markdown>
 );
}
  
export default MarkdownStyled;
