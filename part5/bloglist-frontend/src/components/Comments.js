import React from 'react'

const Comments = ({ comments }) => {
  return (
    <>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </>
  )
}

export default Comments