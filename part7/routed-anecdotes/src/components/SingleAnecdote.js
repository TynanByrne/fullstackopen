import React from 'react'
import { Link } from 'react-router-dom'

const SingleAnecdote = ({ anecdote }) => {
  return (
    <>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <Link to={`${anecdote.info}`}>{anecdote.info}</Link></div>
    </>
  )
}

export default SingleAnecdote