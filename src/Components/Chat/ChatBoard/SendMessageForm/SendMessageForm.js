import React, { Component } from 'react'
import Context from '../../../Context/Context'

class SendMessageForm extends Component {
  static contextType = Context

  state = {
    body: ''
  }

  handleSubmit = async e => {
    e.preventDefault()

    if (this.state.body.trim()) {
      this.props.createMessage(this.state)
      this.setState({ body: '' })
    } else {
      console.log('messages cannot be empty')
    }
  }

  handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.handleSubmit(e)
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    this.props.onTyping()
  }

  render() {
    return (
      <div className="sendMsg">
        <form className="msgForm" onKeyPress={this.handleKeyPress}>
          <textarea
            className="writeMsgInput"
            name="body"
            value={this.state.body}
            onChange={this.handleChange}
            placeholder="Write a message..."
          />
          <input
            className="sendMsgButton"
            type="submit"
            value=""
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    )
  }
}

export default SendMessageForm
