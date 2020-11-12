import React from 'react'

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return( 
    (notification.visible) ?
    <div style={style}>
      {notification.message}
    </div> :
    null
  )
}

export default Notification