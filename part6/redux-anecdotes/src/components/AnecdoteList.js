import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'



const AnecdoteList = () => {
  const filterTerm = useSelector(state => state.filter.filterTerm)
  const anecdotes = useSelector(state => state.anecdotes)
  console.log(anecdotes)
  const anecdotesToShow = anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(filterTerm.toUpperCase()))
  const dispatch = useDispatch()

  const voteFor = (id, message) => {
    console.log('vote', id)
    dispatch(vote(id))
    voteNotification(message)
  }

  const voteNotification = (message) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
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
            <button onClick={() => voteFor(anecdote.id, `You voted for "${anecdote.content}"`)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList