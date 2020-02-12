import React, { Component } from "react"
import RegisterForm from "./Tabs/TabContent/RegisterForm/RegisterForm"
import LoginForm from "./Tabs/TabContent/LoginForm/LoginForm"
import UserProfile from "./Tabs/TabContent/UserProfile/UserProfile"
import EditUser from "./Tabs/TabContent/EditUser/EditUser"
import Context from "../Context/Context"
import Drawers from "./Drawers/Drawers"
import Drawer from "./Drawers/Drawer"
import ChannelList from "./Channels/ChannelList"
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
        <div className="appTitle">Chat App</div>
        <Drawers>
          <Drawer label="Channels">
            <ChannelList />
          </Drawer>

          <Drawer label="Test">
            <div>
              <div>POOP</div>
              <div>POOP</div>
              <div>POOP</div>
              <div>POOP</div>
              <div>POOP</div>
              <div>POOP</div>
              <div>POOP</div>
            </div>
          </Drawer>
          <Drawer label="Profile info">
            {/* Register / Login tabs */}
            {this.context.isAuth ? (
              <Tabs>
                <Tab className="profile-tab" label="Profile">
                  <br />
                  <div className="tabContent">
                    <UserProfile user={this.state.user} />
                  </div>
                </Tab>
                <Tab className="edit-profile-tab" label="Edit">
                  <div className="tabContent">
                    <EditUser user={this.state.user} />
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
          </Drawer>
        </Drawers>
        {/* Channels */}
      </div>
    )
  }
}
