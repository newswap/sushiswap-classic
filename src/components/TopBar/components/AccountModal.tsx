import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useSushi from '../../../hooks/useSushi'
import { getNSTAddress } from '../../../sushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import Button from '../../Button'
import CardIcon from '../../CardIcon'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'
import { useTranslation } from 'react-i18next'

const EXPLORER_URL = process.env.REACT_APP_EXPLORER_URL

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, reset } = useWallet()
  const { t } = useTranslation()

  const handleSignOutClick = useCallback(() => {
    onDismiss!()
    reset()
  }, [onDismiss, reset])

  const sushi = useSushi()
  const nstBalance = useTokenBalance(getNSTAddress(sushi))

  return (
    <Modal>
      <ModalTitle text={t('My Account')} />
      <ModalContent>
        <Spacer />

        <div style={{ display: 'flex' }}>
          <StyledBalanceWrapper>
            <CardIcon>
              <span>🍣</span>
            </CardIcon>
            <StyledBalance>
              <Value value={getBalanceNumber(nstBalance)} />
              <Label text={t('NST Balance')} />
            </StyledBalance>
          </StyledBalanceWrapper>
        </div>

        <Spacer />
        <Button
          href={EXPLORER_URL + `/address/${account}`}
          text={t('View on NewtonExplorer')}
          variant="secondary"
        />
        <Spacer />
        <Button
          onClick={handleSignOutClick}
          text={t('Sign out')}
          variant="secondary"
        />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text={t('Cancel')} />
      </ModalActions>
    </Modal>
  )
}

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal
