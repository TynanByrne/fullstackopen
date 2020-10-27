import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdoteService'



const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const text = event.target.text.value
    event.target.text.value = ''
    const anecdoteToAdd = await anecdoteService.createNew(text)
    dispatch(newAnecdote(text))
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

export default AnecdoteForm