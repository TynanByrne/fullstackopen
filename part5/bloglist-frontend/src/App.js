import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs, createBlog, compare, deleteBlog, updateBlog } from './reducers/blogsReducer'
import { loginFromLocalStorage, logoutUser, loginUser } from './reducers/loginReducer'
import useField from './hooks/useField'

const App = () => {

  const { reset: resetTitle, ...titleInput } = useField('text')
  const { reset: resetAuthor, ...authorInput } = useField('text')
  const { reset: resetUrl, ...urlInput } = useField('text')

  const dispatch = useDispatch()

  const resetBlog = () => {
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  useEffect(() => {
    dispatch(loginFromLocalStorage())
    dispatch(getBlogs())
  }, [dispatch])

  const createBlogRef = useRef()
  const loggedInUser = useSelector(state => state.login)

  
  
  const handleUpdate = async (blog) => {
    try {
      blogService.setToken(loggedInUser.token)
      dispatch(updateBlog(blog))
      dispatch(setNotification('Liked!', 'success', 4))
    } catch (exception) {
      console.error(exception.response.data)
      dispatch(setNotification('Could not like.', 'error', 4))
    }
  }
  const handleDelete = async (blog) => {
    try {
      blogService.setToken(loggedInUser.token)
      dispatch(deleteBlog(blog))
      dispatch(setNotification('Blog successfully deleted', 'success', 4))
    } catch (exception) {
      console.error(exception)
      dispatch(setNotification('Blog could not be deleted', 'error', 5))
    }
  }

  const b = useSelector(state => state.blogs)

  if (loggedInUser === null) {
    return (
      <div>
        <Message />
        <h2>Log in to application</h2>
        <Login dispatch={dispatch} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Message />
      <p>
        {`${loggedInUser.name} logged in`} <button onClick={() => {
          dispatch(logoutUser())
          dispatch(setNotification('Logged out', 'success', 5))
        }} >Log out</button>
      </p>
      <Togglable buttonLabel={'new blog'} ref={createBlogRef}>
        <h2>Create new</h2>
        <CreateBlog createBlog={addBlog} loggedInUser={loggedInUser} />
      </Togglable>
      {b.sort(compare).map(blog =>
        <Blog key={blog.id} blog={blog} user={loggedInUser} handleDelete={handleDelete}
          handleUpdate={handleUpdate} />
      )}
    </div>
  )
}

export default App