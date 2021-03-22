import BigNumber from 'bignumber.js'
import React, { useEffect, useMemo } from 'react'
import { useParams, Switch } from 'react-router-dom'
import styled from 'styled-components'
import {newCoin} from '../../sushi/lib/constants'
import Button from '../../components/Button'
import { useWallet } from 'use-wallet'
import Page from '../../components/Page'
import NewPageHeader from '../../components/NewPageHeader'
import Spacer from '../../components/Spacer'
import WalletProviderModal from '../../components/WalletProviderModal'
import useMainstreamFarm from '../../hooks/useMainstreamFarm'
import useModal from '../../hooks/useModal'
import useTokenBalanceOf from '../../hooks/useTokenBalanceOf'
import useTotalSupply from '../../hooks/useTotalSupply'
import useNewPrice from '../../hooks/useNewPrice'
import Harvest from './components/Harvest'
import Stake from './components/Stake'
import { useTranslation } from 'react-i18next'
import {contractAddresses} from '../../sushi/lib/constants'

const CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1012')
const INFO_URL = process.env.REACT_APP_INFO_URL
const BLOCKS_PER_YEAR = new BigNumber(10512000)

const Farm: React.FC = () => {
  const { ethereum, account } = useWallet()
  const { t } = useTranslation()

  const { farmId } = useParams()
  // console.log("farmId:"+farmId)
  const {
    lpToken,
    lpTokenAddress,
    lpContract,
    tokenAddress,
    tokenSymbol,
    miningAddress,
    miningContract,
    newPerBlock
  } = useMainstreamFarm(farmId) || {
    lpToken: '',
    lpTokenAddress: '',
    lpContract: null,
    tokenAddress: '',
    tokenSymbol: '',
    miningAddress: '',
    miningContract: null,
    newPerBlock:0
  }

  // 锁仓合约质押的lp数量
  const lpBalance = useTokenBalanceOf(lpTokenAddress, miningAddress)
  // console.log("lpBalance:"+lpBalance.toNumber())
  // lp总量
  const totalSupply = useTotalSupply(lpTokenAddress)
  // console.log("totalSupply:"+totalSupply.toNumber())
  // lp合约持有的new数量
  const newBalance = useTokenBalanceOf(contractAddresses.weth[CHAIN_ID], lpTokenAddress)
  // console.log("newBalance:"+newBalance.toNumber())
  const newPrice = useNewPrice()
  // console.log("newPrice:"+newPrice.toNumber())
  // 锁仓合约质押LP对应价值NEW数量
  const newAmount = lpBalance.div(new BigNumber(10).pow(18)).times(newBalance).times(2).div(totalSupply)
  // console.log("newPerLP:" + newBalance.times(2).div(totalSupply))
  // console.log("newValue:"+newAmount.toNumber())

  // 挖矿开始时间 1615780800000
  const startTime = 1615780800000

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (

    <Switch>
      <Page>
        {!!account ? (
          <>
            <NewPageHeader
              iconR={newCoin}
              tokenAddress={tokenAddress}
              subtitle= {t('stakeSubtitle', {tokenSymbol: tokenSymbol, new: 'NEW', token: 'NEW'})} 
              subsubtitle={CHAIN_ID===1007 ? t('mainstreamMiningTimeTest') : (new Date().getTime() > startTime ? t('mainstreamMiningTime') : '')}
              title={ tokenSymbol + '-NEW ' + t('MINING')}
            />
            <StyledTotalBaseDiv>
              <StyledTotalDiv>
                { new Date().getTime() > startTime ? 
                     `${t('Total Stake Value')}: 
                        ${newAmount.toNumber() > 0 ? '$'+newAmount.times(newPrice).toNumber().toLocaleString('en-US') : '$0.00'}`
                      : t('unMingClose')
                }
              </StyledTotalDiv>
              <StyledSpeedDiv>
                { new Date().getTime() > startTime ? 
                      `${t('APY（Estimated）')}:
                          ${newAmount.toNumber() > 0 ? 
                              BLOCKS_PER_YEAR.times(new BigNumber(newPerBlock)).div(newAmount).times(new BigNumber(100)).toNumber().toLocaleString('en-US') + '%' : '-'}`
                      : t('unMingCloseTips')
                }
              </StyledSpeedDiv>
              {/* <StyledSpeedDiv>
                {t('Total Stake')}: {getFormatDisplayBalance(lpBalance, 18, 6)} LP
              </StyledSpeedDiv> */}
              {/* <StyledSpeedDiv>
                {t('newPerBlock',{new:NEW_PER_BLOCK})}
              </StyledSpeedDiv> */}
            </StyledTotalBaseDiv>
            <Spacer />
            <StyledFarm>
              <StyledCardsWrapper>
                <StyledCardWrapper>
                  <Harvest 
                    miningContract={miningContract}
                    icon={newCoin}
                  />
                </StyledCardWrapper>
                <Spacer />
                <StyledCardWrapper>
                  <Stake
                    lpContract={lpContract}
                    miningContract={miningContract}
                    tokenName={lpToken}
                    tokenAddress = {tokenAddress}
                    iconR={newCoin}
                  />
                </StyledCardWrapper>
              </StyledCardsWrapper>
              <Spacer size="lg" />
              <StyledLink
                target="__blank"
                href={INFO_URL + `/pair/${lpTokenAddress}`}
              >
                {lpToken} {t('Info')}
              </StyledLink>
              <Spacer size="lg" />

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

const StyledTotalBaseDiv = styled.div`
  
  background: white;
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
  padding-top: 16px;
  padding-bottom: 16px;
  box-shadow: 0px 5px 12px 0px rgba(7,94,68,0.11);
  border-radius: 12px;
`
const StyledTotalDiv = styled.div`
  
  text-align: center;
  width: 600px;
  background: white;
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 99%;
    font-size: 24px;
  }
  color: #20C5A0;
  font-size: 30px;
  font-weight: 700;

`

const StyledSpeedDiv = styled.div`
  
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 400;
  color: #607686;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

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

export default Farm
