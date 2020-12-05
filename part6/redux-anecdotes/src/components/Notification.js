import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!notification) {
    return null;
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