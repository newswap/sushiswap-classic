import React from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import usePendingTransactions from '../../../hooks/usePendingTransactions'
import Button from '../../Button'
import { useTranslation } from 'react-i18next'

const EXPLORER_URL = process.env.REACT_APP_EXPLORER_URL

interface TxButtonProps {}

const TxButton: React.FC<TxButtonProps> = () => {
  const { account } = useWallet()
  const { t } = useTranslation()
  const pendingTransactions = usePendingTransactions()
  return (
    <>
      {!!account && !!pendingTransactions.length ? (
        <StyledTxButton>
          <Button
            size="sm"
            text={`${pendingTransactions.length} ` + t('Transaction(s)')}
            href={EXPLORER_URL + `/address/${account}`}
          />
        </StyledTxButton>
      ) : null}
    </>
  )
}

const StyledTxButton = styled.div`
  margin-right: ${(props) => props.theme.spacing[4]}px;
`

export default TxButton
