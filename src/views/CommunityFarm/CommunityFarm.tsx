import React, { useEffect, useMemo } from 'react'
import { useParams, Route, Switch, useRouteMatch } from 'react-router-dom'

import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import PageHeader from '../../components/PageHeader'
import NewPageHeader from '../../components/NewPageHeader'
import Spacer from '../../components/Spacer'
import Button from '../../components/Button'
import Page from '../../components/Page'
import useFarm from '../../hooks/useFarm'
// import useRedeem from '../../hooks/useRedeem'
import useSushi from '../../hooks/useSushi'
import { getMasterChefContract } from '../../sushi/utils'
import { getContract } from '../../utils/erc20'
// import Harvest from './components/Harvest'
// import Stake from './components/Stake'
import { useTranslation } from 'react-i18next'
import useModal from '../../hooks/useModal'
import coin from '../../assets/img/new.a6cfc11f.png'
import WalletProviderModal from '../../components/WalletProviderModal'
import Container from '../../components/Container'
import FarmCards from './components/FarmCards'

const INFO_URL = process.env.REACT_APP_INFO_URL

const CommunityFarm: React.FC = () => {
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
                                title={'社群矿区'}
                                subtitle={'参与社群创建的矿池挖矿，将对应的流动性通证质押入矿池，获得对应的代币奖励。'}
                            />
                        
                            <Spacer size="lg" />
                            <FarmCards />
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

export default CommunityFarm
