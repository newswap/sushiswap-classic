import React from 'react'
import styled, { keyframes } from 'styled-components'

import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface MobileMenuProps {
  onDismiss: () => void
  visible?: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onDismiss, visible }) => {
  const { t } = useTranslation()

  if (visible) {
    return (
      <StyledMobileMenuWrapper>
        <StyledBackdrop onClick={onDismiss} />  
        <StyledMobileMenu>
          <StyledLink exact activeClassName="active" to="/" onClick={onDismiss}>
            {t('Home')}
          </StyledLink>
          <StyledLink
            exact
            activeClassName="active"
            to="/nodeFarms"
            onClick={onDismiss}
          >
            {t('NodeFarms')}           
          </StyledLink>
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
          </StyledLink>
        </StyledMobileMenu>
      </StyledMobileMenuWrapper>
    )
  }
  return null
}



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

export default MobileMenu
