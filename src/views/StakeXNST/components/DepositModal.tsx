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
      <ModalTitle text={t('Deposit') + ` ${tokenName} ` + t('Tokens')} />
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <Label text={t('estimateHarvest') + (harvest ? harvest:'--') + ' xNST'} />
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

export default DepositModal
