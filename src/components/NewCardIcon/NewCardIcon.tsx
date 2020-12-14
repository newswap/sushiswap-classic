import React from 'react'
import styled from 'styled-components'

interface CardIconProps {
  children?: React.ReactNode,
  icon?: string
}

const NewCardIcon: React.FC<CardIconProps> = ({ children, icon }) => (
    <StyledCardIcon>
      <StyledImg src={icon} />
    </StyledCardIcon>
)


const StyledImg = styled.img `
    margin: 0px;
    width: 60px;
    height: 60px;
    border-radius: 30px;
`



const StyledCardIcon = styled.div`
    background-color: ${props => props.theme.color.grey[200]};
    font-size: 36px;
    height: 60px;
    width: 60px;
    border-radius: 30px;
    align-items: center;
    display: flex;
    justify-content: center;
    box-shadow: inset 4px 4px 8px ${props => props.theme.color.grey[300]},
    inset -6px -6px 12px ${props => props.theme.color.grey[100]};
    margin: 0 auto ${props => props.theme.spacing[3]}px;
`

export default NewCardIcon