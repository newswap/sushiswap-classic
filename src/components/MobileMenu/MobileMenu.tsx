import React from 'react'
import styled, { keyframes } from 'styled-components'

import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const EXCHANGE_URL = process.env.REACT_APP_EXCHANGE_URL
const NEWSWAP_URL = process.env.REACT_APP_NEWSWAP_URL
const INFO_URL = process.env.REACT_APP_INFO_URL
const FAQ_URL = process.env.REACT_APP_FAQ_URL
interface MobileMenuProps {
  onDismiss: () => void
  visible?: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onDismiss, visible }) => {
  const { t, i18n} = useTranslation()
  const changeLanguage = () => {
    onDismiss()
    if (i18n.language == "en") {
      i18n.changeLanguage("zh-CN")
    } else {
      i18n.changeLanguage("en")
    }
  }
  if (visible) {
    return (
      <StyledMobileMenuWrapper>
        <StyledBackdrop onClick={onDismiss} />  
        <StyledMobileMenu>
          <StyledAbsoluteLink
            href={ NEWSWAP_URL }
            target="_blank"
            onClick={onDismiss}
          >
            { t('Home') }
          </StyledAbsoluteLink>
          <StyledAbsoluteLink
            href={ EXCHANGE_URL }
            target="_blank"
            onClick={onDismiss}
          >
            { t('Exchange') }
          </StyledAbsoluteLink>   
            
          <StyledLink exact activeClassName="active" to="/mainstreamMining" onClick={onDismiss}>
            {t('Mining')}
          </StyledLink>
          {/* <StyledLink
            exact
            activeClassName="active"
            to="/tradeMining"
            onClick={onDismiss}
          >
            {t('Trade Mining')}           
          </StyledLink> */}
          <StyledLink
            exact
            activeClassName="active"
            to="/communityMining"
            onClick={onDismiss}
          >
            {t('Community Mining')}           
          </StyledLink>

          <StyledLink
            exact
            activeClassName="active"
            to="/customLPMining"
            onClick={onDismiss}
          >
            {t('Custom LP Mining')}      
          </StyledLink>

          <StyledLink
            exact
            activeClassName="active"
            to="/customSingleFarms"
            onClick={onDismiss}
          >
            {t('Custom Token Mining')}         
          </StyledLink>

          <StyledAbsoluteLink
            href={ INFO_URL }
            target="_blank"
            onClick={onDismiss}
          >
            { t('Analytics') }
          </StyledAbsoluteLink>
          <StyledAbsoluteLink
            href={ FAQ_URL }
            target="_blank"
            onClick={onDismiss}
          >
            { t('FAQ') }
          </StyledAbsoluteLink>
          {/* 
          <StyledLink
            exact
            activeClassName="active"
            to="/nstFarms"
            onClick={onDismiss}
          >
            {t('NSTFarms')}           
          </StyledLink>
          <StyledLink
            exact
            activeClassName="active"
            to="/nst"
            onClick={onDismiss}
          >
            {t('NST')}    
          </StyledLink>
          <StyledLink
            exact
            activeClassName="active"
            to="/nsp"
            onClick={onDismiss}
          >
            {t('NSP')}    
          </StyledLink>

           <StyledLink 
            exact 
            activeClassName="active" 
            to="/CommunityFarm"
          >
            { t('CommunityFarm') }
          </StyledLink> */}
          <StyledLangButton onClick={changeLanguage}>
            {i18n.language!="en" ? "EN": "中文"}
          </StyledLangButton>

        </StyledMobileMenu>
      </StyledMobileMenuWrapper>
    )
  }
  return null
}

const StyledLangButton = styled.button`
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
  &:focus{
    outline: none;
    border: 0;
  }
  text-align: left;
  padding: ${(props) => props.theme.spacing[2]}px
    ${(props) => props.theme.spacing[2]}px;
`

const StyledMobileMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
`

const slideIn = keyframes`
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(-100%);
  }
`

const StyledBackdrop = styled.div`
  background-color: rgba(0,0,0,0.2);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const StyledMobileMenu = styled.div`
  animation: ${slideIn} 0.3s forwards ease-out;
  background-color: white;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 88px;
  left: calc(100% - 10px);
  width: 160px;
  border-radius: 12px;
  padding: 4px;
`

const StyledLink = styled(NavLink)`
  box-sizing: border-box;
  color: #061243;
  font-size: 16px;
  font-weight: 500;
  padding: ${(props) => props.theme.spacing[2]}px
    ${(props) => props.theme.spacing[2]}px;
  text-align: left;
  text-decoration: none;
  width: 100%;
  &:hover {
    color: #00C89D;
  }
  &.active {
    color: #00C89D;
  }
`

const StyledAbsoluteLink = styled.a`
  // color: ${(props) => props.theme.color.grey[400]};
  color: #061243;
  font-weight: 500;
  padding: ${(props) => props.theme.spacing[2]}px
    ${(props) => props.theme.spacing[2]}px;
  text-decoration: none;
  &:hover {
    // color: ${(props) => props.theme.color.grey[500]};
    color: #00C89D;
  }
  &.active {
    // color: ${(props) => props.theme.color.primary.main};
    color: #00C89D;
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

export default MobileMenu
