import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import NewCardIcon from '../../../components/NewCardIcon'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useSwapStatistics from '../../../hooks/useSwapStatistics'
import { useTranslation } from 'react-i18next'

interface StatisticsProps {
  icon: string
}

const EXCHANGE_URL = process.env.REACT_APP_EXCHANGE_URL

const Statistics: React.FC<StatisticsProps> = ({icon} ) => {
  const swapStatistics = useSwapStatistics()
  const { t } = useTranslation()

  // console.log("swapStatistics:")
  // console.log(swapStatistics)

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            {/* <NewCardIcon icon = {icon}></NewCardIcon> */}
            {/* `/pair/${NEWSWAP_URL}` */}
            {/* <Value value= {t('Transaction Mining has ended')} /> */}
            <Value value= {t('pageClose')} />
            <Label text={t('pageCloseTips')} />

            {/* <Value value= {t('Total Number of Trade')} />
            <Value value= {swapStatistics.total} decimals= {0} />
            <Label text={t('My Number of Trade') + ": " + swapStatistics.number} /> */}
          </StyledCardHeader>
          {/* <StyledCardActions>
            <Button
              size = 'new'
              variant = 'green'
              text={ t('go to Exchange') }
              href={ EXCHANGE_URL }
            />
          </StyledCardActions> */}
          {/* <StyledUpdate>{t('tradeDataTime')}</StyledUpdate> */}
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

export default Statistics
