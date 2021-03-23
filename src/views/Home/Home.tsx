import BigNumber from 'bignumber.js'
import React, { useEffect, useMemo } from 'react'
import { useParams, Switch } from 'react-router-dom'
import styled from 'styled-components'
import chef from '../../assets/img/chef.png'
import coin from '../../assets/img/new.a6cfc11f.png'
import Button from '../../components/Button'
import Label from '../../components/Label'
import Container from '../../components/Container'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import NewPageHeader from '../../components/NewPageHeader'
import Spacer from '../../components/Spacer'
import WalletProviderModal from '../../components/WalletProviderModal'
import { getNewNUSDTPairAddress } from '../../sushi/utils'
import { getFormatDisplayBalance } from '../../utils/formatBalance'
import useModal from '../../hooks/useModal'
import useTokenBalanceOf from '../../hooks/useTokenBalanceOf'
import useTotalSupply from '../../hooks/useTotalSupply'
import useNewPrice from '../../hooks/useNewPrice'
import useSushi from '../../hooks/useSushi'
import { getContract } from '../../utils/erc20'
import Harvest from './components/Harvest'
import Stake from './components/Stake'
import { useTranslation } from 'react-i18next'
import {contractAddresses} from '../../sushi/lib/constants'
import newcoin from '../../assets/img/new.a6cfc11f.png'
import usdtcoin from '../../assets/img/usdtlogo.png'

const CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1012')
const INFO_URL = process.env.REACT_APP_INFO_URL
const NEW_PER_BLOCK = process.env.REACT_APP_NEW_PER_BLOCK_NU
const BLOCKS_PER_YEAR = new BigNumber(10512000)

const Home: React.FC = () => {
  const sushi = useSushi()
  const { ethereum } = useWallet()
  const { t } = useTranslation()
  const { account } = useWallet()

  const lpTokenAddress = getNewNUSDTPairAddress(sushi)
  const lpTokenName = 'NUSDT-NEW LP'
  const earnTokenName = 'NEW'
  const name = 'NUSDT Party!'
  const tokenSymbol = 'NUSDT'
  const iconL = usdtcoin
  const iconR = newcoin
  const tokenAddress = CHAIN_ID==1012 ? '0x4BFB4297f9C28a373aE6ae58a8f8EfeFF334cae8' : '0xC01A73fBF1c1953D18b48518259b36D70b07F277'
  
  // 锁仓合约质押的lp数量
  const lpBalance = useTokenBalanceOf(lpTokenAddress, contractAddresses.newMineSingle[CHAIN_ID])
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
  // const {
  //   pid,
  //   lpTokenAddress,
  //   tokenAddress,
  //   name,
  //   icon,
  //   iconL,
  //   iconR,
  //   tokenSymbol
  // } = {
  //   pid: 0,
  //   lpTokenAddress: {
  //     1007: '0xf8a2db7aecac5968a68677f7b1aef2dd20a03ffb',
  //   },
  //   tokenAddresses: {
  //     1007: '0xc01a73fbf1c1953d18b48518259b36d70b07f277', //NUSDT
  //   },
  //   name: 'NUSDT Party!',
  //   symbol: 'NUSDT-NEW LP',
  //   tokenSymbol: 'NUSDT',
  //   icon: '👨🏻‍🍳',
  //   iconL: usdtcoin,
  //   iconR: newcoin
  // }


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
            <NewPageHeader
              iconR={iconR}
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
                      `${t('APY(Estimated)')}:
                          ${newAmount.toNumber() > 0 ? 
                              BLOCKS_PER_YEAR.times(new BigNumber(NEW_PER_BLOCK)).div(newAmount).times(new BigNumber(100)).toNumber().toLocaleString('en-US') + '%' : '-'}`
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
                  <Harvest icon={iconR}/>
                </StyledCardWrapper>
                <Spacer />
                <StyledCardWrapper>
                  <Stake
                    lpContract={lpContract}
                    tokenName={lpTokenName}
                    iconL={iconL}
                    iconR={iconR}
                  />
                </StyledCardWrapper>
              </StyledCardsWrapper>
              <Spacer size="lg" />
              <StyledLink
                target="__blank"
                href={INFO_URL + `/pair/${lpTokenAddress}`}
              >
                {lpTokenName} {t('Info')}
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

export default Home
