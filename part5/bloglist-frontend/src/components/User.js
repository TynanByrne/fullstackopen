import { List, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'

const User = ({ user }) => {
  return (
    <>
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      <List>
        {user.blogs.map(x => (
          <ListItem>
            <ListItemText key={x.id}>{x.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default User