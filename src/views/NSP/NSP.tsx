import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import {useWallet} from 'use-wallet'

import chef from '../../assets/img/chef.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'
import StakeXNSP from "../StakeXNSP";
import { useTranslation } from 'react-i18next'

const NSP: React.FC = () => {
  const { t } = useTranslation()

  const {path} = useRouteMatch()
  const {account} = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal/>)
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={chef} height="120"/>}
                subtitle={t('welcomeNSPBar')}
                title={t('Irasshaimase!')}
              />
            </Route>
            <StakeXNSP/>
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

export default NSP
