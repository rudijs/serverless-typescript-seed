import React from "react"
import { render } from "@testing-library/react"

import "mobx-react-lite/batchingForReactDom"
import App from "../App"

test("renders learn react link", () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Serverless App Seed/i)
  expect(linkElement).toBeInTheDocument()
})
