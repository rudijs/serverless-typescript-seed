import * as AWS from "aws-sdk"
import axios from "axios"
import { sigV4Client } from "../lib/sigV4Client"
import { escape } from "querystring"

export const userTests = () => {
  const client = sigV4Client.newClient({
    accessKey: AWS.config.credentials.accessKeyId,
    secretKey: AWS.config.credentials.secretAccessKey,
    sessionToken: AWS.config.credentials.sessionToken,
    region: process.env.AWS_APP_COGNITO_REGION,
    endpoint: process.env.AWS_APP_SERVICE_ENDPOINT,
  })

  test("should fetch all users", async () => {
    const signedRequest = client.signRequest({
      method: "GET",
      path: "/user",
      headers: {},
      queryParams: {},
      body: {},
    })

    const headers = signedRequest.headers

    const res = await axios.get(signedRequest.url, { params: {}, headers })
    // console.log(res)
    expect(res.status).toEqual(200)
    expect(res.headers["content-type"]).toBe("application/json")
    // console.log(res.data)
    expect(res.data.data.length).toEqual(2)
  })

  test("should fetch a single user", async () => {
    const signedRequest = client.signRequest({
      method: "GET",
      path: `/user/${escape("user@example.com")}`,
      // path: "/user/user%40example.com",
      // path: "/user/16bbc841-2a8a-4641-a293-5e5ec996694d",
      headers: {},
      queryParams: {},
      body: {},
    })

    const headers = signedRequest.headers

    const res = await axios.get(signedRequest.url, { params: {}, headers })
    // console.log(res.data)
    expect(res.status).toEqual(200)
    expect(res.headers["content-type"]).toBe("application/json")
    expect(res.data.data).toHaveProperty("Username")
  })
}
