import React, { Component } from 'react'
import Nav from './components/Nav/Nav'
import Chat from './components/Chat/Chat'
import moment from 'moment'
import './App.css'
import socketIOClient from 'socket.io-client'
import {
  checkTokenAndReturn,
  getMessages,
  setAuthHeader
} from './api/axios-helpers'
import Context from './components/Context/Context'

let endpoint = 'http://127.0.0.1:3001'

class App extends Component {
  static contextType = Context

  state = {
    isAuth: false,
    user: checkTokenAndReturn(),
    messages: [],
    users: [],
    toastMsg: {
      success: null,
      error: null
    }
  }

  componentDidMount() {
    if (this.state.user) {
      this.setState({ isAuth: true })
    }

    this.socket = socketIOClient(endpoint)

    this.socket.emit('getUsers')

    this.socket.on('chatroomUsers', users => {
      this.setState({ users: users })
    })

    this.socket.on('chat', message => {
      this.setState({ messages: [...this.state.messages, message] })
    })
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

  setAuth = user => {
    this.setState({
      isAuth: true,
      user: user
    })
    if (!this.state.users.find(user => user._id === this.state.user)) {
      this.socket.emit('sendUserToServer', this.state.user)
    }
  }

  removeAuth = () => {
    this.setState({ isAuth: false })
    localStorage.removeItem('token')
  }

  logout = () => {
    setAuthHeader(null)
    this.socket.emit('removeUserFromActiveChat', this.state.user)
    this.removeAuth()
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

  handleToast = (successMsg, errorMsg) => {
    this.setState({
      toastMsg: {
        success: successMsg,
        error: errorMsg
      }
    })
  }

  render() {
    let contextPayload = {
      isAuth: this.state.isAuth,
      user: this.state.user,
      setAuth: this.setAuth,
      removeAuth: this.removeAuth,
      getMessages: this.getMessages,
      logout: this.logout,
      handleToast: this.handleToast,
      toastMsg: this.state.toastMsg,
      messages: this.state.messages,
      users: this.state.users,
      createMessage: this.createMessage
    }
    return (
      <>
        <Context.Provider value={contextPayload}>
          <div className="App">
            <Nav />
            <Chat />
          </div>
        </Context.Provider>
      </>
    )
  }
}

export default App
