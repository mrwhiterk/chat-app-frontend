import React, { Component } from "react"
import FadeInAndOut from "../../FadeAnimation/FadeInAndOut"

export default class Drawer extends Component {
  render() {
    return (
      <div
        className="drawer"
        style={{
          backgroundColor: this.props.bgColor,
          border: "1px solid white"
        }}
      >
        <p
          className={`drawerLink ${this.props.className}
        ${this.props.isActive}
        `}
          onClick={event => {
            event.preventDefault()
            this.props.onClick(this.props.drawer)
          }}
        >
          {`${this.props.label}`}
        </p>
        {this.props.isActive
          ? React.Children.map(this.props.children, (child, i) => {
              return <FadeInAndOut fadeout={false}>{child}</FadeInAndOut>
            })
          : ""}
      </div>
    )
  }
}
