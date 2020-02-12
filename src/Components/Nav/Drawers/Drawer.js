import React, { Component } from "react"

export default class Drawer extends Component {
  state = {
    isActive: false
  }

  handleClick = () => {
    console.log(this.state.isActive)
  }

  render() {
    // console.log(this.props.children)

    return (
      <>
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
              this.handleClick()
            }}
          >
            {`${this.props.label}`}
          </p>
          {/* {React.Children.map(this.props.children, (child, i) => {
            return child
          })} */}
        </div>
      </>
    )
  }
}
