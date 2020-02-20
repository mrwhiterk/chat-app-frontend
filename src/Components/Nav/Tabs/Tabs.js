import React, { Component } from "react"
import Context from "../../Context/Context"
import UsernameGenerator from "username-generator"
import FadeInAndOut from "../../FadeAnimation/FadeInAndOut"

export default class Tabs extends Component {
  static contextType = Context

  state = {
    activeTab: 0,
    editSuccessful: false
  }

  componentDidMount() {
    this.handleTabClick(0)
  }

  componentDidUpdate = async () => {
    try {
      if (this.context.toastMsg.success) {
        this.handleTabClick(0)
        setTimeout(() => {
          this.context.toastMsg.success = null
        }, 500)
      }
    } catch (e) {
      console.log(e)
    }
  }

  handleTabClick = tab => {
    if (tab !== this.state.activeTab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  renderChildrenWithProps = () => {
    //? 'React.Children' = this.props.children: whatever you include between the opening and closing tags when invoking a component
    return React.Children.map(this.props.children, (child, index) => {
      //? 'cloneElement': returns a copy of a specified element. Additional props and children can be passed on in the function. You would use this function when a parent component wants to add or modify the prop(s) of its children.
      return React.cloneElement(child, {
        isActive: index === this.state.activeTab ? true : false,
        onClick: this.handleTabClick,
        tab: index
      })
    })
  }

  render() {
    const { children } = this.props
    const { activeTab } = this.state

    return (
      <div>
        <div className="tabs">
          <div className="tabsNav">{this.renderChildrenWithProps()}</div>
          {children[activeTab] ? (
            <div className="activeTabContent">
              {/* Notification error/success Tag */}
              {this.context.toastMsg.success ? (
                <FadeInAndOut fadeout={true}>
                  <div className="notificationTag successNotification">
                    {this.context.toastMsg.success}
                  </div>
                </FadeInAndOut>
              ) : (
                ""
              )}
              {this.context.toastMsg.error ? (
                <FadeInAndOut fadeout={true}>
                  <div className="notificationTag errorNotification">
                    {this.context.toastMsg.error}
                  </div>
                </FadeInAndOut>
              ) : (
                ""
              )}

              {children[activeTab].props.children}
              {children[activeTab].props.className === "login-tab" ? (
                <>
                  <div className="guestBlock">
                    <p className="guestText">
                      You are currently chatting as <br />
                      <span>{UsernameGenerator.generateUsername("-")}</span>
                      <br />
                      (Guest User)
                    </p>
                    <br />
                    <p className="guestText">
                      Would you like to
                      <a
                        href="!#"
                        className={`tabLink register-tab registerGuestLink`}
                        onClick={event => {
                          event.preventDefault()
                          this.handleTabClick(1)
                        }}
                      >{`register`}</a>{" "}
                      ?
                    </p>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    )
  }
}
