import React, { useState } from 'react'
import useField from '../hooks/useField'

const CreateBlog = ({ loggedInUser }) => {
  
  const { reset: resetTitle, ...titleInput } = useField('text')
  const { reset: resetAuthor, ...authorInput } = useField('text')
  const { reset: resetUrl, ...urlInput } = useField('text')

  const resetBlog = () => {
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: titleInput.value,
      author: authorInput.value,
      url: urlInput.value
    })
  }

  const createBlog = async (blogObject) => {
    try {
      blogService.setToken(loggedInUser.token)
      dispatch(createBlog(blogObject, loggedInUser))
      createBlogRef.current.toggleVisibility()
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
    <form onSubmit={addBlog}>
      <div>
        title: <input
          id="title"
          {...titleInput}
          placeholder="Title" />
      </div>
      <div>
        author: <input
          id="author"
          {...authorInput}
          placeholder="Author" />
      </div>
      <div>
        url: <input
          id="url"
          {...urlInput}
          placeholder="url" />
      </div>
      <button id="submit" type="submit">create</button>
    </form>
  )
}

export default CreateBlog