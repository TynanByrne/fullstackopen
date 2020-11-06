import React from 'react'
import useField from '../hooks/useField'
import commentService from '../services/comments'

const CreateComment = ({ blog }) => {
  const { reset: resetComment, ...commentInput } = useField('text')

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    sendComment({
      content: commentInput.value
    }, blog)
  }

  const sendComment = async (comment, blog) => {
    try {
      const savedComment = commentService.createComment(comment, blog)
      resetComment()
      console.log(savedComment)
    } catch (error) {
      resetComment()
      console.error(error)
    }
  }
  return (
    <>
      <form onSubmit={handleCommentSubmit}>
        <input {...commentInput} />
        <button type='submit'>Add comment</button>
      </form>
    </>
  )
}

export default CreateComment