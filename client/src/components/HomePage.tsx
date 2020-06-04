import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import { Typography, Button } from "@material-ui/core"

import { observer } from "mobx-react-lite"
import { Counter } from "./Counter"

import { client } from "../ws"

import { WebSocketClient } from "../webSocketClient"
import { Auth, Signer } from "aws-amplify"
import config from "../config"

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

  const [wsClient, setWsClient] = React.useState<any>(null)

  // const getWsClient = async () => {
  //   // console.log("getWsClient")
  //   const wsClient = await client()
  //   // console.log(901, wsClient)
  //   setWsClient(wsClient)
  // }

  // React.useEffect(() => {
  //   getWsClient()
  // }, [])

  const getWsClient = async () => {
    const client = new WebSocketClient(Auth, config.webSocket, Signer)
    console.log("client.connect()")
    const wsClient = await client.connect()
    setWsClient(wsClient)
  }

  React.useEffect(() => {
    // todo add jest mock for for Auth so that the currentUserInfo() return null so no websocket connection is setup
    if (process.env.NODE_ENV !== "test") {
      getWsClient()
    }
  }, [])

  return (
    <Paper className={classes.paper}>
      <Typography variant="h3">Home Page</Typography>
      <Typography paragraph>Serverless App Seed</Typography>
      <Typography paragraph>ReactJS, Serverless Framework, AWS Cognito, S3 and Cloudfront</Typography>
      <Counter />

      <Button variant="contained" onClick={() => wsClient.send('{"action": "hello"}')}>
        Send Message
      </Button>

      <Button variant="contained" onClick={() => wsClient.close()}>
        Close Connection
      </Button>

      <Button variant="contained" onClick={() => getWsClient()}>
        Open Connection
      </Button>
    </Paper>
  )
})
