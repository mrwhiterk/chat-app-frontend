import React, { Component } from 'react'
import Nav from './components/Nav/Nav'
import Chat from './components/Chat/Chat'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import {
  checkTokenAndReturn,
  setAuthHeader,
  getChannels
} from './api/axios-helpers'
import Context from './components/Context/Context'

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
    logoutPayload: null,
    channels: null
  }

  getChannels = async () => {
    try {
      let response = await getChannels()

      if (response.status === 200) {
        this.setState({ channels: response.data })
      } else {
        console.log('there was an error')
      }
    } catch (error) {
      console.log(error)
    }
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
    this.getChannels()
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
      resetLogoutPayload: this.resetLogoutPayload,
      channels: this.state.channels
    }
    return (
      <>
        <Context.Provider value={contextPayload}>
          <div className="App">
            <Nav />
            <Switch>
              <Route path="/channel/:name" component={Chat} />
              <Route component={Chat} />
            </Switch>
          </div>
        </Context.Provider>
      </>
    )
  }
}

export default App
