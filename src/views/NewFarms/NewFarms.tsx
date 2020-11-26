import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import chef from '../../assets/img/chef.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import NewFarm from '../NewFarm'

import NewFarmCards from './components/NewFarmCards'
import { useTranslation } from 'react-i18next'

const NewFarms: React.FC = () => {
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
                icon={<img src={chef} height="120" />}
                // subtitle="Earn SUSHI tokens by staking SushiSwap V2 SLP Tokens. Note: Current APY does not include 2/3rd SUSHI emission that is locked and will be retroactively disbursed at a later date."
                subtitle={t('Earn New by staking NewSwap LP Tokens.')}
                title={t('Select Your Favorite Dishes')}
              />
              <NewFarmCards />
            </Route>
            <Route path={`${path}/:farmId`}>
              <NewFarm />
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
              text={`🔓 ` + t('Unlock Wallet')}
            />
          </div>
        )}
      </Page>
    </Switch>
  )
}

export default NewFarms
