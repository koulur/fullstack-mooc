import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

afterEach(cleanup)

test("renders only title", () => {
  const blog = {
    title: "Harry Potter",
    author: "JK Rowling",
    url: "www.hp.com",
    likes: 2
  }

  const component = render(<Blog blog={blog} />)

  const titleAuthor = component.container.querySelector(".title")
  expect(titleAuthor).toHaveTextContent("Harry Potter")

  const fullBlog = component.container.querySelector(".full")
  expect(fullBlog).toBeNull()
})

test("full blog should be shown after click", () => {
  const blog = {
    title: "Harry Potter",
    author: "JK Rowling",
    url: "www.hp.com",
    likes: 2
  }

  const component = render(<Blog blog={blog} />)

  const titleAuthor = component.container.querySelector(".title")
  expect(titleAuthor).toHaveTextContent("Harry Potter")

  fireEvent.click(titleAuthor)
  const titleAuthor2 = component.container.querySelector(".full")
  expect(titleAuthor2).toHaveTextContent("Harry Potter")
})
