import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import TokenInput from '../../../components/TokenInput'
import Label from '../../../components/Label'
import { getFullDisplayBalance, getFormatDisplayBalance } from '../../../utils/formatBalance'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import help from '../../../assets/img/ic_issue.svg' 

interface DepositModalProps extends ModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  tokenName?: string
  totalNST: BigNumber
  totalShares: BigNumber
}

const DepositModal: React.FC<DepositModalProps> = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
  totalNST,
  totalShares
}) => {
  const [val, setVal] = useState('')
  const [harvest, setHarvest] = useState('')

  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const fullHarvest = useMemo(() => {
    if(totalNST.toNumber() === 0 || totalShares.toNumber() === 0){
      return getFormatDisplayBalance(max, 18, 2)
    } else {
      return getFormatDisplayBalance(max.times(totalShares).div(totalNST), 18, 2)
    }
  }, [max, totalNST, totalShares])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
      if(!e.currentTarget.value) {
        setHarvest('')
      } else if(totalNST.toNumber() === 0 || totalShares.toNumber() === 0){
        setHarvest(e.currentTarget.value)
      } else {
        setHarvest(new BigNumber(e.currentTarget.value)
          .times(totalShares)
          .div(totalNST)
          .toFixed(2))
      }
    },
    [setVal, setHarvest, totalNST, totalShares],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
    setHarvest(fullHarvest)
  }, [fullBalance, setVal, fullHarvest, setHarvest])

  return (
    <Modal>
      <div>
        <ModalTitle text={t('Deposit') + ` ${tokenName}` + t('Tokens')} style={style}/>
        <StyledHelpBtn><StyledImg src={help}/></StyledHelpBtn>
      </div>
      <TokenInput
        isCustomized={true}
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <StyledLabel>
      <span>{t('estimateHarvest')}</span> 
      {
        harvest ? (
          <StyledSpanGreen>{' ' + (harvest) + ' xNST'}</StyledSpanGreen>
        ) : (
          <StyledSpan>{' --' + ' xNST'}</StyledSpan>
        )
      }
      </StyledLabel>
      {/* <Label text={t('estimateHarvest') + (harvest ? harvest:'--') + ' xNST'} /> */}
      <ModalActions>
        <Button size="new" text="Cancel" variant="grey" onClick={onDismiss} />
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
