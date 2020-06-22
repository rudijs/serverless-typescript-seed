import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import { Typography } from "@material-ui/core"

// import { Amazing } from "./Amazing"
import fetchMachine from "../machines/fetch"
import { useMachine } from "@xstate/react"
import { API } from "aws-amplify"

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

export const ProfilePage: React.FC = () => {
  const classes = useStyles()

  const [fetchState, sendToFetchMachine] = useMachine(fetchMachine, {
    services: {
      fetchData: async () => await API.get("notes", "/user", {}),
    },
  })

  React.useEffect(() => {
    sendToFetchMachine({ type: "FETCH" })
  }, [sendToFetchMachine])

  return (
    <Paper className={classes.paper}>
      <Typography variant="h3">Profile Page</Typography>
      {/* <Amazing /> */}
      {/* {fetchState.context.results.map((item, index) => (<p id="{index}">{item.Username}</p>))} */}
      {fetchState.matches("pending") ? "Loading..." : null}
      {fetchState.matches("failed") ? "failed" : null}
      {fetchState.matches("successful.withData") ? (
        <ul>Users:{fetchState.context.results && fetchState.context.results.map((item, index) => <li key={index}>{item.Username}</li>)}</ul>
      ) : null}
      {fetchState.matches("successful.withoutData") ? "No results" : null}
    </Paper>
  )
}
