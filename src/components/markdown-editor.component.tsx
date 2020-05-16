import * as React from 'react'
import { EditorComponent, PreviewComponent } from './markdown-editor/index'
import { parse, runSync, stringify } from '../utilities'
import parserBabel from 'prettier/parser-babel'
import parserHtml from 'prettier/parser-html'
import parserMarkdown from 'prettier/parser-markdown'
import parserYaml from 'prettier/parser-yaml'
import prettier from 'prettier/standalone'

import styles from './markdown-editor.css'

export const MarkdownEditorComponent = () => {
  const [valueState, setValueState] = React.useState('')
  const [processedValueState, setProcessedValueState] = React.useState('')

  const handleBeforeChange = React.useCallback((value: string) => {
    const parsedAst = parse(value)
    const transformedAst = runSync(parsedAst)
    const processedValue = stringify(transformedAst)

    setValueState(value)
    setProcessedValueState(processedValue)
  }, [])

  const handleSave = React.useCallback(() => {
    const formatedValue = prettier.format(valueState, {
      semi: false,
      singleQuote: true,
      parser: 'markdown',
      // 将来的に prettier/parser-typescript と prettier/parser-postcss も追加する (現状、何故かビルドが失敗する)
      plugins: [parserBabel, parserHtml, parserMarkdown, parserYaml],
    })

    const parsedAst = parse(formatedValue)
    const transformedAst = runSync(parsedAst)
    const processedValue = stringify(transformedAst)

    setValueState(formatedValue)
    setProcessedValueState(processedValue)
    console.log('saved')
  }, [valueState])

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
