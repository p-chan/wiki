import * as React from 'react'
import { EditorComponent, PreviewComponent } from './markdown-editor'

export const MarkdownEditorComponent = () => {
  const [valueState, setValueState] = React.useState('')

  const handleBeforeChange = React.useCallback((value: string) => {
    setValueState(value)
  }, [])

  const handleSave = React.useCallback(() => {
    console.log('saved')
  }, [])

  return (
    <>
      <EditorComponent
        value={valueState}
        handleBeforeChange={handleBeforeChange}
        handleSave={handleSave}
      />
      <PreviewComponent value={valueState} />
    </>
  )
}
