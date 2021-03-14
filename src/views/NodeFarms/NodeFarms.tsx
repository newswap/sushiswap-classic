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
import useUpdateNewPerLPAll from '../../hooks/useUpdateNewPerLPAll'
import useModal from '../../hooks/useModal'
import NodeFarm from '../NodeFarm'
import Balances from './components/Balances'
import { useTranslation } from 'react-i18next'
import FarmTable from './components/FarmTable'
import {isMobile} from 'react-device-detect'

const APPLY_FOR_COMMUNITY = process.env.REACT_APP_APPLY_FOR_COMMUNITY
const CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1012')

const NodeFarms: React.FC = () => {
  const { t } = useTranslation()

  const { path } = useRouteMatch()
  const { account } = useWallet()
  const { onUpdatePrice } = useUpdateNewPerLPAll()

  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  const updatePrice = async () => {
    await onUpdatePrice()
  }

  // 挖矿开始时间 1615780800000
  const startTime = 1615780800000
  
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
                subsubtitle={new Date().getTime() > startTime ? t('communityMiningTime') : ''}         
              />
              <Container>
                <Balances />
              </Container>
              <Container>
              <StyledRedeemDiv>{t('redeemTip')}</StyledRedeemDiv>
              </Container>
              <Spacer size="lg" />
              
              <Container>
                <StyledLink
                  target="__blank"
                  href= {APPLY_FOR_COMMUNITY}
                >
                  {t('Apply Creating Community Pool')}
                </StyledLink>
              </Container>
              <Spacer size="sm" />

              <Container size = 'md'>
                <StyledTableDiv>
                  {isMobile? (
                    <>
                    <StyleLabelMob>
                      <div>{t('Pool List')}</div>
                      {/* <StyledUpdateMobButton onClick={updatePrice}>{t('Update Price')}
                      </StyledUpdateMobButton> */}
                    </StyleLabelMob>
                    
                    </>
                  ) : (
                    <>
                    <StyleLabel>
                      <div>{t('Pool List')}</div>
                      {/* <StyledUpdateButton onClick={updatePrice}>{t('Update Price')}</StyledUpdateButton> */}
                    </StyleLabel>
                    
                    </>
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

const StyledUpdateMobButton = styled.button`
  float: right;
  margin-top: -26px;
  margin-right: 10px;
  font-size: 16px;
  border-width: 0;
  background: white;
  color: #20C5A0;
  cursor: pointer;
  &:focus{
    outline: none;
    border: 0;
  }
`

const StyledUpdateButton = styled.button`
  float: right;
  margin-top: -26px;
  margin-right: 30px;
  font-size: 16px;
  border-width: 0;
  background: white;
  color: #20C5A0;
  cursor: pointer;
  &:focus{
    outline: none;
    border: 0;
  }
`

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

const StyledLink = styled.a`
  float: right;
  color: #607686;
  padding-right: 10px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

const StyledRedeemDiv = styled.div`
  color: #607686;
  float: right;
  font-size: 16px;
  margin-top: 4px;
  margin-left: 12px;
`

export default NodeFarms
