import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const text = event.target.text.value
    event.target.text.value = ''
    props.createAnecdote(text)
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="text" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

const ConnectedAnecdoteForm = connect(
  null,
  { createAnecdote }
)(AnecdoteForm)

export default ConnectedAnecdoteForm