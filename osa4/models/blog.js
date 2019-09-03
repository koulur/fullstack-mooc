const http = require('http')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('../utils/config')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})


// const mongoUrl = config.MONGODB_URI

// mongoose.connect(mongoUrl, { useNewUrlParser: true })
//             .then(response => {
//                 console.log(response)
//             })
//             .catch(error => {
//                 console.log(error)
// })


blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})


module.exports = mongoose.model('Blog', blogSchema)