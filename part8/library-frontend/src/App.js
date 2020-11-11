
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient, useQuery, useLazyQuery, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ME, FAVOURITE_GENRE, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)
  const meResult = useQuery(ME, {
    pollInterval: 1000
  })
  const [getGenre, genreResult] = useLazyQuery(FAVOURITE_GENRE)
  const client = useApolloClient()

  useEffect(() => {
    if (meResult.data && meResult.data.me) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [meResult.data])

  const updateCacheWith = bookAdded => {
    const includedIn = (set, object) =>
      set.map(p => p.id.includes(object.id))

    const dataInStore = client.readQuery({ query: ALL_BOOKS })  
    if (!(includedIn(dataInStore.allBooks, bookAdded).filter(x => x === true) === [])) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(bookAdded) }
      })
      console.log("DOWN HERE")
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(subscriptionData)
      window.alert(`Book just added! Check out: ${subscriptionData.data.bookAdded.title}`)
      updateCacheWith(addedBook)
    }
  })

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
          <button onClick={() => logOut()}>logout</button>
          <button onClick={() => {
            getGenre()
            console.log(genreResult.data)
            setPage('recommendations')
          }}>recommendations</button>
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
    if (meResult.data.me) {
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
        updateCacheWith={updateCacheWith}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setLoggedIn={setLoggedIn}
        setPage={setPage}
      />

      <Recommendations
        show={page === 'recommendations'}
        genreResult={genreResult}
      />

    </div>
  )
}

export default App