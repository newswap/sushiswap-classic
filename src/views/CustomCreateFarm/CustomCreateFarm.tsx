import React, {  useEffect, useState, useCallback, useMemo } from 'react'
import { useParams, Route, Switch, useRouteMatch, useHistory } from 'react-router-dom'
import BigNumber from 'bignumber.js'
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
import {getHexAddress} from '../../utils/addressUtil'
import WalletProviderModal from '../../components/WalletProviderModal'
import useSushi from '../../hooks/useSushi'
import useCustomFarms from '../../hooks/useCustomFarms'
import useAllowanceGeneral from '../../hooks/useAllowanceGeneral'
import useApproveGeneral from '../../hooks/useApproveGeneral'
import useERC20Decimals from '../../hooks/useERC20Decimals'
import useERC20Symbol from '../../hooks/useERC20Symbol'
import Container from '../../components/Container'
import useAllPairs from '../../hooks/useAllPairs'
import useCreateMine from '../../hooks/useCreateMine'
import { getTokenMineFactoryContract} from '../../sushi/utils'
import styled from 'styled-components'
import CustomInput from '../../components/CustomPoolInput'
import ResultModal from '../../components/ResultModal'
import arrowLeft from '../../assets/img/ic_arrow_left.svg'
import issue from '../../assets/img/ic_issue.svg'
import { Link } from 'react-router-dom'

interface CustomCreateFarmProps {
  stakeTokenType: 'lpToken' | 'singleToken'
}

const CustomCreateFarm: React.FC<CustomCreateFarmProps> = ({stakeTokenType}) => {
    // var moment = require('moment');
    // require('moment/locale/fr');

    const { t } = useTranslation()
    const history = useHistory();

    const { account, ethereum } = useWallet()
    const [customFarms] = useCustomFarms()
    const pairs = useAllPairs()   // [{name: "NEW-USDT",id:**, token0:{id:**,symbol:**,name:**},token1:{...}}, {name: "MCT-CICI",...}]

    const [requestedLoadingCreatedMine, setRequestedLoadingCreatedMine] = useState(false)

    /// Farm Name
    const [name, setName] = useState('')
    const handleName = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
          if(!requestedLoadingCreatedMine){
            setName(e.currentTarget.value)
          }          
        },
        [setName, requestedLoadingCreatedMine],
    )
    
    /// 当质押lp时，选择Stake Token name  
    const [stakeToken, setStakeToken] = useState(pairs[0]?.name)
    const handleStakeToken = (data: string) => {
      setStakeToken(data);
    }

    // 当质押单通证时，输入Stake Token Address     
    const [stakeAddress, setStakeAddress] = useState('')
    const handleStakeAddress = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
          setStakeAddress(e.currentTarget.value)
        },
        [setStakeAddress],
    )

    /// Reward Token Address
    const [rewardAddress, setRewardAddress] = useState('')
    const handleRewardAddress = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
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
    const [selectedDate, setSelectedDate] = useState((new Date()).toString());
    const handleDateChange = (date: string) => {
        if(!requestedLoadingCreatedMine)
          setSelectedDate(date+"");
    };

    /// Mining Duration
    const [duration, setDuration] = useState('')
    const handleDuration = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
          if(!requestedLoadingCreatedMine)
            setDuration(e.currentTarget.value)
        },
        [setDuration, requestedLoadingCreatedMine],
    )

    const sushi = useSushi()
    const [requestedApproval, setRequestedApproval] = useState(false)
    const tokenMineFactoryContract = getTokenMineFactoryContract(sushi)
    const rewardTokenContract = useMemo(() => {
        if(ethereum && rewardAddress && getHexAddress(rewardAddress))
          return getContract(ethereum as provider, getHexAddress(rewardAddress))
        else
          return null
      }, [ethereum, rewardAddress])

    const allowance = useAllowanceGeneral(rewardTokenContract, tokenMineFactoryContract)
    const rewardTokenSymbol = useERC20Symbol(rewardTokenContract)
    const rewardTokenDecimals = useERC20Decimals(rewardTokenContract)

    // TODO 合并
    const [onPresentRewardAddressError] = useModal(<ResultModal title={t('Incorrect Reward Token Address')}/>)
    const [onPresentStakeAddressError] = useModal(<ResultModal title={t('Incorrect Staked Token Address')}/>)
    const [onPresentMinRewardAmount] = useModal(<ResultModal title={t('Reward amount cannot be less than 0')}/>)
    const [onPresentMinMiningStartTime] = useModal(<ResultModal title={t('Mining start time cannot be less than current time')}/>)
    const [onPresentMaxMiningStartTime] = useModal(<ResultModal title={t('Mining start time must be within 30 days')}/>)
    const [onPresentMiningDurationTips] = useModal(<ResultModal title={t('Mining duration must be no less than 1 day')}/>)
    const [onPresentMaxMiningDurationTips] = useModal(<ResultModal title={t('Mining duration must be no more than 365 days')}/>)
    const [onPresentAllFieldRequired] = useModal(<ResultModal title={t('All Parameters Required')}/>)
    const [onPresentCreatedSuccessTips] = useModal(<ResultModal title={t('Mining pool created successfully and synchronized to the list')}/>)

    const { onApprove } = useApproveGeneral(rewardTokenContract, tokenMineFactoryContract)
  
    useEffect(() => {
        setRequestedApproval(false)
      }, [account, setRequestedApproval])
    
    const handleApprove = useCallback(async () => {
        try {
          if(!getHexAddress(rewardAddress)){
            onPresentRewardAddressError()
            return
          }

          setRequestedApproval(true)
          const txHash = await onApprove()
          setRequestedApproval(false)
        } catch (e) {
          console.log(e)
        }
    }, [onApprove, setRequestedApproval])  

    // function sleep(ms:number){
    //   return new Promise((resolve)=>setTimeout(resolve,ms));
    // }

    const { onCreateMine } = useCreateMine(tokenMineFactoryContract)
    const [pendingTx, setPendingTx] = useState(false)

    useEffect(() => {
      if (requestedLoadingCreatedMine) {
        loadingCreatedTokenMine()
      }
    }, [requestedLoadingCreatedMine, customFarms])

    const loadingCreatedTokenMine = useCallback(
      async () => {
        const startTime = new BigNumber(selectedDate).dividedToIntegerBy(1000).toNumber()
        const endTime = new BigNumber(selectedDate).plus(new BigNumber(duration).times(86400000)).dividedToIntegerBy(1000).toNumber()
        const customFarm = customFarms.find((customFarm) => (customFarm.name == name && customFarm.startTime == startTime && customFarm.endTime == endTime))

        if(customFarm?.id){
          setPendingTx(false)
          setRequestedLoadingCreatedMine(false)

          history.goBack();
          onPresentCreatedSuccessTips()
        }
      },
      [customFarms, selectedDate, duration, name],
    )

    const createMine = async() => {
      // console.log("stakeTokenType==" + stakeTokenType)
      // console.log('name==' + name)
      // console.log('stakeToken==' + stakeToken)
      // console.log('stakeAddress==' + stakeAddress)
      // console.log('rewardAddress==' + rewardAddress)
      // console.log('rewardAmount==' + rewardAmount)
      // console.log("rewardTokenDecimals=="+rewardTokenDecimals)
      // console.log('selectedDate==' + selectedDate)
      // console.log('duration==' + duration)
      
      let inputStakeAddress 
      if(stakeTokenType === 'lpToken') {
        const pair = pairs.find((pair) => pair.name === stakeToken)
        inputStakeAddress = pair?.id
      } else {
        inputStakeAddress = stakeAddress
      }     
      // console.log("inputStakeAddress="+inputStakeAddress)

      if(!getHexAddress(inputStakeAddress)){
        onPresentStakeAddressError()
        return
      }

      if (name && rewardAddress && rewardAmount && selectedDate && duration) {
          if(rewardTokenDecimals === 0 || !getHexAddress(rewardAddress)){
            onPresentRewardAddressError()
            return
          } 

          const intervalForStart = new BigNumber(selectedDate).minus(new Date().getTime()).toNumber()
          // 开始时间不能小于当前时间(+10s合约交互)
          if(intervalForStart < 10*1000) {
            onPresentMinMiningStartTime()
            return
          }
          // 开始时间在30天内
          if(intervalForStart > 30*86400*1000) {
            onPresentMaxMiningStartTime()
            return
          }
          if(parseFloat(rewardAmount) <= 0){
            onPresentMinRewardAmount()
            return              
          }
          
          // TODO 天不允许有小数
          if(parseInt(duration) < 1) {
            onPresentMiningDurationTips()
            return           
          }
          if(parseInt(duration) > 365) {
            onPresentMaxMiningDurationTips()
            return           
          }

          setPendingTx(true)
          const txHash = await onCreateMine(name, getHexAddress(inputStakeAddress), getHexAddress(rewardAddress), 
            new BigNumber(selectedDate).dividedToIntegerBy(1000).toNumber(), 
            new BigNumber(selectedDate).plus(new BigNumber(duration).times(86400000)).dividedToIntegerBy(1000).toNumber(),
            new BigNumber(rewardAmount).times(new BigNumber(10).pow(rewardTokenDecimals)).toString(),
            stakeTokenType === 'lpToken' ? true : false,
            new BigNumber(100000).times(new BigNumber(10).pow(18)).toString()
          )
          // sleep(3000)
          if(txHash) {
            setRequestedLoadingCreatedMine(true)
          } else {
            setPendingTx(false)
          }
      } else {
        onPresentAllFieldRequired()
      }
    }

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
    
    const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
    return (
      <Page>
        {!!account ? (
          <Container size = 'md'>
              <Spacer size = 'lg'/>
              <StyledWalletsWrapper>
                  <StyledWalletCard>
                      <StyleHeader>
                          <StyledIcon src = {arrowLeft} onClick={() => {history.goBack()}}/>
                          <StyledLabel>{stakeTokenType === 'lpToken' ? t('Create Customized Mining Pool - Liquidity Mining') : t('Create Customized Mining Pool - Single Token Mining')}</StyledLabel>             
                          {/* <StyledNomalLink to={'/'}>
                              <StyledIcon src = {issue} />
                          </StyledNomalLink> */}
                      </StyleHeader>
                      <CustomInput onChange={handleName} value={name} startAdornment={t('Pool Name')} placeholder={t('Please input the name of the mining pool')}></CustomInput>
                      {
                        stakeTokenType === 'lpToken' ?
                          <CustomInput onClick={handleStakeToken} value={stakeToken} startAdornment={t('Staked liquidity token')} placeholder={stakeToken} type={'select'} data={pairs}></CustomInput> 
                          :
                          <CustomInput onChange={handleStakeAddress} value={stakeAddress} startAdornment={t('Address of the staked token')} placeholder={t('Pleae input the address of the staked token')}></CustomInput>
                      }
                      <CustomInput onChange={handleRewardAddress} value={rewardAddress} startAdornment={t('Address of the reward token')} placeholder={t('Please input the address of the reward token')}></CustomInput>
                      <CustomInput onChange={handleRewardAmount} value={rewardAmount} startAdornment={t('Amount rewarded')} placeholder={'0.0'} type={'number'}></CustomInput>

                      <CustomInput onDateSelected={handleDateChange} value={selectedDate} startAdornment={t('Start time')} placeholder={t('Singapore Time')} type={'date'}></CustomInput>
                      <CustomInput onChange={handleDuration} value={duration} startAdornment={t('Mining Duration')} placeholder={'0'} type={'duration'}></CustomInput>
                      <CustomInput onChange={null} value={'100000'} startAdornment={t('Fee For Opening New Mining Pool')} placeholder={'100,000'} type={'fee'}></CustomInput>
                      
                      {!allowance.toNumber() ? (
                          <Button
                              disabled={requestedApproval}
                              onClick={handleApprove}
                              text={requestedApproval ? t('Approving...') : t('Approve') + ` ${rewardTokenSymbol}`}
                              size = 'new'
                              variant = 'green'
                          />
                      ) : (
                          <Button 
                            disabled={pendingTx}
                            text={requestedLoadingCreatedMine? t('Mining pool created successfully and synchronizing on-chain data...') : (pendingTx ? t('Pending Confirmation') : t('Create Mining Pool'))}
                            size={'new'} 
                            variant={'green'} 
                            onClick={createMine}></Button>
                      )}
                      {/* <StyledTip>
                          *创建社群矿池需要支付 10 NSP 的开矿手续费
                      </StyledTip> */}
                  </StyledWalletCard>
          
              </StyledWalletsWrapper>
              <Spacer size = 'lg'/>
              <Spacer size = 'lg'/>
          </Container>
        ):(
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

export default CustomCreateFarm