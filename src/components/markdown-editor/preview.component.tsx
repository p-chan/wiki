import * as React from 'react'
import { markdown } from '../../utilities'

type Props = {
  wrapperClassName?: string
  value: string
}

export const PreviewComponent: React.FC<Props> = (props: Props) => {
  const html = markdown.processSync(props.value).contents.toString()

  return (
    <div
      className={props.wrapperClassName}
      dangerouslySetInnerHTML={{
        __html: html
      }}
    />
  )
}
