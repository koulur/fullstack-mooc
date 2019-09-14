const blogsRouter = require("express").Router()
const jwt = require("jsonwebtoken")
// const blogsRouter = require('../models/blog')
const Blog = require("../models/blog")
const User = require("../models/user")

// const getTokenFrom = request => {
//   const authorization = request.get("authorization")
//   if (authorization && authorization.toLowerCase().startsWith("bearer")) {
//     return authorization.substring(7)
//   }
//   return null
// }

// rami
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbWkiLCJpZCI6IjVkN2NlNTkyODE5ZGM3MTQxNDU4MzQ0NiIsImlhdCI6MTU2ODQ4NDUxM30.ZOjYZH6-IZpKMtCKCJG4MNCSZOIoq44CznKozuIv_CM

blogsRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 })

  try {
    response.json(
      blogs.map(blog => {
        return blog.toJSON()
      })
    )
  } catch (error) {
    next(error)
  }
})

blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body

  const token = request.token

  if (!request.body.title || !request.body.author) {
    return response.status(400).end()
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      likes: body.likes || 0,
      url: body.url,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" })
    }

    const blog = await Blog.findById(request.params.id)

    if (decodedToken.id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      return response.status(204).end()
    } else {
      return response
        .status(401)
        .send({ error: "token did not match owner of blog" })
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put("/:id", (request, response, next) => {
  const body = request.body

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
