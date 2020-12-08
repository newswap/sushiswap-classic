import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import Spacer from '../../components/Spacer'
import useSushi from '../../hooks/useSushi'
import {getContract} from '../../utils/erc20'
import UnstakeXNST from './components/UnstakeXNST'
import StakeNST from "./components/StakeNST";

import {contractAddresses} from '../../sushi/lib/constants'
import {getXNSTSupply} from "../../sushi/utils";
import BigNumber from "bignumber.js";
import {getBalanceNumber} from "../../utils/formatBalance";
import { useTranslation } from 'react-i18next'

const CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1');

const StakeXNST: React.FC = () => {
  const {
    tokenAddress,
  } = {
    tokenAddress: contractAddresses.xNST[CHAIN_ID],
  }

  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const { t } = useTranslation()

  const sushi = useSushi()
  const {ethereum} = useWallet()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getXNSTSupply(sushi)
      setTotalSupply(supply)
    }
    if (sushi) {
      fetchTotalSupply()
    }
  }, [sushi, setTotalSupply])



  const lpContract = useMemo(() => {
    // debugger
    return getContract(ethereum as provider, tokenAddress)
  }, [ethereum, tokenAddress])

  return (
    <>
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <UnstakeXNST
              lpContract={lpContract}
            />
          </StyledCardWrapper>
          <Spacer/>
          <StyledCardWrapper>
            <StakeNST
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo>
              ℹ️️ {t('xNSTTips')} {totalSupply ? t('There are currently') + ` ${getBalanceNumber(totalSupply)} ` + t('xNST in the whole pool.') : '' }
            </StyledInfo>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
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
