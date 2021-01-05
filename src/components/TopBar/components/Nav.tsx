import React, { createContext, useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'


const EXCHANGE_URL = process.env.REACT_APP_EXCHANGE_URL
const NEWSWAP_URL = process.env.REACT_APP_NEWSWAP_URL


const Nav: React.FC = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">
        { t('Home') }
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/TradeFarm">
        { t('TradeFarm') }
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/nodeFarms">
        { t('NodeFarms') }
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/nstFarms">
        { t('NSTFarms') }
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/nst">
        { t('NST') }
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/nsp">
        { t('NSP') }
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/CommunityFarm">
        { t('CommunityFarm') }
      </StyledLink>
      {/* <StyledAbsoluteLink
        href={ EXCHANGE_URL }
        target="_blank"
      >
        { t('Exchange') }
      </StyledAbsoluteLink> */}
      {/* <StyledAbsoluteLink
        href={ NEWSWAP_URL }
        target="_blank"
      >
        { t('About') }
      </StyledAbsoluteLink> */}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  // color: ${(props) => props.theme.color.grey[400]};
  color: #061243;
  font-weight: 500;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
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
  word-break: keep-all;
`

const StyledAbsoluteLink = styled.a`
  // color: ${(props) => props.theme.color.grey[400]};
  color: #061243;
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
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

export default Nav
