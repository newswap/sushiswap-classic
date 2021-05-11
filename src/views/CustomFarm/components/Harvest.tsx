import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import NewCardIcon from '../../../components/NewCardIcon'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import { Contract } from 'web3-eth-contract'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useTokenEarnings from '../../../hooks/useTokenEarnings'
import useHarvestReward from '../../../hooks/useHarvestReward'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { useTranslation } from 'react-i18next'
import LazyIcon from '../../../components/LazyIcon'

interface HarvestProps {
  miningContract: Contract
  rewardsToken: string
  tokenName?: string
  tokenDecimals: number
}

const Harvest: React.FC<HarvestProps> = ({miningContract, rewardsToken, tokenName, tokenDecimals} ) => {
  const earnings = useTokenEarnings(miningContract)
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestReward(miningContract)
  const { t } = useTranslation()

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            {/* <NewCardIcon icon = {icon}></NewCardIcon> */}
            <LazyIcon address={rewardsToken} customStyle={iconStyle}/>
            <Spacer height={20} />
            <Value value={getBalanceNumber(earnings,tokenDecimals)} />
            <Label text={t('tokenEarned', {token:tokenName})} />
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              size = 'new'
              variant = 'green'
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? 'Collecting ' + tokenName : t('Harvest')}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
            />
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

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
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledSpacer = styled.div`
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

const iconStyle: React.CSSProperties = {
  width: '60px',
  height: '60px',
  borderRadius: '30px',
  // background: 'white',
}

export default Harvest
