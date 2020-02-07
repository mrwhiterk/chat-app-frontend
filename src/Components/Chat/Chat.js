import React, { Component } from 'react'
import ChatBoard from './ChatBoard/ChatBoard'
import ChatSidebar from './ChatSidebar/ChatSidebar'
import socketIOClient from 'socket.io-client'
import moment from 'moment'
// import Context from '../Context/Context'
import { checkTokenAndReturn } from '../../api/axios-helpers'
import './Chat.css'

let endpoint = 'http://127.0.0.1:3001'

export default class Chat extends Component {
  state = {
    messages: [],
    users: []
  }

  componentDidMount() {
    this.socket = socketIOClient(endpoint)

    this.socket.on('chat', socket => {
      this.setState({ messages: [...this.state.messages, socket] })
    })
  }

  createMessage = formData => {
    let user = checkTokenAndReturn()

    if (user) {
      let date = new Date()
      let message = {
        ...formData,
        author: user._id,
        created: moment().format('LT')
      }

      this.socket.emit('createMessage', message)
      // this.setState({ messages: [...this.state.messages, message] })
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
        <ChatSidebar />
      </div>
    )
  }
}
