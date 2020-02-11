import React, { Component } from "react"
import { getUser } from "../../../../api/axios-helpers"

export default class EditUser extends Component {
  state = {
    user: {},
    username: "",
    email: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
    avatarURL: ""
  }

  componentDidMount() {
    this.getUserInfo()
  }

  getUserInfo = async () => {
    try {
      let user = await getUser()
      this.setState({
        user: user,
        username: user.username,
        email: user.email
      })
    } catch (e) {
      console.log(e)
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="navTabContent">
        <form className="navTabForm edit" onSubmit={this.handleSubmit}>
          <h5>Edit Profile</h5>
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
            <br />
            <label>
              <h6>Change avatar</h6>
              <input
                type="text"
                name="avatar"
                onChange={this.handleChange}
                placeholder="Avatar URL"
                value={this.state.avatarURL}
              />
            </label>
            <br />
            <br />
            <h5>Change password</h5>
            <h6>Old Password</h6>
            <input
              type="password"
              name="password"
              autoComplete="password"
              placeholder="Old password"
              onChange={this.handleChange}
              value={this.state.oldPassword}
            />
          </label>
          <label>
            <h6>New Password</h6>
            <input
              type="password"
              name="password"
              autoComplete="password"
              placeholder="New password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </label>
          <label>
            <h6>Confirm new password</h6>
            <input
              type="password"
              name="confirmPassword"
              autoComplete="confirm-password"
              onChange={this.handleChange}
              placeholder="Confirm new password"
              value={this.state.confirmPassword}
            />
          </label>
          <br />
          <input className="navButton" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
