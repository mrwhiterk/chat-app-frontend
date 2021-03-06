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

  let isMsgOwner =
    !disabled &&
    context.user &&
    props.message.author &&
    context.user._id === props.message.author._id
      ? 'myMsg'
      : ''
  return (
    <div className={`msg ${isMsgOwner}`}>
      <img
        className='messageAvatar'
        src={
          props.message.author 
                ? props.message.author.photo || '/animal-15-512.png'
            : '/animal-15-512.png'
        }
        alt='profile avatar'
      ></img>
      <div className='messageTextBoard'>
        <div className='usernameInMsg'>
          {props.message.author
            ? props.message.author.username
            : '-user removed-'}
        </div>
        <div className='msgTxt'>{props.message.body}</div>
        <div className='msgSent'>{props.message.created}</div>
      </div>
    </div>
  )
}

export default Message
