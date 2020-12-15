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
import {hexAddress2NewAddress} from '../../../utils/addressUtil'
import copy from '../../../assets/img/copy.png'
import share from '../../../assets/img/share.png'
import useClipboard from "react-use-clipboard";

const EXPLORER_URL = process.env.REACT_APP_EXPLORER_URL

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, balance, reset } = useWallet()
  const { t } = useTranslation()

  const handleSignOutClick = useCallback(() => {
    onDismiss!()
    reset()
  }, [onDismiss, reset])

  const sushi = useSushi()
  const nstBalance = useTokenBalance(getNSTAddress(sushi))
  const CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1')
  const newAddress = account ? hexAddress2NewAddress(account, CHAIN_ID) : ''
  const [isCopied, setCopied] = useClipboard(newAddress);

  return (
    <Modal>
      <div>
        <ModalTitle text={t('My Account')} />
        <StyledLabel>
          <Button text={t('Cancel')} variant="normal" size="normal" onClick={onDismiss} />
        </StyledLabel>
      </div>
      {/* <ModalContent> */}
      <StyledContentDiv>
        <div>
          <StyledConnectTip>已经连接到 NewMask</StyledConnectTip>
          <StyledSignout onClick={handleSignOutClick}>退出</StyledSignout>
        </div>
        <StyledSpacer height={10} />
        <StyledAddress>{newAddress.substring(0,5) + "..." + newAddress.substring(newAddress.length - 4)}</StyledAddress>
        <StyledOperationDiv>
          
          <StyledCopyDiv onClick={setCopied}>
            <StyledImg src={copy} />
            复制地址
          </StyledCopyDiv>
          <StyledExplorerDiv href={EXPLORER_URL + `/address/${account}`}>
            <StyledImg src={share} />{t('View on NewtonExplorer')}
          </StyledExplorerDiv>
        </StyledOperationDiv>
      </StyledContentDiv>
        
        {/* <Spacer />

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

        <Spacer /> */}
        {/* <Button
          href={EXPLORER_URL + `/address/${account}`}
          text={t('View on NewtonExplorer')}
          variant="green"
          size="new"
        />
        <Spacer />
        <Button
          onClick={handleSignOutClick}
          text={t('Sign out')}
          variant="grey"
          size="new"
        /> */}
      {/* </ModalContent> */}
      
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
const StyledLabel = styled.div`
  float: right;
  margin-top: -44px;
`

const StyledContentDiv = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid #D3D9DD;
  border-radius: 20px;
  padding-top: 20px;
  padding-bottom: 14px;
  padding-left: 18px;
  padding-right: 18px;
`
const StyledConnectTip = styled.div`
  font-weight: 500;
  color: #607686;
  font-size: 12px;
`
const StyledSignout = styled.button`
  font-weight: 300;
  color: #607686;
  font-size: 12px;
  padding-left: 8px;
  padding-right: 8px;
  background: #D3D9DD;
  border-radius: 8px;
  height: 28px;
  padding-top: 4px;
  float: right;
  margin-top: -22px;
  border: 0;
`
const StyledAddress = styled.div`
  color: #607686;
  font-weight: 500;
  font-size: 19px;
`
const StyledCopyDiv = styled.button`
  border: 0;
  background: white;
  padding: 0px;
  float: left;
  padding-right: 12px;
  color: #607686;
  font-weight: 500;
  font-size: 12px;
  display: flex;
  &:focus {
    border: 0;
  }
`

const StyledExplorerDiv = styled.a`
  float: left;
  padding-left: 12px;
  padding-right: 12px;
  color: #607686;
  font-weight: 500;
  font-size: 12px;
  margin-left: 10px;
  display: flex;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const StyledOperationDiv = styled.div`
  margin-bottom: 0;
  margin-top: 7px;
  padding-bottom: 14px;
`

const StyledImg = styled.img `
  height: 15px;
  width: 15px;
  margin-right: 4px;
`


interface StyledSpacerProps {
  height: number,
}

const StyledSpacer = styled.div<StyledSpacerProps>`
  height: ${props => props.height}px;
`

export default AccountModal
