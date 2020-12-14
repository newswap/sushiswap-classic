import { createContext } from 'react'
import { NodeFarmsContext } from './types'

const context = createContext<NodeFarmsContext>({
  nodeFarms: [],
  unharvested: 0,
})

export default context
