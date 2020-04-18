import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

import "mobx-react-lite/batchingForReactDom"
// import { state } from "./models/state"

import { createMuiTheme } from "@material-ui/core/styles"
import { blueGrey } from "@material-ui/core/colors"
import { ThemeProvider } from "@material-ui/styles"
import { CssBaseline } from "@material-ui/core"

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    type: "light",
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
