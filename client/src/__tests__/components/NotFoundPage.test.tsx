import React from "react"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import { NotFoundPage } from "../../components/NotFoundPage"

test("renders Not Found Page", () => {
  render(<NotFoundPage />, { wrapper: MemoryRouter })
  expect(screen.getByText(/page not found/i)).toHaveTextContent("Page Not Found")
})
