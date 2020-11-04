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
import { getBlogs, createBlog, compare } from './reducers/blogsReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const createBlogRef = useRef()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification(`Logged in as ${user.username}`, 'success', 4))
      console.log('logged in')
    } catch (exception) {
      console.error(exception)
      setUsername('')
      setPassword('')
      dispatch(setNotification('Wrong username or password', 'error', 3))
    }
  }
  const addBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      /* const blog = await blogService.postNew(blogObject) */
      dispatch(createBlog(blogObject))
      createBlogRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
      // FIX THIS TO HAVE THE PROPER BLOG BACK!
      dispatch(setNotification(`A new blog: ${blogObject.title} by ${blogObject.author}`, 'success', 5))
      console.log('Blog created')
    } catch (exception) {
      console.error(exception)
      setUrl('')
      setAuthor('')
      setTitle('')
      dispatch(setNotification('Blog could not be created', 'error', 5))
    }
  }
  const updateBlog = async (blog) => {
    try {
      await blogService.updateBlog(blog)
      setBlogs(blogs.map(x => (x.id === blog.id) ? { ...x, likes: x.likes + 1 } : x))
      dispatch(setNotification('Liked!', 'success', 4))
    } catch (exception) {
      console.error(exception.response.data)
      dispatch(setNotification('Could not like.', 'error', 4))
    }
  }
  const deleteBlog = async (blog) => {
    try {
      blogService.setToken(user.token)
      await blogService.deleteBlog(blog)
      setBlogs(blogs.filter(x => x.id !== blog.id))
      dispatch(setNotification('Blog successfully deleted', 'success'))
    } catch (exception) {
      console.error(exception)
      dispatch(setNotification('Blog could not be deleted', 'error', 5))
    }
  }

  const b = useSelector(state => state.blogs)

  if (user === null) {
    return (
      <div>
        <Message />
        <h2>Log in to application</h2>
        <Login onSubmit={handleLogin} password={password} username={username}
          handlePasswordChange={handlePasswordChange} handleUsernameChange={handleUsernameChange} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Message />
      <p>
        {`${user.name} logged in`} <button onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          setUser(null)
          dispatch(setNotification('Logged out', 'success', 5))
        }} >Log out</button>
      </p>
      <Togglable buttonLabel={'new blog'} ref={createBlogRef}>
        <h2>Create new</h2>
        <CreateBlog createBlog={addBlog} user={user} />
      </Togglable>
      {b.sort(compare).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} deleteBlog={deleteBlog}
          updateBlog={updateBlog} />
      )}
    </div>
  )
}

export default App