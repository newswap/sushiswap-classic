import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import {useWallet} from 'use-wallet'
import {newCoin} from '../../sushi/lib/constants'
import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'
import StakeXNST from "../StakeXNST";
import { useTranslation } from 'react-i18next'

const NST: React.FC = () => {
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
                title={t('NSTBar')}
                subtitle={t('nstBarTips')}
              />
            </Route>
            <StakeXNST/>
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

export default NST
