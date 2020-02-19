import React, { Component } from 'react'
import './Tabs.css'

export default class Tab extends Component {
  render() {
    return (
      <>
        <div
          className='tab'
          style={{
            backgroundColor: this.props.isActive ? '#141314' : '#0c0b0c',
            borderBottom: this.props.isActive
              ? 'none'
              : '1px solid rgb(63, 60, 61)',
            borderTop: this.props.isActive
              ? '1px solid rgb(63, 60, 61)'
              : 'none',
            borderLeft: this.props.isActive
              ? '1px solid rgb(63, 60, 61)'
              : 'none',
            borderRight: this.props.isActive
              ? '1px solid rgb(63, 60, 61)'
              : 'none'
          }}
        >
          <p
            className={`tabLink`}
            onClick={event => {
              event.preventDefault()
              this.props.onClick(this.props.tab)
            }}
          >
            {`${this.props.label}`}
          </p>
        </div>
      </>
    )
  }
}
