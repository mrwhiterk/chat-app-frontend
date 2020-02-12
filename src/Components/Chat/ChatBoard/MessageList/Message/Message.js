import React, { useContext } from 'react'
import Context from '../../../../Context/Context'

const Message = props => {
  const context = useContext(Context)

  let isMsgOwner =
    context.user && context.user._id === props.message.author._id ? 'myMsg' : ''
  return (
    <div className={`msg ${isMsgOwner}`}>
      <div className="usernameInMsg">{props.message.author.username}</div>
      <div className="msgTxt">{props.message.body}</div>
      <div className="msgSent">{props.message.created}</div>
    </div>
  )
}

export default Message
