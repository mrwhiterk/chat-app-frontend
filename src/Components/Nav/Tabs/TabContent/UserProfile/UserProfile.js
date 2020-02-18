import React, { Component } from "react"
import Context from "../../../../Context/Context"
import { getUser } from "../../../../../api/axios-helpers"

export default class UserProfile extends Component {
  static contextType = Context

  state = {
    user: {}
  }

  componentDidMount() {
    this.getUserInfo()
  }

  getUserInfo = async () => {
    try {
      let user = await getUser()
      this.setState({
        user: user
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    let { user } = this.state

    return (
      <div className='userProfileTabContent'>
        <h5 className='userTitle'>Hello {user.username}</h5>

        <div className="profilePic">
          <img
            src={user.photo === "" ? "/animal-15-512.png" : user.photo}
            alt="profile avatar"
          />
        </div>
        <div className="navButton logoutButton" onClick={this.context.logout}>
          Logout
        </div>
      </div>
    )
  }
}
