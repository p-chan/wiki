import * as React from 'react'
import { Controlled as ReactCodeMirror } from 'react-codemirror2'
import CodeMirror from 'codemirror'

import './codemirror'

type Props = {
  value: string
  handleBeforeChange: (value: string) => void
  handleSave: () => void
}

export const EditorComponent: React.FC<Props> = (props: Props) => {
  React.useEffect(() => {
    // @ts-ignore
    CodeMirror.commands.save = props.handleSave
  }, [])

  return (
    <div>
      <ReactCodeMirror
        value={props.value}
        options={{
          mode: 'gfm',
          theme: 'one-dark',
          tabSize: 2,
          keyMap: 'sublime',
          extraKeys: {
            Enter: 'newlineAndIndentContinueMarkdownList'
          },
          lineNumbers: true,
          scrollbarStyle: 'overlay',
          autofocus: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          autoCloseTags: true,
          styleActiveLine: true
        }}
        editorDidMount={() => {
          console.log('mounted')
        }}
        onBeforeChange={(editor, data, value) => {
          props.handleBeforeChange(value)
        }}
      />
    </div>
  )
}
