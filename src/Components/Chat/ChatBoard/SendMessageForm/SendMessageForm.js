import React, { Component } from 'react'
import Context from '../../../Context/Context'

class SendMessageForm extends Component {
  static contextType = Context

  state = {
    body: ''
  }

  handleSubmit = async e => {
    e.preventDefault()

    this.props.createMessage(this.state)

    this.setState({ body: '' })
  }

  handleKeyPress = async e => {
    let whiteSpace = /^\s/g
    if (e.target.value === whiteSpace) {
      e.target.value = ''
      console.log('No message to send')
    } else if (e.key === 'Enter' && e.shiftKey) {
    } else if (e.target.value === '') {
      console.log('No message to send')
    } else if (e.key === 'Enter') {
      e.preventDefault()
      this.props.createMessage(this.state)

      this.setState({ body: '' })
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
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
