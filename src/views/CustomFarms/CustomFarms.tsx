import React, { useEffect, useMemo } from 'react'
import { useParams, Route, Switch, useRouteMatch } from 'react-router-dom'

import { useWallet } from 'use-wallet'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Button from '../../components/Button'
import Page from '../../components/Page'
import { useTranslation } from 'react-i18next'
import useModal from '../../hooks/useModal'
import coin from '../../assets/img/new.a6cfc11f.png'
import WalletProviderModal from '../../components/WalletProviderModal'
import FarmTable from './components/FarmTable'
import Container from '../../components/Container'
import styled from 'styled-components'
import CustomFarm from '../CustomFarm'


interface CustomFarmsProps {
    stakeTokenType: 'lpToken' | 'singleToken'
}

const CustomFarms: React.FC<CustomFarmsProps> = ({stakeTokenType}) => {
    const { t } = useTranslation()

    const { path } = useRouteMatch()
    const { account } = useWallet()
    const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

    return (
        <Switch>
            <Page>
                {/* {!!account ? ( */}
                    <>
                        <Route exact path={path}>
                            <PageHeader
                                icon={<img src={coin} height="95" />}
                                title={stakeTokenType === 'lpToken' ? t('Customized Mining - Liquidity Mining') : t('Customized Mining - Single Token Mining')}
                                subtitle={t('customMiningTips')}
                                to={stakeTokenType === 'lpToken' ? '/customCreateLPMining' : '/customCreateSingleMining'}
                                toTitle={t('Create Customized Mining Pool')}
                            />
                        
                            <Spacer size="lg" />
                            <Container size = 'md'>
                                <StyledTableDiv>
                                    <FarmTable stakeTokenType={stakeTokenType} ></FarmTable>
                                 </StyledTableDiv>
                            </Container>
                            <Spacer size="lg" />
                            <Spacer size="lg" />
                        </Route>
                        <Route path={`${path}/:farmId`}>
                            <CustomFarm />
                        </Route>
                    </>
{/* 
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
                 */}
            </Page>
        </Switch> 
    )
}

const StyledTableDiv = styled.div`
//   background: white;
//   border-radius: 12px;
//   box-shadow: 0px 5px 12px 0px rgba(7,94,68,0.11);
//   padding-top: 10px;
//   padding-left: 0px;
//   padding-right: 0px;
//   padding-bottom: 10px
`

export default CustomFarms