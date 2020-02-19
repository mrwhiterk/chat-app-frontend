import React, { Component } from 'react'
import { getUser, editUser, deleteUser } from '../../../../../api/axios-helpers'
import Context from '../../../../Context/Context'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export default class EditUser extends Component {
  static contextType = Context

  state = {
    user: null,
    username: '',
    email: '',
    oldPassword: '',
    password: '',
    confirmNewPassword: '',
    photo: ''
  }

  componentDidMount() {
    this.getUserInfo()
  }

  deleteAccount = () => {
    confirmAlert({
      title: `Where are you going, ${this.context.user.username}`,
      message: 'Are you sure you want to delete your account?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              let response = await deleteUser()
              this.context.logout()
              console.log(response.data)
            } catch (error) {
              console.log(error)
            }
          }
        },
        {
          label: 'No',
          onClick: () => null
        }
      ]
    })
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

  handleSubmit = async e => {
    e.preventDefault()

    if (this.state.password !== this.state.confirmNewPassword) {
      this.context.handleToast(
        null,
        "Password and confirm password don't match"
      )
      return
    }
    if (
      this.state.oldPassword &&
      this.state.oldPassword === this.state.password
    ) {
      this.context.handleToast(
        null,
        'Old password and new password cannot be the same'
      )
      return
    }

    let updatedUser = {}

    for (const key in this.state) {
      let element = this.state[key]
      if (
        element &&
        key !== 'user' &&
        key !== 'confirmNewPassword' &&
        element !== this.state.user[key]
      ) {
        updatedUser[key] = element
      }
    }

    try {
      let user = await editUser(updatedUser)

      if (user.status === 200) {
        //   TODO: open profile tab
        this.context.handleToast('Profile edit successful', null)
      }
      if (user.status === 400) {
        this.context.handleToast(null, 'Poops, you did something wrong 💩💩💩')
      }
    } catch (e) {
      this.context.handleToast(null, 'Poops, you did something wrong 💩💩💩')
      console.log(e)
    }
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
                name="photo"
                onChange={this.handleChange}
                placeholder="Avatar URL"
                value={this.state.photo}
              />
            </label>
            <br />
            <br />
            <h5>Change password</h5>
            <h6>Old Password</h6>
            <input
              type="password"
              name="oldPassword"
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
              value={this.state.newPassword}
            />
          </label>
          <label>
            <h6>Confirm new password</h6>
            <input
              type="password"
              name="confirmNewPassword"
              autoComplete="confirm-password"
              onChange={this.handleChange}
              placeholder="Confirm new password"
              value={this.state.confirmPassword}
            />
          </label>
          <br />
          <input className="navButton" type="submit" value="Submit" />
        </form>
        <input
          className="navButton"
          type="submit"
          onClick={this.deleteAccount}
          value="Delete Account"
        />
      </div>
    )
  }
}
