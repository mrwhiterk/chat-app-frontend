import React, { Component } from "react";

export default class Tabs extends Component {
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
      console.log(child.props, index);

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

    return (
      <div className="tabs">
        <div className="tabs-nav">{this.renderTabsChildrenAsProps()}</div>
        {children[activeTab] ? (
          <div className="active-tab-content">
            {children[activeTab].props.children}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
