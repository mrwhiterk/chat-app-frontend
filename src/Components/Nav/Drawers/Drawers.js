import React, { Component } from "react"
import Context from "../../Context/Context"
import "./Drawer.css"

export default class Drawers extends Component {
  static contextType = Context

  state = {
    activeDrawer: 2
  }

  handleClick = drawer => {
    if (drawer !== this.state.activeDrawer) {
      this.setState({
        activeDrawer: drawer
      })
    }
  }

  renderChildrenWithProps = () => {
    return React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: index === this.state.activeDrawer ? true : false,
        handleTrigger: this.handleClick,
        drawer: index
      })
    })
  }

  render() {
    return <div className="drawers">{this.renderChildrenWithProps()}</div>
  }
}
