import BigNumber from 'bignumber.js'
import React, {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import NewCardIcon from '../../../components/NewCardIcon'
import useTokenBalanceOf from '../../../hooks/useTokenBalanceOf'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import {getBalanceNumber} from '../../../utils/formatBalance'
import {contractAddresses, newCoin} from '../../../sushi/lib/constants'
import { useTranslation } from 'react-i18next'

const CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1012');

const NSPBalance: React.FC = () => {
  const { t } = useTranslation()
  
  // xnsp(nspbar)持有的nsp数量
  const nspBalance = useTokenBalanceOf(contractAddresses.nsp[CHAIN_ID], contractAddresses.xNSP[CHAIN_ID])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            {/* <CardIcon>👨🏻‍🍳</CardIcon> */}
            <NewCardIcon icon = {newCoin}></NewCardIcon>
            <Value value={nspBalance ? getBalanceNumber(nspBalance) : ''}/>
            <Label text={t('nspBalance')}/>
          </StyledCardHeader>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default NSPBalance
