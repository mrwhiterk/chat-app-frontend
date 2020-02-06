import React, { Component } from "react";
import ChatBoard from "./ChatBoard/ChatBoard";
import ChatSidebar from "./ChatSidebar/ChatSidebar";
import "./Chat.css";

export default class Chat extends Component {
  render() {
    return (
      <div className="chatMain">
        <ChatBoard />
        <ChatSidebar />
      </div>
    );
  }
}
