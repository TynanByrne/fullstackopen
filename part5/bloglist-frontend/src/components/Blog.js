import React from 'react'
import { Link } from 'react-router-dom'
const Blog = ({ blog }) => {
  return (
      <div className='listedBlog'>
        <Link to={`/blogs/${blog.id}`} >{blog.title} by {blog.author}</Link>
      </div>
  )
}

export default Blog
