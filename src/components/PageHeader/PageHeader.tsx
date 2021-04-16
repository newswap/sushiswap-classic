import React from 'react'
import styled from 'styled-components'
import {isMobile} from 'react-device-detect'
import Container from '../Container'
import { Link } from 'react-router-dom'

interface PageHeaderProps {
  icon: React.ReactNode
  subtitle?: string
  subsubtitle?: string
  title?: string
  to?: string
  toTitle?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, subsubtitle, title, to, toTitle }) => {
  return (
    <Container size="lg">
      <StyledPageHeader>
        <StyledIcon>{icon}</StyledIcon>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
        <StyledSubtitle>{subsubtitle}</StyledSubtitle>
        {
          isMobile && to ? (
            <StyledNomalLink  to={to} >
              {toTitle + " >"} 
            </StyledNomalLink>
          ) : (
            <></>
          )
        }
      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = isMobile ? styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[2]}px;
  padding-top: ${(props) => props.theme.spacing[2]}px;
  margin: 0 auto;
` : styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
  padding-top: ${(props) => props.theme.spacing[6]}px;
  margin: 0 auto;
` 

const StyledIcon = styled.div`
  font-size: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  width: 120px;
`

const StyledTitle = styled.h1`
  font-family: 'PingFang SC Medium', sans-serif;
  // color: ${(props) => props.theme.color.grey[600]};
  color: #555A6A;
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  margin: 0;
  padding: 0;
`

const StyledSubtitle = styled.h3`
  font-family: 'PingFang SC Regular', sans-serif;
  // color: ${(props) => props.theme.color.grey[400]};
  color: #607686;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

const StyledNomalLink = styled(Link)`
    align-items: center;
    font-size: 14px;    
    text-decoration: none;
    color: #20C5A0;
    font-weight: 700;
    height: 20px;
    padding-top: 15px;
`

export default PageHeader
