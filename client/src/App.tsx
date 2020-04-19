import React from "react"
import { Router, Route, Switch, Redirect } from "react-router-dom"
import { createBrowserHistory } from "history"
import { useAppState } from "./context"

import Container from "@material-ui/core/Container"
import { Navbar } from "./components/layout/Navbar"
import { HomePage } from "./components/HomePage"
import { SignInPage } from "./components/SignInPage"
import { ProfilePage } from "./components/ProfilePage"
import { NotFoundPage } from "./components/NotFoundPage"

const customHistory = createBrowserHistory()

const PrivateRoute: React.FC<{ component: any; path: string; exact?: boolean }> = ({ component: Component, ...rest }) => {
  const appState = useAppState()
  return <Route {...rest} render={(props) => (appState.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/signin" />)} />
}

function App() {
  return (
    // <MyProvider>
    <Router history={customHistory}>
      <Navbar />
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" component={SignInPage} />
          {/* <Route path="/profile" component={ProfilePage} /> */}
          <PrivateRoute path="/profile" component={ProfilePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </Router>
    // </MyProvider>
  )
}

export default App
