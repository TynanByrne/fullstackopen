import React from 'react'

const CreateBlog = ({ onSubmit, title, handleUrlChange, handleTitleChange, handleAuthorChange, event, author, url}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        title: <input
          value={title}
          onChange={handleTitleChange} />
      </div>
      <div>
        author: <input
          value={author}
          onChange={handleAuthorChange} />
      </div>
      <div>
        url: <input
          value={url}
          onChange={handleUrlChange}
          />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateBlog