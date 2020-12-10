import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useModal from '../../../hooks/useModal'
import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'
import { isMobile } from "react-device-detect"

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  const { account } = useWallet()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <StyledAccountButton>
      {!account ? (
        < StyledButton onClick={handleUnlockClick}>Unlock Wallet </StyledButton>
      ) : (
        isMobile ? (
          <StyledButtonMob>{account.substring(0,5) + "..." + account.substring(account.length - 4)}</StyledButtonMob>
        ) : (
          <StyledButton 
            onClick={onPresentAccountModal} >{account.substring(0,5) + "..." + account.substring(account.length - 4)}</StyledButton>
        )
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div``

const StyledButton = styled.button `
  align-items: center;
  background-color: #D4D9DD;
  border: 0;
  border-radius: 12px;
  color: #647684;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 5  00;
  height: 30px;
  justify-content: center;
  outline: none;
  padding-left: 8px;
  padding-right: 8px;
  width: 100%;
  &:hover {
    background-color: #D3D9DD;
  }
  min-width: 116  px;
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
  font-weight: 5  00;
  height: 38px;
  justify-content: center;
  outline: none;
  padding-left: 8px;
  padding-right: 8px;
  width: 100%;
  &:hover {
    background-color: #D3D9DD;
  }
  min-width: 116  px;
`

export default AccountButton
