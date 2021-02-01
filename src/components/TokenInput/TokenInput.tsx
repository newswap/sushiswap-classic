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
  isCustomized?: boolean
}

const TokenInput: React.FC<TokenInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  isCustomized
}) => {
  const { t } = useTranslation()

  if (isCustomized) {
    return (
      <StyledTokenInput style={CustomStyledDiv}>
        <div>
          <TytleDiv>{t('Input')}</TytleDiv>
          <StyledMaxText>{max.toLocaleString()} {symbol} {t('Available')}</StyledMaxText>
        </div>
        <StyledInputDiv>
          <StyledInputStyle onChange={onChange} placeholder="0" value={value}/>
          <StyledMaxDiv>
            <StyledMaxButton onClick={onSelectMax}>MAX</StyledMaxButton> 
            <StyledTokenDiv>{symbol}</StyledTokenDiv>  
          </StyledMaxDiv>
        </StyledInputDiv>
      </StyledTokenInput>
    )
  } else {

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
}

/*
            <div>
              <Button size="sm" text="Max" />
            </div>
*/

const StyledInputDiv = styled.div`
  display: inline-flex; 
  width: 100%;
`

const StyledTokenDiv = styled.div`
  padding: 0 10px;
  border-radius: 12px;
  background: white;
  height: 30px;
  font-weight: 500;
  font-size: 14px;
  color: #607686;
  line-height: 30px;
  width: max-content;
`

const StyledMaxButton = styled.button`
  background: none;
  color: #20C5A0;
  font-weight: 500;
  font-size: 14px;
  height: 30px;
  outline: none;
  border: 0;
  &:focus{
    outline: none;
    border: 0;
  }
`

const StyledMaxDiv = styled.div`
  display: flex;
`
const TytleDiv = styled.div `
  float: left;
  margin-top: 10px;
  font-weight: 500;
  color: #555A6A;
  font-size: 14px;
`
const StyledInputStyle = styled.input `
  border: 0;
  font-size: 24px;
  background: none;
  width: 100%;
  color: #607686;
  font-weight: 500;
  &:focus{
    outline: none;
    border: 0;
  }
`
const CustomStyledDiv: React.CSSProperties = {
  width: 'calc(100%-32px)',
  height: '86px',
  background: '#F2F2F7',
  borderRadius: '20px',
  padding: '0px 16px',
}

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