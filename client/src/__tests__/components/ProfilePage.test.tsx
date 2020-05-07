import React from "react"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import { ProfilePage } from "../../components/ProfilePage"

test("renders Profile Page", () => {
  render(<ProfilePage />, { wrapper: MemoryRouter })
  expect(screen.getByText(/profile page/i)).toHaveTextContent("Profile Page")
})
