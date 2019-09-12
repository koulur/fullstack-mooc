const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Blog = require('./models/blog.js')
const config = require('./utils/config')
const app = require('./app')


const server = http.createServer(app)
const PORT = config.PORT
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})