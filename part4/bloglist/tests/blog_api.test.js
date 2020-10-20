const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Test = require('supertest/lib/test')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
  {
    _id: '5f871821174381019c7c4b0f',
    title: 'A nice blog',
    author: 'Writy McWriteface',
    url: 'www.aniceblog.com',
    likes: 4,
    __v: 0
  },
  {
    _id: '5f871874174381019c7c4b10',
    title: 'How to be so cute he implodes: A quick guide!',
    author: 'Georgie HB',
    url: 'www.thegeorgieblogs.com',
    likes: 1,
    __v: 0
  },
  {
    _id: '5f871874174381019c7c4b13',
    title: 'This is a test though',
    author: 'Test Testerson',
    url: 'www.test.com',
    likes: 45,
    __v: 0
  }
]


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})
describe('fetching data from API', () => {

  test('returns the correct number of blog posts', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
    expect(response.body).toHaveLength(3)
  })


  test('returns correct status code', async () => {
    const response = await api.get('/api/blogs/')
    expect(response.statusCode).toBe(200)
  })


  test('checks the id field is correct', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('adding new blogs to the database', () => {
  test('check we can add a blog to the database correctly', async () => {
    const newBlog = {
      title: 'Yet another test',
      author: 'Test Testerson Jr.',
      url: 'www.secondtest.com',
      likes: 23
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(response.body.map(x => x.title)).toContainEqual('Yet another test')
  })

  test('check that if the like property is missing, it defaults to the value 0', async () => {
    const newBlog = {
      title: 'Yet another test',
      author: 'Test Testerson Jr.',
      url: 'www.secondtest.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const response = await api.get('/api/blogs')
    expect(response.body[initialBlogs.length].likes).toBe(0)
  })

  test('check that if the url and title properties are missing, the backend responds with 400 Bad Request', async () => {
    const newBlog = {
      author: 'No Face',
      likes: 30
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body[initialBlogs.length]).toBeUndefined()
  })
})

describe('deleting blogs with the API', () => {
  test('deleting a blog through the id of a blog', async () => {
    const id = initialBlogs[0]._id
    console.log(id)
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length - 1)
  })

  test('deleting a blog that does not have a valid id', async () => {
    const id = 345

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)
    /* .then(res => {
      expect(res.body).toHaveLength(initialBlogs.length)
    }) */

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe('modifying a blog post', () => {
  test('finding a blog by id and updating it', async () => {
    const blogToUpdate = initialBlogs[2]
    const id = blogToUpdate._id
    blogToUpdate.author = 'Test Testerson Jr.'
    blogToUpdate.title = 'Yet another test'
    const response = await api
      .put(`/api/blogs/${id}`)
      .send(blogToUpdate)

    expect(response.body.title).toEqual(blogToUpdate.title)
    expect(response.body.author).toEqual(blogToUpdate.author)
  })
})

afterAll(() => {
  mongoose.connection.close()
})