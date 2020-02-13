import React, { Component } from "react"
import styled from "styled-components"
import { keyFrameExampleOne } from "./KeyFrames"

export const Box = styled.div`
  display: inline-block;
  background-color: limegreen;
  border: 1px solid white;
  width: 100%;
  height: 50px;

//   position: relative;
//   animation: ${keyFrameExampleOne} 2s ease-in-out 0s forwards;
`

export default Box

//   transition: transform 300ms ease-in-out;
//   &:hover {
//     transform: translate(200px, 150px) rotate(20deg);
//   }
