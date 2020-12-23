import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import {useWallet} from 'use-wallet'
import {newCoin} from '../../sushi/lib/constants'
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
                icon={<img src={newCoin} height="95" />}
                title={t('NSPBar')}
                subtitle={t('nspBarTips')}
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

export default NSP
