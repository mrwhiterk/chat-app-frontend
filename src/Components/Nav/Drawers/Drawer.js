import React, { Component } from "react"
import FadeInAndOut from "../../FadeAnimation/FadeInAndOut"

export default class Drawer extends Component {



  handleClick = () => {
      
  }

  render() {
    return (
      <div
        className="drawer"
        style={
          {
            //   backgroundColor: this.props.bgColor
          }
        }
      >
        <div
          className={`drawerLink ${this.props.className}
        ${this.props.isActive}
        `}
          onClick={event => {
            event.preventDefault()
            this.props.onClick(this.props.drawer)
            this.handleClick()
          }}
          div
        >
          {`${this.props.label}`}
        </div>
        {this.props.isActive
          ? React.Children.map(this.props.children, (child, i) => {
              return (
                <FadeInAndOut fadeout={false}>
                  <div className="activeDrawerContent">{child}</div>
                </FadeInAndOut>
              )
            })
          : ""}
      </div>
    )
  }
}
