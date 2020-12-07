import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
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
}

const Harvest: React.FC<HarvestProps> = () => {
  const earnings = useNewEarningsSingle()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useNewRewardSingle()
  const { t } = useTranslation()

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>🍣</CardIcon>
            <Value value={getBalanceNumber(earnings)} />
            <Label text={t('NEW Earned')} />
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? t('Collecting NEW') : t('Harvest')}
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

export default Harvest
