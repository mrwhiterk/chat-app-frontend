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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="sendMsg">
        <form className="msgForm" onSubmit={this.handleSubmit}>
          <input
            className="writeMsgInput"
            type="text"
            name="body"
            value={this.state.body}
            onChange={this.handleChange}
            placeholder="Write something..."
          />
          <input className="sendMsgButton" type="submit" />
        </form>
      </div>
    )
  }
}

export default SendMessageForm
