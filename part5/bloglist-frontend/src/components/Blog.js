import React from 'react'
import { Link } from 'react-router-dom'
/* import PropTypes from 'prop-types' */
const Blog = ({ blog, user, handleDelete, handleUpdate }) => {
  /* Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    updateBlog: PropTypes.func.isRequired
  } */
  return (
      <div className='listedBlog'>
        <Link to={`/blogs/${blog.id}`} >{blog.title} by {blog.author}</Link>
      </div>
  )
}

export default Blog
