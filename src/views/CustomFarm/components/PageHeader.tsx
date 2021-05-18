import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Container from '../../../components/Container'
import LazyIcon from '../../../components/LazyIcon'

interface PageHeaderProps {
  icon: string
  subtitle?: string
  title?: string
  status?: number
  tokenName?: string
  amount?: string
  time?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title, status, tokenName, amount, time }) => {
  const { t } = useTranslation()

  return (
    <Container size="lg">
      <StyledPageHeader>
        <LazyIcon address={icon} customStyle={iconStyle}/>
        {/* <StyledIcon>{icon}</StyledIcon> */}
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
            {   
                status == 0 ? 
                    (                 
                        <>
                            <StyledSubtitle>{t('Total')} <StyledSpan>{amount} {tokenName}</StyledSpan>; {t('Countdown To Mining Start')}： <StyledSpan>{time}</StyledSpan></StyledSubtitle>
                        </>
                    ) : ( status == 1 ? (
                            <>
                                <StyledSubtitle>{t('Total')} <StyledSpan>{amount} {tokenName}</StyledSpan>; {t('Countdown To Mining End')}： <StyledSpan>{time}</StyledSpan></StyledSubtitle>
                            </>
                        ) : ( status == 2 ? (
                                <>
                                    <StyledSubtitle>{t('Total')} <StyledSpan>{amount} {tokenName}</StyledSpan>; {t('Mining Already Ended')}</StyledSubtitle>
                                </>
                            ) : ( 
                                  <>
                                  </>
                            )                     
                        )  
                    )               
            }
      </StyledPageHeader>
    </Container>
  )
}

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
  font-size: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  width: 120px;
  border-radius: 22.5px;
`

const iconStyle: React.CSSProperties = {
  width: '95px',
  height: '95px',
  textAlign: 'center',
  borderRadius: '22.5px',
}


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

const StyledSpan = styled.span`
    color: #20C5A0;
`

export default PageHeader
