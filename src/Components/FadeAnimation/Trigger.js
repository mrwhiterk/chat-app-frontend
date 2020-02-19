import styled from "styled-components"
import { menuKeyFrame } from "./MenuKeyFrame"

import Box from "./Box"

const Trigger = styled.div`
  & ${Box} {
    overflow: visible;
    position: relative;
    animation: ${menuKeyFrame} 400ms ease-in-out 0s both;
  }
`

export default Trigger
