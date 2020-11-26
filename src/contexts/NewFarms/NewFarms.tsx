import React, { useState } from 'react'

import { useWallet } from 'use-wallet'
import useSushi from '../../hooks/useSushi'

import { getNewFarms } from '../../sushi/utils'

import Context from './context'
import { NewFarm } from './types'

const NewFarms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const sushi = useSushi()
  const { account } = useWallet()

  const newFarms = getNewFarms(sushi)

  return (
    <Context.Provider
      value={{
        newFarms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default NewFarms
