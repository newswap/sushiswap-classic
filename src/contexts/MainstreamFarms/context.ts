import { createContext } from 'react'
import { MainstreamFarmsContext } from './types'

const context = createContext<MainstreamFarmsContext>({
  mainstreamFarms: [],
  unharvested: 0,
})

export default context
