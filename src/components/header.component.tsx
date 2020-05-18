import * as React from 'react'
import { Link, useHistory } from 'react-router-dom'
import shortid from 'shortid'
import classnames from 'classnames'

import styles from './header.css'

type Props = {
  wrapperClassName?: string
}

export const HeaderComponent = (props: Props) => {
  const history = useHistory()

  const onClickNewButton = React.useCallback(() => {
    history.push(`/items/${shortid.generate()}`)
  }, [])

  return (
    <div className={classnames(styles.wrapper, props.wrapperClassName)}>
      <Link to={'/'}>Wiki</Link>
      <div onClick={onClickNewButton}>新しい記事を作る</div>
    </div>
  )
}
