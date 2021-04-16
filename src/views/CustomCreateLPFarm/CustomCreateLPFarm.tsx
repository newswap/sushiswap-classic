import React, {  useEffect, useState, useCallback  } from 'react'
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
// import FarmCards from './components/FarmCards'
import Container from '../../components/Container'
import styled from 'styled-components'
import CustomInput from '../../components/CustomPoolInput'
import arrowLeft from '../../assets/img/ic_arrow_left.svg'
import issue from '../../assets/img/ic_issue.svg'
import { Link } from 'react-router-dom'

const CustomCreateLPFarm: React.FC = () => {
    const { t } = useTranslation()

    const { path } = useRouteMatch()
    const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

    const { account, connect } = useWallet()
    const tokenList = [{name: "NEW-USDT"}, {name: "MCT-CICI"}]

    /// Farm Name
    const [name, setName] = useState('')
    const handleName = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setName(e.currentTarget.value)
        },
        [setName],
    )

    /// Stake Token Address
    const [token, setToken] = useState(tokenList[0].name)
    const handleToken = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setToken(e.currentTarget.value)
        },
        [setToken],
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

    /// Mining Fee
    const [fee, setFee] = useState('')
    const handleFee = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setFee(e.currentTarget.value)
        },
        [setFee],
    )

    // Token Type
    const [selectedToken, setSelectedToken] = React.useState('');
    const handleSelectedToken = (event: any) => {
        // console.log(event.target.value)
        
        setSelectedToken(event.target.value);
    };


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
        if (name!=''&&token!=''&&rewardAddress!=''&&rewardAmount!=''&&duration!=''&&fee!=''&&selectedToken!='') {
            /// Submit data
        } else {
            alert('All field required')
        }

    }


    return (
        <Container size = 'md'>
            <Spacer size = 'lg'/>
            <StyledWalletsWrapper>
                <StyledWalletCard>
                    <StyleHeader>
                        <StyledNomalLink to={'/customLPFarms'}>
                            <StyledIcon src = {arrowLeft} />
                        </StyledNomalLink>
                        <StyledLabel>创建自定义矿池-流通性挖矿</StyledLabel>
                        <StyledNomalLink to={'/customLPFarms'}>
                            <StyledIcon src = {issue} />
                        </StyledNomalLink>
                    </StyleHeader>
                    <CustomInput onChange={handleName} value={name} startAdornment={t('Pool Name')} placeholder={'请输入矿池名称'}></CustomInput>
                    <CustomInput onChange={handleToken} value={token} startAdornment={'质押的流动性通证'} placeholder={'NUSDT-NEW'} type={'select'} onTypeChange={handleToken} data={tokenList}></CustomInput>

                    <CustomInput onChange={handleRewardAddress} value={rewardAddress} startAdornment={'奖励通证的地址'} placeholder={'请输入奖励通证地址'}></CustomInput>
                    <CustomInput onChange={handleRewardAmount} value={rewardAmount} startAdornment={'奖励数量'} placeholder={'0.0'}></CustomInput>

                    <CustomInput onDateSelected={handleDateChange} value={selectedDate} startAdornment={'启动时间'} placeholder={'新加坡时间'} type={'date'}></CustomInput>
                    <CustomInput onChange={handleDuration} value={duration} startAdornment={'挖矿时长'} placeholder={'0'} type={'duration'}></CustomInput>
                    <CustomInput onChange={handleFee} value={fee} startAdornment={'开矿手续费'} placeholder={'100,000'} type={'fee'}></CustomInput>
            
                    <Button text={'开启挖矿'} size={'new'} variant={'green'} onClick={checkDataFilled}></Button>
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