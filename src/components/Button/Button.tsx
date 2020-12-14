import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { Link } from 'react-router-dom'

interface ButtonProps {
  children?: React.ReactNode,
  disabled?: boolean,
  href?: string,
  onClick?: () => void,
  size?: 'sm' | 'md' | 'lg' | 'new' | 'normal',
  text?: string,
  to?: string,
  variant?: 'default' | 'secondary' | 'tertiary' | 'green' | 'grey' | 'normal'
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  variant,
}) => {
  const { color, spacing } = useContext(ThemeContext)

  let buttonColor: string
  switch (variant) {
    case 'green':
      buttonColor = '#ffffff'
      break
    case 'grey':
      buttonColor = '#647684'
      break
    case 'secondary':
      buttonColor = color.grey[500]
      break
    case 'normal':
      buttonColor = '#647684'
      break
    case 'default':
    default:
      buttonColor = color.primary.main
  }

  let backgroundColor: string
  switch (variant) {
    case 'green':
      backgroundColor = '#20C5A0'
      break
    case 'grey':
      backgroundColor = '#F2F2F7'
      break
    case 'secondary':
      backgroundColor = color.grey[200]
      break
    case 'normal':
      backgroundColor = '#fff'
      break
    case 'default':
    default:
      backgroundColor = color.grey[200]
  }

  let hoverColor: string
  switch (variant) {
    case 'green':
      hoverColor = '#00B38C'
      break
    case 'grey':
      hoverColor = '#D3D9DD'
      break
    case 'secondary':
      hoverColor = color.grey[100]
      break
    case 'normal':
      hoverColor = '#fff'
      break
    case 'default':
    default:
      hoverColor = color.grey[100]
  }

  let boxShadow: string
  let buttonSize: number
  let buttonPadding: number
  let fontSize: number
  switch (size) {
    case 'new':
      buttonPadding = spacing[4]
      buttonSize = 50
      fontSize = 16
      break
    case 'normal':
      buttonPadding = 0
      buttonSize = 20
      fontSize = 16
      break
    case 'sm':
      boxShadow = `4px 4px 8px ${color.grey[300]},
        -8px -8px 16px ${color.grey[100]}FF;`
      buttonPadding = spacing[3]
      buttonSize = 36
      fontSize = 14
      break
    case 'lg':
      boxShadow = `6px 6px 12px ${color.grey[300]},
        -12px -12px 24px ${color.grey[100]}ff;`
      buttonPadding = spacing[4]
      buttonSize = 72
      fontSize = 16
      break
    case 'md':
    default:
      boxShadow = `6px 6px 12px ${color.grey[300]},
        -12px -12px 24px -2px ${color.grey[100]}ff;`
      buttonPadding = spacing[4]
      buttonSize = 56
      fontSize = 16
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledLink to={to}>{text}</StyledLink>
    } else if (href) {
      return <StyledExternalLink href={href} target="__blank">{text}</StyledExternalLink>
    } else {
      return text
    }
  }, [href, text, to])

  return (
    <StyledButton
      boxShadow={boxShadow}
      color={buttonColor}
      disabled={disabled}
      fontSize={fontSize}
      onClick={onClick}
      padding={buttonPadding}
      size={buttonSize}
      bgColor={backgroundColor}
      hoverColor={hoverColor}
    >
      {children}
      {ButtonChild}
    </StyledButton>
  )
}

interface StyledButtonProps {
  boxShadow: string,
  color: string,
  disabled?: boolean,
  fontSize: number,
  padding: number,
  size: number,
  bgColor?: string,
  hoverColor: string
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background-color: ${props => !props.disabled ? props.bgColor : `${props.bgColor}55`};
  border: 0;
  border-radius: 12px;
  box-shadow: ${props => props.boxShadow};
  color: ${props => !props.disabled ? props.color : `${props.color}55`};
  cursor: pointer;
  display: flex;
  font-size: ${props => props.fontSize}px;
  font-weight: 700;
  height: ${props => props.size}px;
  justify-content: center;
  outline: none;
  padding-left: ${props => props.padding}px;
  padding-right: ${props => props.padding}px;
  pointer-events: ${props => !props.disabled ? undefined : 'none'};
  width: 100%;
  &:hover {
    background-color: ${props => props.hoverColor};
  }
`

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
`

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
`

export default Button