import React, { createContext, useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'


const EXCHANGE_URL = process.env.REACT_APP_EXCHANGE_URL
const NEWSWAP_URL = process.env.REACT_APP_NEWSWAP_URL
const INFO_URL = process.env.REACT_APP_INFO_URL
const FAQ_URL = process.env.REACT_APP_FAQ_URL

const Nav: React.FC = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <StyledNav>
      <StyledAbsoluteLink
        href={ NEWSWAP_URL }
        target="_blank"
      >
        { t('Home') }
      </StyledAbsoluteLink>
      <StyledAbsoluteLink
        href={ EXCHANGE_URL }
        target="_blank"
      >
        { t('Exchange') }
      </StyledAbsoluteLink>
      <StyledLink exact activeClassName="active" to="/mainstreamMining">
        { t('Mining') }
      </StyledLink>
      {/* <StyledLink exact activeClassName="active" to="/tradeMining">
        { t('Trade Mining') }
      </StyledLink> */}
      <StyledLink exact activeClassName="active" to="/communityMining">
        { t('Community Mining') }
      </StyledLink>
      <StyledCustomDiv>
        { t('Custom Mining')}
        <StyledDropDown id="dropdownContent">
          <StyledLink exact activeClassName="active" to="/customLPMining">
            { t('LP Mining')}
          </StyledLink>
          <StyledLink exact activeClassName="active" to="/customSingleFarms">
            单通证挖矿
          </StyledLink>
        </StyledDropDown>
      </StyledCustomDiv>
      {/* 
      <StyledLink exact activeClassName="active" to="/nstFarms">
        { t('NSTFarms') }
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/nst">
        { t('NST') }
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/nsp">
        { t('NSP') }
      </StyledLink> */}

      {/* <StyledLink exact activeClassName="active" to="/CommunityFarm">
        { t('CommunityFarm') }
      </StyledLink> */}
      <StyledAbsoluteLink
        href={ INFO_URL }
        target="_blank"
      >
        { t('Analytics') }
      </StyledAbsoluteLink>
      <StyledAbsoluteLink
        href={ FAQ_URL }
        target="_blank"
      >
        { t('FAQ') }
      </StyledAbsoluteLink>
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
  float: left;
  margin-top: 4px;
`

const StyledLink = styled(NavLink)`
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
const StyledCustomDiv = styled.div `
  color: #061243;
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover #dropdownContent {
    display: flex;
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
  cursor: pointer;
`

const StyledDropDown = styled.div `
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 10px 4px;
  flex-direction: column;
`

export default Nav
