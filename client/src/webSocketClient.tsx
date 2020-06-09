import { ICredentials } from "@aws-amplify/core/lib-esm/types/types"

interface IAuth {
  currentUserInfo(): Promise<any>
  currentCredentials(): Promise<ICredentials>
}

interface IAccessInfo {
  access_key: string
  secret_key: string
  session_token: string
}

interface IConfig {
  URL: string
}

interface ISigner {
  signUrl(wssUrl: string, accessInfo: IAccessInfo): string
}

export class WebSocketClient {
  private webSocket: WebSocket | null = null
  private timerId: any

  constructor(private auth: IAuth, private config: IConfig, private signer: ISigner) {}

  async isAuthenticated() {
    const currentUserInfo = await this.auth.currentUserInfo()

    if (!currentUserInfo) {
      return false
    }

    return true
  }

  async signWssUrl() {
    const currentCredentials = await this.auth.currentCredentials()

    const accessInfo = {
      access_key: currentCredentials.accessKeyId,
      secret_key: currentCredentials.secretAccessKey,
      session_token: currentCredentials.sessionToken,
    }

    const signedURL = this.signer.signUrl(this.config.URL, accessInfo)
    // console.log(signedURL)

    return signedURL
  }

  async connect() {
    const currentUserInfo = await this.auth.currentUserInfo()

    if (!currentUserInfo) {
      return null
    }

    const wssUrl = await this.signWssUrl()
    console.log("wssUrl:", wssUrl)

    this.webSocket = new WebSocket(wssUrl)

    this.webSocket.onopen = () => {
      console.log("[client]: WebSocket Client Connected")
      // subscribe to some channels
      //  ws.send(JSON.stringify({
      //.... some message the I must send when I connect ....
      // }));
      this.keepAlive()
    }

    this.webSocket.onclose = () => {
      console.log("[client]: WebSocket Client Closed")
      this.cancelKeepAlive()
    }

    this.webSocket.onerror = (e) => {
      // todo investigate the error object
      console.log(`[client]: Encountered error: ${JSON.stringify(e)} Closing socket`)
      this.webSocket?.close()
    }

    this.webSocket.onmessage = (e) => {
      console.log(`[client] messgae: ${JSON.stringify(e.data)}`)
    }

    return this.webSocket
  }

  keepAlive = () => {
    // if (this.webSocket) {
    console.log("keepAlive()", this.webSocket?.readyState, this.webSocket?.OPEN)
    const timeout = 20000
    if (this.webSocket?.readyState === this.webSocket?.OPEN) {
      console.log("sending ping")
      this.webSocket?.send(JSON.stringify({ action: "ping" }))
    }
    this.timerId = setTimeout(this.keepAlive, timeout)
    // }
  }

  cancelKeepAlive = () => {
    console.log("cancelKeepAlive()")
    if (this.timerId) {
      console.log("clearTimeout")
      clearTimeout(this.timerId)
    }
  }
}
