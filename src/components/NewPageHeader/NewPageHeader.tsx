import React from 'react'
import styled from 'styled-components'

import Container from '../Container'

interface NewPageHeaderProps {
  iconL: string//React.ReactNode
  iconR: string //React.ReactNode
  subtitle?: string
  title?: string
}

const NewPageHeader: React.FC<NewPageHeaderProps> = ({ iconL, iconR, subtitle, title }) => {
  return (
    <Container size="sm">
      <StyledPageHeader>
        <div>
            <StyledIcon><StyledImg src={iconL}/></StyledIcon>
            <StyledIcon><StyledImg src={iconR}/></StyledIcon>
        </div>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
      </StyledPageHeader>
    </Container>
  )
}

const StyledImg = styled.img `
    height: 85px;
    width: 85px;
    margin: 2px;
`

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
  padding-top: ${(props) => props.theme.spacing[6]}px;
  margin: 0 auto;
`

const StyledIcon = styled.div`
  margin: 0px;
  float: left;
  padding: 0px;
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

export default NewPageHeader
