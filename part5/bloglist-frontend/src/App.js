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
  const [message, setMessage] = useState({ text: null, type: "" })

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
      setMessage({ text: `Logged in as ${user.username}`, type: "success" })
      setTimeout(() => {
        setMessage({ text: null, type: "" })
      }, 3000)
      console.log("logged in")
    } catch (exception) {
      console.error(exception)
      setUsername('')
      setPassword('')
      setMessage({ text: 'Wrong username or password', type: "error" })
      setTimeout(() => {
        setMessage({ text: null, type: "" })
      }, 3000)
    }
  }
  const addBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      const blog = await blogService.postNew(blogObject)
      createBlogRef.current.toggleVisibility()
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage({ text: `A new blog: ${blog.title} by ${blog.author}`, type: "success" })
      setTimeout(() => {
        setMessage({ text: null, type: "" })
      }, 3000)
      console.log('Blog created')
    } catch (exception) {
      console.error(exception)
      setUrl('')
      setAuthor('')
      setTitle('')
      setMessage({ text: `Blog could not be created`, type: "error" })
      setTimeout(() => {
        setMessage({ text: null, type: "" })
      }, 3000)
    }
  }
  const deleteBlog = async (blog) => {
    try {
      blogService.setToken(user.token)
      await blogService.deleteBlog(blog)
      setBlogs(blogs.filter(x => x._id !== blog._id))
      setMessage({ text: `Blog successfully deleted`, type: "success" })
      setTimeout(() => {
        setMessage({ text: null, type: "" })
      }, 3000)
    } catch (exception) {
      console.error(exception)
      setMessage({ text: `Blog could not be deleted`, type: "error" })
      setTimeout(() => {
        setMessage({ text: null, type: "" })
      }, 3000)
    }

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
          setMessage({ text: 'Logged out', type: "success" })
          setTimeout(() => {
            setMessage({ text: null, type: "" })
          }, 3000)
        }} >Log out</button>
      </p>
      <Togglable buttonLabel={"new blog"} ref={createBlogRef}>
        <h2>Create new</h2>
        <CreateBlog createBlog={addBlog} user={user} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App