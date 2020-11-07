import React from 'react'
import CreateComment from './CreateComment'
import Comments from './Comments'
import { Button } from '@material-ui/core'

const SingleBlog = ({ blog, handleUpdate, handleDelete, user, dispatch }) => {

  const handleLike = () => {
    const updatedBlog = {
      ...blog, likes: blog.likes + 1, user: blog.user.id
    }
    console.log(updatedBlog)
    handleUpdate(updatedBlog, user)
  }

  const allowDelete = () => {
    if (!blog.user.username) {
      return null
    }
    if (blog.user.username.toString() === user.username.toString()) {
      return (
        <>
          <Button variant='contained' id="delete" type="button" onClick={() => {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
              handleDelete(blog)
            }
          }}>
            Delete
          </Button>
        </>
      )
    }
  }

  return (
    <>
      <h1>{blog.title}</h1>
      <p>{blog.likes} likes<Button id='like' onClick={handleLike}>like</Button></p>
      <p> added by {blog.user.name}</p>
      <h4>Comments</h4>
      <CreateComment blog={blog} user={user} dispatch={dispatch} />
      <Comments comments={blog.comments} />
      {allowDelete()}
    </>
  )
}

export default SingleBlog