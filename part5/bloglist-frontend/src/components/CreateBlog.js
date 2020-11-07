import React from 'react'
import useField from '../hooks/useField'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { createBlog } from '../reducers/blogsReducer'
import { Button, TextField } from '@material-ui/core'

const CreateBlog = ({ loggedInUser, dispatch }) => {
  
  const { reset: resetTitle, ...titleInput } = useField('text')
  const { reset: resetAuthor, ...authorInput } = useField('text')
  const { reset: resetUrl, ...urlInput } = useField('text')

  const resetBlog = () => {
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    sendBlog({
      title: titleInput.value,
      author: authorInput.value,
      url: urlInput.value
    })
  }

  const sendBlog = async (blogObject) => {
    try {
      blogService.setToken(loggedInUser.token)
      dispatch(createBlog(blogObject, loggedInUser))
      resetBlog()
      dispatch(setNotification(`A new blog: ${blogObject.title} by ${blogObject.author}`, 'success', 5))
      console.log('Blog created')
    } catch (exception) {
      console.error(exception)
      resetBlog()
      dispatch(setNotification('Blog could not be created', 'error', 5))
    }
  }

  

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        <TextField
          label='title'
          id="title"
          {...titleInput}
          placeholder="Title" />
      </div>
      <div>
        <TextField
          label='author'
          id="author"
          {...authorInput}
          placeholder="Author" />
      </div>
      <div>
        <TextField
          label='url'
          id="url"
          {...urlInput}
          placeholder="url" />
      </div>
      <Button id="submit" type="submit">create</Button>
    </form>
  )
}

export default CreateBlog