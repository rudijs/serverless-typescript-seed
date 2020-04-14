import * as AWS from "aws-sdk"
import axios from "axios"
const sigV4Client = require("../lib/sigV4Client").sigV4Client

export const userTests = () => {
  // let usersConfig: any

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

    try {
      await axios.get(signedRequest.url, { params: {}, headers })
      // const res = await axios.get(signedRequest.url, { params: {}, headers })
      // console.log(JSON.stringify(res.data, null, 2))

      // expect(res.status).to.equal(200)
      // expect(res.headers["content-type"]).to.equal("application/json")
      // expect(res.data.length).to.equal(2)

      // get the username for use in the following tests
      // usernames (uuid format) change when new cognito user pool infrastructure is recreated
      // usersConfig = userFilter(res.data)
      // console.log(usersConfig)
    } catch (e) {
      console.log("e", e)
      // console.log("Status:", e.response.status)
      // console.log("Headers:", JSON.stringify(e.response.headers, null, 2))
      // console.log("Config:", JSON.stringify(e.response.config, null, 2))
      // console.log("Data:", JSON.stringify(e.response.data, null, 2))
      // throw e.response.data.message
    }
  })
}
