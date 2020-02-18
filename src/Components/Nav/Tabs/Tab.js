import React, { Component } from "react"
import "./Tabs.css"

export default class Tab extends Component {
  render() {
    return (
      <>
        <div
          className="tab"
          style={{
            backgroundColor: this.props.isActive ? "#262626" : "#161515"
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
