import React, { Component } from "react"
import { Link } from "react-router-dom"
import Spinner from "../../UI/Spinner/Spinner"
import Context from "../../Context/Context"
import "./Channels.css"

export default class ChannelList extends Component {
  static contextType = Context

  render() {
    let { channels } = this.context
    let channelList = <Spinner />

    if (channels) {
      channelList = this.context.channels.map((channel, i) => (
        <div className="channelRow" key={i}>
          <Link className="channel" to={`/channel/${channel.title}`}>
            {channel.title}
          </Link>
        </div>
      ))
    }
    return <div className="channels">{channelList}</div>
  }
}
