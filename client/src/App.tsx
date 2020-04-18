import React from "react"
// import logo from "./logo.svg"j
// import "./App.css"

import Container from "@material-ui/core/Container"
import { HomePage } from "./components/HomePage"
import { Navbar } from "./components/layout/Navbar"

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Container maxWidth="md">
        <HomePage />
      </Container>
    </React.Fragment>
  )
}

export default App
