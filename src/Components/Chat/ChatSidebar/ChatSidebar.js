import React, { Component } from 'react'
import ChatUserList from './ChatUserList/ChatUserList'

export default class ChatSidebar extends Component {
  render() {
    return (
      <div className="inChat">
        <div className="onlineTitle">In chat</div>
        <ChatUserList users={this.props.users} />
      </div>
    )
  }
}
