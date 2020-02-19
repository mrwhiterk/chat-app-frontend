import React, { Component } from "react"
import SendMessageForm from "./SendMessageForm/SendMessageForm"
import Context from "../../Context/Context"
import MessageList from "./MessageList/MessageList"

export default class ChatBoard extends Component {
  static contextType = Context

  render() {
    let { props } = this
    return (
      <>
        <div className="boardBack">
          <div className="channelTitle">
            <p className="title">@{props.roomTitle || "General"}</p>
          </div>
          <div className="chatBoard">
            <div className="channelMessages">
              <MessageList
                messages={this.props.messages}
                onTypingMessage={this.props.onTypingMessage}
              />
            </div>

            <SendMessageForm
              createMessage={this.props.createMessage}
              onTyping={this.props.onTyping}
            />
          </div>
        </div>
      </>
    )
  }
}
