import React, { Component } from "react"
import RegisterForm from "./TabContent/RegisterForm/RegisterForm"
import LoginForm from "./TabContent/LoginForm/LoginForm"
import UserProfile from "./TabContent/UserProfile/UserProfile"
import EditUser from "./TabContent/EditUser/EditUser"
import Context from "../Context/Context"
import Tabs from "./Tabs/Tabs"
import Tab from "./Tabs/Tab"
import "./Nav.css"

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
    return (
      <div className="navMain">
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
