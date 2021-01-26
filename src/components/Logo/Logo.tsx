import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import newIcon from '../../assets/img/logo.svg'
import newSwap from '../../assets/img/wordmark.873dadad.svg'
import { useTranslation } from 'react-i18next'
import {isMobile} from 'react-device-detect'
import newSwapMine from '../../assets/img/logo_newswapmining_regular.svg'

const Logo: React.FC = () => {
  const { t } = useTranslation()

  return (
    <StyledLogo to="/">
      
      { (isMobile) ? 
        (
          <StyledNewIconMob src={newIcon}/>
        ) : (
          <>
          <StyledNewIcon src={newSwapMine} />
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
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`
const StyledNewIcon = styled.img`
  height:40px;
`
const StyledSwapIcon = styled.img`
  width: 117px;
`


const StyledNewIconMob = styled.img`
  height: 48px;
  width: 48px;
`


const StyledText = styled.span`
  color: black;
  font-family: 'Montserrat Regular', regular;
  font-size: 32.2px;
  font-weight: normal;
  margin-left: 2px;
  @media (max-width: 400px) {
    display: none;
  }
`


export default Logo
