import React, { useState } from 'react'
import {
  Switch, Route, useRouteMatch,
} from 'react-router-dom'
import Notification from './components/Notification'
import CreateNew from './components/CreateNew'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import SingleAnecdote from './components/SingleAnecdote'
import About from './components/About'
import Footer from './components/Footer'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
  ? anecdotes.find(x => x.id === match.params.id)
  : null
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 10000)
  }
  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Switch>
        <Route path="/anecdotes/:id">
          <SingleAnecdote anecdote={anecdote} />
        </Route>
        <Route path="/anecdotes">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path="/create" >
          <CreateNew addNew={addNew} showNotification={showNotification} />
        </Route>
      </Switch>
      <Footer />
    </>
  )
}

export default App;
