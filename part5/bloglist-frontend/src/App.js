import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
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
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
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
  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.postNew({
        title, author, url
      })
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
      <h2>Create new</h2>
      <CreateBlog onSubmit={handleCreateBlog} title={title} author={author}
        url={url} handleUrlChange={handleUrlChange} handleAuthorChange={handleAuthorChange}
        handleTitleChange={handleTitleChange} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App