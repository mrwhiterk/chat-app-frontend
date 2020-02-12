import React, { Component } from 'react'
import RegisterForm from './Tabs/TabContent/RegisterForm/RegisterForm'
import LoginForm from './Tabs/TabContent/LoginForm/LoginForm'
import Context from '../Context/Context'
import Tabs from './Tabs/Tabs'
import Tab from './Tabs/Tab'
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
    notification: null,
    channels: ['General', 'Dogs']
  }

  componentDidMount() {
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
    return (
      <div className="navMain">
        {/* App title */}

        <div className="appTitle">Chat App</div>

        {/* Channels */}
        <div className="channels">
          {this.state.channels.map((channel, i) => (
            <div key={i}>
              <Link className="chnl" to={`/channel/${channel}`}>
                {channel}
              </Link>
            </div>
          ))}
        </div>

        {/* Register / Login tabs */}
        <Tabs>
          <Tab className="login-tab" label="Login">
            <br />
            <div>
              <div className="tabContent">
                {!this.context.isAuth && <LoginForm />}
              </div>
            </div>
          </Tab>
          <Tab className="register-log" label="Register">
            <div>
              <div className="tabContent">
                {!this.context.isAuth && <RegisterForm />}
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}
