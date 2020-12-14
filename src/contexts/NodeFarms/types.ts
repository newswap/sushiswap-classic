import { Contract } from 'web3-eth-contract'

export interface NodeFarm {
  pid: number
  name: string
  lpToken: string
  lpTokenAddress: string
  lpContract: Contract
  tokenAddress: string
  earnToken: string
  icon: string//React.ReactNode
  id: string
  tokenSymbol: string
  iconL: string
  iconR: string
}

export interface NodeFarmsContext {
  nodeFarms: NodeFarm[]
  unharvested: number
}
