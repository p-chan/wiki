import { useParams } from 'react-router-dom'
import * as React from 'react'

import { HeaderComponent, MarkdownEditorComponent } from '../../components'
import styles from './item.css'

export const ItemsItemComponent = () => {
  const params = useParams<{
    id: string
  }>()

  // エディターの場合、レイアウトが特殊なので HOC で囲まない
  return (
    <div className={styles.wrapper}>
      <HeaderComponent wrapperClassName={styles.header} />
      <MarkdownEditorComponent
        id={params.id}
        wrapperClassName={styles.markdownEditor}
      />
    </div>
  )
}
