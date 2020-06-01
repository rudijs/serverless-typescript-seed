import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import { Typography, Button } from "@material-ui/core"

import { observer } from "mobx-react-lite"
import { Counter } from "./Counter"

import { client } from "../ws"

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

  React.useEffect(() => {
    async function getWsClient() {
      const wsClient = await client()
      // console.log(901, wsClient)
      setWsClient(wsClient)
    }
    getWsClient()
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
    </Paper>
  )
})
