import React, { Component } from 'react'
import ChatBoard from './ChatBoard/ChatBoard'
import ChatSidebar from './ChatSidebar/ChatSidebar'
import socketIOClient from 'socket.io-client'
import moment from 'moment'
import Context from '../Context/Context'
import { checkTokenAndReturn, getMessages } from '../../api/axios-helpers'
import './Chat.css'

let endpoint = 'http://127.0.0.1:3001'

class Chat extends Component {
  static contextType = Context

  state = {
    messages: [],
    users: [],
    room: 'general'
  }

  componentDidMount() {
    this.socket = socketIOClient(endpoint)

    this.socket.emit('getUsers')

    this.socket.on('chatroomUsers', users => {
      this.setState({ users: users })
    })

    this.socket.on('chat', message => {
      console.log(message)
      this.setState({ messages: [...this.state.messages, message] })
    })
  }

  getMessages = async () => {
    try {
      let response = await getMessages()

      if (response.status === 200) {
        this.setState({ messages: response.data })
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  addLiveMember = () => {
    if (
      this.context.user &&
      !this.state.users.find(user => user._id === this.context.user)
    ) {
      this.socket.emit('sendUserToServer', this.context.user)
    }
  }

  removeLiveMember = () => {
    this.socket.emit('removeUserFromActiveChat', this.context.user)
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
    if (this.context.loginPayload) {
      this.addLiveMember(this.context.loginPayload)
      this.context.resetLoginPayload()
    }
    if (this.context.logoutPayload) {
      this.removeLiveMember(this.context.logoutPayload)
      this.context.resetLogoutPayload()
    }

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
