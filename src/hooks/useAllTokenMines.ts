import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import { useWallet } from 'use-wallet'

import { getAllTokenMines } from '../sushi/utils'
import useBlock from './useBlock'

export interface TokenMine {
  // tokenMine address
  id: string
  owner: string
  name: string
  stakingToken: string
  rewardsToken: string
  startBlock: number
  endBlock: number
  rewardAmount: number

  stakingTokenSymbol: string
  stakingTokenName: string
  stakingTokenDecimals: number
  rewardsTokenSymbol: string
  rewardsTokenName: string
  rewardsTokenDecimals: number

  isStakingLPToken: boolean
  token0Symbol: string
  token0Name: string
  token0Decimals: number
  token1Symbol: string
  token1Name: string
  token1Decimals: number

  // creation stats
  createdAtTimestamp: number
  createdAtBlockNumber: number
}

const useAllTokenMines = () => {
  const [tokenMines, setTokenMines] = useState([] as Array<TokenMine>)
  const {
    ethereum,
  }: { ethereum: provider } = useWallet()
  // const block = useBlock()

  const fetchAllTokenMines= useCallback(async () => {
    const allTokenMines= await getAllTokenMines()
    setTokenMines(allTokenMines)
  }, [ethereum])

  useEffect(() => {
    if (ethereum) {
      fetchAllTokenMines()
    }
  }, [ethereum]) //[ethereum, block]

  return tokenMines
}

export default useAllTokenMines
