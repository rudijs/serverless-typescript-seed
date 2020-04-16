import { sigV4Client } from "./sigV4Client"

describe("sigV4Client", () => {
  test("should generate signed request headers and url", () => {
    const client = sigV4Client.newClient({
      accessKey: "ACCESSKEY",
      secretKey: "SECRETKEY",
      sessionToken: undefined,
      endpoint: "https://xe8d25t4od.execute-api.ap-southeast-1.amazonaws.com/dev",
    })
    //

    const signedRequest = client.signRequest({
      method: "GET",
      path: "/user",
      headers: {},
      queryParams: { foo: "bar" },
      body: {},
    })

    // console.log(signedRequest)
    expect(signedRequest).toHaveProperty("url")
    expect(signedRequest.headers.Authorization).toMatch(/^AWS4-HMAC-SHA256 Credential=ACCESSKEY.*/)
    expect(signedRequest.headers).toHaveProperty("Accept")
    expect(signedRequest.headers).toHaveProperty("x-amz-date")
    expect(signedRequest.headers).toHaveProperty("Content-Type")
  })
})
