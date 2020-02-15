import React, { Component } from 'react'
import RegisterForm from './Tabs/TabContent/RegisterForm/RegisterForm'
import LoginForm from './Tabs/TabContent/LoginForm/LoginForm'
import UserProfile from './TabContent/UserProfile/UserProfile'
import EditUser from './TabContent/EditUser/EditUser'
import Context from '../Context/Context'
import Tabs from './Tabs/Tabs'
import Tab from './Tabs/Tab'
import Spinner from '../UI/Spinner/Spinner'
import { Link, NavLink } from 'react-router-dom'
import './Nav.css'

const errorToastColor = {
  background: '#f23535',
  text: '#fff'
}
const toastColor = {
  background: '#3f51b5',
  text: '#fff'
}

export default class Nav extends Component {
  static contextType = Context

  state = {
    notification: null
  }

  componentDidMount() {
    // Error/success notification check
    if (this.context.toastMsg.success) {
      this.setState({
        notification: this.context.toastMsg.success
      })
    }
    if (this.context.toastMsg.error) {
      this.setState({
        notification: this.context.toastMsg.error
      })
    }
  }

  render() {
    let { channels } = this.context
    let channelList = <Spinner />

    if (channels) {
      channelList = this.context.channels.map((channel, i) => (
        <div key={i}>
          <Link className="chnl" to={`/channel/${channel.title}`}>
            {channel.title}
          </Link>
        </div>
      ))
    }
    return (
      <div className="navMain">
        {/* App title */}

        <div className="appTitle">Chat App</div>

        {/* Channels */}
        <div className="channels">{channelList}</div>

        {/* <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="room name" />
        </form> */}

        {/* Register / Login tabs */}
        {this.context.isAuth ? (
          <Tabs>
            <Tab className="profile-tab" label="Profile">
              <br />
              <div>
                <div className="tabContent">
                  <UserProfile user={this.state.user} />
                </div>
              </div>
            </Tab>
            <Tab className="edit-profile-tab" label="Edit">
              <div>
                <div className="tabContent">
                  <EditUser user={this.state.user} />
                </div>
              </div>
            </Tab>
          </Tabs>
        ) : (
          <Tabs>
            <Tab className="login-tab" label="Login">
              <br />
              <div>
                <div className="tabContent">
                  <LoginForm />
                </div>
              </div>
            </Tab>
            <Tab className="register-tab" label="Register">
              <div>
                <div className="tabContent">
                  <RegisterForm />
                </div>
              </div>
            </Tab>
          </Tabs>
        )}
      </div>
    )
  }
}
