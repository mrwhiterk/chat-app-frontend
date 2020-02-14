import React, { Component } from "react"
import FadeInAndOut from "../../FadeAnimation/FadeInAndOut"
import Box from "../../FadeAnimation/Box"
import Trigger from "../../FadeAnimation/Trigger"

export default class Drawer extends Component {
  render() {
    return (
      <Trigger>
        <Box>
                <FadeInAndOut fadeout={false}>
          <div className="drawer">
            <div
              className={`drawerLink ${this.props.className}
        ${this.props.isActive}
        `}
              onClick={event => {
                event.preventDefault()
                // this.props.onClick(this.props.drawer)
              }}
              div
            >
              {`${this.props.label}`}
            </div>
            {/* {this.props.isActive */}
            {/* ? */}
            {React.Children.map(this.props.children, (child, i) => {
              return (
                <div className="activeDrawerContent">
                  
                  {child}
                  
                </div>
              )
            })}
            {/* : ""} */}
          </div>
                </FadeInAndOut>
        </Box>
      </Trigger>
    )
  }
}
