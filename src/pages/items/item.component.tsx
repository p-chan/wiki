import { useParams } from 'react-router-dom'
import * as React from 'react'

import { HeaderComponent, MarkdownEditorComponent } from '../../components'
import styles from './item.css'

export const ItemsItemComponent = () => {
  const params = useParams<{
    id: string
  }>()

  return (
    <div className={styles.wrapper}>
      <HeaderComponent />
      <MarkdownEditorComponent id={params.id} />
    </div>
  )
}
