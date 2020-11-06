import React, { useEffect, useRef } from 'react'
import {
  Switch, Route, Link
} from 'react-router-dom'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Message from './components/Message'
import UserList from './components/UserList'
import User from './components/User'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs, compare, deleteBlog, updateBlog } from './reducers/blogsReducer'
import { loginFromLocalStorage, logoutUser } from './reducers/loginReducer'
import { allUsers } from './reducers/usersReducer'
import useMatchedHook from './hooks/useMatchedHook'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loginFromLocalStorage())
    dispatch(getBlogs())
    dispatch(allUsers())
  }, [dispatch])

  const createBlogRef = useRef()
  const loggedInUser = useSelector(state => state.login)
  const users = useSelector(state => state.users)

  const user = useMatchedHook('/users/:id', users)
  console.log("user is", user)

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

  if (!loggedInUser) {
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
      <div>
        <Link to="/">home</Link>
        <br/>
        <Link to="/users">users</Link>
      </div>
        <Switch>
          <Route path='/users/:id'>
            <h2>User</h2>
            <User user={user} />
          </Route>
          <Route path='/users'>
            <h2>Users</h2>
            <UserList dispatch={dispatch} users={users} />
          </Route>
          <Route path='/'>
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
              <CreateBlog loggedInUser={loggedInUser} dispatch={dispatch} />
            </Togglable>
            <BlogList handleDelete={handleDelete} handleUpdate={handleUpdate} compare={compare} user={loggedInUser} />
          </Route>
        </Switch>
    </div>
  )
}

export default App