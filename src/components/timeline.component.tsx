import * as React from 'react'
import classnames from 'classnames'

import styles from './timeline.css'
import { firestore } from '../utilities'
import { ItemModel, createItemModel } from '../models'

import { Link } from 'react-router-dom'

type Props = {
  wrapperClassName?: string
}

export const TimelineComponent = (props: Props) => {
  const [itemsState, setItemsState] = React.useState<ItemModel[]>([])

  React.useEffect(() => {
    firestore
      .collection('items')
      .orderBy('updatedAt', 'desc')
      .limit(30)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((document) => {
          if (document.exists == false) return

          const documentData = document.data()

          if (documentData == undefined) return

          setItemsState((itemsState) => {
            return [...itemsState, createItemModel(documentData)]
          })
        })
      })
  }, [])

  const itemsElementIfNeeded =
    itemsState.length !== 0 &&
    itemsState.map((item) => {
      return (
        <Link to={`/items/${item.id}`} className={styles.item} key={item.id}>
          <h1 className={styles.itemTitle}>{item.title}</h1>
        </Link>
      )
    })

  return (
    <div className={classnames(styles.wrapper, props.wrapperClassName)}>
      <div className={styles.items}>{itemsElementIfNeeded}</div>
    </div>
  )
}
