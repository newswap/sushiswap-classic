import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import coin from '../../assets/img/new.a6cfc11f.png'
import chef from '../../assets/img/chef.png'
import Container from '../../components/Container'

import Button from '../../components/Button'
import Page from '../../components/Page'
import Spacer from '../../components/Spacer'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import Farm from '../Farm'
import Balances from './components/Balances'

import FarmCards from './components/FarmCards'
import { useTranslation } from 'react-i18next'

const Farms: React.FC = () => {
  const { t } = useTranslation()

  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={coin} height="95" />}
                // subtitle="Earn SUSHI tokens by staking SushiSwap V2 SLP Tokens. Note: Current APY does not include 2/3rd SUSHI emission that is locked and will be retroactively disbursed at a later date."
                title={t('NST Farms')}
                subtitle={t('nstFarmsTips')}
              />
              <Container>
                <Balances />
              </Container>
              <Spacer size="lg" />
              <FarmCards />
            </Route>
            <Route path={`${path}/:farmId`}>
              <Farm />
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

export default Farms
