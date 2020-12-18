import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import metamaskLogo from '../../assets/img/metamask-fox.svg'
import newLogo from '../../assets/img/metamask.da7f0b29.png'
import walletConnectLogo from '../../assets/img/wallet-connect.svg'

import Button from '../Button'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import Spacer from '../Spacer'
import { useTranslation } from 'react-i18next'

import WalletCard from './components/WalletCard'

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, connect } = useWallet()
  const { t } = useTranslation()

  // console.log("=====WalletProviderModal======")
  // console.log(account)
  // const wallet = useWallet()
  // console.log(wallet)
  // console.log(wallet.status)
  // console.log(wallet.getBlockNumber())
  // if(wallet.status === 'connected') {
  //   console.log(wallet.balance)
  //   console.log(wallet.chainId)
  //   console.log(wallet.connector)
  // } 


  // account: string | null
  // balance: string
  // chainId: number | null
  // connect(connectorId: keyof Connectors): Promise<void>
  // connector: keyof Connectors
  // connectors: Connectors
  // error: UnsupportedChainError | UnsupportedChainError | RejectedActivationError | ConnectorConfigError
  // ethereum: T
  // networkName: string
  // getBlockNumber(): number
  // reset(): void
  // status: string
  // type: string | null

  useEffect(() => {
    if (account) {
      // console.log("account:"+account)
      // console.log(wallet)
      // console.log(wallet.status)
      // console.log(wallet.getBlockNumber())
      // if(wallet.status === 'connected') {
      //   console.log(wallet.balance)
      //   console.log(wallet.chainId)
      //   console.log(wallet.connector)
      // } 

      onDismiss()
    }
  }, [account, onDismiss])

  return (
    <Modal>
      <div>
      <ModalTitle text={ t('Select a wallet provider') } />
      <StyledLabel>
        <Button text={t('Cancel')} variant="normal" size="normal" onClick={onDismiss} />
      </StyledLabel>
      </div>
      {/* <ModalContent> */}
        <StyledWalletsWrapper>
          {/* <StyledWalletCard> */}
            <WalletCard
              icon={<img src={newLogo} style={{ height: 80 }} />}
              onConnect={() => connect('injected')}
              title="NewMask"
            />
          {/* </StyledWalletCard> */}
          {/* <Spacer size="sm" />
          <StyledWalletCard>
            <WalletCard
              icon={<img src={walletConnectLogo} style={{ height: 24 }} />}
              onConnect={() => connect('walletconnect')}
              title="WalletConnect"
            />
          </StyledWalletCard> */}
        </StyledWalletsWrapper>
      {/* </ModalContent> */}

      {/* <ModalActions>
        <Button text={t('Cancel')} variant="secondary" onClick={onDismiss} />
      </ModalActions> */}
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
  margin-bottom: 14px;
`

const StyledWalletCard = styled.div`
  // flex-basis: calc(50% - ${(props) => props.theme.spacing[2]}px);
  flex-basis: calc(100%);

`

const StyledLabel = styled.div`
  float: right;
  margin-top: -44px;
`

export default WalletProviderModal
