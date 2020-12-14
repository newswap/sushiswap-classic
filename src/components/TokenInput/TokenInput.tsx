import React from 'react'
import styled from 'styled-components'

import Button from '../Button'
import Input, { InputProps } from '../Input'
import { useTranslation } from 'react-i18next'
import { isMobile } from "react-device-detect"

interface TokenInputProps extends InputProps {
  max: number | string,
  symbol: string,
  onSelectMax?: () => void,
}

const TokenInput: React.FC<TokenInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
}) => {
  const { t } = useTranslation()

  return (
    <StyledTokenInput>
      <StyledMaxText>{max.toLocaleString()} {symbol} {t('Available')}</StyledMaxText>
      <Input
        endAdornment={(
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
            <div>
              {isMobile ? (
                <StyledButtonMob onClick={onSelectMax}>Max</StyledButtonMob>
              ) : (
                <Button size="new" variant="green" text="Max" onClick={onSelectMax} />
              )
              }
              
            </div>
          </StyledTokenAdornmentWrapper>
        )}
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </StyledTokenInput>
  )
}

/*
            <div>
              <Button size="sm" text="Max" />
            </div>
*/

const StyledTokenInput = styled.div`

`

const StyledSpacer = styled.div`
  width: ${props => props.theme.spacing[3]}px;
  background: red;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledMaxText = styled.div`
  align-items: center;
  color: #647684;
  display: flex;
  font-size: 14px;
  font-weight: 500;
  height: 44px;
  justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`
  color: #647684;
  font-weight: 700;
`

const StyledButtonMob = styled.button`
align-items: center;
background-color: #20C5A0;
border: 0;
border-radius: 12px;
color: #ffffff;
cursor: pointer;
display: flex;
font-size: 16px;
font-weight: 700;
height: 44px;
justify-content: center;
outline: none;
padding-left: 7px;
padding-right: 7px;
width: 100%;
&:hover {
}

`

export default TokenInput