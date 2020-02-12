import React, { Component } from "react"

export default class Tab extends Component {
  state = {
    isActive: false
  }

  render() {
    return (
      <>
        <div className="tab" style={{ backgroundColor: this.props.bgColor }}>
          <p
            className={`tabLink ${this.props.className}
        ${this.props.isActive}
        `}
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
