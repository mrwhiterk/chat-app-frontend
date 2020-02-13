import React, { Component } from "react"
import Box from "./Box"
import Trigger from "./Trigger"
import "./Test.css"

export default class Test extends Component {
  render() {
    return (
      <div className="test">
        <Trigger>
          <Box />
          <Box />
          <Box />
        </Trigger>
      </div>
    )
  }
}
