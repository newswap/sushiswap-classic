import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import Button from '../../../components/Button'
import NewCardIcon from '../../../components/NewCardIcon'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import { getBalanceNumber, getDisplayBalance } from '../../../utils/formatBalance'
import useSwapMerkleNode from '../../../hooks/useSwapMerkleNode'
import useSwapClaimedAmount from '../../../hooks/useSwapClaimedAmount'
import useSwapClaim from '../../../hooks/useSwapClaim'
import { useTranslation } from 'react-i18next'
interface HarvestProps {
  icon: string
}

const Harvest: React.FC<HarvestProps> = ({icon} ) => {
  const merkleNode = useSwapMerkleNode()
  const claimedAmount = useSwapClaimedAmount()
  // console.log("tradeFarm harvest merkleNode:")
  // console.log(merkleNode)
  // console.log(new BigNumber(merkleNode.amount).toString())
  // console.log("claimedAmount:"+claimedAmount.toNumber())

  const [pendingTx, setPendingTx] = useState(false)
  const { onClaim } = useSwapClaim()
  const { t } = useTranslation()

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            {/* <NewCardIcon icon = {icon}></NewCardIcon> */}
            <Value value={(new BigNumber(merkleNode.amount).minus(claimedAmount)).toNumber() <= 0 ? 0 : getDisplayBalance(new BigNumber(merkleNode.amount).minus(claimedAmount))} />
            <Label text={t('NEW Earned')} />
          </StyledCardHeader>

          <StyledGrandTotal>
            <StyledGrandTotalTitle>{t('Total Rewards on Trading')}</StyledGrandTotalTitle>
            <StyledGrandTotalAmount>{getDisplayBalance(new BigNumber(merkleNode.amount))} NEW</StyledGrandTotalAmount>
          </StyledGrandTotal>
          <StyledCardActions>
            <Button
              size = 'new'
              variant = 'green'
              disabled={(new BigNumber(merkleNode.amount).minus(claimedAmount)).toNumber() <= 0 || pendingTx}
              text={pendingTx ? t('Collecting NEW') : t('Harvest')}
              onClick={async () => {
                setPendingTx(true)
                await onClaim(merkleNode.index, merkleNode.account, merkleNode.amount, merkleNode.proof)
                setPendingTx(false)
              }}
            />
          </StyledCardActions>
          {/* <StyledUpdate>{t('tradeEarnedTime')}</StyledUpdate> */}
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledUpdate = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 15px;
    font-size: 13px;
    color: #647684;
`

const StyledGrandTotal = styled.div`
    width: 100%;
    background: #F2F2F7;
    border-radius: 12px;
    padding: 5px 10px;
    margin-top: 40px;
`

const StyledGrandTotalTitle = styled.div`
    font-size: 13px;
    color: #647684;
    float: left;
`

const StyledGrandTotalAmount = styled.div`
    font-size: 13px;
    color: #647684;
    font-weight: 500;
    float: right;
`

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
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

export default Harvest
