const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (req, res) => {
  const allUsers = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1, id: 1 })
  res.json(allUsers)
})
usersRouter.post('/', async (req, res) => {

  const body = req.body

  if (body.password.length < 3) {
    return res.status(400).res.json({ error: 'Password must be at least 3 characters long' })
  }
  if (!body.password) {
    return res.status(400).res.json({ error: 'No password given' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  /* const allBlogs = await Blog.find({})
  const randomId = allBlogs[Math.round(Math.random())].id */

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.json(savedUser)

})

module.exports = usersRouter