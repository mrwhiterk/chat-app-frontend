import React, { Component } from 'react'
import Box from '../../FadeAnimation/Box'
import Trigger from '../../FadeAnimation/Trigger'

export default class Drawer extends Component {
  render() {
    return (
      <>
        {this.props.isActive ? (
          <Trigger>
            <Box>
              <div
                className='drawer'
                style={{
                  background: '-webkit-linear-gradient(#47313d3b, #0d0d0d)'
                }}
              >
                <div
                  className={`drawerLink`}
                  onClick={event => {
                    event.preventDefault()
                    this.props.handleTrigger(this.props.drawer)
                  }}
                  style={{ background: 'none', fontWeight: '300' }}
                >
                  {`${this.props.label}`}
                </div>
                {React.Children.map(this.props.children, (child, i) => {
                  if (this.props.label === 'Profile info') {
                    return (
                      <div
                        className='activeDrawerContent'
                        style={{ height: '52vh' }}
                      >
                        {child}
                      </div>
                    )
                  } else {
                    return <div className='activeDrawerContent'>{child}</div>
                  }
                })}
              </div>
            </Box>
          </Trigger>
        ) : (
          <Box>
            <div className='drawer'>
              <div
                className={`drawerLink`}
                onClick={event => {
                  event.preventDefault()
                  this.props.handleTrigger(this.props.drawer)
                }}
              >
                {`${this.props.label}`}
              </div>
              {React.Children.map(this.props.children, (child, i) => {
                if (this.props.label === 'Profile info') {
                  return (
                    <div
                      className='activeDrawerContent'
                      style={{ height: '52vh' }}
                    >
                      {child}
                    </div>
                  )
                } else {
                  return <div className='activeDrawerContent'>{child}</div>
                }
              })}
            </div>
          </Box>
        )}
      </>
    )
  }
}
