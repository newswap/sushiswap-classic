import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import styled from 'styled-components'

import coin from '../../assets/img/new.a6cfc11f.png'
import Container from '../../components/Container'
import Button from '../../components/Button'
import Page from '../../components/Page'
import Spacer from '../../components/Spacer'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'
import useModal from '../../hooks/useModal'
import MainstreamFarm from '../MainstreamFarm'
import Balances from './components/Balances'
import FarmCards from './components/FarmCards'
import { useTranslation } from 'react-i18next'

const CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1012')

const Farms: React.FC = () => {
  const { t } = useTranslation()

  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  // 第三期结束时间 4月16 12:00(utc+8)
  const endTime = 1618545600000

  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={coin} height="95" />}
                title={t('Mining')}
                subtitle={t('mainstreamMiningTips')}
                subsubtitle={CHAIN_ID===1007 ? t('mainstreamMiningTimeTest') : (new Date().getTime() < endTime ? t('mainstreamMiningTime') : '')}         
              />
              <Container>
                <Balances />
              </Container>
              <Container>
              <StyledRedeemDiv>{t('redeemTip')}</StyledRedeemDiv>
              </Container>
              <Spacer size="lg" />
              <FarmCards />
            </Route>
            <Route path={`${path}/:farmId`}>
              <MainstreamFarm />
            </Route>
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={onPresentWalletProviderModal}
              text={t('Unlock Wallet')}
              size = 'new'
              variant = 'green'
            />
          </div>
        )}
      </Page>
    </Switch>
  )
}

const StyledRedeemDiv = styled.div`
  color: #607686;
  float: right;
  font-size: 16px;
  margin-top: 4px;
  margin-left: 12px;
`

export default Farms
