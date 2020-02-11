import React, { Component } from "react";
import {
  signin,
  setAuthHeader,
  checkTokenAndReturn
} from "../../../../api/axios-helpers";
import Context from "../../../Context/Context";

class LoginForm extends Component {
  static contextType = Context;

  state = {
    username: "",
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    try {
      let res = await signin(this.state);
      if (res.status === 200) {
        setAuthHeader(res.data.token);
        localStorage.setItem("token", res.data.token);
        this.context.setAuth(checkTokenAndReturn());

        let successMsg = `You're logged in as ${res.data.user.username}`;
        this.context.handleToast(successMsg, null);
      }

      if (res.status === 400) {
        let errorMsg = res.data;

        this.context.handleToast(null, errorMsg);

        //       // if (errors.username && errors.username.kind === 'unique') {
        //       //   console.log('username taken')
        //       // }
        //       // if (errors.email && errors.email.kind === 'unique') {
        //       //   console.log('email taken')
        //       // }
      }
    } catch (e) {
      console.log(`e`, e);
    }
  };

  render() {
    let form = (
      <div className="navTabContent">
        <form className="navTabForm login" onSubmit={this.handleSubmit}>
          <h5>Login</h5>
          <label>
            <h6>Username</h6>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="Username"
            />
          </label>
          <label>
            <h6>Password</h6>
            <input
              type="password"
              autoComplete="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password"
            />
          </label>
          <br />
          <input className="navButton" type="submit" value="Login" />
        </form>
      </div>
    );
    return form;
  }
}

export default LoginForm;
