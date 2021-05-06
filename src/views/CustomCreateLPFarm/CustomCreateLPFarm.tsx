import React, {  useEffect, useState, useCallback, useMemo } from 'react'
import { useParams, Route, Switch, useRouteMatch } from 'react-router-dom'

import { useWallet } from 'use-wallet'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Button from '../../components/Button'
import Page from '../../components/Page'
import { useTranslation } from 'react-i18next'
import { provider } from 'web3-core'
import useModal from '../../hooks/useModal'
import coin from '../../assets/img/new.a6cfc11f.png'
import { getContract } from '../../utils/erc20'
import {isAddress} from '../../utils/addressUtil'
import WalletProviderModal from '../../components/WalletProviderModal'
import useSushi from '../../hooks/useSushi'
import useAllowanceGeneral from '../../hooks/useAllowanceGeneral'
import useApproveGeneral from '../../hooks/useApproveGeneral'
import useERC20Decimals from '../../hooks/useERC20Decimals'
import useERC20Symbol from '../../hooks/useERC20Symbol'
import Container from '../../components/Container'
import useAllPairs from '../../hooks/useAllPairs'
import { getTokenMineFactoryContract, getNewMineForNodeContract} from '../../sushi/utils'
import styled from 'styled-components'
import CustomInput from '../../components/CustomPoolInput'
import arrowLeft from '../../assets/img/ic_arrow_left.svg'
import issue from '../../assets/img/ic_issue.svg'
import { Link } from 'react-router-dom'

const CustomCreateLPFarm: React.FC = () => {
    const { t } = useTranslation()

    const { path } = useRouteMatch()
    const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

    const { account, ethereum } = useWallet()
    
    // const tokenList = [{name: "NEW-USDT"}, {name: "MCT-CICI"}]
    // [{id:**, token0:{id:**,symbol:**,name:**},token1:{...}}]
    const pairs = useAllPairs()
    // console.log("useAllPairs=====>")
    // console.log(pairs)

    /// Farm Name
    const [name, setName] = useState('')
    const handleName = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setName(e.currentTarget.value)
        },
        [setName],
    )
    
    /// Stake Token Address   如果是输入，支持new格式转成0x地址
    const [stakeToken, setStakeToken] = useState(pairs[0]?.name)
    const handleStakeToken = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setStakeToken(e.currentTarget.value)
        },
        [setStakeToken],
    )

    // TODO 若是new地址转成0x使用
    /// Reward Token Address
    const [rewardAddress, setRewardAddress] = useState('')
    const handleRewardAddress = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            // console.log("setRewardAddress======>"+e.currentTarget.value)
            setRewardAddress(e.currentTarget.value)
        },
        [setRewardAddress],
    )

    /// Farm Amount
    const [rewardAmount, setRewardAmount] = useState('')
    const handleRewardAmount = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setRewardAmount(e.currentTarget.value)
        },
        [setRewardAmount],
    )

    /// Start Date
    const [selectedDate, setSelectedDate] = React.useState((new Date()).toString());
    const handleDateChange = (date: string) => {
        console.log('date is' + date)
        setSelectedDate(date);
    };

    /// Mining Duration
    const [duration, setDuration] = useState('')
    const handleDuration = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setDuration(e.currentTarget.value)
        },
        [setDuration],
    )

    // /// Mining Fee
    // const [fee, setFee] = useState('')
    // const handleFee = useCallback(
    //     (e: React.FormEvent<HTMLInputElement>) => {
    //         setFee(e.currentTarget.value)
    //     },
    //     [setFee],
    // )
    // Token Type
    // const [selectedToken, setSelectedToken] = React.useState('');
    // const handleSelectedToken = (event: any) => {
    //     // console.log(event.target.value)       
    //     setSelectedToken(event.target.value);
    // };


    // const [dataFilled, setDataFilled] = useState(false)
    const checkDataFilled = () => {
        // console.log('==name' + name)
        // console.log('==address' + address)
        // console.log('==farmAmount' + farmAmount)
        // console.log('==duration' + duration)
        // console.log('==fee' + fee)
        // console.log('==selectedToken' + selectedToken)
        // console.log('==selected Date' + selectedDate)
        // setDataFilled(name!=''&&address!=''&&farmAmount!=''&&duration!=''&&fee!=''&&selectedToken!='')
        
        if (name!=''&&stakeToken!=''&&rewardAddress!=''&&rewardAmount!=''&&duration!='') {
            /// Submit data
            // TODO 地址判断格式是否正确    可将new地址转成0x   rewardAmount判断精度
            // 时间不能小于当前时间  不能超过30天
        } else {
            alert('All field required')
        }
    }

    const sushi = useSushi()
    const [requestedApproval, setRequestedApproval] = useState(false)
    const TokenMineFactoryContract = getTokenMineFactoryContract(sushi)
    const rewardTokenContract = useMemo(() => {
        if(ethereum && rewardAddress && isAddress(rewardAddress))
          return getContract(ethereum as provider, rewardAddress)
        else
          return null
      }, [ethereum, rewardAddress])

    const allowance = useAllowanceGeneral(rewardTokenContract, TokenMineFactoryContract)
    const rewardTokenSymbol = useERC20Symbol(rewardTokenContract)
    const rewardTokenDecimals = useERC20Decimals(rewardTokenContract)
    // console.log("+++++++++++++++++++++")
    // console.log("TokenMineFactoryContract:"+TokenMineFactoryContract?.options?.address)
    // console.log("rewardTokenContract:"+rewardTokenContract?.options?.address)
    // console.log("rewardAddress:"+rewardAddress)
    // console.log("allowance:"+allowance.toString())
    // console.log("rewardTokenSymbol:"+rewardTokenSymbol)
    // console.log("rewardTokenDecimals:"+rewardTokenDecimals)

    const { onApprove } = useApproveGeneral(rewardTokenContract, TokenMineFactoryContract)
  
    useEffect(() => {
        setRequestedApproval(false)
      }, [account, setRequestedApproval])
    
      const handleApprove = useCallback(async () => {
        try {
          // TODO 判断地址是否正确，支持NEW格式
          if(!isAddress(rewardAddress)){
            alert(t('rewardAddressError'))
            return
          }

          setRequestedApproval(true)
          const txHash = await onApprove()
          // user rejected tx or didn't go thru
        //   if (!txHash) {
          setRequestedApproval(false)
        //   }
        } catch (e) {
          console.log(e)
        }
      }, [onApprove, setRequestedApproval])
    
    return (
        <Container size = 'md'>
            <Spacer size = 'lg'/>
            <StyledWalletsWrapper>
                <StyledWalletCard>
                    <StyleHeader>
                        <StyledNomalLink to={'/customLPMining'}>
                            <StyledIcon src = {arrowLeft} />
                        </StyledNomalLink>
                        <StyledLabel>{t('createCustomLPMining')}</StyledLabel>
                        {/* <StyledNomalLink to={'/customLPMining'}>
                            <StyledIcon src = {issue} />
                        </StyledNomalLink> */}
                    </StyleHeader>
                    <CustomInput onChange={handleName} value={name} startAdornment={t('Pool Name')} placeholder={t('inputPoolName')}></CustomInput>
                    <CustomInput onChange={handleStakeToken} value={stakeToken} startAdornment={t('stakeLPToken')} placeholder={pairs[0]?.name} type={'select'} onTypeChange={handleStakeToken} data={pairs}></CustomInput>

                    <CustomInput onChange={handleRewardAddress} value={rewardAddress} startAdornment={t('rewardAddress')} placeholder={t('inputRewardAddress')}></CustomInput>
                    <CustomInput onChange={handleRewardAmount} value={rewardAmount} startAdornment={t('rewardAmount')} placeholder={'0.0'}></CustomInput>

                    <CustomInput onDateSelected={handleDateChange} value={selectedDate} startAdornment={t('startTime')} placeholder={t('SGT')} type={'date'}></CustomInput>
                    <CustomInput onChange={handleDuration} value={duration} startAdornment={t('miningDuration')} placeholder={'0'} type={'duration'}></CustomInput>
                    <CustomInput onChange={null} value={'100000'} startAdornment={t('miningFee')} placeholder={'100,000'} type={'fee'}></CustomInput>
                    
                    {!allowance.toNumber() ? (
                        <Button
                            disabled={requestedApproval}
                            onClick={handleApprove}
                            text={requestedApproval ? t('Approving...') : t('Approve') + ` ${rewardTokenSymbol}`}
                            size = 'new'
                            variant = 'green'
                        />
                    ) : (
                        <Button text={t('createMine')} size={'new'} variant={'green'} onClick={checkDataFilled}></Button>
                    )}
                    {/* <StyledTip>
                        *创建社群矿池需要支付 10 NSP 的开矿手续费
                    </StyledTip> */}
                </StyledWalletCard>
        
            </StyledWalletsWrapper>
            <Spacer size = 'lg'/>
            <Spacer size = 'lg'/>
        </Container>
    )
}

const StyledWalletsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    flex-wrap: none;
  }
  max-height: 80%;
  box-shadow: 0px 5px 12px 0px rgba(7,94,68,0.11);
  border-radius: 30px;
`

const StyledWalletCard = styled.div`
  // flex-basis: calc(50% - ${(props) => props.theme.spacing[2]}px);
  flex-basis: calc(100%);
  background: white;
  padding: 28px 16px;
  border-radius: 30px;
`

const StyledLabel = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #607686;
  margin-bottom: 16px;
`

const StyledTip = styled.div`
  width: 100%;
  color: #647684;
  font-size: 13px;
  font-weight: 300;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`

const StyledIcon = styled.img`
  height: 20px;
  width: 20px;
`

const StyleHeader = styled.div`
  display: flex;
  line-height: 20px;
`

const StyledNomalLink = styled(Link)`
    align-items: center;
    font-size: 14px;    
    text-decoration: none;
    color: #20C5A0;
`

export default CustomCreateLPFarm