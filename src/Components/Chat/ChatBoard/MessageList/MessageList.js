import React from 'react'
import Message from './Message/Message'
import Spinner from '../../../UI/Spinner/Spinner'

export default function MessageList(props) {
  let messageList

  if (props.messages) {
    messageList = props.messages.map((messageProps, i) => (
      <Message key={i} message={messageProps}></Message>
    ))
    
  } else {
    messageList = <Spinner />
  }

  return (
    <div className='messageList'>
      <div id='userTyping'>{props.onTypingMessage}</div>
      <div className='messageList2'>{messageList}</div>
    </div>
  )
}
