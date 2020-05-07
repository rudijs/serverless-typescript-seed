import React from "react"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import { Redirect as MockRedirect } from "react-router"
import { appState } from "../../models/state"
import { SignInPage } from "../../components/SignInPage"

jest.mock("react-router", () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

test("renders Sign In Page", () => {
  render(<SignInPage />, { wrapper: MemoryRouter })
  // test page title
  expect(screen.getAllByText(/sign in/i)[0]).toHaveTextContent("Sign In")
})

test("should redirect if user is already signed in", () => {
  appState.setGroup("admin")
  render(<SignInPage />, { wrapper: MemoryRouter })
  expect(MockRedirect).toHaveBeenCalledWith({ to: "/profile" }, {})
})
