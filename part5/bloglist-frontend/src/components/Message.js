import React from 'react'

const Message = ({ message }) => {
    let messageStyle
    (message.type === "success") ?
        messageStyle = {
            color: "black",
            background: "green",
            fontSize: 20,
            fontStyle: 'italic',
            borderRadius: 10,
            borderStyle: 'solid',
            padding: 10,
            margin: 10,
        } :
        messageStyle = {
            color: "white",
            background: "red",
            fontSize: 20,
            fontStyle: 'italic',
            borderRadius: 10,
            borderStyle: 'solid',
            padding: 10,
            margin: 10,
        }
    return (
        (message.type !== "success" && message.type !== "error") ?
            null :
            (
                <div style={messageStyle}>
                    {message.text}
                </div>
            )
    )

}

export default Message