import styled from "styled-components"
import { menuKeyFrame } from "./MenuKeyFrame"

import Box from "./Box"

export const Trigger = styled.div`

  &:hover ${Box} {
    position: relative;
    animation: ${menuKeyFrame} 500ms ease-in-out 0s forwards;
  }
`

export default Trigger
