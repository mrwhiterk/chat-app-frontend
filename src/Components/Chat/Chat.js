import React, { Component } from 'react'
import ChatBoard from './ChatBoard/ChatBoard'
import ChatSidebar from './ChatSidebar/ChatSidebar'
import socketIOClient from 'socket.io-client'
import moment from 'moment'
import Context from '../Context/Context'
import { checkTokenAndReturn } from '../../api/axios-helpers'
import './Chat.css'

class Chat extends Component {
  static contextType = Context

  render() {
    return (
      <div className="chatMain">
        <ChatBoard
          createMessage={this.context.createMessage}
          messages={this.context.messages}
        />

        <ChatSidebar users={this.context.users} />
      </div>
    )
  }
}

export default Chat
