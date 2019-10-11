import React from "react"
import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({
  blog,
  user,
  blogs,
  newAuthor,
  newTitle,
  setBlogs,
  setMessage
}) => {
  const [show, setShow] = useState(false)

  const layoutStyle = {
    margin: 10,
    marginLeft: 0,
    padding: 10,
    border: "1px solid #DDD"
  }

  const onClickShow = () => {
    setShow(prevShow => !prevShow)
  }

  const like = e => {
    e.preventDefault()
    const newObject = {
      ...blog,
      likes: blog.likes + 1
    }
    blogService.update(newObject).then(data => {
      setBlogs(blogs.filter(o => o.id !== newObject.id).concat(data))
      setMessage(`Liked ${newTitle} by ${newAuthor}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const remove = ({ id, title, author }) => {
    if (
      window.confirm(`Are you sure you want to remove ${title} by ${author}?`)
    ) {
      blogService
        .del(id)
        .then(data => {
          setMessage({ text: `Succesfully removed ${title} by ${author}.` })
          setTimeout(() => setMessage(""), 3000)
          setBlogs(blogs.filter(bloggy => bloggy.id !== id))
          return data
        })
        .catch(() => {
          setMessage({
            text: "Was unable to remove the blog post.",
            error: true
          })
          setTimeout(() => setMessage(""), 3000)
        })
    }
  }

  return (
    <div>
      {show ? (
        <div style={layoutStyle} onClick={onClickShow}>
          <p>{blog.title}</p>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p>{blog.likes}</p> <button onClick={e => like(e)}>like</button>
          {blog.user && user.username === blog.user.username && (
            <button
              style={{ backgroundColor: "pink" }}
              onClick={() => remove(blog)}
            >
              remove
            </button>
          )}
        </div>
      ) : (
        <p onClick={onClickShow}>{blog.title}</p>
      )}
    </div>
  )
}

export default Blog
