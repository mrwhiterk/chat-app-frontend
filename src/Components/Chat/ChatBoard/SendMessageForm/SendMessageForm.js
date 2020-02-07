import React, { Component } from 'react'
import Context from '../../../Context/Context'

class SendMessageForm extends Component {
  static contextType = Context

  state = {
    body: ''
  }

  handleSubmit = async e => {
    e.preventDefault()
    let success = this.props.createMessage(this.state)
    if (success) {
      this.setState({ body: '' })
    } else {
      console.log('must be signed in')
    }
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
