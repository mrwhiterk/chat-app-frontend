import styled from "styled-components"
import { keyFrameExampleOne } from "./KeyFrames"

import Box from "./Box"

export const Trigger = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid hotpink;

  &:hover ${Box} {
    position: relative;
    animation: ${keyFrameExampleOne} 2s ease-in-out 0s forwards;
  }
`

export default Trigger
