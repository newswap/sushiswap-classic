import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import styled from 'styled-components'
import coin from '../../assets/img/new.a6cfc11f.png'
import chef from '../../assets/img/chef.png'
import Container from '../../components/Container'
import Button from '../../components/Button'
import Page from '../../components/Page'
import Spacer from '../../components/Spacer'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'
import NewFarm from '../NewFarm'
import Balances from './components/Balances'
import NewFarmCards from './components/NewFarmCards'
import { useTranslation } from 'react-i18next'
import FarmTable from '../../components/FarmTable'


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
                icon={<img src={coin} height="120" />}
                // subtitle="Earn SUSHI tokens by staking SushiSwap V2 SLP Tokens. Note: Current APY does not include 2/3rd SUSHI emission that is locked and will be retroactively disbursed at a later date."
                title={t('New Farms')}
                subtitle={t('newFarmsTips')}
              />
              <Container>
                <Balances />
              </Container>
              <Spacer size="lg" />
              <NewFarmCards />
              <Spacer size="lg" />
       
              <Container size = 'md'>
                <StyledTableDiv>
                  <StyleLabel>矿池列表</StyleLabel>
                  <FarmTable dataSource = {[]}></FarmTable>
                </StyledTableDiv>
              </Container>
              <Spacer size="lg" />
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

const StyledTableDiv = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 3px 3px 3px 3px rgba(7,94,68,0.02);
  padding-top: 10px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 10px
`

const StyleLabel = styled.div`
  color: #607686;
  font-size: 20px;
  margin-left: 30px;
`


export default NewFarms
