import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'ress'
import { IndexComponent, AboutComponent } from './pages'
import { firebase } from './utilities'

const Component = () => {
  const [isLoadingUserState, setIsLoadingUserState] = React.useState(true)
  const [emailState, setEmailState] = React.useState('')
  const [passwordState, setPasswordState] = React.useState('')
  const [userState, setUserState] = React.useState<firebase.User>()

  const onSubmitLoginForm = React.useCallback(
    event => {
      firebase
        .auth()
        .signInWithEmailAndPassword(emailState, passwordState)
        .catch(error => {
          console.log(`${error.code} ${error.message}`)
        })

      event.preventDefault()
    },
    [emailState, passwordState]
  )

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (isLoadingUserState) setIsLoadingUserState(false)
      if (user == undefined) return

      setUserState(user)
    })
  }, [])

  if (isLoadingUserState) return <div>Loading...</div>

  if (userState == undefined) {
    return (
      <form onSubmit={onSubmitLoginForm}>
        <label>
          メールアドレス
          <input
            type="text"
            value={emailState}
            onChange={event => setEmailState(event.currentTarget.value)}
          />
        </label>
        <label>
          パスワード
          <input
            type="password"
            value={passwordState}
            onChange={event => setPasswordState(event.currentTarget.value)}
          />
        </label>
        <input type="submit" value="ログイン" />
      </form>
    )
  }

  return (
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
}

ReactDOM.render(<Component />, document.getElementById('app'))
