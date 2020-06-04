import { w3cwebsocket as W3CWebSocket } from "websocket"
import { Auth, Signer } from "aws-amplify"
import config from "./config"

let webSocket: any = null
// let webSocket: WebSocket | null = null

export const client = async () => {
  // console.log("typeof", typeof webSocket)
  // return any existing client
  if (webSocket) {
    console.log("return existing webSocket")
    return webSocket
  }

  // return if not signed in
  const currentUserInfo = await Auth.currentUserInfo()
  console.log("currentUserInfo", JSON.stringify(currentUserInfo, null, 2))
  if ((await Auth.currentUserInfo()) === null) return webSocket

  const credentials = await Auth.currentCredentials()
  // console.log("currentCredentials", JSON.stringify(credentials, null, 2))

  const accessInfo = {
    access_key: credentials.accessKeyId,
    secret_key: credentials.secretAccessKey,
    session_token: credentials.sessionToken,
  }

  const wssUrl = config.webSocket.URL

  const signedUrl = Signer.signUrl(wssUrl, accessInfo)

  // console.log(401, signedUrl)

  webSocket = new W3CWebSocket(signedUrl)

  webSocket.onerror = function () {
    console.log("[client]: Connection Error")
  }

  webSocket.onopen = function () {
    console.log("[client]: WebSocket Client Connected")
    keepAlive()
  }

  webSocket.onclose = function () {
    console.log("[client]: Client Closed")
    cancelKeepAlive()
  }

  webSocket.onmessage = function (e: any) {
    if (typeof e.data === "string") {
      console.log("Received: '" + e.data + "'")
    }
  }

  let timerId: any

  function keepAlive() {
    console.log("keepAlive()", webSocket.readyState, webSocket.OPEN)
    var timeout = 20000
    if (webSocket.readyState === webSocket.OPEN) {
      webSocket.send('{"action": "hello"}')
    }
    timerId = setTimeout(keepAlive, timeout)
  }

  function cancelKeepAlive() {
    if (timerId) {
      clearTimeout(timerId)
    }
  }

  return webSocket
}
