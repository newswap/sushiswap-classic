import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Contract } from 'web3-eth-contract'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import IconButton from '../../../components/IconButton'
import { AddIcon } from '../../../components/icons'
import Label from '../../../components/Label'
import LabelStyled from '../../../components/LabelStyled'
import Value from '../../../components/Value'
import useModal from '../../../hooks/useModal'
import useTokenBalance from '../../../hooks/useTokenBalance'

import useAllowanceNewMine from '../../../hooks/useAllowanceNewMine'
import useApproveNewMine from '../../../hooks/useApproveNewMine'
import useStakeNewMine from '../../../hooks/useStakeNewMine'
import useStakedBalanceNewMine from '../../../hooks/useStakedBalanceNewMine'
import useUnstakeNewMine from '../../../hooks/useUnstakeNewMine'

import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import { useTranslation } from 'react-i18next'

interface StakeProps {
  lpContract: Contract
  pid: number
  tokenName: string
  iconL: string
  iconR: string
}

const Stake: React.FC<StakeProps> = ({ lpContract, pid, tokenName, iconL, iconR }) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { t } = useTranslation()

  const allowance = useAllowanceNewMine(lpContract)
  const { onApprove } = useApproveNewMine(lpContract)

  const tokenBalance = useTokenBalance(lpContract.options.address)
  const stakedBalance = useStakedBalanceNewMine(pid)

  const { onStake } = useStakeNewMine(pid)
  const { onUnstake } = useUnstakeNewMine(pid)

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={tokenName}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={tokenName}
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

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <StyledDiv>
              <StyledImg src={iconR}></StyledImg>
              <StyledImgR src={iconL}></StyledImgR>
            </StyledDiv>
            <Spacer height={20}></Spacer>
            <Value value={getBalanceNumber(stakedBalance)} />
            <Label text={`${tokenName} ` + t('Tokens Staked')} />
            <Spacer height={10}></Spacer>
            <LabelStyled text={t('estimateMiningEfficient') + '：XXX'} color={'#647684'} fontSize={16}></LabelStyled>
          </StyledCardHeader>
          <StyledCardActions>
            {!allowance.toNumber() ? (
              <Button
                disabled={requestedApproval}
                onClick={handleApprove}
                text={t('Approve') + ` ${tokenName}`}
                size = 'new'
                variant = 'green'
              />
            ) : (
              <>
                <Button
                  disabled={stakedBalance.eq(new BigNumber(0))}
                  text={t('Unstake')}
                  onClick={onPresentWithdraw}
                  size = 'new'
                  variant = 'grey'
                />
                <StyledActionSpacer />
                <Button
                  disabled={false}
                  text={t('Stake')}
                  onClick={onPresentDeposit}
                  size = 'new'
                  variant = 'green'
                />
                {/* <IconButton onClick={onPresentDeposit}>
                  <AddIcon />
                </IconButton> */}
              </>
            )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledDiv = styled.div`
  width: 86px;

`
interface SpacerProps{
  height: number
}

const Spacer = styled.div<SpacerProps>`
  height: ${props => props.height}px;
`

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[4]}px;
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

const StyledImg = styled.img `
    float: left;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    margin-left: 26px;
`

const StyledImgR = styled.img `
    float: left;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    margin-right: -26px;
    margin-top: -60px;
`

export default Stake
