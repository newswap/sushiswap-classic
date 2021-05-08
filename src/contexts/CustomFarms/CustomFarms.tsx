import React, { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import Context from './context'
import { getAllTokenMines } from '../../sushi/utils'
import { CustomFarm } from './types'
import useBlock from '../../hooks/useBlock'

const CustomFarms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)
  const [customFarms, setCustomFarms] = useState([] as Array<CustomFarm>)
  const { ethereum}: { ethereum: any } = useWallet()
  const block = useBlock()

  const fetchAllCustomFarms= useCallback(async () => {
    const allCustomFarms= await getAllTokenMines()
    // console.log('fetchAllCustomFarms============>')
    // console.log(allCustomFarms)
    setCustomFarms(allCustomFarms)
  }, [ethereum])

  useEffect(() => {
    if (ethereum) {
      fetchAllCustomFarms()
    }
  }, [ethereum, block])

  return (
    <Context.Provider
      value={{
        customFarms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default CustomFarms