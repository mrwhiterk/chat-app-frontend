import React, { Component } from 'react'
import Box from '../../FadeAnimation/Box'
import Trigger from '../../FadeAnimation/Trigger'
import Context from '../../Context/Context'

export default class Drawer extends Component {
  static contextType = Context

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
                  onClick={
                    this.context.isAuth
                      ? event => {
                          event.preventDefault()
                          this.props.handleTrigger(this.props.drawer)
                        }
                      : null
                  }
                  style={{
                    background: 'none',
                    fontWeight: '300'
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
          </Trigger>
        ) : (
          <Box>
            <div className='drawer'>
              <div
                className={`drawerLink`}
                onClick={
                  this.context.isAuth
                    ? event => {
                        event.preventDefault()
                        this.props.handleTrigger(this.props.drawer)
                      }
                    : null
                }
                style={{
                  color: this.context.isAuth ? '' : 'rgba(138, 128, 134, 0.993)'
                }}
              >
                {this.context.isAuth ? this.props.label : 'Register to unlock'}
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
