import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import NewCardIcon from '../../../components/NewCardIcon'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useNewEarningsSingle from '../../../hooks/useNewEarningsSingle'
import useNewRewardSingle from '../../../hooks/useNewRewardSingle'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { useTranslation } from 'react-i18next'

interface HarvestProps {
  icon: string
}

const Harvest: React.FC<HarvestProps> = ({icon} ) => {
  const earnings = useNewEarningsSingle()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useNewRewardSingle()
  const { t } = useTranslation()
  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <NewCardIcon icon = {icon}></NewCardIcon>
            {/* <Value value={getBalanceNumber(earnings)} /> */}
            <Value value={'##.##'} />
            <Label text={t('tradeFarmPendingTip')} />
          </StyledCardHeader>
          <StyledGrandTotal>
            <StyledGrandTotalTitle>{t('grandTotalTitle')}</StyledGrandTotalTitle>
            <StyledGrandTotalAmount>{'####,##'} NEW</StyledGrandTotalAmount>
          </StyledGrandTotal>
          <StyledCardActions>
            <Button
              size = 'new'
              variant = 'green'
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? t('Collecting NEW') : t('Harvest')}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
            />
          </StyledCardActions>
          <StyledUpdate>{t('tradeFarmUpdateTip')}</StyledUpdate>
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
