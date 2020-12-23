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

interface WithdrawModalProps extends ModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  tokenName?: string
  totalNSP: BigNumber
  totalShares: BigNumber
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  onConfirm,
  onDismiss,
  max,
  tokenName = '',
  totalNSP,
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
    return getFormatDisplayBalance(max.times(totalNSP).div(totalShares), 18, 2)
    
  }, [max, totalNSP, totalShares])


  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)

      if(!e.currentTarget.value) {
        setHarvest('')
      } else {
        setHarvest(new BigNumber(e.currentTarget.value)
          .times(totalNSP)
          .div(totalShares)
          .toFixed(2))
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
    setHarvest(fullHarvest)
  }, [fullBalance, setVal, fullHarvest, setHarvest])

  return (
    <Modal>
      <ModalTitle text={t('Withdraw') + ` ${tokenName}`} />
      <TokenInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
      />
      <Label text={t('estimateHarvest') + (harvest ? harvest:'--') + ' NSP'} />
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

export default WithdrawModal
