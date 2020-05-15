import * as React from 'react'
import { EditorComponent, PreviewComponent } from './markdown-editor/index'
import { processer } from '../utilities'

import styles from './markdown-editor.css'

export const MarkdownEditorComponent = () => {
  const [valueState, setValueState] = React.useState('')
  const [processedValueState, setProcessedValueState] = React.useState('')

  const handleBeforeChange = React.useCallback((value: string) => {
    const parsedAst = processer.parse(value)
    const transformedAst = processer.runSync(parsedAst)
    const processedValue = processer.stringify(transformedAst)

    setValueState(value)
    setProcessedValueState(processedValue)
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
      <PreviewComponent
        wrapperClassName={styles.preview}
        value={processedValueState}
      />
    </div>
  )
}
