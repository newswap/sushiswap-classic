import React, { useState } from 'react'
import useSushi from '../../hooks/useSushi'
import { getMainstreamFarms } from '../../sushi/utils'
import Context from './context'

const MainstreamFarms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)
  const sushi = useSushi()
  const mainstreamFarms = getMainstreamFarms(sushi)

  return (
    <Context.Provider
      value={{
        mainstreamFarms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default MainstreamFarms