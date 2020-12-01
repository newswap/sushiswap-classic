import React from 'react'
import styled from 'styled-components'

const CardContent: React.FC = ({ children }) => (
  <StyledCardContent>{children}</StyledCardContent>
)

const StyledCardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing[3]}px;
  padding-left: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 1px 6px 3px 1px rgba(7,94,68,0.01)

`

export default CardContent
