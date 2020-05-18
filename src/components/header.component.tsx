import * as React from 'react'
import { Link, useHistory } from 'react-router-dom'
import shortid from 'shortid'

import styles from './header.css'

export const HeaderComponent = () => {
  const history = useHistory()

  const onClickNewButton = React.useCallback(() => {
    history.push(`/items/${shortid.generate()}`)
  }, [])

  return (
    <div className={styles.wrapper}>
      <Link to={'/'}>Wiki</Link>
      <div onClick={onClickNewButton}>新しい記事を作る</div>
    </div>
  )
}
