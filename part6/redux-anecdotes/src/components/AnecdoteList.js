import React from 'react'
import { connect } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'



const AnecdoteList = (props) => {
  const anecdotesToShow = props.anecdotes

  const voteFor = (anecdote, message, timeout) => {
    console.log('vote', anecdote.id)
    props.updateAnecdote(anecdote)
    props.setNotification(message, timeout)
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
            <button onClick={() => voteFor(anecdote, `You voted for "${anecdote.content}"`, 4)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(state.filter.filterTerm.toUpperCase()))
  }
}

const mapDispatchToProps = {
  updateAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList