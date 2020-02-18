import React from 'react'
import ChatUser from './ChatUser/ChatUser'
import Spinner from '../../../UI/Spinner/Spinner'

function ChatUserList(props) {
  let userList = <Spinner />

  if (props.users) {
    userList = props.users.length
      ? props.users.map((user, i) => <ChatUser {...user} key={i} />)
      : `-- no users --`
  }

  return <div className="onlineUsersList">{userList}</div>
}

export default ChatUserList
