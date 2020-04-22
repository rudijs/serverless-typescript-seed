import React from "react"
import { render, fireEvent, wait } from "@testing-library/react"
import user from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"

import { SignInPage } from "../../components/SignInPage"

test("renders the Sign In Page", async () => {
  const { container, getAllByText, findByText } = render(<SignInPage />, { wrapper: MemoryRouter })

  // test page title
  expect(getAllByText(/sign in/i)[0]).toHaveTextContent("Sign In")

  // test email validation
  await wait(() => {
    const input = container.querySelector("input[name='email']")!
    user.type(input, "10")
    fireEvent.blur(input)
  })
  let errorMsg = await findByText(/invalid email address/i)
  expect(errorMsg.innerHTML).toMatch(/invalid email address/i)

  // test passwordl validation
  await wait(() => {
    const input = container.querySelector("input[name='password']")!
    user.type(input, "123")
    fireEvent.blur(input)
  })
  errorMsg = await findByText(/Must be 6 to 12 characters in length/i)
  expect(errorMsg.innerHTML).toMatch(/Must be 6 to 12 characters in length/i)
})
