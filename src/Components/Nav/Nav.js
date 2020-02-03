import React, { Component } from "react";
import "./Nav.css";

export default class Nav extends Component {
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
            <form className="navTabContent register">Register
              <label>
                Username:
                <input type="text" name="username" placeholder="Username" />
              </label>
              <label>
                Email:
                <input type="email" name="email" placeholder="Email" />
              </label>
              <label>
                Password:
                <input type="text" name="password1" placeholder="Password" />
              </label>
              <label>
                Repeat password:
                <input
                  type="text"
                  name="password2"
                  placeholder="Repeat password"
                />
              </label>
              <input className="button" type="submit" value="Register" />
            </form>
          </div>
          <div className="tab">
            <form className="navTabContent login">Login
              <label>
                Username:
                <input type="text" name="username" placeholder="Username" />
              </label>
              <label>
                Password:
                <input type="text" name="password" placeholder="Password" />
              </label>
              <input className="button" type="submit" value="Login" />
            </form>
          </div>

          {/* When logged in */}
          <div className="loggenInUser"></div>
          <div className="button">Logout</div>
        </div>
      </div>
    );
  }
}
