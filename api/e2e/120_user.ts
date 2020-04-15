import * as AWS from "aws-sdk"
import axios from "axios"
import { sigV4Client } from "../lib/sigV4Client"

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
    expect(res.data.length).toEqual(2)
  })
}
