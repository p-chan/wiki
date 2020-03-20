import * as React from 'react'
import { Controlled as ReactCodeMirror } from 'react-codemirror2'
import CodeMirror from 'codemirror'

import './codemirror'

export const EditorComponent = () => {
  const [valueState, setValueState] = React.useState('')

  const onSave = React.useCallback(() => {
    console.log('saved')
  }, [])

  React.useEffect(() => {
    // @ts-ignore
    CodeMirror.commands.save = onSave
  }, [])

  return (
    <div>
      <ReactCodeMirror
        value={valueState}
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
          setValueState(value)
        }}
      />
    </div>
  )
}
