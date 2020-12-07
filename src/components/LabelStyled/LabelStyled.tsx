import React from 'react'
import styled from 'styled-components'

interface LabelStyledProps {
  text: string,
  color: string,
  fontSize: number
}

const LabelStyled: React.FC<LabelStyledProps> = ({ text, color, fontSize}) => (
  <StyledLabel color={color} fontSize={fontSize}>{text}</StyledLabel>
)

interface StyledLabelProps {
    color: string,
    fontSize: number
}


const StyledLabel = styled.div<StyledLabelProps>`
  color: ${props => props.color};
  font-size:  ${props => props.fontSize}px;
`

export default LabelStyled
