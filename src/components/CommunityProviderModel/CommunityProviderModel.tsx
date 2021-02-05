import React, { useEffect, useState, useCallback } from 'react'

import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import metamaskLogo from '../../assets/img/metamask-fox.svg'
import newLogo from '../../assets/img/metamask.da7f0b29.png'
import walletConnectLogo from '../../assets/img/wallet-connect.svg'

import Button from '../Button'
import CustomInput from '../CustomInput'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import Spacer from '../Spacer'
import { useTranslation } from 'react-i18next'

const CommunityProviderModel: React.FC<ModalProps> = ({ onDismiss }) => {
    const { account, connect } = useWallet()
    const { t } = useTranslation()

    /// Farm Name
    const [name, setName] = useState('')
    const handleName = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setName(e.currentTarget.value)
        },
        [setName],
    )

    /// Stake Token Address
    const [address, setAddress] = useState('')
    const handleAddress = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setAddress(e.currentTarget.value)
        },
        [setAddress],
    )

    /// Farm Amount
    const [farmAmount, setFarmAmount] = useState('')
    const handleFarmAmount = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setFarmAmount(e.currentTarget.value)
        },
        [setFarmAmount],
    )

    /// Start Date
    const [selectedDate, setSelectedDate] = React.useState((new Date()).toString());
    const handleDateChange = (date: string) => {
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
        console.log(event.target.value)
        
        setSelectedToken(event.target.value);
    };

    const tokenList = [{name: "new"}, {name: "usdt"}]

    // const [dataFilled, setDataFilled] = useState(false)
    const checkDataFilled = () => {
        // console.log('==name' + name)
        // console.log('==address' + address)
        // console.log('==farmAmount' + farmAmount)
        // console.log('==duration' + duration)
        // console.log('==fee' + fee)
        // console.log('==selectedToken' + selectedToken)
        console.log('==selected Date' + selectedDate)
        // setDataFilled(name!=''&&address!=''&&farmAmount!=''&&duration!=''&&fee!=''&&selectedToken!='')
        if (name!=''&&address!=''&&farmAmount!=''&&duration!=''&&fee!=''&&selectedToken!='') {
            /// Submit data
        } else {
            alert('All field required')
        }

    }
    useEffect(() => {
    }, [account, onDismiss])

    return (
        <Modal>
        <div>
            <ModalTitle text={'创建社群矿池'} />
            <StyledLabel>
                <Button text={t('Cancel')} variant="normal" size="normal" onClick={onDismiss} />
            </StyledLabel>
        </div>
      {/* <ModalContent> */}
        <StyledWalletsWrapper>
          <StyledWalletCard>
            <CustomInput onChange={handleName} value={name} startAdornment={t('farmName')} placeholder={''}></CustomInput>
            <CustomInput onChange={handleAddress} value={address} startAdornment={'质押的流动性通证'} placeholder={'输入流通性通证的原始合约地址(0x开头)'}></CustomInput>
            <CustomInput onChange={handleFarmAmount} value={farmAmount} startAdornment={'矿量'} placeholder={'0.0'} type={'select'} onTyleChange={handleSelectedToken} data={tokenList}></CustomInput>
            <CustomInput onDateSelected={handleDateChange} value={selectedDate} startAdornment={'启动时间'} placeholder={'新加坡时间'} type={'date'}></CustomInput>
            <CustomInput onChange={handleDuration} value={duration} startAdornment={'挖矿时长'} placeholder={'0'} type={'duration'}></CustomInput>
            <CustomInput onChange={handleFee} value={fee} startAdornment={'挖矿手续费'} placeholder={'0.00'} type={'fee'}></CustomInput>
            
            <Button text={'开启挖矿'} size={'new'} variant={'green'} onClick={checkDataFilled}></Button>
            <StyledTip>
            *创建社群矿池需要支付 10 NSP 的开矿手续费
            </StyledTip>
          </StyledWalletCard>
        
        </StyledWalletsWrapper>
        
      {/* </ModalContent> */}
    </Modal>
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
  overflow: auto;
`

const StyledWalletCard = styled.div`
  // flex-basis: calc(50% - ${(props) => props.theme.spacing[2]}px);
  flex-basis: calc(100%);

`

const StyledLabel = styled.div`
  float: right;
  margin-top: -44px;
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

export default CommunityProviderModel
