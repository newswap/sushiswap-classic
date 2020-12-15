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

const CommunityProviderModel: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, connect } = useWallet()
  const { t } = useTranslation()

  useEffect(() => {
    // if (account) {
    //   onDismiss()
    // }
  }, [account, onDismiss])

  return (
    <Modal>
      <div>
      <ModalTitle text={ t('Select a wallet provider') } />
      <StyledLabel>
        <Button text={t('Cancel')} variant="normal" size="normal" onClick={onDismiss} />
      </StyledLabel>
      </div>
      <ModalContent>
        <StyledWalletsWrapper>
          <StyledWalletCard>
            <div>
                haha
            </div>
          </StyledWalletCard>
        
        </StyledWalletsWrapper>
      </ModalContent>
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
`

const StyledWalletCard = styled.div`
  // flex-basis: calc(50% - ${(props) => props.theme.spacing[2]}px);
  flex-basis: calc(100%);

`

const StyledLabel = styled.div`
  float: right;
  margin-top: -44px;
`

export default CommunityProviderModel
