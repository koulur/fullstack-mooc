import React from "react"
import { useEffect, useState } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Blog from "./components/Blog"
import PropTypes from "prop-types"

import { useField } from "./hooks"
const Input = ({ reset, ...noReset }) => {
  // console.log(reset)
  // console.log("noReset: ", noReset)
  // window.inputNameField = reset
  return <input {...noReset}></input>
}
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

CreateBlog.propTypes = {
  setCreateBlogVisible: PropTypes.func.isRequired
}

const Cancel = ({ setCreateBlogVisible }) => (
  <button
    style={{ marginLeft: "0.5em" }}
    onClick={() => setCreateBlogVisible(false)}
  >
    cancel
  </button>
)

Cancel.propTypes = {
  setCreateBlogVisible: PropTypes.func.isRequired
}

const BlogForm = ({
  // newAuthor,
  // newTitle,
  // newUrl,
  // setNewAuthor,
  // setNewTitle,
  // setNewUrl,
  addBlog,
  createBlogVisible,
  setCreateBlogVisible,
  urlField,
  authorField,
  titleField
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
          {/* <input
            style={{ borderColor: "black" }}
            placeholder="author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          /> */}
          <Input
            style={{ borderColor: "black" }}
            placeholder="author"
            {...authorField}
          />
          {/* <input
            style={{ borderColor: "black" }}
            placeholder="title"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          /> */}
          <Input
            style={{ borderColor: "black" }}
            placeholder="title"
            {...titleField}
          />
          {/* <input
            style={{ borderColor: "black" }}
            placeholder="url"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          /> */}
          <Input
            style={{ borderColor: "black" }}
            placeholder="url"
            {...urlField}
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
  // username,
  // setUsername,
  // password,
  // setPassword,
  handleLogin,
  nameField,
  passwordField
}) => {
  return (
    <form className="loginForm" onSubmit={handleLogin}>
      {/* <div>
      username
      <input
        style={{ borderColor: "black", marginLeft: "0.5em" }}
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        style={{ borderColor: "black", marginLeft: "0.5em" }}
        type="text"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div> */}
      <div>
        username
        <Input {...nameField} />
      </div>

      <div>
        password
        <Input {...passwordField} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
  // username: PropTypes.string.isRequired,
  // password: PropTypes.string.isRequired,
  // setUsername: PropTypes.func.isRequired,
  // setPassword: PropTypes.func.isRequired
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  // const [username, setUsername] = useState("")
  // const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const nameField = useField("text")
  const passwordField = useField("password")

  const urlField = useField("text")
  const authorField = useField("text")
  const titleField = useField("text")

  window.nameField = nameField

  // window.blogs = blogs
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
        // username,
        // password
        username: nameField.value,
        password: passwordField.value
      })
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user))

      setUser(user)
      // setUsername("")
      // setPassword("")
      nameField.onChange({ target: "" })
      passwordField.onChange({ target: "" })
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
    e.preventDefault()
    const blogObject = {
      author: authorField.value,
      //used to be newTitle, etc.
      title: titleField.value,
      likes: 0,
      url: urlField.value
    }

    blogService
      .create(blogObject)
      .then(data => {
        console.log("data: ", data)
        setBlogs(blogs.concat(data))
        console.log(blogs)
        setMessage({
          text: `Succesfully created a blog entry for ${newTitle} by ${newAuthor}`
        })

        // setNewAuthor("")
        // setNewTitle("")
        // setNewUrl("")
        authorField.reset()
        titleField.reset()
        urlField.reset()
        setTimeout(() => {
          console.log("blogs in timeout: ", blogs)
          setMessage(null)
        }, 5000)
      })
      .catch(() => {
        setMessage({ text: "Failed to create the blog!", error: true })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  if (user) {
    return (
      <div className="loggedIn">
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
            urlField={urlField}
            authorField={authorField}
            titleField={titleField}
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
            .filter(e => typeof e.likes === "number")
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <Blog
                key={blog.id}
                user={user}
                blog={blog}
                blogs={blogs}
                /////
                /////
                /////
                /////
                /////
                //authorField.value
                // newAuthor={newAuthor}
                authorOf={blog.author}
                title={blog.title}
                // newTitle={newTitle}
                setBlogs={setBlogs}
                setMessage={setMessage}
              />
            ))}
        </div>
      </div>
    )
  }
  return (
    <div className="notLoggedIn">
      <h1>Notes.</h1>
      <h2>Please log in to create and browse blogs.</h2>
      <Notification message={message} />
      <LoginForm
        // username={username}
        // password={password}
        // setUsername={setUsername}
        // setPassword={setPassword}
        passwordField={passwordField}
        nameField={nameField}
        username={nameField.value}
        password={passwordField.value}
        handleLogin={handleLogin}
      />
    </div>
  )
}

export default App
