import BigNumber from 'bignumber.js'
import React, { useEffect, useMemo } from 'react'
import { useParams, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { provider } from 'web3-core'
import dayjs from 'dayjs'

import {newCoin} from '../../sushi/lib/constants'
import Button from '../../components/Button'
import { useWallet } from 'use-wallet'
import Page from '../../components/Page'
import NewPageHeader from '../../components/NewPageHeader'
import Spacer from '../../components/Spacer'
import WalletProviderModal from '../../components/WalletProviderModal'
import { getBalanceNumber } from '../../utils/formatBalance'
import useCustomFarm from '../../hooks/useCustomFarm'
import useModal from '../../hooks/useModal'
import useRemainingRewards from '../../hooks/useRemainingRewards'
import useTokenBalanceOf from '../../hooks/useTokenBalanceOf'
import useTotalSupply from '../../hooks/useTotalSupply'
import useNewPrice from '../../hooks/useNewPrice'
import Harvest from './components/Harvest'
import Stake from './components/Stake'
import { useTranslation } from 'react-i18next'
import {contractAddresses} from '../../sushi/lib/constants'
import { getContract } from '../../utils/erc20'
import { getLogoURLByAddress } from '../../utils/addressUtil'
import {getTokenMineContract} from '../../sushi/utils'
import coin from '../../assets/img/new.a6cfc11f.png'
import PageHeader from './components/PageHeader'
import { badEnumValueMessage } from 'graphql/validation/rules/ValuesOfCorrectType'

const CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1012')
const INFO_URL = process.env.REACT_APP_INFO_URL
const EXPLORER_URL = process.env.REACT_APP_EXPLORER_URL

const CustomFarm: React.FC = () => {
  const { ethereum, account } = useWallet()
  const { t } = useTranslation()

  const { farmId } = useParams()

  // console.log("farmId:"+farmId)
  const {
    id,
    owner,
    name,
    stakingToken,
    rewardsToken,
    startTime,
    endTime,
    rewardAmount,
    stakingTokenSymbol,
    stakingTokenDecimals,
    rewardsTokenSymbol,
    rewardsTokenDecimals,
    isStakingLPToken,
    token0Address,
    token0Symbol,
    token1Address,
    token1Symbol
  } = useCustomFarm(farmId) || {
    id: '',
    owner: '',
    name: '',
    stakingToken: '',
    rewardsToken: '',
    startTime: 0,
    endTime: 0,
    rewardAmount: '0',
    stakingTokenSymbol: '',
    stakingTokenDecimals: 0,
    rewardsTokenSymbol: '',
    rewardsTokenDecimals: 0,
    isStakingLPToken: true,
    token0Address: '',
    token0Symbol: '',
    token1Address: '',
    token1Symbol: ''
  }

  const miningContract = useMemo(() => {
    if(ethereum && id) 
      return getTokenMineContract(ethereum as provider, id)
    else 
      return null    
  }, [ethereum, id])


  const remainingRewards = useRemainingRewards(miningContract)
  // console.log("remainingRewards：" + getBalanceNumber(new BigNumber(remainingRewards), rewardsTokenDecimals))

  const stakingTokenContract = useMemo(() => {
    if(ethereum && stakingToken)
      return getContract(ethereum as provider, stakingToken)
    else
      return null
  }, [ethereum, stakingToken])

  const currentTime = new Date().getTime()/1000
  /// enum status
  /// case 0    Start counting
  /// case 1    End counting
  /// case 2    Finished 
  const [status, setStatus] = React.useState(0);
  useEffect(() => {
    setStatus(currentTime < startTime ? 0 : ( currentTime > endTime ? 2 : 1))
  }, [startTime, endTime])

  const [countTime, setCountTime] = React.useState('')
  useEffect(() => {
    if (!startTime || !endTime) return

    const interval = setInterval(async () => {      
      const currentTime = parseInt(new Date().getTime()/1000+"")
      
      let countdown = 0
      if(currentTime < startTime) { // 开始倒计时
        countdown = startTime- currentTime

      } else if(currentTime > endTime) { //结束
        if(status === 1)
          setStatus(2)   

      } else { // 结束倒计时
        countdown = endTime- currentTime
        if(status === 0)
          setStatus(1)
      }

      const days =  parseInt(countdown/86400 +'')
      const hours = parseInt((countdown-days*86400)/3600 + '')
      const minutes = parseInt((countdown-days*86400-hours*3600)/60 + '')
      const seconds = countdown-days*86400-hours*3600-minutes*60
      setCountTime(days + t(' D ') + hours + t(' H ') + minutes + t(' m ') + seconds + t(' s '))
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime, endTime])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (

    <Switch>
      <Page>
        {!!account ? (
          <>
            <PageHeader
                icon={rewardsToken}      
                title={name}
                subtitle= {
                  isStakingLPToken ?
                    t('stakeSubtitle', {tokenSymbol: token0Symbol==='WNEW' ? 'NEW' : token0Symbol, new: token1Symbol==='WNEW' ? 'NEW' : token1Symbol, token: rewardsTokenSymbol}) :
                    t('stakeSingleSubtitle', {tokenSymbol: stakingTokenSymbol, token: rewardsTokenSymbol})
                }               
                status = {status}
                tokenName = {rewardsTokenSymbol}
                amount = {getBalanceNumber(new BigNumber(rewardAmount), rewardsTokenDecimals).toLocaleString('en-US')}
                time = {countTime}
            />

            {/* <StyledSubtitle>挖矿奖励剩余 <StyledSpan>{amount} {tokenName}</StyledSpan></StyledSubtitle> */}

            <StyledFarm>
              <StyledCardsWrapper>
                <StyledCardWrapper>
                  <Harvest 
                    miningContract={miningContract}
                    rewardsToken={rewardsToken}
                    tokenName={rewardsTokenSymbol}
                    tokenDecimals = {rewardsTokenDecimals}
                  />
                </StyledCardWrapper>
                <Spacer />
                <StyledCardWrapper>
                  <Stake
                    stakingContract={stakingTokenContract}
                    miningContract={miningContract}
                    stakingTokenDecimals = {stakingTokenDecimals}
                    isStakingLPToken = {isStakingLPToken}
                    stakingToken = {stakingToken}
                    token0Address = {token0Address}
                    token1Address = {token1Address}
                    stakingTokenName={
                      isStakingLPToken ?
                        (token0Symbol==='WNEW' ? 'NEW' : token0Symbol) + '-' + (token1Symbol==='WNEW' ? 'NEW' : token1Symbol) :
                        stakingTokenSymbol
                    }
                  />
                </StyledCardWrapper>
              </StyledCardsWrapper>
              <Spacer size="lg" />
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
                <StyledLink
                  target="__blank"
                  href={EXPLORER_URL + `/token/${rewardsToken}`}  
                >
                  { rewardsTokenSymbol + " " + t('Address') }        
                </StyledLink>
                <StyledLink
                  target="__blank"
                  href={ isStakingLPToken ? (INFO_URL + `/pair/${stakingToken}`) : (EXPLORER_URL + `/token/${stakingToken}`)}  
                >
                  { isStakingLPToken ?
                      (token0Symbol==='WNEW' ? 'NEW' : token0Symbol)+ '-' + (token1Symbol==='WNEW' ? 'NEW' : token1Symbol) + ' ' + t('Info') :
                      rewardsToken !== stakingToken ? stakingTokenSymbol + " " + t('Address') : ''
                  }
                </StyledLink>
              </div>
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

export default CustomFarm
