
import React, { useState } from 'react'
import PropTypes from 'prop-types'
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
          <button id="delete" type="button" onClick={() => {
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

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    updateBlog: PropTypes.func.isRequired
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
      <div style={blogStyle} className='blogDetailed'>
        {blog.title} {blog.author} <button onClick={toggleVisiblity}>hide</button>
        <div>
          <p>{blog.url}</p>
          <p>likes <span id='likes'>{blog.likes}</span><button id='like' onClick={handleLike}>like</button></p>
          <p>{blog.user.name}</p>
          {allowDelete()}
        </div>
      </div> :
      <div style={blogStyle} className='blogCollapsed'>
        {blog.title} {blog.author} <button id="view" onClick={toggleVisiblity}>view</button>
      </div>
  )
}

export default Blog
