import React from 'react'

const User = ({ user }) => {
  return (
    <>
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(x => (
          <li key={x.id}>{x.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User