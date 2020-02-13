import React, { Component } from "react"
import Context from "../../Context/Context"

export default class Drawers extends Component {
  static contextType = Context

  state = {
    activeDrawer: "",
  }

  handleClick = async drawer => {
    try {
      if (drawer === this.state.activeDrawer) {
        return
      } else {
        await this.setState({
          activeDrawer: drawer === this.state.activeDrawer ? "" : drawer,
        })

      }
    } catch (e) {}
  }

  renderChildrenWithProps = () => {
    return React.Children.map(this.props.children, (child, index) => {
        if (this.state.activeDrawer === index) {
          return React.cloneElement(child, {
              isActive: true,
            onClick: this.handleClick,
            drawer: index,
            bgColor: "grey"
          })
        } else {
      return React.cloneElement(child, {
        isActive: index === this.state.activeDrawer ? true : false,
        onClick: this.handleClick,
        drawer: index,
        bgColor: "pink"
      })
        }
    })
  }

  render() {
    const { children } = this.props
    const { activeDrawer } = this.state

    return (
      <div className="drawers">
        <div
          className="drawersNav"
          style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
        >
          {this.renderChildrenWithProps()}
          {children[activeDrawer] ? (
            <div className="activeDrawerContent">
              {/* {children[activeDrawer].props.children}
              poop */}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    )
  }
}
