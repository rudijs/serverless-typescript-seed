import { API, Auth } from "aws-amplify"

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

  test("should not fetch all users when using a role without permission", async () => {
    await Auth.signIn("user@example.com", process.env.AWS_APP_ADMIN_PASSWORD)
    try {
      await API.get("notes", "/user", {})
    } catch (e) {
      // console.log(101, e.response)
      // console.log(101, e.response.data)
      expect(e.response.status).toEqual(403)
      expect(e.response.data.errors[0].status).toEqual(403)
      expect(e.response.data.errors[0].title).toBe("Permission denied for this action")
    }
  })
}
