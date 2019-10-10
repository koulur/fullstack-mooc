import React from "react"
import { useEffect, useState } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"

const Notification = ({ message }) => {
  if (message) {
    if (message.error) {
      return <div style={{ backgroundColor: "pink" }}>{message.text}</div>
    }
    return <div style={{ backgroundColor: "green" }}>{message.text}</div>
  } else {
    return <div></div>
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user))

      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setMessage({ text: "wrong credentials", error: true })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          style={{ borderColor: "black" }}
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          style={{ borderColor: "black" }}
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const Blog = ({ blog }) => <p>{blog.title}</p>

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = e => {
    e.preventDefault()
    const blogObject = {
      author: newAuthor,
      title: newTitle,
      likes: Math.floor(Math.random() * 20),
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setMessage(
          `Succesfully created a blog entry for ${newTitle} by ${newAuthor}`
        )

        setNewAuthor("")
        setNewTitle("")
        setNewUrl("")
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(e => {
        setMessage({ text: "Failed to create the blog!", error: true })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const blogForm = () => (
    <div>
      <h3>Add a new blog!</h3>
      <form onSubmit={addBlog}>
        <input
          placeholder="author"
          style={{ borderColor: "black" }}
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
        <input
          placeholder="title"
          style={{ borderColor: "black" }}
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
        <input
          placeholder="url"
          style={{ borderColor: "black" }}
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        />
        <button type="submit">create</button>
      </form>
    </div>
  )

  if (user) {
    return (
      <div>
        <Notification message={message} />
        <div style={{ display: "flex" }}>
          {blogForm()}
          <button
            style={{
              backgroundColor: "orange",
              marginLeft: "4em",
              width: "100px",
              height: "100px"
            }}
            onClick={logOut}
          >
            log out
          </button>
        </div>
        <h2>blogs</h2>
        <div>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    )
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={message} />
      {loginForm()}
    </div>
  )
}

export default App
