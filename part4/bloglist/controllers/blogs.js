const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .then(blogs => {
      res.json(blogs)
    })
    .catch(error => logger.error(error))
})

blogsRouter.post('/', (request, response) => {
  let id = "5f8f7793d51307089432047e"
  const blog = new Blog({ ...request.body,
    user: id })

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'Title or URL of the blog missing' })
  }
  if (!blog.likes) {
    blog.likes = 0
  }
  
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => console.error(error))
})

blogsRouter.delete('/:id', (req, res) => {
  const id = req.params.id
  Blog
    .findByIdAndRemove(id)
    .then(logger.info('Successful deletion'))
    .then(res.status(204).end())
    .catch(error => console.error(error))
})

blogsRouter.put('/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedBlog)
  } catch (exception) {
    console.error(exception)
  }
})

module.exports = blogsRouter