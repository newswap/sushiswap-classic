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
import Value from '../../../components/Value'
import useAllowance from '../../../hooks/useAllowance'
import useApprove from '../../../hooks/useApprove'
import useModal from '../../../hooks/useModal'
import useStake from '../../../hooks/useStake'
import useStakedBalance from '../../../hooks/useStakedBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useUnstake from '../../../hooks/useUnstake'
import useNSTPerBlock from '../../../hooks/useNSTPerBlock'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import { useTranslation } from 'react-i18next'
import LazyIcon from '../../../components/LazyIcon'

interface StakeProps {
  lpContract: Contract
  pid: number
  tokenName: string
  // iconL: string
  iconR: string
  tokenAddress: string
}

const Stake: React.FC<StakeProps> = ({ lpContract, pid, tokenName, iconR, tokenAddress }) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { t } = useTranslation()

  const allowance = useAllowance(lpContract)
  const nstPerBlock = useNSTPerBlock(pid)

  const { onApprove } = useApprove(lpContract)

  const tokenBalance = useTokenBalance(lpContract.options.address)
  const stakedBalance = useStakedBalance(pid)

  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)

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
            {/* <CardIcon>👨🏻‍🍳</CardIcon> */}
            <StyledDiv>
              <StyledImg src={iconR}></StyledImg>
              {/* <StyledImgR src={iconL}></StyledImgR> */}
              <LazyIcon address={tokenAddress} customStyle={iconStyle}/>

            </StyledDiv>
            <Spacer height={20}></Spacer>
            <Value value={getBalanceNumber(stakedBalance)} />
            <Label text={`${tokenName} ` + t('Tokens Staked')} />
            <Label text={t('nstPerBlock',{nst:nstPerBlock})} />
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
                  // disabled={stakedBalance.eq(new BigNumber(0))}
                  disabled={false}
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

const StyledDiv = styled.div`
  width: 86px;

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
interface SpacerProps{
  height: number
}

const Spacer = styled.div<SpacerProps>`
  height: ${props => props.height}px;
`

const iconStyle: React.CSSProperties = {
  float: 'left',
  width: '60px',
  height: '60px',
  borderRadius: '30px',
  marginRight: '-26px',
  marginTop: '-60px',
}

export default Stake
