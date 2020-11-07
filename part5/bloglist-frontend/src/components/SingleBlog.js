import React from 'react'
import CreateComment from './CreateComment'
import Comments from './Comments'

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
          <button id="delete" type="button" onClick={() => {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
              handleDelete(blog)
            }
          }}>
            Delete
          </button>
        </>
      )
    }
  }

  return (
    <>
      <h1>{blog.title}</h1>
      <p>{blog.likes} likes<button id='like' onClick={handleLike}>like</button></p>
      <p> added by {blog.user.name}</p>
      <h4>Comments</h4>
      <CreateComment blog={blog} user={user} dispatch={dispatch} />
      <Comments comments={blog.comments} />
      {allowDelete()}
    </>
  )
}

export default SingleBlog