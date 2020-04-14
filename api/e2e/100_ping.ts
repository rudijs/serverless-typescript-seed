import axios from "axios"

const url = process.env.AWS_APP_SERVICE_ENDPOINT

export const pingTest = () => {
  test("should reply pong", async () => {
    const res = await axios.get(`${url}/ping`)
    expect(res.status).toEqual(200)
    expect(res.data.message).toMatch(/^pong/)
  })
}
