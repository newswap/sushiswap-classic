// import React from 'react'
import React, { useEffect, useState, useCallback } from 'react'

import styled from 'styled-components'
// import arrowDown from '../../assets/img/ic_chevron_down.svg'
// import calendar from '../../assets/img/ic_calendar.svg'
// import {isMobile} from 'react-device-detect'
// import Datetime from 'react-datetime'
// import "./datePicker.css"
import { render } from 'react-dom'
import { LazyImage } from "react-lazy-images";
import { LazyImageFull, ImageState } from "react-lazy-images";
import placeholderIcon from '../../assets/img/placeholder_token.png'
import { getLogoURLByAddress } from '../../utils/addressUtil'


export interface LazyIconProps {
    address: string,
    customStyle?: React.CSSProperties
}

const LazyIcon: React.FC<LazyIconProps> = ({
    address,
    customStyle
}) => {
    const iconSrc =  getLogoURLByAddress(address)
    // console.log("Address is: " + iconSrc)
    return (
        // <LazyImage 
        //     src={iconSrc}
        //     alt=""
        //     // This is rendered first, notice how the src is different
        //     placeholder={
        //         ({imageProps, ref}) =>
        //             <img ref={ref} src="/img/porto_buildings_lowres.jpg" alt={imageProps.alt} />
        //     }
        //     // This is rendered once in view; we use the src and alt above for consistency
        //     actual={
        //         ({imageProps}) =>   
        //         <img {...imageProps} />
        //     }
            
        // />
        <LazyImageFull src={iconSrc}>
            {({ imageProps, imageState, ref }) => (
                <img
                    {...imageProps}
                    ref={ref}
                    src={
                        imageState === ImageState.LoadSuccess
                            ? imageProps.src
                            : placeholderIcon
                    }
                    style={customStyle}
                />
            )}
        </LazyImageFull>
    )
}

export default LazyIcon