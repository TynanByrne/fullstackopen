const Comment = require('../models/comment')
const commentsRouter = require('express').Router({ mergeParams: true })
const Blog = require('../models/blog')
const ObjectId = require('mongoose').Types.ObjectId

commentsRouter.post('/', async (req, res) => {
  try {
    const body = req.body
    const { id } = req.params
    const blog = await Blog.findById(id)
    const newComment = new Comment({
      content: body.content
    })
    newComment.blog = blog._id
    const savedComment = await newComment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    res.status(201).json(savedComment)
  } catch (error) {
    res.status(401).json({ error: 'Could not save comment' })
  }
})

commentsRouter.get('/', async (req, res) => {
  try {
    const id = req.params.id
    console.log('id is', id)
    const blogComments = await Comment.find({ blog: new ObjectId(id) }).populate(
      'blog',
      {
        title: 1,
        author: 1,
        url: 1
      }
    )
    console.log(blogComments)
    res.status(200).json(blogComments)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error })
  }
})

module.exports = commentsRouter