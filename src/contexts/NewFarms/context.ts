import { createContext } from 'react'
import { NewFarmsContext } from './types'

const context = createContext<NewFarmsContext>({
  newFarms: [],
  unharvested: 0,
})

export default context
