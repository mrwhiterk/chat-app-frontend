import React, { Component } from "react";
import RegisterForm from "../auth/RegisterForm/RegisterForm";
import LoginForm from "../auth/LoginForm/LoginForm";
import Context from "../Context/Context";
import Tabs from "./Tabs/Tabs";
import Tab from "./Tabs/Tab";
import "./Nav.css";

export default class Nav extends Component {
  static contextType = Context;

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
        <Tabs>
          <Tab className="login-tab" lable="Login">
            <div>
              <div className="tabContent">
                {!this.context.isAuth && <LoginForm />}
              </div>
            </div>
          </Tab>
          <Tab className="register-log" lable="Register">
            <div>
              <div className="tabContent">
                {!this.context.isAuth && <RegisterForm />}
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
