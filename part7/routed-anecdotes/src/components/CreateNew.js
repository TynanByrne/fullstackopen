import React from 'react'
import { useField } from '../hooks'
import { useHistory } from 'react-router-dom'

const CreateNew = ({ addNew, showNotification}) => {
  const { reset: contentReset, ...content } = useField('content')
  const { reset: authorReset, ...author } = useField('author')
  const { reset: infoReset, ...info } = useField('info')

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/anecdotes')
    showNotification(`A new anecdote "${content.value}" created!`)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={() => {
          contentReset()
          authorReset()
          infoReset()
        }}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew