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
  const env = process.env.REACT_APP_NEWCHAIN_RPC
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
              <Logo />
            </StyledLogoWrapper>
            <Nav />
            <StyleActionDiv>
              <StyledEnvDiv>{envTitle}</StyledEnvDiv>
              <StyledAccountButtonWrapper>
                <AccountButton />
              </StyledAccountButtonWrapper>
            </StyleActionDiv>
            
          </StyledTopBarInner>
        </Container>
      </StyledTopBar>
    )} else {
      return (
        <StyledTopBarMob>
          <Container size="lg">
            <StyledTopBarInner>
              <StyledLogoWrapper>
                <Logo />
              </StyledLogoWrapper>          
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

const StyledLogoWrapper = styled.div`
  // width: 260px;
  @media (max-width: 400px) {
    width: auto;
  }
`
const StyleActionDiv = styled.div `
  width: 280px;

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
  float: left;
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
  align-items: center;
  display: flex;
  justify-content: flex-end;
  // width: 156px;
  @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
`

const StyledAccountButtonWrapperMob = styled.div`
  align-items: center;
  text-align: right;
  justify-content: flex-end;
  // width: 156px;
  @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
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
  margin-left: 14px;
  margin-top: 10px;
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
