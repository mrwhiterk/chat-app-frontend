import React, { Component } from 'react'
import ChatBoard from './ChatBoard/ChatBoard'
import ChatSidebar from './ChatSidebar/ChatSidebar'
import socketIOClient from 'socket.io-client'
import moment from 'moment'
import Context from '../Context/Context'
import {
  checkTokenAndReturn,
  getChannelUsers,
  getChannelMessages
} from '../../api/axios-helpers'
import './Chat.css'

let endpoint = 'http://127.0.0.1:3001'

class Chat extends Component {
  static contextType = Context

  state = {
    messages: [],
    users: [],
    room: this.props.match.params.name || 'General'
  }

  componentDidUpdate = prevProps => {
    if (this.props.match.params.name !== prevProps.match.params.name) {
      this.socket.disconnect()
      this.setState({ room: this.props.match.params.name }, () => {
        this.createSocket()
      })
    }
  }

  componentDidMount() {
    this.createSocket()
  }

  createSocket = async () => {
    console.log('38: create socket')
    try {
      console.log('room ', this.state.room)
      let response = await getChannelUsers(this.state.room)
      console.log(response)

      this.setState(
        {
          users: response.data.liveMembers,
          messages: response.data.messages,
          roomId: response.data._id
        },
        () => {
          console.log(this.state)
        }
      )
    } catch (error) {
      console.log(error)
    }

    this.socket = socketIOClient(endpoint)

    console.log('new connection created')

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
      let response = await getChannelMessages()

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
      this.socket.emit('sendUserToServer', this.context.user, this.state.room)
    }
  }

  removeLiveMember = () => {
    this.socket.emit(
      'removeUserFromActiveChat',
      this.context.user,
      this.state.room
    )
  }

  // initialConnect = () => {
  //   let user = checkTokenAndReturn()

  //   if (user) {
  //     let message = {
  //       body: `${user.username} has joined @${this.state.room}`,
  //       author: user._id,
  //       created: moment().format('LT'),
  //       channel: this.state.roomId
  //     }

  //     this.socket.emit('createMessage', message)
  //     return message
  //   } else {
  //     return false
  //   }
  // }

  // terminateConnect = () => {
  //   let { user } = this.context

  //   if (user) {
  //     let message = {
  //       body: `${user.username} has left @${this.state.room}`,
  //       author: user._id,
  //       created: moment().format('LT'),
  //       channel: this.state.roomId
  //     }

  //     this.socket.emit('createMessage', message)
  //   }
  // }

  createMessage = formData => {
    let user = checkTokenAndReturn()

    if (user) {
      let message = {
        ...formData,
        author: user._id,
        created: moment().format('LT'),
        channel: this.state.roomId
      }
      this.socket.emit('createMessage', message)
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
          roomTitle={this.props.match.params.name}
        />

        <ChatSidebar users={this.state.users} />
      </div>
    )
  }
}

export default Chat
