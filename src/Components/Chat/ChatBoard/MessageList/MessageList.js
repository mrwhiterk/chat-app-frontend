import React from 'react'
import Message from './Message/Message'

export default function MessageList(props) {
  let messageList

  if (props.messages) {
    messageList = props.messages.map((messageProps, i) => (
      <Message key={i} message={messageProps}></Message>
    ))
  }
  return <div className="messageList">{messageList}</div>
}
