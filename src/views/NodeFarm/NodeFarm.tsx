import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import PageHeader from '../../components/PageHeader'
import NewPageHeader from '../../components/NewPageHeader'
import Spacer from '../../components/Spacer'
import useNodeFarm from '../../hooks/useNodeFarm'
import useSushi from '../../hooks/useSushi'
import { getContract } from '../../utils/erc20'
import Harvest from './components/Harvest'
import Stake from './components/Stake'
import { useTranslation } from 'react-i18next'

const INFO_URL = process.env.REACT_APP_INFO_URL

const NodeFarm: React.FC = () => {
  const { farmId } = useParams()
  console.log("====farmId")
  console.log(farmId)
  const {
    pid,
    lpToken,
    lpTokenAddress,
    tokenAddress,
    earnToken,
    name,
    icon,
    iconL,
    iconR,
    tokenSymbol
  } = useNodeFarm(farmId) || {
    pid: 0,
    lpToken: '',
    lpTokenAddress: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
    iconL: '',
    iconR: '',
    tokenSymbol: ''
  }
  console.log("====iconR")
  console.log(iconR)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sushi = useSushi()
  const { ethereum } = useWallet()
  const { t } = useTranslation()

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpTokenAddress)
  }, [ethereum, lpTokenAddress])

  const lpTokenName = useMemo(() => {
    return lpToken
  }, [lpToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  return (
    <>
      <NewPageHeader
        iconL={iconL}
        iconR={iconR}
        subtitle={'将' + tokenSymbol + '-NEW 流动性通证质押入矿池，获得 NewSwap 的收益代币 ' + earnTokenName + ' 奖励'}
        // subtitle={t('depositTokens',{lpTokenName:lpTokenName, earnTokenName:earnTokenName})}
        title={tokenSymbol + '-NEW 矿池'}
      />
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest pid={pid} icon={iconR} />
          </StyledCardWrapper>
          <Spacer size='lg'/>
          <StyledCardWrapper>
            <Stake
              lpContract={lpContract}
              pid={pid}
              tokenName={lpToken}
              iconL={iconL}
              iconR={iconR}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        {/* <StyledInfo>
          {t('depositTipsNewMine')}
        </StyledInfo> */}
        <Spacer size="md" />
        {/* <StyledLink
          target="__blank"
          href={INFO_URL + `/pair/${lpTokenAddress}`}
        >
          {lpTokenName} {t('Info')}
        </StyledLink> */}
      </StyledFarm>
    </>
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
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default NodeFarm
