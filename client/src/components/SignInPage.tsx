import React from "react"
import { Link } from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3, 2),
    animation: "fadein 1s",
    "-moz-animation": "fadein 1s" /* Firefox */,
    "-webkit-animation": "fadein 1s" /* Safari and Chrome */,
    "-o-animation": "fadein 1s" /* Opera */,
  },
}))

export const SignInPage: React.FC = () => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Typography variant="h3">Sign In</Typography>
      <Typography>
        <Link to="/">Home</Link>
      </Typography>
    </Paper>
  )
}
