import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { IndexComponent, AboutComponent } from './pages'

console.log('Hello from tsx!')

const Component = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <IndexComponent />
      </Route>
      <Route path="/about">
        <AboutComponent />
      </Route>
    </Switch>
  </Router>
)

ReactDOM.render(<Component />, document.getElementById('app'))
