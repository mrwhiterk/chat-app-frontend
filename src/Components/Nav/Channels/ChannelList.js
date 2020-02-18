import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../../UI/Spinner/Spinner'
import Context from '../../Context/Context'
import { createChannel, deleteChannel } from '../../../api/axios-helpers'

export default class ChannelList extends Component {
  static contextType = Context

  state = {
    roomName: ''
  }

  handleSubmit = async e => {
    e.preventDefault()

    if (this.state.roomName) {
      try {
        let res = await createChannel(this.state.roomName)
        this.context.setChannelAdded(res.data.channel)
        this.setState({ roomName: '' })
      } catch (error) {
        console.log(error)
      }
    }
  }
  handleClick = async id => {
    let { currentSelectedChannel } = this.context

    if (currentSelectedChannel._id === id) {
      //todo-make popup
      console.log('cannot delete a channel your currently logged into')
    } else {
      try {
        let res = await deleteChannel(id)
        this.context.setChannelRemoved(id)
      } catch (err) {
        console.log(err)
      }
    }
  }

  handleChange = ({ target }) => this.setState({ [target.name]: target.value })

  render() {
    let { channels, currentSelectedChannel, user } = this.context
    let channelList = <Spinner />

    if (channels) {
      channelList = this.context.channels.map((channel, i) => (
        <div key={i}>
          <Link className="chnl" to={`/channel/${channel.title}`}>
            {channel.title}
          </Link>

          {user &&
          user._id == channel.creator &&
          channel.title !== 'General' ? (
            <>
              {' | '}
              <a href="#" onClick={this.handleClick.bind(null, channel._id)}>
                x
              </a>
            </>
          ) : null}
        </div>
      ))
    }
    return (
      <div className="channels">
        {channelList}
        <br />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="roomName"
            value={this.state.roomName}
            onChange={this.handleChange}
            placeholder="new room"
          />
        </form>
      </div>
    )
  }
}
