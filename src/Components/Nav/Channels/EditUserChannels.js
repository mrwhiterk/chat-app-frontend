import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../../UI/Spinner/Spinner'
import Context from '../../Context/Context'
import { deleteChannel } from '../../../api/axios-helpers'
import './Channels.css'

export default class EditUserChannels extends Component {
  static contextType = Context

  handleClick = async id => {
    let { currentSelectedChannel } = this.context

    if (currentSelectedChannel._id === id) {
      //todo-make popup
      console.log('cannot delete a channel your currently logged into')
    } else {
      try {
        let res = await deleteChannel(id)
        this.context.setChannelRemoved(res.data)
      } catch (err) {
        console.log(err)
      }
    }
  }
  render() {
    let { channels, user } = this.context
    let channelList = <Spinner />

    if (channels) {
      channelList = this.context.channels.map((channel, i) =>
        user && user._id === channel.creator && channel.title !== 'General' ? (
          <div className='userChannelRow' key={i}>
            <Link className='userChannel' to={`/channel/${channel.title}`}>
              {channel.title}
            </Link>

            <div
              className='deleteChannelButton'
              onClick={this.handleClick.bind(null, channel._id)}
            >
              <img src='/delete.png' alt='delete icon' />
            </div>
          </div>
        ) : null
      )
    }
    return (
      <div className='userChannels'>
        <h5>Your channels:</h5>
        {channelList}
      </div>
    )
  }
}
