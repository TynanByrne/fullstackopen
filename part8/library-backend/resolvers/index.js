const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const Author = require('../models/author')
const User = require('../models/user')
const Book = require('../models/book')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()
require('dotenv').config()

const secret = process.env.SECRET

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      const filter = {}
      if (author) {
        const authorObject = await Author.find({ name: author })
        filter.author = authorObject
      }
      if (genre) {
        filter.genres = genre
      }

      return await Book.find(filter).populate('author')
    },

    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const authors = await Author.find({})
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('Not authenticated.')
      }
      let author

      if (authors.find(a => a.name === args.author)) {
        author = await Author.findOne({ name: args.author })
        author.bookCount++
      } else {
        const newAuthor = {
          name: args.author,
          born: null,
          bookCount: 1
        }
        author = new Author(newAuthor)
      }

      if (author) {
        const book = new Book({ ...args, author })
        try {
          await author.save()
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: book})

        return book
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated.')
      }
      const filter = { name: args.name }
      const update = { born: args.setBornTo }
      try {
        // Mongoose recommends using save() over this. Remember for next time!
        return Author.findOneAndUpdate(filter, update, {
          new: true, runValidators: true, context: 'query'
        })
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      
    },
    createUser: (root, { username, favouriteGenre }) => {
      const user = new User({ username, favouriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: username, favouriteGenre
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'password') {
        throw new UserInputError('Wrong credentials provided. Could not log in.')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, secret)}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers