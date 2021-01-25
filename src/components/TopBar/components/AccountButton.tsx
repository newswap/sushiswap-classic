import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useModal from '../../../hooks/useModal'
import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'
import { isMobile } from "react-device-detect"
import {hexAddress2NewAddress} from '../../../utils/addressUtil'
import { getFormatDisplayBalance } from '../../../utils/formatBalance'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'react-i18next'

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const { t } = useTranslation()
  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )
  const CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1012')
  const { account, balance } = useWallet()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  const newAddress = account ? hexAddress2NewAddress(account, CHAIN_ID) : ''

  return (
    <StyledAccountButton>
      {!account ? (
        < StyledButton onClick={handleUnlockClick}>{t('Unlock Wallet')} </StyledButton>
      ) : (
        isMobile ? (
          <StyledButtonMob>{newAddress.substring(0,5) + "..." + newAddress.substring(newAddress.length - 4)}</StyledButtonMob>
        ) : (
          <StyledBalanceWrapper>
            <StyledBalanceDiv>{!!account ? getFormatDisplayBalance(new BigNumber(balance)) + ' NEW' : ''}</StyledBalanceDiv>
            <StyledButton 
            onClick={onPresentAccountModal} >{newAddress.substring(0,5) + "..." + newAddress.substring(newAddress.length - 4)}</StyledButton>
          </StyledBalanceWrapper>
        )
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div`
  display: contents;
`

const StyledBalanceWrapper = styled.div `
  display: contents;  
`

const StyledBalanceDiv = styled.div`
  float: left;
  margin-right: 5px;
  margin-left: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #647684;
`

const StyledButton = styled.button `
  align-items: center;
  background-color: #F7F8FA;
  border: 1px solid #D4D9DD;
  border-radius: 12px;
  color: #647684;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  height: 30px;
  justify-content: center;
  outline: none;
  padding-left: 8px;
  padding-right: 8px;
  width: 100%;
  &:hover {
    // background-color: #D3D9DD;
  }
  width: 130px;
`

const StyledButtonMob = styled.button `
  align-items: center;
  background-color: #F7F8FA;
  border: 1px solid #D4D9DD;
  border-radius: 12px;
  color: #647684;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  height: 38px;
  justify-content: center;
  outline: none;
  padding-left: 8px;
  padding-right: 8px;
  &:hover {
    // background-color: #D3D9DD;
  }
  min-width: 116  px;
`

export default AccountButton
