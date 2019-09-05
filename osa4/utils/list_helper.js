const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => {return sum + item.likes}, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.sort((a, b) => a.likes - b.likes).reverse()[0] || {}
}

const mostBlogs = (blogs) => {
  const blogsAmount = _.countBy(blogs, 'author')
  const arr = _.values(blogsAmount)
  const maxi = _.max(arr)
  let bobby = {}
  const blog = _.find(blogsAmount, (value, key) => {
    bobby = {'author' : key, 'blogs' : value}
    return value === maxi
  })
  return bobby
}

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const arr = _.toArray(groupedByAuthor)
  const listy = []
  something = _.forEach(arr, authorList =>  {
     listy.push({
        'author' : authorList[0].author,
        'likes' : _.reduce(authorList, (accumulator, value) => 
        {
          return accumulator + value.likes
        }, 0)
        })
  })
  return _.reverse(_.sortBy(listy, 'likes'))[0] || {}
}
mostLikes()
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}