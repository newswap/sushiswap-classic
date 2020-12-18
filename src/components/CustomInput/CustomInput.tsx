// import React from 'react'
import React, { useEffect, useState, useCallback } from 'react'

import styled from 'styled-components'
import arrowDown from '../../assets/img/ic_chevron_down.svg'
import calendar from '../../assets/img/ic_calendar.svg'
import {isMobile} from 'react-device-detect'
import Datetime from 'react-datetime'
import "./datePicker.css"


export interface CustomInputProps {
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void,
    onTyleChange?: (event: any) => void,
    placeholder?: string,
    startAdornment: React.ReactNode,
    value: string,
    type?: 'select' | 'date' | 'fee' | 'duration',
    onClick?: () => void,
    onDateSelected?: (date: any) => void
    date?: Date,
    data?: Array<Object>
}

const CustomInput: React.FC<CustomInputProps> = ({
    onChange,
    placeholder,
    startAdornment,
    value,
    type,
    onClick,
    onDateSelected,
    onTyleChange,
    date,
    data
}) => {

    let inputProps = {
        placeholder: '新加坡时间',
    };

    return (
    <StyledInputWrapper>
        <StyledStartDiv>{startAdornment}</StyledStartDiv>
        { 
            type ? ( type == 'select' ? 
                (
                    <>
                    <StyledInput placeholder={placeholder} value={value} onChange={onChange} />
                    <StyledSelectDiv id="lang" onChange={onTyleChange}>
                        
                        <option value="">选择通证</option>

                        {
                            data.map((token, i) => 
                                <option value={token['name']} key={i} >{token['name']}</option>
                            )
                        }              
                    </StyledSelectDiv>
                    </>
                ) : (
                    type == 'date' ? 
                    (
                        <>
                        <Datetime inputProps={inputProps} closeOnClickOutside={true} onChange={onDateSelected}>
                        </Datetime>
                        <StyledCalendarImg src={calendar} />
                        </>
                    ) : (
                        type == 'fee' ? 
                        (                
                            <>
                            <StyledInput placeholder={placeholder} value={value} onChange={onChange} />            
                            <StyledUnitDiv>NEW</StyledUnitDiv>
                            </>
                        ) : (
                            type == 'duration' ? (
                                <>
                                <StyledInput placeholder={placeholder} value={value} onChange={onChange} />
                                <StyledFeeDiv>挖矿效率约为：200 ABC/区块</StyledFeeDiv>
                                </>
                            ) : (
                                <div></div>
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
    margin-top: -72px;
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
    background: #00C99E;
    color: white;
    border-radius: 12px;
    height: 36px;
    border: 0;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: -44px;
    cursor: pointer;
` : styled.select`
    float: right;
    background: #00C99E;
    color: white;
    border-radius: 12px;
    height: 36px;
    border: 0;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 4px;
    cursor: pointer;
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

export default CustomInput