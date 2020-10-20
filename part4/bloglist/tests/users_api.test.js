const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const Test = require('supertest/lib/test')
const usersRouter = require('../controllers/users')
const api = supertest(app)

const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    password: 'sudopassword'
  },
  {
    username: 'tunaalien',
    name: 'Tynan Byrne',
    password: 'rubyisthebest'
  }
]

const dummyUser = {
  username: 'dummy123',
  name: 'Dummy McDummy',
  password: 'dummypassword'
}


beforeEach(async () => {
  await User.deleteMany({})
  let userObject = new User(initialUsers[0])
  await userObject.save()
  userObject = new User(initialUsers[1])
  await userObject.save()
})

describe('fetching users from the database', () => {
  test('get request returns one user', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)

    console.log(response.body)
    expect(response.body).toHaveLength(2)
    expect(response.body.username).toEqual(initialUsers.username)
    expect(response.body.name).toEqual(initialUsers.name)
  })
})

describe('adding a new user to the database', () => {
  test('adding dummy to the database', async () => {
    const response = await api
      .post('/api/users')
      .send(dummyUser)

    console.log(response.body)
    expect(response.body.name).toEqual(dummyUser.name)
    expect(response.body.username).toEqual(dummyUser.username)
  })
  test('check that the unique username validator works', async () => {
    const repeater = {
      username: 'tunaalien',
      name: 'Someone',
      password: 'apassword'
    }

    const response = await api
      .post('/api/users')
      .send(repeater)

    expect(response.error.status).toBe(400)
  })
  test('check that a short username will not work', async () => {
    const tooShort = {
      username: 'as',
      name: 'Someone',
      password: 'password'
    }

    const response = await api
      .post('/api/users')
      .send(tooShort)

      expect(response.error.status).toBe(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})