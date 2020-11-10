
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)
  const meResult = useQuery(ME)
  const client = useApolloClient()

  useEffect(() => {
    if (meResult.data){
      setLoggedIn(true)
    }
  }, [meResult.data])

  if (authorResult.loading || bookResult.loading) {
    return <div>loading...</div>
  }
  console.log(authorResult.data, bookResult.data)
  const logOut = () => {
    localStorage.clear()
    setToken(null)
    setLoggedIn(false)
    client.resetStore()
    setPage('login')
  }
  const navButtons = () => {
    if (loggedIn) {
      return (
        <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('logout')}>logout</button>
        </>
      )
    } else {
      return (
        <>
          <button onClick={() => logOut()}>log in</button>
        </>
      )
    }
  }
  const userLine = () => {
    if (meResult.data) {
      console.log(meResult.data)
      return (
        <div>
          <p>Welcome back, {meResult.data.me.username}!</p>
          <p>Your favourite genre is {meResult.data.me.favouriteGenre}.</p>
        </div>
      )
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {navButtons()}
      </div>
      {userLine()}

      <Authors
        show={page === 'authors'}
        authors={authorResult.data.allAuthors}
      />

      <Books
        books={bookResult.data.allBooks}
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setLoggedIn={setLoggedIn}
        setPage={setPage}
      />

    </div>
  )
}

export default App