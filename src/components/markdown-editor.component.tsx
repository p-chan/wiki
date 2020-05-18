import * as React from 'react'
import { EditorComponent, PreviewComponent } from './markdown-editor/index'
import { parse, runSync, stringify, firestore } from '../utilities'
import parserBabel from 'prettier/parser-babel'
import parserHtml from 'prettier/parser-html'
import parserMarkdown from 'prettier/parser-markdown'
import parserYaml from 'prettier/parser-yaml'
import prettier from 'prettier/standalone'
import { ItemModel, createItemModel } from '../models'
import styles from './markdown-editor.css'
import mdast from 'mdast'
import classnames from 'classnames'

type Props = {
  id: string
  wrapperClassName?: string
}

export const MarkdownEditorComponent = (props: Props) => {
  const [valueState, setValueState] = React.useState('')
  const [processedValueState, setProcessedValueState] = React.useState('')
  const [isLoadingState, setIsLoadingState] = React.useState(false)

  React.useEffect(() => {
    setIsLoadingState(true)

    const documentRef = firestore.collection('items').doc(props.id)

    documentRef.get().then((document) => {
      setIsLoadingState(false)

      if (document.exists == false) return

      const documentData = document.data()

      if (documentData == undefined) return

      const parsedAst = parse(createItemModel(documentData).body)
      const transformedAst = runSync(parsedAst)
      const processedValue = stringify(transformedAst)

      setValueState(createItemModel(documentData).body)
      setProcessedValueState(processedValue)
    })
  }, [props.id])

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

    const titleNode = parsedAst.children.find((node) => {
      if (node.type !== 'heading' && node.depth !== 1) return

      return node as mdast.Heading
    }) as mdast.Heading | undefined

    if (titleNode == undefined || titleNode.children.length == 0) return
    const itemsRef = firestore.collection('items')

    itemsRef
      .doc(props.id)
      .set(
        createItemModel({
          id: props.id,
          title: titleNode.children[0].value,
          body: formatedValue,
          status: 'unpublish',
        })
      )
      .then(() => {
        console.log('Added')
      })
  }, [props.id, valueState])

  return (
    <div className={classnames(styles.wrapper, props.wrapperClassName)}>
      <EditorComponent
        wrapperClassName={styles.editor}
        value={valueState}
        isReadonly={isLoadingState}
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
