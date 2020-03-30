import * as React from 'react'
import { markdown } from '../../utilities'
import classnames from 'classnames'

import styles from './preview.css'

type Props = {
  wrapperClassName?: string
  value: string
}

export const PreviewComponent: React.FC<Props> = (props: Props) => {
  const html = markdown.processSync(props.value).contents.toString()

  return (
    <div
      className={classnames(styles.wrapper, props.wrapperClassName)}
      dangerouslySetInnerHTML={{
        __html: html
      }}
    />
  )
}
