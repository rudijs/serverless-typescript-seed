import { PermissionError } from "./errors"

describe("errors", () => {
  test("Permission error should be 403 by default", () => {
    const err = new PermissionError("Not allowed")
    expect(err.message).toBe("Not allowed")
    expect(err.code).toEqual(403)
  })
})
