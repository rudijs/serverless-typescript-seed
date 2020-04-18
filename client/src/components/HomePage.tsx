import React, { useContext } from "react"
import { Link } from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import { Typography } from "@material-ui/core"

import { observer } from "mobx-react-lite"
import { MyContext } from "../context"
import { Counter } from "./Counter"

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

export const HomePage: React.FC = observer(() => {
  const classes = useStyles()
  const appState = useContext(MyContext)
  return (
    <Paper className={classes.paper}>
      <Typography variant="h3">Home Page</Typography>
      <Typography paragraph>Serverless App Seed</Typography>
      <Typography paragraph>ReactJS, Serverless Framework, AWS Cognito, S3 and Cloudfront</Typography>
      <Typography>
        <Link to="/profile">Profile</Link>
        <br />
        <Link to="/signin">Sign In</Link>
        {/* <br />
            <button onClick={() => context.setCount(context.count + 1)}>Inc</button>
            {context.count} */}
        <br />
        <button onClick={() => appState.setGroup("admin")}>Sign In</button>
        <br />
        <button onClick={() => appState.setGroup("guest")}>Sign Out</button>
        <br />
        {appState.groups}
      </Typography>
      <Counter />
    </Paper>
  )
})
