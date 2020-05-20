import * as React from 'react'
import { Link, useHistory } from 'react-router-dom'
import shortid from 'shortid'
import classnames from 'classnames'
import headerIconImagePath from './header-icon.png'

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
      <Link to={'/'} className={styles.logo}>
        <img
          src={headerIconImagePath}
          className={styles.logoIcon}
          width={32}
          height={32}
          alt="P-Chan"
        />
        <span className={styles.logoText}>Wiki</span>
      </Link>
      <button onClick={onClickNewButton} className={styles.button}>
        新しい知見をメモる
      </button>
    </div>
  )
}
