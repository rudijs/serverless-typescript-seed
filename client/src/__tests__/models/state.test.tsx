import { appState } from "../../models/state"

test("application state tree", () => {
  expect(appState.isAuthenticated).toBeFalsy()
  expect(appState.groups).toBe("guest")
  appState.setGroup("admin")
  expect(appState.isAuthenticated).toBeTruthy()
  expect(appState.groups).toBe("admin")
  appState.signOut()
  expect(appState.isAuthenticated).toBeFalsy()
  expect(appState.groups).toBe("guest")
})
