import React, { Component } from 'react'
import './Nav.css'

import RegisterForm from '../auth/RegisterForm/RegisterForm'
import LoginForm from '../auth/LoginForm/LoginForm'
import Context from '../Context/Context'

export default class Nav extends Component {
  static contextType = Context

  render() {
    return (
      <div className="nav-main">
        {/* App title */}
        <div className="appTitle">Chat App</div>
        {/* Channels */}
        <div className="channels">
          <div className="chnl">Channel 1</div>
          <div className="chnl">Channel 2</div>
          <div className="chnl">Channel 3</div>
          <div className="chnl">Channel 4</div>
          <div className="chnl">Channel 5</div>
        </div>
        {/* Register / Login tabs */}
        <div className="navTabs">
          <div className="tab">
            <RegisterForm />
          </div>
          <div className="tab">
            <LoginForm />
          </div>

          {/* When logged in */}
          <div className="loggenInUser"></div>
          <button className="button" onClick={this.context.logout}>
            Logout
          </button>
        </div>
      </div>
    )
  }
}
