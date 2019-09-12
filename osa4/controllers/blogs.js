const blogsRouter = require('express').Router()
// const blogsRouter = require('../models/blog')
const Blog = require('../models/blog')



blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  try {
    response.json(blogs.map(blog => {
      return blog.toJSON()
    }))
  }
  catch(error) {
    next(error)
  }
})

blogsRouter.get('/:id', (request, response, next) => {
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

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if(!request.body.title || !request.body.author) {
    return response.status(400).end()
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes || 0,
    url: body.url
  })
  try {
  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
  }
  catch(error) {
    next(error)
  }
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
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