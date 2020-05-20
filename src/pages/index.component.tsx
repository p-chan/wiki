import * as React from 'react'
import {
  withApplication,
  TimelineComponent,
  HeaderComponent,
} from '../components'

export const IndexComponent = () =>
  withApplication(
    <div>
      <TimelineComponent />
    </div>
  )
