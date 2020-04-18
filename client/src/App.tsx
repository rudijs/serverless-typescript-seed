import React from "react"
import { Router, Route, Switch } from "react-router-dom"
import { createBrowserHistory } from "history"
// import { MyProvider } from "./context"

import Container from "@material-ui/core/Container"
import { Navbar } from "./components/layout/Navbar"
import { HomePage } from "./components/HomePage"
import { SignInPage } from "./components/SignInPage"
import { ProfilePage } from "./components/ProfilePage"

const customHistory = createBrowserHistory()

function App() {
  return (
    // <MyProvider>
    <Router history={customHistory}>
      <Navbar />
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/profile" component={ProfilePage} />
        </Switch>
      </Container>
    </Router>
    // </MyProvider>
  )
}

export default App
