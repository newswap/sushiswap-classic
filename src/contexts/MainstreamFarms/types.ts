import { StringDecoder } from 'node:string_decoder';
import { Contract } from 'web3-eth-contract'

export interface MainstreamFarm {
  name: string
  lpToken: string
  lpTokenAddress: string
  lpContract: Contract
  tokenAddress: string
  miningAddress: string
  miningContract: Contract
  earnToken: string
  newPerBlock: string
  icon: string//React.ReactNode
  id: string
  tokenSymbol: string
  iconL: string
  iconR: string
}

export interface MainstreamFarmsContext {
  mainstreamFarms: MainstreamFarm[]
  unharvested: number
}
