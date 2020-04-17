/* eslint-disable no-console */
import { rbac } from "./rbac"

describe("#rbac", () => {
  test("should allow a user to add a post", async () => {
    const res = await rbac.can("user", "post:add")
    expect(res).toBeTruthy()
  })

  test("should deny a user to save a post not theirs", async () => {
    const res = await rbac.can("user", "post:save", { userId: 1, ownerId: 2 })
    expect(res).toBeFalsy()
  })

  test("should allow a manager to save a post not theirs", async () => {
    const res = await rbac.can(["user", "manager"], "post:save", { userId: 1, ownerId: 2 })
    expect(res).toBeTruthy()
  })

  test("should allow a admin cognito-idp:ListUsers", async () => {
    const res = await rbac.can("admin", "cognito-idp:ListUsers")
    expect(res).toBeTruthy()
  })

  test("should deny a user cognito-idp:ListUsers", async () => {
    const res = await rbac.can(["user"], "cognito-idp:ListUsers")
    expect(res).toBeFalsy()
  })
})
