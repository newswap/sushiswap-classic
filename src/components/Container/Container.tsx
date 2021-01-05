import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import {isMobile} from 'react-device-detect'

interface ContainerProps {
  children?: React.ReactNode,
  size?: 'sm' | 'md' | 'lg' | 'kg' | 'llg'
}

const Container: React.FC<ContainerProps> = ({ children, size = 'md' }) => {
  const { siteWidth } = useContext<{ siteWidth: number }>(ThemeContext)
  let width: number
  switch (size) {
    case 'sm':
      width = siteWidth / 2
      break
    case 'md':
      width = siteWidth * 2 / 3
      break
    case 'lg':
      width = siteWidth
      break
    case 'llg':
      width = 2000
      break
    default:
      width = siteWidth
  }
  return (
    <StyledContainer width={width}>
      {children}
    </StyledContainer>
  )
}

interface StyledContainerProps {
  width: number
}

const StyledContainer = styled.div<StyledContainerProps>`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: ${props => props.width}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  width: 100%;
`

export default Container