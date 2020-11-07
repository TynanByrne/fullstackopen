import { List, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'

const Comments = ({ comments }) => {
  return (
    <>
      <List>
        {comments.map(comment => (
          <ListItem>
            <ListItemText key={comment.id}>{comment.content}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default Comments