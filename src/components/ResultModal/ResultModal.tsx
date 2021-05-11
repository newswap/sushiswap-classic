import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import Button from '../Button'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalTitle from '../ModalTitle'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'


interface ResultModalProps extends ModalProps {
  title?: string
  tip?: string
  type?: 'stake' | 'unstake' 
}

const ResultModal: React.FC<ResultModalProps> = ({
    title,
    onDismiss,
    tip,
    type
}) => {
  const [val, setVal] = useState('')
  const { t } = useTranslation()
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )
  
  let modelTitle: string
  switch (type) {
    case 'stake':
      modelTitle = t('stakeCompleteTitle')
      break
    case 'unstake':
      modelTitle = t('unstakeCompleteTitle')
      break
    default:
      modelTitle = title
  }

  let modelTip: string
  switch (type) {
    case 'stake':
      modelTip = t('harvestedTip')
      break
    case 'unstake':
      modelTip = t('harvestedTip')
      break
    default:
      modelTip = tip
  }

  return (
    <Modal>
        <ModalTitle text={modelTitle} style={style}/>
        <StyledTip><span>{modelTip}</span></StyledTip>

        <ModalActions>
        <Button size="new" text={t('OK')} variant="green" onClick={onDismiss} />
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

const StyledTip = styled.div`
  padding-top: 0px;
  padding-bottom: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  color: #647684;
  font-size: 16px;
  flex-direction: column;
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
    alignItems: "center",
    flexDirection: "column",
    fontSize: "24px",
    color: "#20C5A0",
    marginTop: "20px",
    height: "48px"
}

export default ResultModal
