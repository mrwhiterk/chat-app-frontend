import styled from "styled-components"
import { menuKeyFrame } from "./MenuKeyFrame"

import Box from "./Box"

export const Trigger = styled.div`
  //   width: 200px;
  //   height: 200px;
  //   border: 20px solid #999;
  //   background: #ddd;

  &:hover ${Box} {
    position: relative;
    animation: ${menuKeyFrame} 500ms ease-in-out 0s forwards;
  }
`

export default Trigger
