import React from "react";

//! Stateless component
const Tab = props => {
  console.log(`tab's props`, props.props);

  return (
    <div className="tab">
      <a
        className={`tab-link ${props.linkClassName} ${
          props.isActive ? "active" : ""
        }`}
        onClick={event => {
          event.preventDefault();
          props.onClick(props.tab);
        }}
      >
        <i className={`tab-icon ${props.iconClassName}`} />
      </a>
    </div>
  );
};

export default Tab;
