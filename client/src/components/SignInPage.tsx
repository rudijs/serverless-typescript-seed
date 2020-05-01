import React from "react"
import { Redirect } from "react-router"

import { observer } from "mobx-react-lite"
import { useAppState } from "../context"

import "./SignInPage.css"

import { makeStyles } from "@material-ui/core/styles"
import { Box, Paper } from "@material-ui/core"

import { SignInForm } from "./SignInForm"

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3, 2),
    animation: "fadein 1s",
    "-moz-animation": "fadein 1s" /* Firefox */,
    "-webkit-animation": "fadein 1s" /* Safari and Chrome */,
    "-o-animation": "fadein 1s" /* Opera */,
  },
  progresStyle: {
    marginLeft: "1rem",
    color: "blue",
  },
  formInput: {
    width: "100%",
    marginTop: theme.spacing(4),
  },
  authError: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
}))

export const SignInPage: React.FC = observer(() => {
  const classes = useStyles()

  const appState = useAppState()

  // if the user is already signed in, redirect to profile page
  if (appState.isAuthenticated) {
    return <Redirect to="/profile" />
  }

  return (
    <Box className={classes.container} mx="auto">
      <Paper className={classes.paper}>
        <SignInForm />
      </Paper>
    </Box>
  )
})
