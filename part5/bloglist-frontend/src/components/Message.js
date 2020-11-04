import React from 'react'
import { useSelector } from 'react-redux'

const Message = () => {
  const message = useSelector(state => state.notification)
  let messageStyle
  (message.type === 'success') ?
    messageStyle = {
      color: 'black',
      background: 'green',
      fontSize: 20,
      fontStyle: 'italic',
      borderRadius: 10,
      borderStyle: 'solid',
      padding: 10,
      margin: 10,
    } :
    messageStyle = {
      color: 'white',
      background: 'red',
      fontSize: 20,
      fontStyle: 'italic',
      borderRadius: 10,
      borderStyle: 'solid',
      padding: 10,
      margin: 10,
    }
  return (
    (message.type !== 'success' && message.type !== 'error') ?
      null :
      (
        <div style={messageStyle}>
          {message.message}
        </div>
      )
  )

}

export default Message