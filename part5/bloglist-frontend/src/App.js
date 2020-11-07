import React, { useEffect, useRef } from 'react'
import {
  Switch, Route, useHistory, Link
} from 'react-router-dom'
import {
  AppBar, Container, IconButton, Toolbar, Button
} from '@material-ui/core'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Message from './components/Message'
import UserList from './components/UserList'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs, compare, deleteBlog, updateBlog } from './reducers/blogsReducer'
import { loginFromLocalStorage, logoutUser } from './reducers/loginReducer'
import { allUsers } from './reducers/usersReducer'
import useMatchedHook from './hooks/useMatchedHook'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(loginFromLocalStorage())
    const fetchBlogs = async () => dispatch(getBlogs())
    const fetchUsers = async () => dispatch(allUsers())
    fetchBlogs()
    fetchUsers()
  }, [dispatch])

  const createBlogRef = useRef()
  const loggedInUser = useSelector(state => state.login)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const user = useMatchedHook('/users/:id', users)
  const blog = useMatchedHook('/blogs/:id', blogs)

  const handleUpdate = async (blog, user) => {
    try {
      blogService.setToken(loggedInUser.token)
      dispatch(updateBlog(blog, user))
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
      history.push('/')
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
    <Container>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
          </IconButton>
          <Button color='inherit' component={Link} to='/'>home</Button>
          <Button color='inherit' component={Link} to='/users'>users</Button>
          {`${loggedInUser.name} logged in`} <Button onClick={() => {
            dispatch(logoutUser())
            dispatch(setNotification('Logged out', 'success', 5))
          }} >Log out</Button>
        </Toolbar>
      </AppBar>
      <h1>Blog app</h1>
      <Switch>
        <Route path='/users/:id'>
          <h2>User</h2>
          <User user={user} />
        </Route>
        <Route path='/users'>
          <h2>Users</h2>
          <UserList dispatch={dispatch} users={users} />
        </Route>
        <Route path='/blogs/:id'>
          <Message />
          <SingleBlog blog={blog} handleDelete={handleDelete} handleUpdate={handleUpdate} user={loggedInUser} dispatch={dispatch} />
        </Route>
        <Route path='/'>
          <h2>blogs</h2>
          <Message />
          <Togglable buttonLabel={'new blog'} ref={createBlogRef}>
            <h2>Create new</h2>
            <CreateBlog loggedInUser={loggedInUser} dispatch={dispatch} />
          </Togglable>
          <BlogList blogs={blogs} handleDelete={handleDelete} handleUpdate={handleUpdate} compare={compare} user={loggedInUser} />
        </Route>
      </Switch>
    </Container>
  )
}

export default App