import React, { Component } from "react"
import Context from "../Context/Context"

export default class FadeInAndOut extends Component {
  static contextType = Context

  state = {
    maxIsVisible: 0
  }

  delay = () => {
    return this.props.delay || 50
  }

  componentDidMount() {
    const count = React.Children.count(this.props.children)
    let i = 0
    this.interval = setInterval(() => {
      i++
      if (i > count) clearInterval(this.interval)

      this.setState({ maxIsVisible: i })
    }, this.delay())
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  timeOut = () => {
    setTimeout(() => {
      this.setState({ maxIsVisible: 0 }, () => {
        setTimeout(() => {
          this.context.handleToast(null, null)
        }, 500)
      })
    }, 3000)
  }

  render() {
    return (
      <div className={this.props.className}>
        {React.Children.map(this.props.children, (child, i) => {
          return (
            <div
              className={this.props.childClassName}
              style={{
                transition: `opacity 400ms, top 500ms`,
                top: this.state.maxIsVisible > i ? 0 : 20,
                opacity: this.state.maxIsVisible > i ? 1 : 0
              }}
            >
              {child}
              {this.props.fadeout ? this.timeOut() : ""}
            </div>
          )
        })}
      </div>
    )
  }
}
