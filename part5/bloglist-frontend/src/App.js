import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState({ text: null, type: '' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const notification = (message, type) => {
    setMessage({ text: message, type: type })
    setTimeout(() => {
      setMessage({ text: null, type: '' })
    }, 3000)
  }

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
      notification(`Logged in as ${user.username}`, 'success')
      console.log('logged in')
    } catch (exception) {
      console.error(exception)
      setUsername('')
      setPassword('')
      notification('Wrong username or password', 'error')
    }
  }
  const addBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      const blog = await blogService.postNew(blogObject)
      createBlogRef.current.toggleVisibility()
      blogService.getAll().then(blogs => setBlogs(blogs))
      setTitle('')
      setAuthor('')
      setUrl('')
      notification(`A new blog: ${blog.title} by ${blog.author}`, 'success')
      console.log('Blog created')
    } catch (exception) {
      console.error(exception)
      setUrl('')
      setAuthor('')
      setTitle('')
      notification('Blog could not be created', 'error')
    }
  }
  const updateBlog = async (blog) => {
    try {
      await blogService.updateBlog(blog)
      setBlogs(blogs.map(x => (x.id === blog.id) ? { ...x, likes: x.likes + 1 } : x))
      notification('Liked!', 'success')
    } catch (exception) {
      console.error(exception.response.data)
      notification('Could not like.', 'error')
    }
  }
  const deleteBlog = async (blog) => {
    try {
      blogService.setToken(user.token)
      await blogService.deleteBlog(blog)
      setBlogs(blogs.filter(x => x.id !== blog.id))
      notification('Blog successfully deleted', 'success')
    } catch (exception) {
      console.error(exception)
      notification('Blog could not be deleted', 'error')
    }
  }
  const compare = (a, b) => {
    if (a.likes < b.likes) {
      return 1
    }
    if (a.likes > b.likes) {
      return -1
    }
    return 0
  }

  if (user === null) {
    return (
      <div>
        <Message message={message} />
        <h2>Log in to application</h2>
        <Login onSubmit={handleLogin} password={password} username={username}
          handlePasswordChange={handlePasswordChange} handleUsernameChange={handleUsernameChange} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Message message={message} />
      <p>
        {`${user.name} logged in`} <button onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          setUser(null)
          notification('Logged out', 'success')
        }} >Log out</button>
      </p>
      <Togglable buttonLabel={'new blog'} ref={createBlogRef}>
        <h2>Create new</h2>
        <CreateBlog createBlog={addBlog} user={user} />
      </Togglable>
      {blogs.sort(compare).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} deleteBlog={deleteBlog}
          updateBlog={updateBlog} />
      )}
    </div>
  )
}

export default App