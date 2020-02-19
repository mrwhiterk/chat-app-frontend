import React, { Component } from 'react'
import Nav from './components/Nav/Nav'
import Chat from './components/Chat/Chat'
import { Route, Switch, withRouter } from 'react-router-dom'
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
    channelAdded: null,
    channels: null,
    channelRemoved: null,
    channelAddComplete: null,
    currentSelectedChannel: 'General'
  }

  setCurrentSelectedChannel = name => {
    this.setState({ currentSelectedChannel: name })
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

  addChannelDisplay = channel => {
    this.setState({ channels: [...this.state.channels, channel] })
  }

  removeChannelDisplay = channel => {
    this.setState({
      channels: this.state.channels.filter(x => x._id !== channel._id)
    })

    if (this.state.user && this.state.user._id !== channel.creator) {
      this.props.history.push('/channel/General')
    }
  }

  setChannelRemoved = channel => {
    this.setState({ channelRemoved: channel })
  }

  setChannelAdded = channel => {
    this.setState({ channelAdded: channel })
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
      channels: this.state.channels,
      addChannelDisplay: this.addChannelDisplay,
      removeChannelDisplay: this.removeChannelDisplay,
      channelAdded: this.state.channelAdded,
      setChannelAdded: this.setChannelAdded,
      channelRemoved: this.state.channelRemoved,
      setChannelRemoved: this.setChannelRemoved,
      currentSelectedChannel: this.state.currentSelectedChannel,
      setCurrentSelectedChannel: this.setCurrentSelectedChannel
    }

    // if (this.state.channelAddComplete) {
    //   data = (
    //     <Route
    //       render={routerProps => (
    //         <Chat
    //           {...routerProps}
    //           title={this.state.channelAddComplete.title}
    //         />
    //       )}
    //     />
    //   )
    // }

    // let deleteData = null

    // if (this.state.channelRemoved) {
    //   console.log(this.state.channelRemoved)
    //   deleteData = <Redirect to={'/channel/Dogs'} />
    // }

    return (
      <>
        <Context.Provider value={contextPayload}>
          <div className='App'>
            <Nav />
            <Switch>
              <Route path='/channel/:name' component={Chat} />
              <Route component={Chat} />
            </Switch>
          </div>
        </Context.Provider>
      </>
    )
  }
}

export default withRouter(App)
