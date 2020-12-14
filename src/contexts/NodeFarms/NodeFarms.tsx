import React, { useState } from 'react'

import { useWallet } from 'use-wallet'
import useSushi from '../../hooks/useSushi'

import { getNodeFarms } from '../../sushi/utils'

import Context from './context'
import { NodeFarm } from './types'

const NodeFarms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const sushi = useSushi()
  const { account } = useWallet()

  const nodeFarms = getNodeFarms(sushi)

  return (
    <Context.Provider
      value={{
        nodeFarms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default NodeFarms
