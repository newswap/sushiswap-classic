// import React from 'react'
import React, { useEffect, useState, useCallback } from 'react'

import styled from 'styled-components'
import arrowDown from '../../assets/img/ic_chevron_down.svg'
import calendar from '../../assets/img/ic_calendar.svg'
import {isMobile} from 'react-device-detect'
import Datetime from 'react-datetime'
import "./datePicker.css"
import { render } from 'react-dom'
import { makeStyles } from '@material-ui/core/styles';
import useModal from '../../hooks/useModal'
import TokenSelectProviderModel from '../../components/TokenSelectProviderModel'
import ResultModal from '../../components/ResultModal'
import { useTranslation } from 'react-i18next'

export interface CustomInputProps {
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void,
    onTypeChange?: (event: any) => void,
    placeholder?: string,
    startAdornment: React.ReactNode,
    value: string,
    type?: 'select' | 'date' | 'fee' | 'duration' | 'number',
    onClick?: (data: any) => void,
    onDateSelected?: (date: any) => void
    date?: Date,
    data?: Array<Object>
}

const useStyles = makeStyles((theme) => ({
    
}));



const CustomPoolInput: React.FC<CustomInputProps> = ({
    onChange,
    placeholder,
    startAdornment,
    value,
    type,
    onClick,
    onDateSelected,
    onTypeChange,
    date,
    data
}) => {
    const { t } = useTranslation()

    let inputProps = {
        placeholder: placeholder,
    };
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const [selectToken, setSelectToken] = React.useState(placeholder)

    const tokenSelect = (name: any) => {
        // console.log('name is:' + name)
        setSelectToken(name)
        onClick(name)
    }

    const [onPresentSelectTokenModal] = useModal(<TokenSelectProviderModel tokenList={data} dataSelect ={tokenSelect}/>)
    const [onPresentFeatchDataError] = useModal(<ResultModal title={t('featchDataError')}/>)


    const handleSelectTokenClick = useCallback(() => {
        if (data.length > 1)
            onPresentSelectTokenModal()
        else
            onPresentFeatchDataError()
      }, [onPresentSelectTokenModal])
    
    const checkValidDate = (currentDate: any, selectedDate: any) => {
        return (currentDate/1000/60/60/24) >= ((((new Date()).getTime())/1000/60/60/24)-1) && 
            (currentDate/1000/60/60/24) <= ((((new Date()).getTime())/1000/60/60/24)+30)
    }

    return (
    <StyledInputWrapper>
        <StyledStartDiv>{startAdornment}</StyledStartDiv>
        { 
            type ? ( type === 'select' ? 
                (
                    <>
                    <StyledTokenDiv>{selectToken}</StyledTokenDiv>
                    <StyledSelectBtn onClick={handleSelectTokenClick}>
                        <StyledSelectImg src={arrowDown} />
                    </StyledSelectBtn>
                                       
                    </>
                ) : (
                    type === 'date' ? 
                    (
                        <>
                        <Datetime 
                            inputProps={inputProps} 
                            closeOnClickOutside={true} 
                            onChange={onDateSelected} 
                            closeOnSelect={true}
                            isValidDate={checkValidDate}
                            >
                        </Datetime>
                        
                        <StyledCalendarImg src={calendar} />
                        </>
                    ) : (
                        type === 'fee' ? 
                        (                
                            <>
                            <StyledFeeDiv>{placeholder} NEW</StyledFeeDiv>
                            </>
                        ) : (
                            type === 'duration' ? (
                                <>
                                <StyledInput placeholder={placeholder} value={value} onChange={onChange} type="number" />
                                <StyledUnitDiv>{t('days')}</StyledUnitDiv>
                                </>
                            ) : ( 
                                type === 'number' ? (
                                    <StyledInput placeholder={placeholder} value={value} onChange={onChange} type="number"/>
                                ) : (
                                    <div></div>
                                )
                            )                                              
                        )
                    )
                )
            ) : (
                <StyledInput placeholder={placeholder} value={value} onChange={onChange} />
            )
        }
    </StyledInputWrapper>
  )
}

const StyledFeeDiv = styled.div`
    float: right;
    height: 36px;
    margin-top: -25px;
    font-size: 14px;
    font-weight: 500;
    color: #555A6A;
`
const StyledUnitDiv = styled.div`
    float: right;
    height: 36px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #555A6A;
    &:focus{
        outline: none;
        border: 0;
    }
`

const StyledImg = styled.img `
    height: 15px;
    width: 15px;
`
const StyledCalendarImg = styled.img `
    height: 30px;
    width: 30px;
    float: right;
    margin-top: -40px;
`

const StyledDateDiv = styled.button`
    background: inherit;
    float: right;
    height: 36px;
    border: 0;
    margin-top: 4px;
    cursor: pointer;
`

const StyledSelectDiv = isMobile ? styled.select`
    float: right;
    background: #F2F2F7;
    color: #555A6A;
    border-radius: 12px;
    height: 36px;
    border: 0;
    margin-top: -44px;
    cursor: pointer;
    width: 100px;
` : styled.select`
    float: right;
    background: #F2F2F7;
    color: #555A6A;
    border-radius: 12px;
    height: 36px;
    border: 0;
    margin-top: 4px;
    cursor: pointer;
    width: 100px;
    &:focus {
        border: none;
        outline: none;
    }
`

const StyledStartDiv = styled.div`
    color: #555A6A;
    font-size: 14px;
    font-weight: 500;
    height: 24px;
`

const StyledInputWrapper = styled.div`
  align-items: center;
  background-color: #F2F2F7;
  border: 0;
  border-radius: 20px;
  display: block;
  padding: 0 16px;
  padding-top: 10px;
  padding-bottom: 4px;
  margin-bottom: 20px;
`

const StyledInput = styled.input`
  background: none;
  border: 0;
  color: #555A6A;
  font-size: 16px;
  flex: 1;
  height: 48px;
  margin: 0;
  padding: 0;
  outline: none;
  font-weight: 500;
  width: 80%;
`

const StyledTokenDiv = styled.div`
  background: none;
  border: 0;
  color: #555A6A;
  font-size: 16px;
  flex: 1;
  height: 24px;
  margin: 0;
  padding: 0;
  outline: none;
  font-weight: 500;
  width: 80%;
  margin-top: 12px;
  margin-bottom: 12px;
`

const StyledSelectBtn = styled.button`
    margin-top: -32px;
    width: 24px;
    height: 24px;
    float: right;
    padding: 0;
    border: none;
    background: #F2F2F7;
    cursor: pointer;
    &:focus {
        border: none;
        outline: none;
    }
`

const StyledSelectImg = styled.img`
    width: 24px;
    height: 24px;   
`

export default CustomPoolInput
