import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import { ProfilePage } from "../../components/ProfilePage"

test("renders Profile Page", () => {
  const { getByText } = render(<ProfilePage />, { wrapper: MemoryRouter })
  expect(getByText(/profile page/i)).toHaveTextContent("Profile Page")
})
