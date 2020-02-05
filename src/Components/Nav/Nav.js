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
        <div className="navTabs">
          <Tabs>
            <Tab iconClassName={"icon-class-0"} linkClassName={"link-class-0"}>
              <div>Poop 1</div>
            </Tab>
            <Tab iconClassName={"icon-class-1"} linkClassName={"link-class-1"}>
              <div>Poop 2</div>
            </Tab>
          </Tabs>
          <div className="tab">{!this.context.isAuth && <RegisterForm />}</div>
          <div className="tab">{!this.context.isAuth && <LoginForm />}</div>

          {/* When logged in */}
          <div className="loggenInUser" style={{ color: "white" }}>
            {this.context.isAuth
              ? this.context.user.username
              : "browsing as guest"}
          </div>
          <button className="button" onClick={this.context.logout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}
