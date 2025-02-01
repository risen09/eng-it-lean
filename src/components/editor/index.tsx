import { MDXEditor } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import React from 'react'

const Editor = ({ markdown } : { markdown: string }): React.ReactElement => {
  return <MDXEditor markdown={markdown} />
}

export default Editor