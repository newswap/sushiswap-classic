import BigNumber from 'bignumber.js'
import React, {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import NewCardIcon from '../../../components/NewCardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useModal from '../../../hooks/useModal'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useTokenBalanceOf from '../../../hooks/useTokenBalanceOf'
import useTotalSupply from '../../../hooks/useTotalSupply'
import {getBalanceNumber} from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from "./WithdrawModal"
import {getXNSPSupply} from "../../../sushi/utils";
import {contractAddresses, newCoin} from '../../../sushi/lib/constants'
import useEnterXNSP from "../../../hooks/useEnterXNSP"
import useLeaveXNSP from "../../../hooks/useLeaveXNSP"
import useAllowanceNSP from "../../../hooks/useAllowanceNSP"
import useApproveNSP from "../../../hooks/useApproveNSP"
import useSushi from '../../../hooks/useSushi'
import { useTranslation } from 'react-i18next'

interface StakeProps {
}

const CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1012');

const StakeNSP: React.FC<StakeProps> = ({}) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const allowance = useAllowanceNSP()
  const {onApprove} = useApproveNSP()
  const sushi = useSushi()
  const { t } = useTranslation()

  const nspBalance = useTokenBalance(contractAddresses.nsp[CHAIN_ID])
  const xNSPBalance = useTokenBalance(contractAddresses.xNSP[CHAIN_ID])
  const [rate, setRate] = useState<BigNumber>()

  const {onEnter} = useEnterXNSP()
  const {onLeave} = useLeaveXNSP()

  // xnsp(nspbar)持有的nsp数量
  const totalNSP = useTokenBalanceOf(contractAddresses.nsp[CHAIN_ID], contractAddresses.xNSP[CHAIN_ID])
  const totalShares = useTotalSupply(contractAddresses.xNSP[CHAIN_ID])

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={nspBalance}
      onConfirm={onEnter}
      tokenName={'NSP'}
      totalNSP={totalNSP}
      totalShares={totalShares}
    />,
  )

  const [onPresentLeave] = useModal(
    <WithdrawModal
      max={xNSPBalance}
      onConfirm={onLeave}
      tokenName={'xNSP'}
      totalNSP={totalNSP}
      totalShares={totalShares}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onApprove, setRequestedApproval])

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getXNSPSupply(sushi)
      if(supply.toNumber() == 0 || xNSPBalance.toNumber() == 0){
        setRate(new BigNumber(0))
      } else {
        setRate(xNSPBalance.div(supply))
      }
    }
    if (sushi) {
      fetchTotalSupply()
    }
  }, [sushi, xNSPBalance, setRate])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <NewCardIcon icon = {newCoin}></NewCardIcon>
            <Value value={getBalanceNumber(xNSPBalance)}/>
            <Label text={t('xNSP Available')}/>
            <Label text={rate ? t('rate') + `${rate.times(new BigNumber(100)).toNumber().toLocaleString('en-US').slice(0)} ` + `%` : ''} />
          </StyledCardHeader>
          <StyledCardActions>
            {!allowance.toNumber() ? (
              <Button
                disabled={requestedApproval}
                onClick={handleApprove}
                text={t('Approve NSP')}
                size = 'new'
                variant = 'green'
              />
            ) : (
              <>
                <Button
                  disabled={!xNSPBalance.toNumber()}
                  text={t('Unstake')}
                  onClick={onPresentLeave}
                  size = 'new'
                  variant = 'grey'
                />
                <StyledActionSpacer />
                <Button
                  disabled={nspBalance.eq(new BigNumber(0))}
                  text={t('Stake')}
                  onClick={onPresentDeposit}
                  size = 'new'
                  variant = 'green'
                />
              </>
            )}
          </StyledCardActions>
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

export default StakeNSP
