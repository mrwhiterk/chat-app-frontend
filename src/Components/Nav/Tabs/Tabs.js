import React, { Component } from "react";
import Context from "../../Context/Context";
import UsernameGenerator from "username-generator";

export default class Tabs extends Component {
  static contextType = Context;

  state = {
    activeTab: ""
  };

  componentDidMount() {
    if (!this.context.isAuth) {
      this.handleTabClick(0);
    }
  }

  handleTabClick = tab => {
    if (tab === this.state.activeTab) {
      return;
    } else {
      this.setState({
        activeTab: tab === this.state.activeTab ? "" : tab
      });
    }
  };

  renderTabsChildrenAsProps = () => {
    //? 'React.Children' = this.props.children: whatever you include between the opening and closing tags when invoking a component
    return React.Children.map(this.props.children, (child, index) => {
      if (this.state.activeTab === index) {
        return React.cloneElement(child, {
          onClick: this.handleTabClick,
          tab: index,
          bgColor: "#262626"
        });
      } else {
        //? 'cloneElement': returns a copy of a specified element. Additional props and children can be passed on in the function. You would use this function when a parent component wants to add or modify the prop(s) of its children.
        return React.cloneElement(child, {
          onClick: this.handleTabClick,
          tab: index,
          bgColor: "#161515"
        });
      }
    });
  };

  render() {
    const { children } = this.props;
    const { activeTab } = this.state;
    const { isAuth } = this.context;

    return (
      <div>
        {isAuth ? (
          <div className="loggedInAs">
            <div className="loggedInUser">
              Hello {this.context.isAuth ? this.context.user.username : ""}
            </div>
            <div className="navButton logoutBtn" onClick={this.context.logout}>
              Logout
            </div>
          </div>
        ) : (
          <div className="tabs">
            <div className="tabsNav">{this.renderTabsChildrenAsProps()}</div>
            {children[activeTab] ? (
              <div className="activeTabContent">
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
                        Would you like to{" "}
                        <a
                          className={`tabLink register-tab registerGuestLink`}
                          onClick={event => {
                            event.preventDefault();
                            this.handleTabClick(1);
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
        )}
      </div>
    );
  }
}
