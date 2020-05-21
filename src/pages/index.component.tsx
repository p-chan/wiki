import * as React from 'react'
import { withApplication, TimelineComponent } from '../components'
import styles from './index.css'

export const IndexComponent = () =>
  withApplication(
    <>
      <TimelineComponent wrapperClassName={styles.wrapper} />
    </>
  )
