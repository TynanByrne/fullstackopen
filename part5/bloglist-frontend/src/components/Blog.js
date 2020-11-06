import React from 'react'
import { Link } from 'react-router-dom'
/* import PropTypes from 'prop-types' */
const Blog = ({ blog, user, handleDelete, handleUpdate }) => {
  /* const [visible, setVisible] = useState(false)

  const toggleVisiblity = () => {
    setVisible(!visible)
  } */

  

  

  /* Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    updateBlog: PropTypes.func.isRequired
  } */

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    /* (visible) ?
      <div style={blogStyle} className='blogDetailed'>
        {blog.title} {blog.author} <button onClick={toggleVisiblity}>hide</button>
        <div>
          <p>{blog.url}</p>
          <p>likes <span id='likes'>{blog.likes}</span><button id='like' onClick={handleLike}>like</button></p>
          <p> added by {blog.user.name}</p>
          {allowDelete()}
        </div>
      </div> : */
      <div style={blogStyle} className='listedBlog'>
        <Link to={`/blogs/${blog.id}`} >{blog.title} by {blog.author}</Link>
      </div>
  )
}

export default Blog
