import React, { Component } from "react"
import { Link } from "react-router-dom"
import Spinner from "../../UI/Spinner/Spinner"
import Context from "../../Context/Context"
import { deleteChannel } from "../../../api/axios-helpers"
import "./Channels.css"

export default class ChannelList extends Component {
  static contextType = Context

//   handleClick = async id => {
//     let { currentSelectedChannel } = this.context

//     if (currentSelectedChannel._id === id) {
//       //todo-make popup
//       console.log("cannot delete a channel your currently logged into")
//     } else {
//       try {
//         let res = await deleteChannel(id)
//         this.context.setChannelRemoved(id)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//   }

  render() {
    let { channels, currentSelectedChannel, user } = this.context
    let channelList = <Spinner />

    if (channels) {
      channelList = this.context.channels.map((channel, i) => (
        <div className="channelRow" key={i}>
          <Link className="channel" to={`/channel/${channel.title}`}>
            {channel.title}
          </Link>
{/* 
          {user &&
          user._id === channel.creator &&
          channel.title !== "General" ? (
            <>
              <a
                className="deleteChannelButton"
                href="!#"
                onClick={this.handleClick.bind(null, channel._id)}
              >
                <img src="/delete.png" alt="delete icon" />
              </a>
            </>
          ) : null} */}
        </div>
      ))
    }
    return <div className="channels">{channelList}</div>
  }
}
