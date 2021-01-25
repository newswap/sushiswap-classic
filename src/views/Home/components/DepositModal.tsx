import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import TokenInput from '../../../components/TokenInput'
import { getFullDisplayBalance } from '../../../utils/formatBalance'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import help from '../../../assets/img/ic_issue.svg' 
import ReactTooltip from 'react-tooltip'

interface DepositModalProps extends ModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  tokenName?: string
}

// TODO 和Farm中的一样，之后提到components中统一样式
const DepositModal: React.FC<DepositModalProps> = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal>
      <div>
        <ModalTitle text={t('Deposit') + ` ${tokenName}` + t('Tokens')} style={style}/>
        {/* <StyledHelpBtn data-tip="hello world">
          <StyledImg src={help}/>
        </StyledHelpBtn>
        <ReactTooltip /> */}
      </div>
      <TokenInput
        isCustomized={true}
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <Button size="new" text= {t('Cancel')} variant="grey" onClick={onDismiss} />
        <Button
          size="new"
          variant="green"
          disabled={pendingTx}
          text={pendingTx ? t('Pending Confirmation') : t('Confirm')}
          onClick={async () => {
            if(!val || val === '0')
              return
            
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
        />
      </ModalActions>
    </Modal>
  )
}

const StyledSpan =  styled.span`
  color: #647684;
`

const StyledSpanGreen =  styled.span`
  color: #00C99E;
`
const StyledLabel = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 20px;
  color: #647684;
  font-size: 16px;
  font-weight: 500;
`
const StyledImg = styled.img`
  height: 22px;
  width: 22px;
`
const StyledHelpBtn = styled.button`
  background: none;
  border: 0;
  float: right;
  height: 36px;
  margin-top: 18px;
  &:focus{
    outline: none;
    border: 0;
  }
`
const style: React.CSSProperties = {
  float: 'left'
}
export default DepositModal
