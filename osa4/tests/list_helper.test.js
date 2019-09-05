const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
describe('Tests for mostLikes', () => {
  test('one blog', () => {
    const blogs = [
      {
        author: 'me',
        likes: 2
      }
    ]
    expect(listHelper.mostLikes(blogs)).toEqual({'author': 'me', 'likes': 2})
  })
  test('no authors', () => {
    const blogs = [
  
    ]
    expect(listHelper.mostLikes(blogs)).toEqual({})
  })
  test('one author', () => {
    const blogs = [
      {
        author: 'me',
        likes: 2
      },
      {
        author: 'me',
        likes: 5
      }
    ]
    expect(listHelper.mostLikes(blogs)).toEqual({'author': 'me', 'likes': 7})
  })
  test('multiple blogs', () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      }  
    ]
    expect(listHelper.mostLikes(blogs)).toEqual({'author' : 'Edsger W. Dijkstra', 'likes': 17})

  })
})
describe('Tests for mostBlogs', () => {
  test('no blogs' , () => {
    const blogs = [
    ]
    expect(listHelper.mostBlogs(blogs)).toEqual({})
  })
  test('one blogs' , () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      }
    ]
    expect(listHelper.mostBlogs(blogs)).toEqual({'author' : 'Michael Chan', 'blogs' : 1})
  })
  test('multiple blogs', () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422a851b54a676234d17f8",
        title: "Jest thingies",
        author: "Michael Chan",
        url: "https://jestthingies.com/",
        likes: 2,
        __v: 0
      },
      {
        _id: "5a422a851b54a676234d17f8",
        title: "Jest thingies",
        author: "Not Michael Chan",
        url: "https://jestthingies.com/",
        likes: 2,
        __v: 0
      }
    ]
    expect(listHelper.mostBlogs(blogs)).toEqual({ author: 'Michael Chan', blogs: 2 })

  })
})

describe('Tests for favoriteBlog', () => {
  test('no blogs', () => {
    const blogs = []
    expect(listHelper.favoriteBlog(blogs)).toEqual({})
  })
  test('one blog', () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      }
    ]
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    })
  })
  test('two blogs', () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422a851b54a676234d17f8",
        title: "Jest thingies",
        author: "Mikey",
        url: "https://jestthingies.com/",
        likes: 2,
        __v: 0
      }
    ]

    expect(listHelper.favoriteBlog(blogs)).toEqual({
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    })
  })
})


describe('Tests for totalLikes', () => {
  test('one blog', () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      }
    ]
    expect(listHelper.totalLikes(blogs)).toBe(7)
  })

  test('empty list', () => {
    const blogs = []
    expect(listHelper.totalLikes(blogs)).toBe(0)
  })

  test('multiple blogs', () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      }  
    ]

    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})