import * as React from 'react'
import { Controlled as ReactCodeMirror } from 'react-codemirror2'
import CodeMirror from 'codemirror'
import styles from './editor.css'

import './codemirror'

type Props = {
  wrapperClassName?: string
  value: string
  isReadonly: boolean
  handleBeforeChange: (value: string) => void
  handleSave: () => void
}

export const EditorComponent: React.FC<Props> = (props: Props) => {
  React.useEffect(() => {
    // @ts-ignore
    CodeMirror.commands.save = props.handleSave
  }, [props.value])

  return (
    <div className={props.wrapperClassName}>
      <ReactCodeMirror
        className={styles.editor}
        value={props.value}
        options={{
          mode: {
            name: 'yaml-frontmatter',
            base: 'gfm',
          },
          theme: 'one-dark',
          tabSize: 2,
          keyMap: 'sublime',
          extraKeys: {
            Enter: 'newlineAndIndentContinueMarkdownList',
          },
          lineWrapping: true,
          lineNumbers: true,
          scrollbarStyle: 'native',
          readOnly: props.isReadonly,
          autofocus: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          autoCloseTags: true,
          styleActiveLine: true,
        }}
        editorDidMount={(editor) => {
          console.log('mounted')
        }}
        onBeforeChange={(editor, data, value) => {
          props.handleBeforeChange(value)
        }}
      />
    </div>
  )
}
