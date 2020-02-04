import React, { Component } from 'react'
import {
  signup,
  setAuthHeader,
  checkTokenAndReturn
} from '../../api/axios-helpers'
import Context from '../Context/Context'

class RegisterForm extends Component {
  static contextType = Context

  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()

    if (this.state.password !== this.state.confirmPassword) {
      console.log("password and confirm password don't match")
      return
    }
    try {
      let res = await signup(this.state)

      if (res.status === 200) {
        setAuthHeader(res.data.token)
        localStorage.setItem('token', res.data.token)
        this.context.setAuth(checkTokenAndReturn())
      }

      if (res.status === 400) {
        let { errors } = res.data
        if (errors) {
          if (errors.username && errors.username.kind === 'unique') {
            console.log('username taken')
          }
          if (errors.email && errors.email.kind === 'unique') {
            console.log('email taken')
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    let form = (
      <form className="navTabContent register" onSubmit={this.handleSubmit}>
        Register
        <label>
          Username:
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
            value={this.state.email}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          />
        </label>
        <label>
          Confirm password:
          <input
            type="text"
            name="confirmPassword"
            onChange={this.handleChange}
            placeholder="Confirm password"
            value={this.state.confirmPassword}
          />
        </label>
        <input className="button" type="submit" value="Register" />
      </form>
    )
    return this.context.isAuth ? (
      <h3 style={{ color: 'white' }}>
        logged in as {this.context.user.username}{' '}
      </h3>
    ) : (
      form
    )
  }
}

export default RegisterForm
