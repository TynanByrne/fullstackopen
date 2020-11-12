/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1, blog: 1 })
    .then(blogs => {
      res.json(blogs)
    })
    .catch(error => logger.error(error))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  /* const token = getTokenFrom(request) */
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
    comments: []
  })

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'Title or URL of the blog missing' })
  }
  if (!blog.likes) {
    blog.likes = 0
  }
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(id)
  const user = await User.findById(decodedToken.id)

  if (blog.user.toString() === user._id.toString()) {
    const deletedBlog = await Blog.findByIdAndRemove(id)
    logger.info('Successful deletion')
    res.status(204).json(deletedBlog)
  } else {
    res.status(401).json({ error: 'Blog deletion not authorised' })
  }

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