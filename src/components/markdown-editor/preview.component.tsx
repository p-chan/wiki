import * as React from 'react'
import classnames from 'classnames'

import styles from './preview.css'

type Props = {
  wrapperClassName?: string
  value: string
}

export const PreviewComponent: React.FC<Props> = (props: Props) => {
  return (
    <div
      className={classnames(styles.wrapper, props.wrapperClassName)}
      dangerouslySetInnerHTML={{
        __html: props.value
      }}
    />
  )
}
