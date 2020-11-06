import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ compare, handleDelete, handleUpdate, user }) => {
  const blogs = useSelector(state => state.blogs)
  return (
    <>
      {blogs.sort(compare).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} handleDelete={handleDelete}
          handleUpdate={handleUpdate} />
      )}
    </>
  )
}

export default BlogList