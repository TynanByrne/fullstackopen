import React from 'react'
import useField from '../hooks/useField'
import commentService from '../services/comments'
import { addComment } from '../reducers/blogsReducer'
import { Button, TextField } from '@material-ui/core'

const CreateComment = ({ blog, user, dispatch }) => {
  const { reset: resetComment, ...commentInput } = useField('text')

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    sendComment({
      content: commentInput.value
    }, blog)
  }

  const sendComment = async (comment, blog) => {
    try {
      const savedComment = await commentService.createComment(comment, blog)
      resetComment()
      dispatch(addComment(blog, comment, user))
      console.log(savedComment)
    } catch (error) {
      resetComment()
      console.error(error)
    }
  }
  return (
    <>
      <form onSubmit={handleCommentSubmit}>
        <TextField label='add comment' {...commentInput} />
        <Button  color='primary' type='submit'>Add comment</Button>
      </form>
    </>
  )
}

export default CreateComment