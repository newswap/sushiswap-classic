import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import newIcon from '../../assets/img/logo.d23eaded.svg'
import newSwap from '../../assets/img/wordmark.873dadad.svg'
import { useTranslation } from 'react-i18next'
import {isMobile} from 'react-device-detect'


const Logo: React.FC = () => {
  const { t } = useTranslation()

  return (
    <StyledLogo to="/">
      
      { (isMobile) ? 
        (
          <StyledNewIconMob src={newIcon}/>
        ) : (
          <>
          <StyledNewIcon src={newIcon}/>
          <StyledSwapIcon src={newSwap}/>
          </>
        )

      }
      
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`
const StyledNewIcon = styled.img`
  height:48px;
  width: 48px;
  margin-top: -10px;
`
const StyledSwapIcon = styled.img`
  width: 117px;
`


const StyledNewIconMob = styled.img`
  height: 60px;
  width: 60px;
  margin-top: -10px;
`


const StyledText = styled.span`
  color: ${(props) => props.theme.color.grey[600]};
  font-family: 'Montserrat Regular', regular;
  font-size: 32.2;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-left: ${(props) => props.theme.spacing[2]}px;
  @media (max-width: 400px) {
    display: none;
  }
`


export default Logo
