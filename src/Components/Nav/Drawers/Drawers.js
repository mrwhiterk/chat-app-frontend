import React, { Component } from "react"
import Context from "../../Context/Context"
import "./Drawer.css"

export default class Drawers extends Component {
  static contextType = Context

  state = {
    activeDrawer: ""
  }

  handleClick = async drawer => {
    try {
      if (drawer === this.state.activeDrawer) {
        return
      } else {
        await this.setState({
          activeDrawer: drawer === this.state.activeDrawer ? "" : drawer
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  renderChildrenWithProps = () => {
    return React.Children.map(this.props.children, (child, index) => {
      if (this.state.activeDrawer === index) {
        return React.cloneElement(child, {
          isActive: true,
          onClick: this.handleClick,
          drawer: index,
          bgColor: "rgba(146, 141, 143, 0.178)"
        })
      } else {
        return React.cloneElement(child, {
          isActive: index === this.state.activeDrawer ? true : false,
          onClick: this.handleClick,
          drawer: index,
          bgColor: "rgba(20, 20, 20, 0.658)"
        })
      }
    })
  }

  render() {
    const { children } = this.props
    const { activeDrawer } = this.state

    return (
      <div className="drawers">
        {this.renderChildrenWithProps()}
        {/* {children[activeDrawer] ? (
          <div className="activeDrawerContent">
            
          </div>
        ) : (
          ""
        )} */}
      </div>
    )
  }
}
