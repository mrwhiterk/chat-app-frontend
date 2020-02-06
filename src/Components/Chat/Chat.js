import React, { Component } from 'react'
import ChatBoard from './ChatBoard/ChatBoard'
import ChatSidebar from './ChatSidebar/ChatSidebar'
import socketIOClient from 'socket.io-client'
import './Chat.css'

export default class Chat extends Component {
  state = {
    responses: [],
    message: 'hey',
    endpoint: 'http://127.0.0.1:3001'
  }

  componentDidMount() {
    const { endpoint } = this.state
    console.log(endpoint)

    const socket = socketIOClient(endpoint)

    socket.emit('message', this.state.message)
  }

  render() {
    return (
      <div className="chatMain">
        <ChatBoard />
        <ChatSidebar />
      </div>
    )
  }
}
