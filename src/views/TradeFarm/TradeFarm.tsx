import React, { useEffect, useMemo } from 'react'
import { useParams, Switch } from 'react-router-dom'
import styled from 'styled-components'
import chef from '../../assets/img/chef.png'
import coin from '../../assets/img/new.a6cfc11f.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import { useWallet } from 'use-wallet'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import WalletProviderModal from '../../components/WalletProviderModal'
import useModal from '../../hooks/useModal'
import Harvest from './components/Harvest'
import { useTranslation } from 'react-i18next'
import newcoin from '../../assets/img/new.a6cfc11f.png'
import swapIcon from '../../assets/img/ic_swap_green.svg'

const TradeFarm: React.FC = () => {
    const { account } = useWallet()
    const { t } = useTranslation()
    const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

    return (
        <Switch>
          <Page>
            {!!account ? (
              <>
                <PageHeader
                    icon={<img src={swapIcon} height="95" />}
                // subtitle="Earn SUSHI tokens by staking SushiSwap V2 SLP Tokens. Note: Current APY does not include 2/3rd SUSHI emission that is locked and will be retroactively disbursed at a later date."
                    title={t('Trade Mining')}
                    subtitle={t('tradeFarmsTips')}
                />
                <StyledFarm>
                  <StyledCardsWrapper>
                    <StyledCardWrapper>
                      <Harvest icon={newcoin}/>
                    </StyledCardWrapper>
                    {/* <Spacer />
                    <StyledCardWrapper> */}
                      {/* <Stake
                        lpContract={lpContract}
                        tokenName={lpTokenName}
                        iconL={iconL}
                        iconR={iconR}
                      /> */}
                    {/* </StyledCardWrapper> */}
                  </StyledCardsWrapper>
                  <Spacer size="lg" />
                  {/* <StyledLink
                    target="__blank"
                    href={INFO_URL + `/pair/${lpTokenAddress}`}
                  >
                    {lpTokenName} {t('Info')}
                  </StyledLink> */}
                  {/* <Spacer size="lg" /> */}
    
                </StyledFarm>
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
                  size = 'new'
                  variant = 'green'
                  text={t('Unlock Wallet')}
                />
              </div>
            )}
          </Page>
        </Switch>
      )

}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 310px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
  box-shadow: 0px 5px 12px 0px rgba(7,94,68,0.11);
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

const StyledLink = styled.a`
  color: #607686;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
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
`

export default TradeFarm