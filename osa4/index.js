const http = require('http')
const express = require('express')
// const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Blog = require('./models/blog.js')
const config = require('./utils/config')
const app = require('./app')


// app.get('/api/blogs', (request, response) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

// app.post('/api/blogs', (request, response) => {
//   const blog = new Blog(request.body)

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})