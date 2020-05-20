import * as React from 'react'
import { HeaderComponent } from './header.component'

export const withApplication = (component: any) => (
  <>
    <HeaderComponent />
    {component}
  </>
)
