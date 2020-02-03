import React from "react";
import Nav from "./Components/Nav/Nav";
import Chat from "./Components/Chat/Chat";
import "./App.css";

function App() {
  return (
    <div className="App">
        <Nav className="nav" />
        <Chat className="chat" />
    </div>
  );
}

export default App
