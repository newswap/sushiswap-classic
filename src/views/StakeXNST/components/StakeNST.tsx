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
import {getXNSTSupply} from "../../../sushi/utils";
import WithdrawModal from "./WithdrawModal"
import DepositModal from './DepositModal'
import {contractAddresses, newCoin} from '../../../sushi/lib/constants'
import useEnter from "../../../hooks/useEnter"
import useLeave from "../../../hooks/useLeave"
import useSushi from '../../../hooks/useSushi'
import useAllowanceStaking from "../../../hooks/useAllowanceStaking"
import useApproveStaking from "../../../hooks/useApproveStaking"
import { useTranslation } from 'react-i18next'

interface StakeProps {

}

const CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1012');

const StakeNST: React.FC<StakeProps> = ({}) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const allowance = useAllowanceStaking()
  const {onApprove} = useApproveStaking()
  const sushi = useSushi()
  const { t } = useTranslation()

  const nstBalance = useTokenBalance(contractAddresses.nst[CHAIN_ID])
  const xNSTBalance = useTokenBalance(contractAddresses.xNST[CHAIN_ID])
  const [rate, setRate] = useState<BigNumber>()

  const {onEnter} = useEnter()
  const {onLeave} = useLeave()

  // xnst(nstbar)持有的nst数量
  const totalNST = useTokenBalanceOf(contractAddresses.nst[CHAIN_ID], contractAddresses.xNST[CHAIN_ID])
  const totalShares = useTotalSupply(contractAddresses.xNST[CHAIN_ID])
  
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={nstBalance}
      onConfirm={onEnter}
      tokenName={"NST"}
      totalNST={totalNST}
      totalShares={totalShares}
    />,
  )

  const [onPresentLeave] = useModal(
    <WithdrawModal
      max={xNSTBalance}
      onConfirm={onLeave}
      tokenName={"xNST"}
      totalNST={totalNST}
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
      const supply = await getXNSTSupply(sushi)
      if(supply.toNumber() == 0 || xNSTBalance.toNumber() == 0){
        setRate(new BigNumber(0))
      } else {
        setRate(xNSTBalance.div(supply))
      }
    }
    if (sushi) {
      fetchTotalSupply()
    }
  }, [sushi, xNSTBalance, setRate])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            {/* <CardIcon>🍣</CardIcon> */}
            <NewCardIcon icon = {newCoin}></NewCardIcon>
            <Value value={getBalanceNumber(xNSTBalance)}/>
            <Label text={t('xNST Available')}/>
            <Label text={rate ? t('rate') + `${rate.times(new BigNumber(100)).toNumber().toLocaleString('en-US').slice(0)} ` + `%` : ''} />
          </StyledCardHeader>
          <StyledCardActions>
            {!allowance.toNumber() ? (
              <Button
                disabled={requestedApproval}
                onClick={handleApprove}
                text={t('Approve NST')}
                size = 'new'
                variant = 'green'
              />
            ) : (
              <>
                <Button
                  disabled={!xNSTBalance.toNumber()}
                  text={t('Unstake')}
                  onClick={onPresentLeave}
                  size = 'new'
                  variant = 'grey'
                />
                <StyledActionSpacer />
                <Button
                  disabled={nstBalance.eq(new BigNumber(0))}
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

export default StakeNST
