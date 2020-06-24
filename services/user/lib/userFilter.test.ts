import { userFilter } from "./userFilter"
import { data } from "./fixtures/listUsers"

describe("#userFilter", () => {
  it("should filter Admin and User users", () => {
    const filteredUsers = userFilter(data)
    // console.log(filteredUsers)
    // expect(filteredUsers).toHaveProperty("admin@example.com") // jest toHaveProperty() doesn't seem to like the '@' symbol in the property name
    expect(filteredUsers["admin@example.com"]).toBeTruthy()
    expect(filteredUsers["user@example.com"]).toBeTruthy()
  })
})
