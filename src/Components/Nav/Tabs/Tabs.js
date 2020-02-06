import React, { Component } from "react";
import Context from "../../Context/Context";
import UsernameGenerator from "username-generator";

export default class Tabs extends Component {
  static contextType = Context;

  state = {
    activeTab: this.props.defaultActiveTab
  };

  handleTabClick = tab => {
    this.setState({
      activeTab:
        tab === this.state.activeTab ? this.props.defaultActiveTab : tab
    });
  };

  renderTabsChildrenAsProps = () => {
    //? 'React.Children' = this.props.children: whatever you include between the opening and closing tags when invoking a component
    return React.Children.map(this.props.children, (child, index) => {
      //? 'cloneElement': returns a copy of a specified element. Additional props and children can be passed on in the function. You would use this function when a parent component wants to add or modify the prop(s) of its children.
      return React.cloneElement(child, {
        onClick: this.handleTabClick,
        tab: index,
        isActive: index === this.state.activeTab
      });
    });
  };

  render() {
    const { children } = this.props;
    const { activeTab } = this.state;
    const { isAuth } = this.context;

    return (
      <div>
        {isAuth ? (
            <div className='loggedInAs'>
          <div className="loggedInUser" style={{ color: "white" }}>
            Hello {this.context.isAuth ? this.context.user.username : ""}
          </div>
          <div className="navButton logoutBtn" onClick={this.context.logout}>Logout</div>
          </div>
        ) : (
          <div className="tabs">
            <div className="tabs-nav">{this.renderTabsChildrenAsProps()}</div>
            {children[activeTab] ? (
              <div className="active-tab-content">
                {children[activeTab].props.children}
                {children[activeTab].props.className === "login-tab" ? (
                  <div className="guest-block">
                    <p className="guest-text">
                      You are currently logged in as <br />
                      <span>{UsernameGenerator.generateUsername("-")}</span>
                    </p>
                    <br />
                    <p className="guest-text">
                      Would you like to{" "}
                      <a
                        className={`tab-link register-tab register-guest-link`}
                        onClick={event => {
                          event.preventDefault();
                        }}
                      >{`Register`}</a>{" "}
                      ?
                    </p>
                  </div>
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
