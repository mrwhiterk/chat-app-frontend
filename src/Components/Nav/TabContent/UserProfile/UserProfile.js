import React, { Component } from "react"
import Context from "../../../Context/Context"
import { getUser } from "../../../../api/axios-helpers"

export default class UserProfile extends Component {
  static contextType = Context

  state = {
    user: {}
  }

  async componentDidMount() {
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
    console.log(`!`, this.state.user)
    let { user } = this.state

    return (
      <div>
        <h5>Hello {user.username}</h5>

        <div className="profilePic">
          <img
            src={
              user.photo === ""
                ? "https://cdn4.iconfinder.com/data/icons/animal-2-1/100/animal-15-512.png"
                : user.photo
            }
          />
        </div>
        <div className="navButton logoutBtn" onClick={this.context.logout}>
          Logout
        </div>
      </div>
    )
  }
}
