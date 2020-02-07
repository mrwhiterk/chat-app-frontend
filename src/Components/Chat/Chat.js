import React, { Component } from 'react'
import ChatBoard from './ChatBoard/ChatBoard'
import ChatSidebar from './ChatSidebar/ChatSidebar'
import socketIOClient from 'socket.io-client'
import moment from 'moment'
import Context from '../Context/Context'
import { checkTokenAndReturn } from '../../api/axios-helpers'
import './Chat.css'

let endpoint = 'http://127.0.0.1:3001'

class Chat extends Component {
  static contextType = Context

  state = {
    messages: [],
    users: []
  }

  componentDidMount() {
    this.socket = socketIOClient(endpoint)

    this.emitUser()

    this.socket.on('chat', socket => {
      this.setState({ messages: [...this.state.messages, socket] })
    })

    this.socket.on('broadcastUser', socket => {
      if (!this.state.users.find(user => user._id === socket._id)) {
        this.setState({ users: [...this.state.users, socket] })
      }
    })
  }

  emitUser = () => {
    if (this.context.user) {
      this.socket.emit('sendUserToServer', {
        username: this.context.user
      })
    }
  }

  componentDidUpdate = () => {
    this.emitUser()
  }

  createMessage = formData => {
    let user = checkTokenAndReturn()

    if (user) {
      let message = {
        ...formData,
        author: user._id,
        created: moment().format('LT')
      }

      this.socket.emit('createMessage', message)
      return message
    } else {
      return false
    }
  }

  render() {
    return (
      <div className="chatMain">
        <ChatBoard
          createMessage={this.createMessage}
          messages={this.state.messages}
        />
        <ChatSidebar users={this.state.users} />
      </div>
    )
  }
}

export default Chat
