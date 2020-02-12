import React, { Component } from 'react'
import Nav from './components/Nav/Nav'
import Chat from './components/Chat/Chat'
import moment from 'moment'
import './App.css'
// import socketIOClient from 'socket.io-client'
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
    toastMsg: {
      success: null,
      error: null
    },
    loginPayload: null,
    logoutPayload: null
  }

  resetLoginPayload = () => {
    this.setState({ loginPayload: null })
  }
  resetLogoutPayload = () => {
    this.setState({ logoutPayload: null })
  }

  componentDidMount() {
    if (this.state.user) {
      this.setState({ isAuth: true })
    }
  }

  setAuth = user => {
    this.setState({
      isAuth: true,
      user: user,
      loginPayload: user
    })
  }

  removeAuth = () => {
    this.setState({ isAuth: false })
    localStorage.removeItem('token')
  }

  logout = () => {
    setAuthHeader(null)
    this.setState({ logoutPayload: this.state.user })
    this.removeAuth()
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
      logout: this.logout,
      handleToast: this.handleToast,
      toastMsg: this.state.toastMsg,
      createMessage: this.createMessage,
      loginPayload: this.state.loginPayload,
      logoutPayload: this.state.logoutPayload,
      resetLoginPayload: this.resetLoginPayload,
      resetLogoutPayload: this.resetLogoutPayload
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
