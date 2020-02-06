import React, { Component } from "react";

export default class ChatSidebar extends Component {
  render() {
    return (
      <>
        {/* list of users in chat */}
        <div className="inChat">
          <div className="onlineTitle">In chat</div>
          <div className="onlineUsersList">
            <div className="userCurrentlyInChat">you</div>
            <div className="userCurrentlyInChat">Toivo</div>
            <div className="userCurrentlyInChat">Poop</div>
          </div>
        </div>
      </>
    );
  }
}
