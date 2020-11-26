import { Contract } from 'web3-eth-contract'

export interface NewFarm {
  pid: number
  name: string
  lpToken: string
  lpTokenAddress: string
  lpContract: Contract
  tokenAddress: string
  earnToken: string
  earnTokenAddress: string
  icon: React.ReactNode
  id: string
  tokenSymbol: string
}

export interface NewFarmsContext {
  newFarms: NewFarm[]
  unharvested: number
}
