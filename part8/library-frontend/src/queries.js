import { gql } from '@apollo/client'


export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name,
    born,
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query allBooks($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
    title,
    published,
    author {
      name
      born
    }
    genres
  }
}
`

export const ME = gql`
  query me {
    me {
      username
      favouriteGenre
    }
  }
`

export const FAVOURITE_GENRE = gql`
  query favGenre {
    me {
      favouriteGenre
    }
  }
`

export const EDIT_AUTHOR = gql`
mutation changeAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
`

export const ADD_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
    author {
      name
      born
    }
    genres
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`