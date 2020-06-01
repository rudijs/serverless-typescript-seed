import { w3cwebsocket as W3CWebSocket } from "websocket"
import { Auth, Signer } from "aws-amplify"
import config from "./config"

let wsClient: any = null

export const client = async () => {
  if (wsClient) return wsClient

  // console.log(111, await Auth.currentAuthenticatedUser())
  if ((await Auth.currentUserInfo()) === null) return wsClient

  const credentials = await Auth.currentCredentials()
  // console.log(101, credentials)

  const accessInfo = {
    access_key: credentials.accessKeyId,
    secret_key: credentials.secretAccessKey,
    session_token: credentials.sessionToken,
  }

  const wssUrl = config.webSocket.URL

  const signedUrl = Signer.signUrl(wssUrl, accessInfo)

  // console.log(401, signedUrl)

  wsClient = new W3CWebSocket(signedUrl)

  wsClient.onerror = function () {
    console.log("[client]: Connection Error")
  }

  wsClient.onopen = function () {
    console.log("[client]: WebSocket Client Connected")
  }

  wsClient.onclose = function () {
    console.log("[client]: Client Closed")
  }

  wsClient.onmessage = function (e: any) {
    if (typeof e.data === "string") {
      console.log("Received: '" + e.data + "'")
    }
  }

  return wsClient
}
