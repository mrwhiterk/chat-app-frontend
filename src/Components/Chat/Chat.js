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

    this.socket.emit('getChatroomUsers')

    this.socket.on('chatroomUsers', socket => {
      this.setState({ users: socket })
    })

    if (this.context.user) {
      this.socket.emit('sendUserToServer', this.context.user)
    }

    this.socket.on('chat', socket => {
      this.setState({ messages: [...this.state.messages, socket] })
    })
  }

  handleClick = () => {
    console.log('my this ', this)
    this.socket.emit('test')
  }

  disconnectUser = user => {
    this.setState({
      users: this.state.users.filter(user => this.context.user._id !== user._id)
    })
    this.socket.disconnect()
  }

  connectUser = user => {
    if (!this.state.users.find(user => user._id === this.context.user._id)) {
      this.socket.emit('sendUserToServer', this.context.user)
      this.setState({ users: [...this.state.users, this.context.user] })
    }
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
    if (this.context.userLoggedOut) {
      this.disconnectUser()
      this.context.resetUserLoggedOut()
    }

    if (this.context.userLoggedIn) {
      this.connectUser()
      this.context.resetUserLoggedIn()
    }

    return (
      <div className="chatMain">
        <ChatBoard
          createMessage={this.createMessage}
          messages={this.state.messages}
        />

        <button onClick={this.handleClick}>click</button>

        <ChatSidebar users={this.state.users} />
      </div>
    )
  }
}

export default Chat
