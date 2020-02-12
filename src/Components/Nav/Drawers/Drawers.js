import React, { Component } from "react"
import Context from "../../Context/Context"

export default class Drawers extends Component {
  static contextType = Context

  state = {
    activeDrawer: "",
  }

  handleClick = drawer => {

    React.Children.map(this.props.children, (child, i) => {
    //   console.log(`!!!`, child.props.children)
    })
    if (drawer === this.state.activeDrawer) {
      return
    } else {
      this.setState({
        activeDrawer: drawer === this.state.activeDrawer ? "" : drawer
      })
    }
  }

  renderChildrenWithProps = () => {
    return React.Children.map(this.props.children, (child, index) => {
    //   if (this.state.activeDrawer === index) {
    //     return React.cloneElement(child, {
    //       showChild: true,
    //       onClick: this.handleClick,
    //       drawer: index,
    //       bgColor: "pink"
    //     })
    //   } else {
        return React.cloneElement(child, {
          showChild: false,
          onClick: this.handleClick,
          drawer: index,
          bgColor: "light-blue"
        })
    //   }
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
              {children[activeDrawer].props.children}
              poop
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    )
  }
}
