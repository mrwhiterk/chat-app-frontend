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
    room: this.props.match.params.name || 'General',
    channel: null,
    onTypingMessage: ''
  }

  componentDidUpdate = prevProps => {
    if (this.props.match.params.name !== prevProps.match.params.name) {
      this.socket.disconnect()

      this.setState({ room: this.props.match.params.name }, () => {
        this.createSocket()
      })
    }
  }

  onChange = () => {
    this.socket.emit('onTyping', this.context.user)
  }

  componentDidMount() {
    this.createSocket()
  }

  createSocket = async () => {
    try {
      let response = await getChannelUsers(this.state.room)

      if (response.data) {
        this.setState({
          users: response.data.liveMembers,
          messages: response.data.messages.slice(-10),
          roomId: response.data._id,
          channel: response.data
        })
      }
    } catch (error) {
      console.log(error)
    }

    this.socket = socketIOClient(endpoint, {
      query: `roomName=${this.state.room}`
    })

    if (!this.state.channel) {
      this.socket.emit('createNewChannel')
    }

    if (localStorage.getItem('token')) {
      this.addLiveMember()
    }

    this.socket.on('chatroomUsers', (users, userId, isRemovingUser) => {
      this.setState({ users: users }, () => {
        if (isRemovingUser) {
          this.socket.disconnect()
          this.socket.off()
          this.createSocket()
        }
      })
    })

    this.socket.on('someoneTyping', username => {
      this.setState({ onTypingMessage: `${username} is typing..` }, () => {
        setTimeout(() => {
          this.setState({ onTypingMessage: '' })
        }, 1500)
      })
    })

    this.socket.on('chat', message => {
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
      !this.state.users.find(user => user._id === this.context.user._id)
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

    this.props.history.push('/channel/General')
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
      this.addLiveMember()
      this.context.resetLoginPayload()
    }

    if (this.context.logoutPayload) {
      this.removeLiveMember()
      this.context.resetLogoutPayload()
    }

    return (
      <div className="chatMain">
        <ChatBoard
          createMessage={this.createMessage}
          onTyping={this.onChange}
          onTypingMessage={this.state.onTypingMessage}
          messages={this.state.messages}
          roomTitle={this.props.match.params.name}
        />

        <ChatSidebar users={this.state.users} />
      </div>
    )
  }
}

export default Chat
