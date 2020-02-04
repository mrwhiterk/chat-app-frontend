import React from 'react'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Chat from './components/Chat/Chat'
import './App.css'

function App() {
  return (
    <div className="App">
      <Nav className="nav" />
      {/* if NOT logged in */}
      <Home className="home" />

      {/* if LOGGED IN */}
      <Chat className="chat" />
    </div>
  )
}

export default App
