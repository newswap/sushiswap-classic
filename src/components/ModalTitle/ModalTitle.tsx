import React from 'react'
import styled from 'styled-components'

interface ModalTitleProps {
  text?: string,
  style?: React.CSSProperties
}

const ModalTitle: React.FC<ModalTitleProps> = ({ text, style}) => (
  <StyledModalTitle style={style}>
    {text}
  </StyledModalTitle>
)

const StyledModalTitle = styled.div`
  align-items: center;
  color: #647684;//${props => props.theme.color.grey[600]};
  display: flex;
  font-size: 18px;
  font-weight: 500;
  height: ${props => props.theme.topBarSize}px;
  justify-content: left;
  flot: left;
`

export default ModalTitle