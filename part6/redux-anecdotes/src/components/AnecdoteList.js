import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'



const AnecdoteList = () => {
  const filterTerm = useSelector(state => state.filter.filterTerm)
  const anecdotes = useSelector(state => state.anecdotes)
  console.log(anecdotes)
  const anecdotesToShow = anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(filterTerm.toUpperCase()))
  const dispatch = useDispatch()

  const voteFor = (anecdote, message, timeout) => {
    console.log('vote', anecdote.id)
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(message, timeout))
  }
  
  return (
    <>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteFor(anecdote, `You voted for "${anecdote.content}"`, 3)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList