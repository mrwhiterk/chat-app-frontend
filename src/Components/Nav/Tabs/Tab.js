import React from "react";

//! Stateless component
const Tab = props => {

  return (
    <div className="tab">
      <a
        className={`tab-link ${props.linkClassName}

        `}
        onClick={event => {
          event.preventDefault();
          props.onClick(props.tab);
        }}
      >{`${props.lable}`}
      </a>
    </div>
  );
};

export default Tab;


//         ${props.isActive ? "active" : ""}
