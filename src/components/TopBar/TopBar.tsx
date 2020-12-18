import React, { useEffect } from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'

import { isMobile } from "react-device-detect"
import { useWallet } from 'use-wallet'
import menu from '../../assets/img/menu.svg'

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const CHAINID_DEV = '1002'
const CHAINID_TEST = '1007'
const CHAINID_MAIN = '1012'

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  const { account, connect } = useWallet()
  const env = process.env.REACT_APP_CHAIN_ID
  let envTitle: string
  switch (env) {
    case CHAINID_DEV:
      envTitle = 'NewChainDevNet'
      break
    case CHAINID_TEST:
      envTitle = 'NewChainTestNet'
      break
    case CHAINID_MAIN:
    default:
      envTitle = 'NewChainMainNet'
  }

  useEffect(() => {
    if (!account && isMobile) {
      console.log("=========TopBar:mobile connect=============")
      connect('injected')
    }
  }, [])

  if (!isMobile) {
    return (
      <StyledTopBar>
        <Container size="lg">
          <StyledTopBarInner>
          <StyledLogoWrapper>
          {/* <StyledLogoWrapper paddingRight={account ? 0 : 80}> */}
              <Logo />
            </StyledLogoWrapper>
            <StyledSpacer percent={account ? 0 : 20}></StyledSpacer>
            <Nav />
            <StyleActionDiv>
              <StyledAccountButtonWrapper>
                <AccountButton />
              </StyledAccountButtonWrapper>
              <StyledEnvDiv>{envTitle}</StyledEnvDiv>
            </StyleActionDiv>
            
          </StyledTopBarInner>
        </Container>
      </StyledTopBar>
    )} else {
      return (
        <StyledTopBarMob>
          <Container size="lg">
            <StyledTopBarInner>
              <StyledLogoWrapper paddingRight={0}>
                <Logo />
              </StyledLogoWrapper> 
              <StyledSpacer percent={20}></StyledSpacer>         
              <StyledAccountButtonWrapperMob>
                <AccountButton />
                <StyledMenuButtonMob><StyledImg src={menu} onClick={onPresentMobileMenu}/></StyledMenuButtonMob>
              </StyledAccountButtonWrapperMob>
            </StyledTopBarInner>
          </Container>
        </StyledTopBarMob>
      )
    }
}

interface StyledSpacerProps {
  percent: number,
}

interface StyledLogoWrapperProps {
  paddingRight?: number,
}

const StyledSpacer = styled.div<StyledSpacerProps>`
  width: ${props => props.percent}%;
`

const StyledLogoWrapper = styled.div<StyledLogoWrapperProps>`
  // width: 260px;
  padding-right: ${props => props.paddingRight}px;
  @media (max-width: 400px) {
    width: auto;
  }
`
const StyleActionDiv = styled.div `
  // width: 100%;
`
const StyledTopBar = styled.div``

const StyledTopBarMob = styled.div`
  padding-top: 24px;
`

const StyledEnvDiv = styled.div`
  color: rgb(243,132,30);
  font-size: 16px;
  border-radius: 12px;
  align-items: center;
  background-color: rgba(243,132,30,0.06);
  border: 0;
  border-radius: 12px;
  display: flex;
  font-weight: 500;
  height: 30px;
  justify-content: center;
  outline: none;
  padding-left: 8px;
  padding-right: 8px;
  float: right;
  margin-right: 10px;
`

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`
const StyledNavWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  @media (max-width: 400px) {
    display: none;
  }
`

const StyledAccountButtonWrapper = styled.div`
  float: right;
  align-items: center;
  display: flex;
  justify-content: flex-end;
  background-color: #D4D9DD;
  border-radius: 12px;
  @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
`

const StyledAccountButtonWrapperMob = styled.div`
  align-items: center;
  text-align: right;
  justify-content: flex-end;
  @media (max-width: 500px) {
    justify-content: center;
    width: auto;
  }
  display: contents;
`

const StyledMenuButton = styled.button`
  background: #D4D9DD;
  border: 0;
  margin: 0;
  margin-left: 14px;
  outline: 0;
  padding-left: 8px;
  padding-right: 8px; 
  border-radius: 8px;
  @media (max-width: 400px) {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: center;
    width: 44px;
  }
  &:hover {
    background: rgba(243,132,30,0.06);
  }
`

const StyledMenuButtonMob = styled.button`
  height: 36px;
  width: 42px;
  background: #D4D9DD;
  border: 0;
  margin: 0;
  outline: 0;
  padding-left: 8px;
  padding-right: 8px; 
  border-radius: 8px;
  @media (max-width: 400px) {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: center;
    width: 44px;
  }
  &:hover {
    background: rgba(243,132,30,0.06);
  }
`

const StyledImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 9px;
  color: red;
  &:hover {
    border:0px solid black;
  }
`

export default TopBar
