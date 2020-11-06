import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, compare, handleDelete, handleUpdate, user }) => {

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