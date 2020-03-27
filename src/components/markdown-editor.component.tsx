import * as React from 'react'
import { EditorComponent, PreviewComponent } from './markdown-editor'

import styles from './markdown-editor.css'

export const MarkdownEditorComponent = () => {
  const [valueState, setValueState] = React.useState('')

  const handleBeforeChange = React.useCallback((value: string) => {
    setValueState(value)
  }, [])

  const handleSave = React.useCallback(() => {
    console.log('saved')
  }, [])

  return (
    <div className={styles.wrapper}>
      <EditorComponent
        wrapperClassName={styles.editor}
        value={valueState}
        handleBeforeChange={handleBeforeChange}
        handleSave={handleSave}
      />
      <PreviewComponent wrapperClassName={styles.preview} value={valueState} />
    </div>
  )
}
