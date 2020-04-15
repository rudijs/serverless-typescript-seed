import { success, failure } from "./response"

describe("response", () => {
  test("should return success 200", () => {
    // console.log(success({ message: "OK" }))

    const res = success({ message: "OK" })
    expect(res.statusCode).toEqual(200)
    expect(res.headers).toHaveProperty("Access-Control-Allow-Origin")
    expect(res.headers).toHaveProperty("Access-Control-Allow-Credentials")
    expect(JSON.parse(res.body).message).toEqual("OK")
  })
  test("should return failure 500", () => {
    // console.log(success({ message: "OK" }))

    const res = failure({ message: "Boom!" })
    expect(res.statusCode).toEqual(500)
    expect(res.headers).toHaveProperty("Access-Control-Allow-Origin")
    expect(res.headers).toHaveProperty("Access-Control-Allow-Credentials")
    expect(JSON.parse(res.body).message).toEqual("Boom!")
  })
})
