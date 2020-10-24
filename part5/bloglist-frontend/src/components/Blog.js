
import React, { useState } from 'react'
const Blog = ({ blog, user, deleteBlog, updateBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog, likes: blog.likes + 1, user: blog.user.id
    }
    console.log(updatedBlog)
    updateBlog(updatedBlog)
  }

  const allowDelete = () => {
    if (blog.user.username.toString() === user.username.toString()) {
      return (
        <>
          <button type="button" onClick={() => {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
              deleteBlog(blog)
            }
          }}>
            Delete
          </button>
        </>
      )
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    (visible) ?
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleVisiblity}>hide</button>
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes}<button onClick={handleLike}>like</button></p>
          <p>{blog.user.name}</p>
          {allowDelete()}
        </div>
      </div> :
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleVisiblity}>view</button>
      </div>
  )
}

export default Blog