import React from "react"
import { render, fireEvent, wait } from "@testing-library/react"

import { Router } from "react-router-dom"
import { createMemoryHistory } from "history"

import { Navbar } from "../../../components/layout/Navbar"
import { appState } from "../../../models/state"

import { Auth as MockAuth } from "aws-amplify"

jest.mock("aws-amplify")

afterEach(() => {
  jest.clearAllMocks()
})

test("toggles Sign In/Out button and Left Side Swipable Menu routes to app pages", async () => {
  const history = createMemoryHistory()

  const { container, getByLabelText, getAllByRole } = render(
    <Router history={history}>
      <Navbar />
    </Router>
  )

  // console.log(container.querySelector("#navSignInButton")?.innerHTML)
  expect(container.querySelector("#navSignInButton")?.innerHTML).toMatch(/sign in/i)

  // click the menu hamburger icon to open the swipable side left menu
  const menuButton = getByLabelText("menu")

  // should be on the home page route to begin with
  expect(history.location.pathname).toBe("/")

  // open the side menu
  fireEvent.click(menuButton)

  let sideMenu = await getAllByRole("presentation")

  // left menu Sign In button
  const signInBtn = sideMenu[0].querySelector("#leftDrawerSignIn")!
  fireEvent.click(signInBtn)
  expect(history.location.pathname).toBe("/signin")

  // left menu Home button
  let HomeBtn = sideMenu[0].querySelector("#leftDrawerHome")!
  fireEvent.click(HomeBtn)
  expect(history.location.pathname).toBe("/")

  // Sign In
  appState.setGroup("admin")

  expect(container.querySelector("#navSignOutButton")?.innerHTML).toMatch(/sign out/i)

  sideMenu = await getAllByRole("presentation")

  // left menu Profile button
  const profileBtn = sideMenu[0].querySelector("#leftDrawerProfile")!
  fireEvent.click(profileBtn)
  expect(history.location.pathname).toBe("/profile")

  // top of app bar Home
  const appBarHome = container.querySelector("#appBarHome")!
  fireEvent.click(appBarHome)
  expect(history.location.pathname).toBe("/")
})

test("should Auth.signOut()", async () => {
  MockAuth.signOut = jest.fn(() => {
    return Promise.resolve("OK")
  })

  const history = createMemoryHistory()

  const { container, getByLabelText, getAllByRole } = render(
    <Router history={history}>
      <Navbar />
    </Router>
  )

  // Sign In
  appState.setGroup("admin")

  // should be on the home page route to begin with
  expect(history.location.pathname).toBe("/")

  // click the menu hamburger icon to open the swipable side left menu
  const menuButton = getByLabelText("menu")

  // open the side menu
  fireEvent.click(menuButton)

  let sideMenu = await getAllByRole("presentation")

  // left menu Profile button
  const profileBtn = sideMenu[0].querySelector("#leftDrawerProfile")!
  fireEvent.click(profileBtn)
  expect(history.location.pathname).toBe("/profile")

  await wait(() => {
    fireEvent.click(container.querySelector("#navSignOutButton")!)
  })

  expect(history.location.pathname).toBe("/")
})
