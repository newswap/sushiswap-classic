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
import NodeFarm from '../NodeFarm'
import Balances from './components/Balances'
import { useTranslation } from 'react-i18next'
import FarmTable from './components/FarmTable'
import {isMobile} from 'react-device-detect'


const NodeFarms: React.FC = () => {
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
                title={t('Community Mining')}
                subtitle={t('communityMiningTips')}
                subsubtitle={t('communityMiningTime')}
              />
              <Container>
                <Balances />
              </Container>
              <Spacer size="lg" />

              <Container size = 'md'>
                <StyledTableDiv>
                  {isMobile? (
                    <StyleLabelMob>{t('farmList')}</StyleLabelMob>
                  ) : (
                    <StyleLabel>{t('farmList')}</StyleLabel>
                  )}
                  
                  <FarmTable dataSource = {[]}></FarmTable>
                </StyledTableDiv>
              </Container>
              <Spacer size="lg" />
            </Route>
            <Route path={`${path}/:farmId`}>
              <NodeFarm />
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

const StyledTableDiv = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0px 5px 12px 0px rgba(7,94,68,0.11);
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

const StyleLabelMob = styled.div`
  color: #607686;
  font-size: 20px;
  margin-left: 16px;
`


export default NodeFarms
