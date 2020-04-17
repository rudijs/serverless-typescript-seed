import { API } from "aws-amplify"

export const userTests = () => {
  test("should fetch all users", async () => {
    const res = await API.get("notes", "/user", {})
    // console.log(res)
    expect(res.data.length).toEqual(2)
    expect(res.data[0]).toHaveProperty("Username")
    expect(res.data[1]).toHaveProperty("Username")
  })

  test("should fetch a single user", async () => {
    const res = await API.get("notes", "/user/admin@example.com", {})
    // console.log(res)
    expect(res.data).toHaveProperty("Username")
  })
}
