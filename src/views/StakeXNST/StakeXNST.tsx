import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import Spacer from '../../components/Spacer'
import StakeNST from "./components/StakeNST";
import NSTBalance from './components/NSTBalance'
import { useTranslation } from 'react-i18next'

const StakeXNST: React.FC = () => {
  // const { t } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StakeNST
            />
          </StyledCardWrapper>
          <Spacer/>
          <StyledCardWrapper>
            <NSTBalance
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
        {/* <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo>
              ℹ️️ {t('xNSTTips')} {totalSupply ? t('There are currently') + ` ${getBalanceNumber(totalSupply)} ` + t('xNST in the whole pool.') : '' }
            </StyledInfo>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/> */}
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default StakeXNST
