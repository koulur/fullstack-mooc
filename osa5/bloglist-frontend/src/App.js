import React from "react"
import { useEffect, useState } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Blog from "./components/Blog"

const Notification = ({ message }) => {
  if (message) {
    if (message.error) {
      return <div style={{ backgroundColor: "pink" }}>{message.text}</div>
    }
    return <div style={{ backgroundColor: "green" }}>{message.text}</div>
  } else {
    return <div>{message}</div>
  }
}

const CreateBlog = ({ setCreateBlogVisible }) => (
  <button onClick={() => setCreateBlogVisible(true)}>new blog</button>
)

const Cancel = ({ setCreateBlogVisible }) => (
  <button
    style={{ marginLeft: "0.5em" }}
    onClick={() => setCreateBlogVisible(false)}
  >
    cancel
  </button>
)

const BlogForm = ({
  addBlog,
  newAuthor,
  newTitle,
  newUrl,
  setNewAuthor,
  setNewTitle,
  setNewUrl,
  createBlogVisible,
  setCreateBlogVisible
}) => {
  const hideWhenVisible = { display: createBlogVisible ? "none" : "" }
  const showWhenVisible = { display: createBlogVisible ? "" : "none" }

  return (
    <div>
      <div style={hideWhenVisible}>
        <CreateBlog setCreateBlogVisible={setCreateBlogVisible} />
      </div>
      <div style={showWhenVisible}>
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
          <button style={{ marginLeft: "0.5em" }} type="submit">
            create
          </button>
        </form>
        <Cancel setCreateBlogVisible={setCreateBlogVisible} />
      </div>
    </div>
  )
}

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => (
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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

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

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = e => {
    // e.preventDefault()
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

  if (user) {
    return (
      <div>
        <Notification message={message} />
        <div style={{ display: "flex" }}>
          <BlogForm
            addBlog={addBlog}
            newAuthor={newAuthor}
            setNewAuthor={setNewAuthor}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newUrl={newUrl}
            setNewUrl={setNewUrl}
            createBlogVisible={createBlogVisible}
            setCreateBlogVisible={setCreateBlogVisible}
          />
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
          {blogs
            .filter(e => e.likes)
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <Blog
                key={blog.id}
                user={user}
                blog={blog}
                blogs={blogs}
                newAuthor={newAuthor}
                newTitle={newTitle}
                setBlogs={setBlogs}
                setMessage={setMessage}
              />
            ))}
        </div>
      </div>
    )
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={message} />
      {/* {loginForm()} */}
      <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </div>
  )
}

export default App
