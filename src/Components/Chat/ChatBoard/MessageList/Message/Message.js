import React, { useContext, useEffect, useState } from 'react'
import Context from '../../../../Context/Context'

const Message = props => {
  const context = useContext(Context)

  const [disabled, setDisabled] = useState(null)

  useEffect(() => {
    if (context.logoutPayload) {
      setDisabled(true)
    }

    if (context.loginPayload) {
      setDisabled(false)
    }
  })
  console.log(context.user)

  let isMsgOwner =
    !disabled &&
    context.user &&
    props.message.author &&
    context.user._id === props.message.author._id
      ? 'myMsg'
      : ''
  return (
    <div className={`msg ${isMsgOwner}`}>
      <div className="usernameInMsg">
        {props.message.author
          ? props.message.author.username
          : '-user removed-'}
      </div>
      <div className="msgTxt">{props.message.body}</div>
      <div className="msgSent">{props.message.created}</div>
    </div>
  )
}

export default Message
