import React from 'react'
import ChatUser from './ChatUser/ChatUser'

function ChatUserList(props) {
  let userList = `-- no users --`

  if (props.users.length) {
    userList = props.users.map((user, i) => <ChatUser {...user} key={i} />)
  }

  return <div className="onlineUsersList">{userList}</div>
}

export default ChatUserList
