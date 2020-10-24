import React, { useState } from 'react'

const CreateBlog = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title, author, url
    })
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  return (
    <form onSubmit={addBlog}>
      <div>
        title: <input
          value={title}
          onChange={handleTitleChange}
          placeholder="Title" />
      </div>
      <div>
        author: <input
          value={author}
          onChange={handleAuthorChange}
          placeholder="Author" />
      </div>
      <div>
        url: <input
          value={url}
          onChange={handleUrlChange}
          placeholder="url" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateBlog