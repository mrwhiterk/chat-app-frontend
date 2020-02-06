import React, { Component } from 'react'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Chat from './components/Chat/Chat'
import './App.css'
import {
  checkTokenAndReturn,
  getMessages,
  setAuthHeader
} from './api/axios-helpers'

import Context from './components/Context/Context'

class App extends Component {
  static contextType = Context

  state = {
    isAuth: false,
    user: checkTokenAndReturn(),
    messages: null
  }

  componentDidMount() {
    if (this.state.user) {
      this.setState({ isAuth: true })
    }
  }

  setAuth = user => {
    this.setState({
      isAuth: true,
      user
    })
  }

  removeAuth = () => {
    this.setState({ isAuth: false })
    localStorage.removeItem('token')
  }

  logout = () => {
    setAuthHeader(null)
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

  render() {
    let contextPayload = {
      isAuth: this.state.isAuth,
      user: this.state.user,
      setAuth: this.setAuth,
      removeAuth: this.removeAuth,
      getMessages: this.getMessages,
      logout: this.logout
    }

    return (
      <Context.Provider value={contextPayload}>
        <div className="App">
          <Nav />
          <Chat />
        </div>
      </Context.Provider>
    )
  }
}

export default App
