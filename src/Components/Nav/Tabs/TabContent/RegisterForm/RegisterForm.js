import React, { Component } from "react"
import {
  signup,
  setAuthHeader,
  checkTokenAndReturn
} from "../../../../../api/axios-helpers"
import Context from "../../../../Context/Context"

class RegisterForm extends Component {
  static contextType = Context

  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()

    if (this.state.password !== this.state.confirmPassword) {
        this.context.handleToast(null, `Passwords don't match`)
      return
    }

    try {
      let res = await signup(this.state)

      if (res.status === 200) {
        setAuthHeader(res.data.token)
        localStorage.setItem("token", res.data.token)
        this.context.setAuth(checkTokenAndReturn())
        this.context.handleToast("Welcome!", null)
      }

      if (res.status === 400) {
        let { errors } = res.data
        if (errors) {
          if (errors.username && errors.username.kind === "unique") {
            this.context.handleToast(null, "Username taken")
          }
          if (errors.email && errors.email.kind === "unique") {
            this.context.handleToast(null, "Email taken")
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    let form = (
      <div className="navTabContent">
        <form className="navTabForm register" onSubmit={this.handleSubmit}>
          <h5>Register</h5>
          <label>
            <h6>Username</h6>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
              value={this.state.username}
            />
          </label>
          <label>
            <h6>Email</h6>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </label>
          <label>
            <h6>Password</h6>
            <input
              type="password"
              name="password"
              autoComplete="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </label>
          <label>
            <h6>Confirm password</h6>
            <input
              type="password"
              name="confirmPassword"
              autoComplete="confirm-password"
              onChange={this.handleChange}
              placeholder="Confirm password"
              value={this.state.confirmPassword}
            />
          </label>
          <br />
          <input className="navButton" type="submit" value="Register" />
        </form>
      </div>
    )
    return form
  }
}

export default RegisterForm
