const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const User = require('./models/user')
const typeDefs = require('./typedefs/index')
const resolvers = require('./resolvers/index')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const secret = process.env.SECRET

mongoose
  .connect(process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  .then(() => console.log("Connected to that MONGO"))
  .catch((error) => console.error('Failed to connect to MongoDB. Try again.', error.message))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), secret
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})