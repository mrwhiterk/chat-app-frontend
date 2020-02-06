import React, { Component } from "react";

export default class Tab extends Component {
  state = {
    isActive: false
  };

  render() {
    return (
      <>
        <div className="tab" style={{ backgroundColor: this.props.bgColor }}>
          <a
            className={`tab-link ${this.props.className}
        ${this.props.isActive}
        `}
            onClick={event => {
              event.preventDefault();
              this.props.onClick(this.props.tab);
            }}
          >
            {`${this.props.label}`}
          </a>
        </div>
      </>
    );
  }
}
