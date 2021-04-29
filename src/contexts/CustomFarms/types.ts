import { StringDecoder } from 'node:string_decoder';
import { Contract } from 'web3-eth-contract'

export interface CustomFarm {
  // tokenMine address
  id: string
  owner: string
  name: string
  stakingToken: string
  rewardsToken: string
  startTime: number
  endTime: number
  rewardAmount: string

  stakingTokenSymbol: string
  stakingTokenName: string
  stakingTokenDecimals: number
  rewardsTokenSymbol: string
  rewardsTokenName: string
  rewardsTokenDecimals: number

  isStakingLPToken: boolean
  token0Address: string
  token0Symbol: string
  token0Name: string
  token0Decimals: number
  token1Address: string
  token1Symbol: string
  token1Name: string
  token1Decimals: number

  // creation stats
  createdAtTimestamp: number
  createdAtBlockNumber: number
}

export interface CustomFarmsContext {
  customFarms: CustomFarm[]
  unharvested: number
}
