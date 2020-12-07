import React, { useEffect, useMemo } from 'react'
import { useParams, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Button from '../../components/Button'
import WalletProviderModal from '../../components/WalletProviderModal'
import { getNewNUSDTPairAddress } from '../../sushi/utils'
import useModal from '../../hooks/useModal'
import useSushi from '../../hooks/useSushi'
import { getContract } from '../../utils/erc20'
import Harvest from './components/Harvest'
import Stake from './components/Stake'
import { useTranslation } from 'react-i18next'

const INFO_URL = process.env.REACT_APP_INFO_URL

const Home: React.FC = () => {
  const sushi = useSushi()
  const { ethereum } = useWallet()
  const { t } = useTranslation()
  const { account } = useWallet()

  const lpTokenAddress = getNewNUSDTPairAddress(sushi)
  const lpTokenName = 'NUSDT-NEW LP'
  const earnTokenName = 'NEW'
  const name = 'NUSDT Party!'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpTokenAddress)
  }, [ethereum, lpTokenAddress])

  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <PageHeader
              icon={'👨🏻‍🍳'}
              subtitle={t('depositTokens',{lpTokenName:lpTokenName, earnTokenName:earnTokenName})}
              title={name}
            />
            <StyledFarm>
              <StyledCardsWrapper>
                <StyledCardWrapper>
                  <Harvest />
                </StyledCardWrapper>
                <Spacer />
                <StyledCardWrapper>
                  <Stake
                    lpContract={lpContract}
                    tokenName={lpTokenName}
                  />
                </StyledCardWrapper>
              </StyledCardsWrapper>
              <Spacer size="lg" />
              <StyledInfo>
                {t('depositTipsNewMine')}
              </StyledInfo>
              <Spacer size="md" />
              <StyledLink
                target="__blank"
                href={INFO_URL + `/pair/${lpTokenAddress}`}
              >
                {lpTokenName} {t('Info')}
              </StyledLink>
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
              text={`🔓 ` + t('Unlock Wallet')}
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
  width: 600px;
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
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Home
