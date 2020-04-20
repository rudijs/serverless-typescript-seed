import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import { Navbar } from "../../../components/layout/Navbar"

test.skip("renders Not Found Page", () => {
  const { getByRole } = render(<Navbar />, { wrapper: MemoryRouter })
  expect(getByRole("presentation")).toHaveTextContent("Sign In")
})
