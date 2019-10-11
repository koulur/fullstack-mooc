import React from "react"
import { render, waitForElement } from "@testing-library/react"
jest.mock("./services/blogs")
import App from "./App"

describe("<App />", () => {
  test("if no user logged, notes are not rendered", async () => {
    const component = render(<App />)
    component.rerender(<App />)

    const notLogged = await waitForElement(() =>
      component.container.querySelector("notLoggedIn")
    )

    // await waitForElement(() => component.container.querySelector("notLoggedIn"))

    // expect(component.container).toHaveTextContent("Please")
    expect(notLogged).toHaveTextContent(
      "Please log in to create and browse blogs."
    )
    // expectations here
  })
})
