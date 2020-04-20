import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import { NotFoundPage } from "../../components/NotFoundPage"

test("renders Not Found Page", () => {
  const { getByText } = render(<NotFoundPage />, { wrapper: MemoryRouter })
  expect(getByText(/page not found/i)).toHaveTextContent("Page Not Found")
})
