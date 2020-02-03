import React, { Component } from "react";
import "./Chat.css";

export default class Chat extends Component {
  render() {
    return (
      <div className="chatMain">
        {/* Chat board */}
        <div className="chatBoard">
          {/* Channel title */}
                <div className="channelTitle"><p className='title'>@channel</p></div>

          {/* Messages in the channel */}
          <div className="channelMessages">
            <div className="messageList">
              <div className="msg">
                <div className="usernameInMsg">Toivo</div>
                <div className="msgTxt">Message 1</div>
                <div className="msgSent">6:66am</div>
              </div>
              <div className="msg">
                {" "}
                <div className="usernameInMsg">Toivo</div>
                <div className="msgTxt">
                  Message 2 Message 2 Message 2Message 2 Message 2Message
                  2Message 2 Message 2 Message 2 Message 2 Message 2 Message 2
                  Message 2 Message 2 Message 2 Message 2 Message 2 Message 2
                  Message 2{" "}
                </div>
                <div className="msgSent">6:66am</div>
              </div>
              <div className="msg myMsg">
                {" "}
                <div className="usernameInMsg">you</div>
                <div className="msgTxt">Message 3</div>
                <div className="msgSent">6:66am</div>
              </div>
              <div className="msg">
                {" "}
                <div className="usernameInMsg">Toivo</div>
                <div className="msgTxt">Message 4</div>
                <div className="msgSent">6:66am</div>
              </div>
              <div className="msg myMsg">
                {" "}
                <div className="usernameInMsg">you</div>
                <div className="msgTxt">
                  Message 5 Message 5 Message 5Message 5 Message 5Message
                  5Message 5 Message 5 Message 5 Message 5 Message 5 Message 5
                  Message 5 Message 5 Message 5 Message 5 Message 5 Message 5
                  Message 2{" "}
                </div>
                <div className="msgSent">6:66am</div>
              </div>
              <div className="msg">
                {" "}
                <div className="usernameInMsg">Toivo</div>
                <div className="msgTxt">Message 6</div>
                <div className="msgSent">6:66am</div>
              </div>
            </div>
          </div>

          {/* Send new message to chat -form */}
          <div className="sendMsg">
            <form className="msgForm" action="">
              <input
                className="writeMsgInput"
                type="text"
                placeholder="Write something..."
              />
              <input className="sendMsgButton" type="submit" value="" />
            </form>
          </div>
        </div>

        {/* list of users in chat */}
        <div className="inChat">
          <div className="onlineTitle">In chat</div>
          <div className="onlineUsersList">
            <div className="userCurrentlyInChat">you</div>
            <div className="userCurrentlyInChat">Toivo</div>
            <div className="userCurrentlyInChat">Poop</div>
          </div>
        </div>
      </div>
    );
  }
}
