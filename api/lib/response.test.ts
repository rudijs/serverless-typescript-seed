import { success, failure } from "./response"

describe("response", () => {
  test("should return success 200", () => {
    const res = success({ message: "OK" })
    // console.log(res)
    expect(res.statusCode).toEqual(200)
    expect(res.headers).toHaveProperty("Access-Control-Allow-Origin")
    expect(res.headers).toHaveProperty("Access-Control-Allow-Credentials")
    const body = JSON.parse(res.body)
    // console.log(body)
    expect(body.data.message).toEqual("OK")
  })

  test("should return failure 500", () => {
    const errors = [{ status: 500, title: "Boom!", description: "Something exploded." }]
    const res = failure(errors)
    // console.log(res)
    expect(res.statusCode).toEqual(500)
    expect(res.headers).toHaveProperty("Access-Control-Allow-Origin")
    expect(res.headers).toHaveProperty("Access-Control-Allow-Credentials")
    expect(res.body).toMatch(/"errors":/)
    const body = JSON.parse(res.body)
    // console.log(body)
    expect(body.errors.length).toEqual(1)
    expect(body.errors[0].status).toBe(errors[0].status)
    expect(body.errors[0].title).toBe(errors[0].title)
    expect(body.errors[0].description).toBe(errors[0].description)
  })
})
