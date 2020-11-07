import { Link } from '@material-ui/core'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
const Blog = ({ blog }) => {
  return (
      <div className='listedBlog'>
        <Link component={RouterLink} to={`/blogs/${blog.id}`} >{blog.title} by {blog.author}</Link>
      </div>
  )
}

export default Blog
