import React from "react"
import { render, screen, fireEvent, wait } from "@testing-library/react"
import { Router } from "react-router-dom"
import { createMemoryHistory } from "history"
import user from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { axe } from "jest-axe"
import "jest-axe/extend-expect"

import { SignInForm } from "../../components/SignInForm"

import { Auth as MockAuth } from "aws-amplify"
jest.mock("aws-amplify")
// jest.spyOn(MockAuth, "signIn").mockReturnValue()

afterEach(() => {
  jest.clearAllMocks()
})

test("the sign in form is accessible", async () => {
  const { container } = render(<SignInForm />, { wrapper: MemoryRouter })
  // console.log(container.innerHTML)
  const form = container.querySelector("#signInForm")!
  // console.log(form)
  const results = await axe(form)
  // console.log(results)
  expect(results).toHaveNoViolations()
})

test("renders the Sign In Page with form validation", async () => {
  const { container } = render(<SignInForm />, { wrapper: MemoryRouter })
  // console.log(container.innerHTML)

  // test page title
  expect(screen.getByRole("heading", { name: /sign in/i })).toBeInTheDocument()

  // submit should be disabled by default on page load and empty form fields
  expect(container.querySelector("#signInButton")).toBeDisabled()

  // test email validation
  await wait(() => {
    const input = container.querySelector("input[name='email']")!
    user.type(input, "10")
    fireEvent.blur(input)
  })

  expect(MockAuth.signIn).not.toHaveBeenCalled()

  let validationError = await screen.findByText(/invalid email address/i)
  expect(validationError.innerHTML).toMatch(/invalid email address/i)

  // test password validation
  await wait(() => {
    const input = container.querySelector("input[name='password']")!
    user.type(input, "123")
    fireEvent.blur(input)
  })
  expect(MockAuth.signIn).not.toHaveBeenCalled()

  validationError = await screen.findByText(/must be 6 to 12 characters in length/i)
  expect(validationError.innerHTML).toMatch(/must be 6 to 12 characters in length/i)
})

test("sign in success redirects to /profile", async () => {
  MockAuth.signIn = jest.fn((email: string, password: string) => {
    return Promise.resolve("OK")
  })

  MockAuth.currentSession = jest.fn(() =>
    Promise.resolve({
      getIdToken: () => ({
        payload: { "cognito:groups": ["admin"] },
        getJwtToken: () => "xxx",
        getExpiration: () => 42,
        getIssuedAt: () => 42,
        decodePayload: () => ({ id: "string" }),
      }),
      getRefreshToken: () => ({ getToken: () => "string" }),
      getAccessToken: () => ({
        payload: { key: "string" },
        getJwtToken: () => "string",
        getExpiration: () => 42,
        getIssuedAt: () => 42,
        decodePayload: () => ({ id: "string" }),
      }),
      isValid: () => true,
    })
  )

  // const { debug, container, getByLabelText } = render(<SignInForm />, { wrapper: MemoryRouter })
  const history = createMemoryHistory()

  const { container, getByLabelText } = render(
    <Router history={history}>
      <SignInForm />
    </Router>
  )
  const emailInput = getByLabelText(/email/i) as HTMLFormElement
  const passwordInput = getByLabelText(/password/i) as HTMLFormElement

  // default router location pathname for the initial test setup is '/'
  expect(history.location.pathname).toBe("/")

  await wait(() => {
    user.type(emailInput, "user@example.com")
    user.type(passwordInput, "asdfasdf")
    const signInButton = container.querySelector("#signInButton")!
    fireEvent.click(signInButton)
  })

  expect(MockAuth.signIn).toHaveBeenCalledWith("user@example.com", "asdfasdf")
  expect(MockAuth.signIn).toHaveBeenCalledTimes(1)

  // assert login was sucessful with a redirect to the /profile route
  expect(history.location.pathname).toBe("/profile")
})

test("should handle authentication errors", async () => {
  MockAuth.signIn = jest.fn((email: string, password: string) => {
    return Promise.reject({ __type: "NotAuthorizedException", message: "Incorrect username or password." })
    // statusCode 400
    // {"__type":"UserNotFoundException","message":"User does not exist."}
    // {"__type":"NotAuthorizedException","message":"Incorrect username or password."}
  })

  const { container } = render(<SignInForm />, { wrapper: MemoryRouter })

  const emailInput = screen.getByLabelText(/email/i) as HTMLFormElement
  const passwordInput = screen.getByLabelText(/password/i) as HTMLFormElement

  await wait(() => {
    user.type(emailInput, "user@example.com")
    user.type(passwordInput, "asdfasdf")
    const signInButton = container.querySelector("#signInButton")!
    fireEvent.click(signInButton)
  })

  expect(MockAuth.signIn).toHaveBeenCalledWith("user@example.com", "asdfasdf")
  expect(MockAuth.signIn).toHaveBeenCalledTimes(1)

  // should be an error message
  expect(screen.getByText(/incorrect username or password/i)).toBeInTheDocument()

  // click on the error message to make it go away (material-ui Chip element)
  const authErrorChip = container.querySelector("#authError > svg")!
  fireEvent.click(authErrorChip)
  expect(screen.queryByText(/incorrect username or passowrd/i)).not.toBeInTheDocument()
})
