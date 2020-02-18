import React, { Component } from "react"
import Box from "../../FadeAnimation/Box"
import Trigger from "../../FadeAnimation/Trigger"

export default class Drawer extends Component {
  render() {
    return (
      <>
        {this.props.isActive ? (
          <Trigger>
            <Box>
              <div className="drawer">
                <div
                  className={`drawerLink`}
                  onClick={event => {
                    event.preventDefault()
                    this.props.handleTrigger(this.props.drawer)
                  }}
                  style={{ fontWeight: "300" }}
                  div
                >
                  {`${this.props.label}`}
                </div>
                {React.Children.map(this.props.children, (child, i) => {
                  return <div className="activeDrawerContent">{child}</div>
                })}
              </div>
            </Box>
          </Trigger>
        ) : (
          <Box>
            <div className="drawer">
              <div
                className={`drawerLink`}
                onClick={event => {
                  event.preventDefault()
                  this.props.handleTrigger(this.props.drawer)
                }}
                div
              >
                {`${this.props.label}`}
              </div>
              {React.Children.map(this.props.children, (child, i) => {
                return <div className="activeDrawerContent">{child}</div>
              })}
            </div>
          </Box>
        )}
      </>
    )
  }
}
