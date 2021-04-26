import { createContext } from 'react'
import { CustomFarmsContext } from './types'

const context = createContext<CustomFarmsContext>({
  customFarms: [],
  unharvested: 0,
})

export default context
