import React, { Component } from 'react'
import Context from '../../Context/Context'
import { createChannel } from '../../../api/axios-helpers'
import EditUserChannels from '../Channels/EditUserChannels'
import './Channels.css'

export default class AddChannel extends Component {
  static contextType = Context

  state = {
    roomName: ''
  }

  handleSubmit = async e => {
    e.preventDefault()

    if (this.state.roomName) {
      try {
        let res = await createChannel(this.state.roomName)

          if (res.status === 200) {
              this.context.setChannelAdded(res.data.channel)
          }

          if (res.status === 400) {
              this.context.handleToast(null, "Channel already exists")
          }
       
        this.setState({ roomName: '' })
      } catch (error) {
        console.log(error)
      }
    }
  }

  handleChange = ({ target }) => this.setState({ [target.name]: target.value })
  render() {
    return (
      <>
        <div className='addChannel'>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              name='roomName'
              value={this.state.roomName}
              onChange={this.handleChange}
              placeholder='Add new room'
            />
            <input
              className='navButton addChannelButton'
              type='submit'
              value='Add channel'
            />
          </form>
        </div>
        <EditUserChannels />
      </>
    )
  }
}
