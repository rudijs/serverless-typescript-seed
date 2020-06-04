import { WebSocketClient } from "../webSocketClient"

describe("#WebSocketClient", () => {
  test("should ", async () => {
    const mockAuth = {
      // currentUserInfo: () => Promise.resolve(null),
      currentUserInfo: () =>
        Promise.resolve({
          id: "us-east-1:xxxx-xxxx-xxxx",
          username: "xxxx-xxxx-xxxx-xxxx",
          attributes: {
            sub: "xxxx-xxxx-xxxx",
            email_verified: false,
            email: "test@example.com",
          },
        }),

      currentCredentials: () =>
        Promise.resolve({
          accessKeyId: "xxxxxxxxxxxxxxxxx",
          secretAccessKey: "xxxxxxxxxxxxxxxxxxx",
          sessionToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          expiration: "2020-06-04T17:26:44.000Z",
          identityId: "us-east-1:xxxx-xxxx-xxxx",
          authenticated: true,
        }),
    }

    const mockConfig = { URL: "wss://unsigned/url.com" }

    const mockSigner = {
      signUrl: (wssUrl: string, accessInfo: any) => {
        // console.log(wssUrl, accessInfo)
        return "wss://signed/url.com"
      },
    }

    const ws = new WebSocketClient(mockAuth, mockConfig, mockSigner)

    const client = await ws.connect()

    console.log(client)
  })
})
