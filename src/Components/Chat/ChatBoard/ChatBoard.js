import React, { Component } from 'react'
import SendMessageForm from './SendMessageForm/SendMessageForm'
import Context from '../../Context/Context'
import MessageList from './MessageList/MessageList'

export default class ChatBoard extends Component {
  static contextType = Context

  render() {
    return (
      <>
        {/* Chat board */}
        <div className="chatBoard">
          {/* Channel title */}
          <div className="channelTitle">
            {' '}
            <p className="title">@General</p>
          </div>

          {/* Messages in the channel */}
          <div className="channelMessages">
            <MessageList messages={this.props.messages} />
          </div>

          <SendMessageForm createMessage={this.props.createMessage} />
        </div>
      </>
    )
  }
}
