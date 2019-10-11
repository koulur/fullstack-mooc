import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup, fireEvent } from "@testing-library/react"
import SimpleBlog from "./SimpleBlog"

afterEach(cleanup)

test("renders content", () => {
  const blog = {
    title: "Harry Potter",
    author: "JK Rowling",
    likes: 2
  }

  const component = render(<SimpleBlog blog={blog} />)
  expect(component.container).toHaveTextContent("Harry Potter")

  const titleAuthor = component.container.querySelector(".title-author")
  expect(titleAuthor).toHaveTextContent("Harry Potter")
  expect(titleAuthor).toHaveTextContent("JK Rowling")

  const likes = component.container.querySelector(".likes")
  expect(likes).toHaveTextContent("2")
})

test("clicking the button calls event handler once", async () => {
  const blog = {
    title: "Harry Potter",
    author: "JK Rowling",
    likes: 2
  }

  const mockHandler = jest.fn()

  const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler} />)

  const button = getByText("like")
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
