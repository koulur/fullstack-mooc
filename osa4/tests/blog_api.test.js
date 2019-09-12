const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "A title of your choosing.",
    author: "A fitting author for the title.",
    url: "Google yourself.",
    likes: "3"
  },
  {
    title: 'String',
    author: 'String',
    url: 'String'
  },
  {
    title: 'Third author',
    author: 'String',
    url: 'String'
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are three blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(initialBlogs.length);
});

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(titles).toContain(
    'A title of your choosing.'
  )
})

test('id is defined', async () => {
  const response = await api.get('/api/blogs')
  response.body.map(each => {expect(each.id).toBeDefined()})
})

test('new blog can be added', async () => {
  const blog = {
      title: "Something new.",
      author: "A fitting author for the title.",
      url: "Google yourself.",
      likes: "3"
  }

  await api.post('/api/blogs').send(blog).expect(200).expect('Content-Type', /application\/json/)
  const blogLength = await Blog.find({})
  expect(blogLength.length).toBe(initialBlogs.length + 1)
})

test('default likes is 0', async () => {
  const blog = {
      title: "Id zero",
      author: "A fitting author for the title.",
      url: "Google yourself.",
  }

  await api.post('/api/blogs').send(blog).expect(200).expect('Content-Type', /application\/json/)
  const testBlog = await Blog.find({title: 'Id zero'})
  expect(testBlog[0].likes).toBe(0)
})

test('bad blog can\'t be added', async () => {
  const noTitle = {
      author: "A fitting author for the title.",
      url: "Google yourself.",
      likes: "3"
  }
  const noAuthor = {
    title: "Shouldn't work",
    url: "Google yourself.",
    likes: "3"
}

  await api.post('/api/blogs').send(noTitle).expect(400)
  await api.post('/api/blogs').send(noAuthor).expect(400)
})

afterAll(() => {
  mongoose.connection.close();
});


