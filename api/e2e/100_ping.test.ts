import axios from "axios"

const url = process.env.URL
const env = process.env.ENV || "dev"

describe("ping", () => {
  test("should reply pong", async () => {
    const res = await axios.get(`${url}/${env}/ping`)
    expect(res.status).toEqual(200)
    expect(res.data.message).toMatch(/^pong/)
  })
})
